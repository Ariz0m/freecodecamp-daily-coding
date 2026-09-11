import { parseMonth } from "date/parseMonth";
import {
    MonthCapitalizeLongText,
    MonthCapitalizeShortText,
    MonthLowercaseLongText,
} from "constants/months";
import type { Month } from "types/Month";

describe(parseMonth, () => {
    const fallback = 4;
    const invalidMonth = 'NotAMonth' as Month;

    describe('Scenarios with undefined input', () => {
        it('When input is undefined return fallback', () => {
            expect(parseMonth(undefined, fallback)).toBe(fallback);
        });
    });

    describe('Scenarios with numeric input', () => {
        it('When pass a valid month number return the month', () => {
            expect(parseMonth(9, fallback)).toBe(9);
        });

        it('When pass a valid month number string return the month', () => {
            expect(parseMonth('09', fallback)).toBe(9);
        });

        it('When pass an out of range month string throw an error', () => {
            expect(() => parseMonth('13', fallback)).toThrow(
                'Invalid month: "13". Use 1-12, a short name (aug), or a long name (august).'
            );
        });
    });

    describe('Scenarios with month text input', () => {
        it('When pass a long month name return the month', () => {
            expect(parseMonth(MonthCapitalizeLongText.September, fallback)).toBe(9);
        });

        it('When pass a lowercase long month name return the month', () => {
            expect(parseMonth(MonthLowercaseLongText.september, fallback)).toBe(9);
        });

        it('When pass a short month name return the month', () => {
            expect(parseMonth(MonthCapitalizeShortText.Sep, fallback)).toBe(9);
        });

        it('When pass a trimmed month name return the month', () => {
            const trimmedMonth = `  ${MonthCapitalizeLongText.September}  ` as Month;
            expect(parseMonth(trimmedMonth, fallback)).toBe(9);
        });

        it('When pass an invalid month name throw an error', () => {
            expect(() => parseMonth(invalidMonth, fallback)).toThrow(
                'Invalid month: "NotAMonth". Use 1-12, a short name (aug), or a long name (august).'
            );
        });
    });
});
