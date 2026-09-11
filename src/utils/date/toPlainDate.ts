import { parseCalendarDayString } from "date/parseCalendarDayString";
import type { CalendarDayContext } from "src/types/CalendarDayContext";
import type { CalendarDayInput } from "src/types/CalendarDayInput";

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

