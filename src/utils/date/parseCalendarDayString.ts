import type { CalendarDayContext } from "date/calendar";
import { parseMonth } from "date/parseMonth";
import type { MonthText } from "src/types/MonthText";

export function parseCalendarDayString(
  input: string,
  context: CalendarDayContext): Temporal.PlainDate {
  const trimmed = input.trim();
  const year = context.year ??
    context.yearMonth?.year ??
    Temporal.Now.plainDateISO().year;

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return Temporal.PlainDate.from(trimmed);
  }

  if (/^\d{2}-\d{2}$/.test(trimmed)) {
    const [monthPart, dayPart] = trimmed.split("-");
    return Temporal.PlainDate.from({
      year,
      month: Number(monthPart),
      day: Number(dayPart),
    });
  }

  if (/^\d{1,2}$/.test(trimmed)) {
    const month = context.yearMonth?.month ?? Temporal.Now.plainDateISO().month;
    return Temporal.PlainDate.from({ year, month, day: Number(trimmed) });
  }

  const ariaLabelMatch = /^([A-Za-z]+)\s+(\d{1,2})$/.exec(trimmed);
  if (ariaLabelMatch) {
    const monthName = ariaLabelMatch[1];
    const dayPart = ariaLabelMatch[2];
    if (monthName === undefined || dayPart === undefined) {
      throw new Error(`Unrecognized calendar day: "${input}".`);
    }
    const month = parseMonth(monthName as MonthText, 1);
    const day = Number(dayPart);
    return Temporal.PlainDate.from({ year, month, day });
  }

  throw new Error(
    `Unrecognized calendar day: "${input}". Use ISO (2026-08-07), MM-DD (08-07), a day number (7), or a label (August 7).`
  );
}
