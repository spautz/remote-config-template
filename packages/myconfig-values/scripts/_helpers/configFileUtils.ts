import { glob } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { consoleError } from './scriptUtils.ts';

// We always run in `packages/myconfig-values/`: all paths are relative to that.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../../');
process.chdir(projectRoot);

const srcDir = 'src';
const distDir = 'dist';
const listOfFilesFile = 'src/list-of-files-created.txt';

// These are the supported output file types
const JSON_FILE_EXTENSIONS = ['.json', '.json5', '.jsonc'];
const TEXT_FILE_EXTENSIONS = ['.html', '.log', '.md', '.txt'];

// Internal state for input-output tracking. Sloppy but good enough for now.

/**
 * Records the files that each `src/whatever.ts` generates
 */
let srcFileToOutputMap: Record<string, Array<string>> = Object.create(null);
/**
 * Maps `some-file.json` back to the `src/whatever.ts` that it comes from.
 */
let outputFilesToSrcMap: Record<string, string> = Object.create(null);

/**
 * Lists all keys of all exported CONFIG_FILES, and maintains an internal map from output filename to
 * input module.
 */
async function getAllConfigFileNames() {
  // Look through all non-test files for a `CONFIG_FILES` export
  const allSrcFiles = glob(path.join(srcDir, '**/*.[jt]s'), {
    exclude: (filepath) => filepath.includes('__tests__') || filepath.endsWith('.test.ts'),
  });

  // Go through each file and record its outputs
  srcFileToOutputMap = Object.create(null);
  outputFilesToSrcMap = Object.create(null);

  for await (const srcFile of allSrcFiles) {
    await scanOutputsFromSrcFile(srcFile);
  }

  return Object.keys(outputFilesToSrcMap).sort();
}

async function scanOutputsFromSrcFile(srcFileRaw: string) {
  // We always use unix/URL-style paths internally
  const absolutePath = path.resolve(srcFileRaw);
  const srcFile = path.relative(srcDir, absolutePath).replaceAll('\\', '/');

  // Reset input-output tracking
  if (srcFileToOutputMap[srcFile]) {
    srcFileToOutputMap[srcFile].forEach((outFile) => {
      if (!outputFilesToSrcMap[outFile]) {
        throw new Error(
          `Internal error: srcFile "${srcFile}" maps to outFile "${outFile}", but outFile does not map back.`,
        );
      }
      delete outputFilesToSrcMap[outFile];
    });
  }
  delete srcFileToOutputMap[srcFile];

  let module: Record<string, unknown>;

  try {
    // On Windows, absolute paths must be valid `file://` URLs for ESM import
    const fileUrl = pathToFileURL(absolutePath).href;

    // Append a cache-buster query parameter to force re-import during local dev
    module = await import(`${fileUrl}?update=${Date.now()}`);

    // If we found a config, record and return it:
    // * Dev server will track things internally
    // * Build script will immediately tell us to process it.
    const { CONFIG_FILES } = module as { CONFIG_FILES?: Record<string, unknown> };

    if (CONFIG_FILES) {
      // However deep the file was under `src/`, use that as the prefix for the files we're going to write
      const filePathUnderSrc = path.dirname(path.relative(srcDir, srcFile));
      const targetDirUnderDist = path.join(distDir, filePathUnderSrc);

      // Record the outputs
      const outFileList = Object.keys(CONFIG_FILES).map((outFile) =>
        path.join(targetDirUnderDist, outFile).replaceAll('\\', '/'),
      );

      srcFileToOutputMap[srcFile] = outFileList;
      for (const outFile of outFileList) {
        outputFilesToSrcMap[outFile] = srcFile;
      }
    }
  } catch (error) {
    consoleError(`Failed to import ${srcFile}:`, error);
  }

  return srcFileToOutputMap[srcFile];
}

export {
  srcDir,
  distDir,
  listOfFilesFile,
  JSON_FILE_EXTENSIONS,
  TEXT_FILE_EXTENSIONS,
  getAllConfigFileNames,
  scanOutputsFromSrcFile,
};
