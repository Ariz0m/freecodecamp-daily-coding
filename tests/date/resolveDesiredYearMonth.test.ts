import { resolveDesiredYearMonth } from "date/resolveDesiredYearMonth";
import { MonthCapitalizeLongText } from "constants/months";
import type { DesiredMonthContext } from "types/DesiredMonthContext";
import type {
    YearMonthHyphenSeparated,
    YearMonthSlashSeparated,
    YearMonthSpaceSeparated,
} from "types/YearMonth";

describe(resolveDesiredYearMonth, () => {
    const referenceDate = Temporal.PlainDate.from('2026-09-10');
    const fixedYear = referenceDate.year;
    const fixedMonth = referenceDate.month;
    const plainDate = referenceDate;
    const jsDate = new Date(fixedYear, fixedMonth - 1, 10);

    const monthYearSpace: YearMonthSpaceSeparated = `${MonthCapitalizeLongText.September} 2026`;
    const monthYearSlash: YearMonthSlashSeparated = '09/2026';
    const monthYearHyphen: YearMonthHyphenSeparated = '09-2026';
    const monthOnly = MonthCapitalizeLongText.September as unknown as DesiredMonthContext;

    describe('Scenarios with Date input', () => {
        it('When pass a Date return the equivalent PlainYearMonth', () => {
            const actual = resolveDesiredYearMonth(jsDate, referenceDate);

            expect(actual).toEqual(Temporal.PlainYearMonth.from({ year: fixedYear, month: fixedMonth }));
        });
    });

    describe('Scenarios with Temporal.PlainDate input', () => {
        it('When pass a PlainDate return the equivalent PlainYearMonth', () => {
            const actual = resolveDesiredYearMonth(plainDate, referenceDate);

            expect(actual).toEqual(plainDate.toPlainYearMonth());
        });
    });

    describe('Scenarios with string input', () => {
        it('When pass month and year separated by space return the PlainYearMonth', () => {
            const actual = resolveDesiredYearMonth(monthYearSpace, referenceDate);

            expect(actual).toEqual(Temporal.PlainYearMonth.from({ year: 2026, month: 9 }));
        });

        it('When pass month and year separated by slash return the PlainYearMonth', () => {
            const actual = resolveDesiredYearMonth(monthYearSlash, referenceDate);

            expect(actual).toEqual(Temporal.PlainYearMonth.from({ year: 2026, month: 9 }));
        });

        it('When pass month and year separated by hyphen return the PlainYearMonth', () => {
            const actual = resolveDesiredYearMonth(monthYearHyphen, referenceDate);

            expect(actual).toEqual(Temporal.PlainYearMonth.from({ year: 2026, month: 9 }));
        });

        it('When pass only a month name use reference year', () => {
            const actual = resolveDesiredYearMonth(monthOnly, referenceDate);

            expect(actual).toEqual(Temporal.PlainYearMonth.from({ year: fixedYear, month: 9 }));
        });
    });

    describe('Scenarios with object input', () => {
        it('When pass numeric month and year return the PlainYearMonth', () => {
            const actual = resolveDesiredYearMonth({ month: 9, year: 2026 }, referenceDate);

            expect(actual).toEqual(Temporal.PlainYearMonth.from({ year: 2026, month: 9 }));
        });

        it('When pass month text and two digit year return the PlainYearMonth', () => {
            const actual = resolveDesiredYearMonth({
                month: MonthCapitalizeLongText.September,
                year: '26',
            }, referenceDate);

            expect(actual).toEqual(Temporal.PlainYearMonth.from({ year: 2026, month: 9 }));
        });

        it('When pass only month use reference year', () => {
            const actual = resolveDesiredYearMonth({ month: 9 }, referenceDate);

            expect(actual).toEqual(Temporal.PlainYearMonth.from({ year: fixedYear, month: 9 }));
        });
    });
});
