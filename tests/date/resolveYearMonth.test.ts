import { resolveYearMonth } from "date/resolveYearMonth";
import { MonthCapitalizeLongText, MonthLowercaseLongText } from "constants/months";
import type { Month } from "types/Month";

describe(resolveYearMonth, () => {
    const referenceDate = Temporal.PlainDate.from('2026-09-10');
    const referenceYear = referenceDate.year;
    const invalidMonth = 'NotAMonth' as Month;

    describe('Scenarios with no input', () => {
        it('When called with no options return reference year and month', () => {
            const actual = resolveYearMonth({ referenceDate });

            expect(actual.yearMonth).toEqual(referenceDate.toPlainYearMonth());
            expect(actual.monthFolder).toBe(MonthLowercaseLongText.september);
        });
    });

    describe('Scenarios with year and month input', () => {
        it('When pass year and month inputs return resolved yearMonth and folder', () => {
            const actual = resolveYearMonth({
                yearInput: 2026,
                monthInput: 8,
                referenceDate,
            });

            expect(actual.yearMonth).toEqual(Temporal.PlainYearMonth.from({ year: 2026, month: 8 }));
            expect(actual.monthFolder).toBe(MonthLowercaseLongText.august);
        });

        it('When pass month text input return resolved yearMonth and folder', () => {
            const actual = resolveYearMonth({
                yearInput: '26',
                monthInput: MonthCapitalizeLongText.September,
                referenceDate,
            });

            expect(actual.yearMonth).toEqual(Temporal.PlainYearMonth.from({ year: 2026, month: 9 }));
            expect(actual.monthFolder).toBe(MonthLowercaseLongText.september);
        });
    });

    describe('Scenarios with invalid input', () => {
        it('When pass an invalid month throw an error', () => {
            expect(() => resolveYearMonth({
                yearInput: referenceYear,
                monthInput: invalidMonth,
                referenceDate,
            })).toThrow('Invalid month: "NotAMonth". Use 1-12, a short name (aug), or a long name (august).');
        });
    });
});
