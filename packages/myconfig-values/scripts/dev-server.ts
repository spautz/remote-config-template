#!/usr/bin/env node

import { watch } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { consoleError, consoleLog } from './_helpers/scriptUtils.ts';
import { buildConfigFiles } from './build-config-files.ts';

// We always run in `packages/myconfig-values/`: all paths are relative to that.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
process.chdir(projectRoot);

const srcDir = 'src';
const distDir = 'dist';

const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = portIndex !== -1 ? Number.parseInt(args[portIndex + 1], 10) : 3000;

if (Number.isNaN(port)) {
  consoleError('Invalid port number provided.');
  process.exit(1);
}

// Initial build
try {
  await buildConfigFiles();
} catch (error) {
  consoleError('Initial build failed:', error);
}

// Watch for changes in src/
let isRebuilding = false;
watch(srcDir, { recursive: true }, async (eventType, filename) => {
  if (filename && (filename.endsWith('.ts') || filename.endsWith('.js'))) {
    if (isRebuilding) return;
    isRebuilding = true;
    consoleLog(`Change detected in ${filename}. Rebuilding...`);
    try {
      await buildConfigFiles();
      consoleLog('Rebuild complete.');
    } catch (error) {
      consoleError('Rebuild failed:', error);
    } finally {
      isRebuilding = false;
    }
  }
});

// Simple server to serve dist/
const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${port}`);
  const filePath = path.join(distDir, url.pathname);

  // If it's a directory, we don't really have a default file, but the requirement
  // says "Serves up all the json files".

  try {
    const content = await readFile(filePath);
    const ext = path.extname(filePath);
    let contentType = 'application/octet-stream';
    if (ext === '.json') contentType = 'application/json';
    else if (ext === '.json5') contentType = 'application/json5';
    else if (ext === '.jsonc') contentType = 'application/jsonc';
    else if (ext === '.txt') contentType = 'text/plain';
    else if (ext === '.html') contentType = 'text/html';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(500);
      res.end(`Server error: ${error.code}`);
    }
  }
});

server.listen(port, () => {
  consoleLog(`Dev server running at http://localhost:${port}`);
  consoleLog(`Watching for changes in ${srcDir}...`);
});
