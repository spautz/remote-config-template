#!/usr/bin/env node

import { getAllConfigFileNames } from './_helpers/configFileUtils.ts';

import './_helpers/chdirToProject.ts';

const fileList = await getAllConfigFileNames();
console.log(fileList);
