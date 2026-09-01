#!/usr/bin/env node

import { join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { argv } from 'process';

if (!('Temporal' in globalThis)) {
    console.error(`Temporal requires Node.js 26+. Current version: ${process.version}.`);
    process.exit(1);
}

const locale = 'en';
const today = Temporal.Now.plainDateISO();

const fileName = argv[2] || 'newFile';
const functionName = argv[3] || fileName;
const monthInput = argv[4];
const yearInput = argv[5];

function fail(message: string): never {
    console.error(message);
    process.exit(1);
}

function parseYear(input: string | undefined, fallback: number): number {
    if (input === undefined) return fallback;

    const year = Number(input);
    if (!Number.isInteger(year)) {
        fail(`Invalid year: "${input}". Use a whole number like 2026.`);
    }
    return year;
}

function parseMonth(input: string | undefined, fallback: number): number {
    if (input === undefined) return fallback;

    const trimmed = input.trim();
    const asNumber = Number(trimmed);
    if (Number.isInteger(asNumber) && asNumber >= 1 && asNumber <= 12) {
        return asNumber;
    }

    const needle = trimmed.toLowerCase();
    for (let month = 1; month <= 12; month++) {
        const sample = Temporal.PlainDate.from({ year: 2000, month, day: 1 });
        const names = [
            sample.toLocaleString(locale, { month: 'long' }),
            sample.toLocaleString(locale, { month: 'short' }),
        ].map((name) => name.toLowerCase());

        if (names.includes(needle)) return month;
    }

    fail(`Invalid month: "${input}". Use 1-12, a short name (aug), or a long name (august).`);
}

const year = parseYear(yearInput, today.year);
const month = parseMonth(monthInput, today.month);

let yearMonth: Temporal.PlainYearMonth;
try {
    yearMonth = Temporal.PlainYearMonth.from({ year, month }, { overflow: 'reject' });
} catch {
    fail(`Invalid date: year=${year}, month=${month}.`);
}

const monthFolder = yearMonth
    .toPlainDate({ day: 1 })
    .toLocaleString(locale, { month: 'long' })
    .toLowerCase();

const dirPath = join(import.meta.dirname, '..', String(yearMonth.year), monthFolder);

mkdirSync(dirPath, { recursive: true });
const filePath = join(dirPath, `${fileName}.ts`);
writeFileSync(filePath, `function ${functionName}() {\n    // Your code here\n}\n`);
