import { parseCalendarDayString } from "date/parseCalendarDayString";

describe(parseCalendarDayString.name, () => {

    it('When pass an ISO like date string return the date in Temporal with no context.', async () => {
        const tenSep2026 = '2026-09-10';
        const [year, month, day] = tenSep2026.split('-').map(Number);
        const actual = parseCalendarDayString(tenSep2026, {});

        expect(actual).toBeInstanceOf(Temporal.PlainDate);
        expect(actual.year).toBe(year);
        expect(actual.month).toBe(month);
        expect(actual.day).toBe(day);
    });
});