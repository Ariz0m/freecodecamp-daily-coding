import { freeCodeCampYearInvention } from "src/constants/freeCodeCampYearInvention";
import type { Year } from "src/types/Year";

export function parseYear(
  input: Year | undefined,
  fallback: number,
): number {
    if (input === undefined) return fallback;

    let year = Number(input);
    if (!Number.isInteger(year)) throw new Error(`Invalid year: "${input}". Use a whole number like 2026 or 26.`);

    const throwInputError = () => { throw new Error(`${input}???\nSeriously?\nWell, that's a lie.`) };

    const newMillenia = 2000;
    const newMilleniaFreeCodeCampYeanInvention = freeCodeCampYearInvention - newMillenia;

    if (year > Temporal.Now.plainDateISO().year) throwInputError();

    if (year < newMillenia) {
        if (year < newMilleniaFreeCodeCampYeanInvention) throwInputError();
        year += newMillenia;
    }

    if (year < freeCodeCampYearInvention) throwInputError();

    return year;
}