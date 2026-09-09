import { freeCodeCampYearInvention } from "src/constants/freeCodeCampYearInvention";

export function parseYear(
  input: string | undefined,
  fallback: number,
): number {
    if (input === undefined) return fallback;

    const year = Number(input);
    if (!Number.isInteger(year)) throw new Error(`Invalid year: "${input}". Use a whole number like 2026.`);

    if (year < freeCodeCampYearInvention) throw new Error(`${input}???\nSeriously?\nWell, that's a lie.`);

    return year;
}