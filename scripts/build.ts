#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { argv } from 'node:process';

const files = argv.slice(2);

const result =
    files.length > 0
        ? spawnSync(
              'tsc',
              [
                  '--ignoreConfig',
                  '--outDir',
                  'dist',
                  '--rootDir',
                  '.',
                  '--target',
                  'esnext',
                  '--module',
                  'nodenext',
                  '--skipLibCheck',
                  ...files,
              ],
              { stdio: 'inherit' },
          )
        : spawnSync('tsc', ['--outDir', 'dist'], { stdio: 'inherit' });

process.exit(result.status ?? 1);
