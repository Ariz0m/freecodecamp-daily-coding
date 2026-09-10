import { parseCalendarDayString } from "date/parseCalendarDayString";
import { type Month } from "types/Month";
import type { YearMonth } from "src/types/YearMonth";

export type CalendarDayInput = string | Date | Temporal.PlainDate;

export type CalendarDayContext = {
  yearMonth?: Temporal.PlainYearMonth;
  year?: number;
  locale?: string;
};

export type DesiredMonthContext =
  | {
      month: Month;
      year?: string | number;
    }
  | YearMonth
  | Date
  | Temporal.PlainDate;

export function toPlainDate(
  input: CalendarDayInput,
  context: CalendarDayContext = {},
): Temporal.PlainDate {
  
  if (input instanceof Date) {
    return Temporal.PlainDate.from({
      year: input.getFullYear(),
      month: input.getMonth() + 1,
      day: input.getDate(),
    });
  }

  if (typeof input !== "string") {
    return input;
  }

  return parseCalendarDayString(input, context);
}

