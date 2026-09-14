#!/usr/bin/env node

import { argv } from 'process';
import { generateChallengeApp } from "src/generateChallengeApp";
import { toPlainDate } from 'date/toPlainDate';

const date = toPlainDate(argv[2] ?? Temporal.Now.plainDateISO());

await generateChallengeApp(date);
