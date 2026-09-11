import { parseCalendarDayString } from "date/parseCalendarDayString";

describe(parseCalendarDayString, () => {
    const tenSep2026Hyphen = '2026-09-10';
    const firstHyphenIndex = tenSep2026Hyphen.indexOf('-');

    const monthDayHyphen = tenSep2026Hyphen.slice(firstHyphenIndex + 1);
    const secondHyphenIndex = tenSep2026Hyphen.indexOf('-', firstHyphenIndex);

    const twoDigitDayString = tenSep2026Hyphen.slice(secondHyphenIndex + 1);
    const oneDigitDayString = '3';
    const oneDigitDayStringNumber = Number(oneDigitDayString);

    const tenSep2026Slash = tenSep2026Hyphen.replaceAll('-', '/');
    const monthDaySlash = tenSep2026Slash.slice(firstHyphenIndex + 1);

    const [fixedYear, fixedMonth, fixedDay] = tenSep2026Hyphen.split('-').map(Number);
    const { year: currentYear, month: currentMonth, day: currentDay } = Temporal.Now.plainDateISO();

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

    });
});