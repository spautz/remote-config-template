#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';

// We always run in `packages/myconfig-values/`: all paths are relative to that.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../../');
process.chdir(projectRoot);
