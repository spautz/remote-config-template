#!/usr/bin/env node

import { glob, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const srcDir = 'src';
const distDir = 'dist';

// Look through all non-test files for a `CONFIG_FILES` export
const allSrcFiles = glob(path.join(srcDir, '**/*.{jt}s'), {
  exclude: (file) => file.includes('__tests__') || file.endsWith('.test.ts'),
});

for await (const srcFile of allSrcFiles) {
  const absolutePath = path.resolve(srcFile);

  let module: Record<string, unknown>;
  try {
    // On Windows, absolute paths must be valid file:// URLs for ESM import
    const fileUrl = pathToFileURL(absolutePath).href;
    module = await import(fileUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to import ${srcFile}:`, error);
    continue;
  }

  // If we found a config, save whatever files it specifies
  const { CONFIG_FILES } = module as { CONFIG_FILES?: Record<string, unknown> };
  if (CONFIG_FILES) {
    // However deep the file was under `src/`, use that as the prefix for the files we're going to write
    const filePathUnderSrc = path.dirname(path.relative(srcDir, srcFile));
    const targetDirUnderDist = path.join(distDir, filePathUnderSrc);

    await mkdir(targetDirUnderDist, { recursive: true });

    for (const [filenameToWrtie, contentToWrite] of Object.entries(CONFIG_FILES)) {
      const targetPath = path.join(targetDirUnderDist, filenameToWrtie);

      // @FIXME: Today this assumes everything is .json. We should instead look at the file extension to decide
      //  what format to use

      // eslint-disable-next-line no-console
      console.log(`Writing ${targetPath}`);
      await writeFile(targetPath, JSON.stringify(contentToWrite, null, 2));
    }
  }
}
