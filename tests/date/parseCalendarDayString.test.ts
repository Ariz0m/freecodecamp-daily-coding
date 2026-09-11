import { parseCalendarDayString } from "date/parseCalendarDayString";
import { MonthCapitalizeLongText, MonthCapitalizeShortText } from "constants/months";

describe(parseCalendarDayString, () => {
    const tenSep2026Hyphen = '2026-09-10';
    const firstHyphenIndex = tenSep2026Hyphen.indexOf('-');

    const monthDayHyphen = tenSep2026Hyphen.slice(firstHyphenIndex + 1);
    const secondHyphenIndex = tenSep2026Hyphen.indexOf('-', firstHyphenIndex + 1);

    const twoDigitDayString = tenSep2026Hyphen.slice(secondHyphenIndex + 1);
    const oneDigitDayString = '3';
    const oneDigitDayStringNumber = Number(oneDigitDayString);

    const tenSep2026Slash = tenSep2026Hyphen.replaceAll('-', '/');
    const monthDaySlash = tenSep2026Slash.slice(firstHyphenIndex + 1);

    const [fixedYear, fixedMonth, fixedDay] = tenSep2026Hyphen.split('-').map(Number) as [number, number, number];
    const { year: currentYear, month: currentMonth } = Temporal.Now.plainDateISO();

    const monthLongString = MonthCapitalizeLongText.September;
    const monthShortString = MonthCapitalizeShortText.Sep;

    const monthLongLabelTwoDigitDay = `${monthLongString} ${twoDigitDayString}`;
    const monthShortLabelTwoDigitDay = `${monthShortString} ${twoDigitDayString}`;
    const monthLongLabelOneDigitDay = `${monthLongString} ${oneDigitDayString}`;

    const contextYearMonth = Temporal.PlainYearMonth.from({ year: fixedYear, month: fixedMonth });

    describe('Scenarios with no context', () => {
        describe('Scenarios with hyphen as delimiter', () => {
            it('When pass an ISO like date string return the date.', async () => {
                const actual = parseCalendarDayString(tenSep2026Hyphen, {});
                const { year: actualYear, month: actualMonth, day: actualDay } = actual;

                expect(actual).toBeInstanceOf(Temporal.PlainDate);
                expect(actualYear).toBe(fixedYear);
                expect(actualMonth).toBe(fixedMonth);
                expect(actualDay).toBe(fixedDay);
            });

            it('When pass a fixedMonth fixedDay string like return the date with current fixedYear.', async () => {
                const actual = parseCalendarDayString(monthDayHyphen, {});
                const { year: actualYear, month: actualMonth, day: actualDay } = actual;

                expect(actual).toBeInstanceOf(Temporal.PlainDate);
                expect(actualYear).toBe(currentYear);
                expect(actualMonth).toBe(fixedMonth);
                expect(actualDay).toBe(fixedDay);
            });
        });

        describe('Scenarios with slash as delimiter', () => {
            it('When pass an ISO like date string return the date.', async () => {
                const actual = parseCalendarDayString(tenSep2026Slash, {});
                const { year: actualYear, month: actualMonth, day: actualDay } = actual;

                expect(actual).toBeInstanceOf(Temporal.PlainDate);
                expect(actualYear).toBe(fixedYear);
                expect(actualMonth).toBe(fixedMonth);
                expect(actualDay).toBe(fixedDay);
            });

            it('When pass a fixedMonth fixedDay string return the date with current fixedYear.', async () => {
                const actual = parseCalendarDayString(monthDaySlash, {});
                const { year: actualYear, month: actualMonth, day: actualDay } = actual;

                expect(actual).toBeInstanceOf(Temporal.PlainDate);
                expect(actualYear).toBe(currentYear);
                expect(actualMonth).toBe(fixedMonth);
                expect(actualDay).toBe(fixedDay);
            });
        });

        describe('Scenarios with month name labels', () => {
            it('When pass a month long string returns date with current year', async () => {
                const actual = parseCalendarDayString(monthLongLabelTwoDigitDay, {});
                const { year: actualYear, month: actualMonth, day: actualDay } = actual;

                expect(actual).toBeInstanceOf(Temporal.PlainDate);
                expect(actualYear).toBe(currentYear);
                expect(actualMonth).toBe(fixedMonth);
                expect(actualDay).toBe(fixedDay);
            });

            it('When pass a month short string returns date with current year', async () => {
                const actual = parseCalendarDayString(monthShortLabelTwoDigitDay, {});
                const { year: actualYear, month: actualMonth, day: actualDay } = actual;

                expect(actual).toBeInstanceOf(Temporal.PlainDate);
                expect(actualYear).toBe(currentYear);
                expect(actualMonth).toBe(fixedMonth);
                expect(actualDay).toBe(fixedDay);
            });

            it('When pass a month long string with one digit day returns date with current year', async () => {
                const actual = parseCalendarDayString(monthLongLabelOneDigitDay, {});
                const { year: actualYear, month: actualMonth, day: actualDay } = actual;

                expect(actual).toBeInstanceOf(Temporal.PlainDate);
                expect(actualYear).toBe(currentYear);
                expect(actualMonth).toBe(fixedMonth);
                expect(actualDay).toBe(oneDigitDayStringNumber);
            });
        });

        it('When pass a fixedDay with two digit returns date with current fixedMonth and fixedYear', async () => {
            const actual = parseCalendarDayString(twoDigitDayString, {});
            const { year: actualYear, month: actualMonth, day: actualDay } = actual;

            expect(actual).toBeInstanceOf(Temporal.PlainDate);
            expect(actualYear).toBe(currentYear);
            expect(actualMonth).toBe(currentMonth);
            expect(actualDay).toBe(fixedDay);
        });

        it('When pass a fixedDay with one digit returns date with current fixedMonth and fixedYear', async () => {
            const actual = parseCalendarDayString(oneDigitDayString, {});
            const { year: actualYear, month: actualMonth, day: actualDay } = actual;

            expect(actual).toBeInstanceOf(Temporal.PlainDate);
            expect(actualYear).toBe(currentYear);
            expect(actualMonth).toBe(currentMonth);
            expect(actualDay).toBe(oneDigitDayStringNumber);
        });
    });

    describe('Scenarios with context', () => {
        it('When pass MM-DD with year context return the date with context year', async () => {
            const actual = parseCalendarDayString(monthDayHyphen, { year: fixedYear });
            const { year: actualYear, month: actualMonth, day: actualDay } = actual;

            expect(actual).toBeInstanceOf(Temporal.PlainDate);
            expect(actualYear).toBe(fixedYear);
            expect(actualMonth).toBe(fixedMonth);
            expect(actualDay).toBe(fixedDay);
        });

        it('When pass a day number with yearMonth context return the date with context year and month', async () => {
            const actual = parseCalendarDayString(oneDigitDayString, { yearMonth: contextYearMonth });
            const { year: actualYear, month: actualMonth, day: actualDay } = actual;

            expect(actual).toBeInstanceOf(Temporal.PlainDate);
            expect(actualYear).toBe(fixedYear);
            expect(actualMonth).toBe(fixedMonth);
            expect(actualDay).toBe(oneDigitDayStringNumber);
        });

        it('When pass a month label with year context return the date with context year', async () => {
            const actual = parseCalendarDayString(monthLongLabelTwoDigitDay, { year: fixedYear });
            const { year: actualYear, month: actualMonth, day: actualDay } = actual;

            expect(actual).toBeInstanceOf(Temporal.PlainDate);
            expect(actualYear).toBe(fixedYear);
            expect(actualMonth).toBe(fixedMonth);
            expect(actualDay).toBe(fixedDay);
        });

        it('When pass an ISO date string ignore year context', async () => {
            const actual = parseCalendarDayString(tenSep2026Hyphen, { year: currentYear + 1 });
            const { year: actualYear, month: actualMonth, day: actualDay } = actual;

            expect(actual).toBeInstanceOf(Temporal.PlainDate);
            expect(actualYear).toBe(fixedYear);
            expect(actualMonth).toBe(fixedMonth);
            expect(actualDay).toBe(fixedDay);
        });

        it('When year and yearMonth are both provided prefer year from year context', async () => {
            const actual = parseCalendarDayString(monthDayHyphen, {
                year: currentYear,
                yearMonth: contextYearMonth,
            });
            const { year: actualYear, month: actualMonth, day: actualDay } = actual;

            expect(actual).toBeInstanceOf(Temporal.PlainDate);
            expect(actualYear).toBe(currentYear);
            expect(actualMonth).toBe(fixedMonth);
            expect(actualDay).toBe(fixedDay);
        });
    });

    describe('Scenarios with invalid input', () => {
        it('When pass an unrecognized string throw an error', () => {
            expect(() => parseCalendarDayString('not-a-date', {})).toThrow(
                'Unrecognized calendar day: "not-a-date". Use ISO (2026-08-07), MM-DD (08-07), a day number (7), or a label (August 7).'
            );
        });
    });
});
