import { toPlainDate } from "date/toPlainDate";

describe(toPlainDate, () => {
    const isoDateString = '2026-09-10';
    const [fixedYear, fixedMonth, fixedDay] = isoDateString.split('-').map(Number) as [number, number, number];
    const plainDate = Temporal.PlainDate.from(isoDateString);
    const jsDate = new Date(fixedYear, fixedMonth - 1, fixedDay);

    describe('Scenarios with Temporal.PlainDate input', () => {
        it('When pass a PlainDate return the same date', () => {
            const actual = toPlainDate(plainDate);

            expect(actual).toBe(plainDate);
        });
    });

    describe('Scenarios with Date input', () => {
        it('When pass a Date return the equivalent PlainDate', () => {
            const actual = toPlainDate(jsDate);
            const { year, month, day } = actual;

            expect(actual).toBeInstanceOf(Temporal.PlainDate);
            expect(year).toBe(fixedYear);
            expect(month).toBe(fixedMonth);
            expect(day).toBe(fixedDay);
        });
    });

    describe('Scenarios with string input', () => {
        it('When pass an ISO date string return the parsed PlainDate', () => {
            const actual = toPlainDate(isoDateString);
            const { year, month, day } = actual;

            expect(actual).toBeInstanceOf(Temporal.PlainDate);
            expect(year).toBe(fixedYear);
            expect(month).toBe(fixedMonth);
            expect(day).toBe(fixedDay);
        });

        it('When pass a string with context apply the context', () => {
            const actual = toPlainDate('10', { year: fixedYear, yearMonth: plainDate.toPlainYearMonth() });
            const { year, month, day } = actual;

            expect(actual).toBeInstanceOf(Temporal.PlainDate);
            expect(year).toBe(fixedYear);
            expect(month).toBe(fixedMonth);
            expect(day).toBe(fixedDay);
        });
    });
});
