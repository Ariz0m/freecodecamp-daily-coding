#!/usr/bin/env node

import { join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { argv } from 'process';

const fileName = argv[2] || 'newFile';
const date = new Date();
const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date).toLowerCase();

const dirPath = join(import.meta.dirname, `../${date.getFullYear()}/${month}`);

mkdirSync(dirPath, { recursive: true });
const filePath = join(dirPath, `${fileName}.ts`);
writeFileSync(filePath, `function ${fileName}() {\n    // Your code here\n}\n`);
