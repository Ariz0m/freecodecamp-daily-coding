import { parseYear } from "date/parseYear";
import { freeCodeCampYearInvention } from "constants/freeCodeCampYearInvention";
import type { Year } from "types/Year";

describe(parseYear, () => {
    const fallback = 2026;
    const { year: currentYear } = Temporal.Now.plainDateISO();
    const invalidYear = 'abc' as Year;
    const inventionTwoDigitYear = freeCodeCampYearInvention - 2000;
    const preInventionFourDigitYear = freeCodeCampYearInvention - 4;

    describe('Scenarios with undefined input', () => {
        it('When input is undefined return fallback', () => {
            expect(parseYear(undefined, fallback)).toBe(fallback);
        });
    });

    describe('Scenarios with valid year input', () => {
        it('When pass a four digit year return the year', () => {
            expect(parseYear(2026, fallback)).toBe(2026);
        });

        it('When pass a two digit year return the expanded year', () => {
            expect(parseYear(26, fallback)).toBe(2026);
        });

        it('When pass the invention year as two digits return 2014', () => {
            expect(parseYear(inventionTwoDigitYear, fallback)).toBe(freeCodeCampYearInvention);
        });

        it('When pass a year string return the parsed year', () => {
            expect(parseYear('2026', fallback)).toBe(2026);
        });
    });

    describe('Scenarios with invalid year input', () => {
        it('When pass a non integer year throw an error', () => {
            expect(() => parseYear(invalidYear, fallback)).toThrow(
                'Invalid year: "abc". Use a whole number like 2026 or 26.'
            );
        });

        it('When pass a future year throw an error', () => {
            expect(() => parseYear(currentYear + 1, fallback)).toThrow(
                `${currentYear + 1}???\nSeriously?\nWell, that's a lie.`
            );
        });

        it('When pass a two digit year before freeCodeCamp invention throw an error', () => {
            expect(() => parseYear(inventionTwoDigitYear - 1, fallback)).toThrow(
                `${inventionTwoDigitYear - 1}???\nSeriously?\nWell, that's a lie.`
            );
        });

        it('When pass a four digit year before freeCodeCamp invention throw an error', () => {
            expect(() => parseYear(preInventionFourDigitYear, fallback)).toThrow(
                `${preInventionFourDigitYear}???\nSeriously?\nWell, that's a lie.`
            );
        });
    });
});
