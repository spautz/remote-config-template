#!/usr/bin/env node

import { glob, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { consoleError, consoleLog } from './_helpers/script-utils.ts';

const EXIT_CODE__NO_FILES_WRITTEN = 1;
const EXIT_CODE__UNSUPPORTED_FILE_EXTENSION = 2;
const EXIT_CODE__INVALID_DATA_FOR_FILE_EXTENSION = 2;
const EXIT_CODE__FILES_REMOVED = 4;

// We always run in `packages/myconfig-values/`: all paths are relative to that.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
process.chdir(projectRoot);

const srcDir = 'src';
const distDir = 'dist';
const listOfFilesFile = 'src/list-of-files-created.txt';

// These are the supported output file types
const JSON_FILE_EXTENSIONS = ['.json', '.json5', '.jsonc'];
const TEXT_FILE_EXTENSIONS = ['.html', '.log', '.md', '.txt'];

// Look through all non-test files for a `CONFIG_FILES` export
const allSrcFiles = glob(path.join(srcDir, '**/*.[jt]s'), {
  exclude: (file) => file.includes('__tests__') || file.endsWith('.test.ts'),
});
const allOutputFiles: Array<string> = [];

for await (const srcFile of allSrcFiles) {
  const absolutePath = path.resolve(srcFile);

  let module: Record<string, unknown>;
  try {
    // On Windows, absolute paths must be valid file:// URLs for ESM import
    const fileUrl = pathToFileURL(absolutePath).href;
    module = await import(fileUrl);
  } catch (error) {
    consoleError(`Failed to import ${srcFile}:`, error);
    continue;
  }

  // If we found a config, save whatever files it specifies
  const { CONFIG_FILES } = module as { CONFIG_FILES?: Record<string, unknown> };
  if (CONFIG_FILES) {
    // However deep the file was under `src/`, use that as the prefix for the files we're going to write
    const filePathUnderSrc = path.dirname(path.relative(srcDir, srcFile));
    const targetDirUnderDist = path.join(distDir, filePathUnderSrc);

    await mkdir(targetDirUnderDist, { recursive: true });

    for (const [filenameToWrtie, rawContentOrPromise] of Object.entries(CONFIG_FILES)) {
      const targetPath = path.join(targetDirUnderDist, filenameToWrtie);
      const fileExtension = path.extname(filenameToWrtie);
      const rawContent = await rawContentOrPromise;
      let contentToWrite: string;

      if (JSON_FILE_EXTENSIONS.includes(fileExtension)) {
        const jsonContent = JSON.stringify(rawContent);

        // Make sure it's actually serializable/deserializable
        const deserializedContentAsString = JSON.stringify(JSON.parse(jsonContent));
        if (jsonContent === deserializedContentAsString) {
          contentToWrite = jsonContent;
        } else {
          consoleError(`JSON for ${filenameToWrtie} is not serializable: \n${jsonContent}`);
          process.exit(EXIT_CODE__INVALID_DATA_FOR_FILE_EXTENSION);
        }
      } else if (TEXT_FILE_EXTENSIONS.includes(fileExtension)) {
        // Text content must be .toString()'d before sending it out
        if (typeof rawContent === 'string') {
          contentToWrite = rawContent;
        } else {
          consoleError(`Text content for ${filenameToWrtie} is not a string: \n${rawContent}`);
          process.exit(EXIT_CODE__INVALID_DATA_FOR_FILE_EXTENSION);
        }
      } else {
        consoleError(`Unsupported file extension: ${fileExtension} (in ${filenameToWrtie})`);
        process.exit(EXIT_CODE__UNSUPPORTED_FILE_EXTENSION);
      }

      consoleLog(`Writing ${targetPath}`);
      await writeFile(targetPath, contentToWrite);
      allOutputFiles.push(path.relative(distDir, targetPath).replaceAll('\\', '/'));
    }
  }
}

// The "list-of-files file" must be committed to the repo: it's used to ensure nothing is removed by accident
if (allOutputFiles.length) {
  const previousListOfFiles = await readFile(listOfFilesFile, 'utf8');
  const previousListOfFilesArray = previousListOfFiles.split('\n').filter(Boolean);
  const filesRemoved = previousListOfFilesArray.filter((file) => !allOutputFiles.includes(file));
  if (filesRemoved.length) {
    consoleError(`Files removed since last run: ${filesRemoved.join(', ')}`);
    process.exit(EXIT_CODE__FILES_REMOVED);
  }

  // To minimize git conflicts, filenames are sorted
  // biome-ignore lint/style/useTemplate: Looks nicer as-is
  await writeFile(listOfFilesFile, allOutputFiles.sort().join('\n') + '\n');
  consoleLog(`Wrote ${allOutputFiles.length} config files.`);
} else {
  consoleError('No config files were written.');
  process.exit(EXIT_CODE__NO_FILES_WRITTEN);
}
