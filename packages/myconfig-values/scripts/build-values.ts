#!/usr/bin/env zx

import { pathToFileURL } from 'node:url';
import { fs, glob, path } from 'zx';

const srcDir = 'src';
const distDir = 'dist';

// 1. Identify all non-test files under `src/`
const files = await glob(['src/**/*.ts', '!src/**/__tests__/**', '!src/**/*.test.ts']);

for (const file of files) {
  // 2. Try to import each one: look for a `CONFIG_FILES` named export.
  const absolutePath = path.resolve(file);

  let module: Record<string, unknown>;
  try {
    // On Windows, absolute paths must be valid file:// URLs for ESM import
    const fileUrl = pathToFileURL(absolutePath).href;
    module = await import(fileUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to import ${file}:`, error);
    continue;
  }

  const { CONFIG_FILES } = module as { CONFIG_FILES?: Record<string, unknown> };

  // 3. If there is no `CONFIG_FILES` export, move on to the next file.
  if (!CONFIG_FILES) {
    continue;
  }

  // 4. Process it as an object
  const relativeDir = path.dirname(path.relative(srcDir, file));
  const targetDir = path.join(distDir, relativeDir);

  await fs.ensureDir(targetDir);

  for (const [filename, content] of Object.entries(CONFIG_FILES)) {
    const targetPath = path.join(targetDir, filename);
    // eslint-disable-next-line no-console
    console.log(`Writing ${targetPath}`);
    await fs.writeJson(targetPath, content, { spaces: 2 });
  }
}
