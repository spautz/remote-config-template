#!/usr/bin/env node

import { glob, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  srcDir,
  distDir,
  listOfFilesFile,
  JSON_FILE_EXTENSIONS,
  TEXT_FILE_EXTENSIONS,
  getAllConfigFileNames,
} from './_helpers/configFileUtils.ts';
import { consoleError, consoleLog } from './_helpers/scriptUtils.ts';

import './_helpers/chdirToProject.ts';

const EXIT_CODE__NO_FILES_WRITTEN = 1;
const EXIT_CODE__UNSUPPORTED_FILE_EXTENSION = 2;
const EXIT_CODE__INVALID_DATA_FOR_FILE_EXTENSION = 2;
const EXIT_CODE__FILES_REMOVED = 4;

export async function buildConfigFiles() {
  const allSrcFiles = await getAllConfigFileNames();

  for await (const srcFile of allSrcFiles) {
    const { CONFIG_FILES, targetDirUnderDist } = result;

    await mkdir(targetDirUnderDist, { recursive: true });

    for (const [filenameToWrite, rawContentOrPromise] of Object.entries(CONFIG_FILES)) {
      const targetPath = path.join(targetDirUnderDist, filenameToWrite);
      const fileExtension = path.extname(filenameToWrite);
      const rawContent = await rawContentOrPromise;
      let contentToWrite: string;

      if (JSON_FILE_EXTENSIONS.includes(fileExtension)) {
        const jsonContent = JSON.stringify(rawContent);

        // Make sure it's actually serializable/deserializable
        const deserializedContentAsString = JSON.stringify(JSON.parse(jsonContent));
        if (jsonContent === deserializedContentAsString) {
          contentToWrite = jsonContent;
        } else {
          consoleError(`JSON for ${filenameToWrite} is not serializable: \n${jsonContent}`);
          process.exit(EXIT_CODE__INVALID_DATA_FOR_FILE_EXTENSION);
        }
      } else if (TEXT_FILE_EXTENSIONS.includes(fileExtension)) {
        // Text content must be .toString()'d before sending it out
        if (typeof rawContent === 'string') {
          contentToWrite = rawContent;
        } else {
          consoleError(`Text content for ${filenameToWrite} is not a string: \n${rawContent}`);
          process.exit(EXIT_CODE__INVALID_DATA_FOR_FILE_EXTENSION);
        }
      } else {
        consoleError(`Unsupported file extension: ${fileExtension} (in ${filenameToWrite})`);
        process.exit(EXIT_CODE__UNSUPPORTED_FILE_EXTENSION);
      }

      consoleLog(`Writing ${targetPath}`);
      await writeFile(targetPath, contentToWrite);
      allOutputFiles.push(path.relative(distDir, targetPath).replaceAll('\\', '/'));
    }
  }

  // The "list-of-files file" must be committed to the repo: it's used to ensure nothing is removed by accident
  if (allOutputFiles.length) {
    let previousListOfFiles = '';
    try {
      previousListOfFiles = await readFile(listOfFilesFile, 'utf8');
    } catch {
      // It's fine if the file doesn't exist yet
    }
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
}

if (pathToFileURL(process.argv[1]).href === import.meta.url) {
  buildConfigFiles().catch((error) => {
    consoleError(error);
    process.exit(1);
  });
}
