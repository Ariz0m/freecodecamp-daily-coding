import { DEFAULT_LOCALE } from "constants/defaultLocale";
import { parseMonth } from "date/parseMonth";
import { parseYear } from "date/parseYear";
import { parseCalendarDayString } from "date/parseCalendarDayString";

export type CalendarDayInput = string | Date | Temporal.PlainDate;

export type CalendarDayContext = {
  yearMonth?: Temporal.PlainYearMonth;
  year?: number;
  locale?: string;
};

export type DesiredMonthContext =
  | {
      month: string | number;
      year?: string | number;
    }
  | string
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

export function resolveDesiredYearMonth(
  desiredDay: DesiredMonthContext,
  referenceDate: Temporal.PlainDate = Temporal.Now.plainDateISO(),
  locale: string = DEFAULT_LOCALE,
): Temporal.PlainYearMonth {
  

  if (desiredDay instanceof Date) {
    return Temporal.PlainYearMonth.from({
      year: desiredDay.getFullYear(),
      month: desiredDay.getMonth() + 1,
    });
  }

  if (
    typeof desiredDay === "object" &&
    "day" in desiredDay &&
    "month" in desiredDay &&
    "year" in desiredDay
  ) {
    return desiredDay.toPlainYearMonth();
  }

  if (typeof desiredDay === "string") {
    const trimmed = desiredDay.trim();
    const monthYearMatch = /^([A-Za-z]+)\s+(\d{4})$/.exec(trimmed);
    if (monthYearMatch) {
      const monthName = monthYearMatch[1];
      const yearPart = monthYearMatch[2];
      if (monthName === undefined || yearPart === undefined) {
        throw new Error(`Invalid month context: "${desiredDay}".`);
      }

      return Temporal.PlainYearMonth.from({
        year: parseYear(yearPart, referenceDate.year),
        month: parseMonth(monthName, referenceDate.month, locale),
      });
    }

    return Temporal.PlainYearMonth.from({
      year: referenceDate.year,
      month: parseMonth(trimmed, referenceDate.month, locale),
    });
  }

  const month =
    typeof desiredDay.month === "number"
      ? desiredDay.month
      : parseMonth(desiredDay.month, referenceDate.month, locale);
  const year =
    desiredDay.year === undefined
      ? referenceDate.year
      : typeof desiredDay.year === "number"
        ? desiredDay.year
        : parseYear(desiredDay.year, referenceDate.year);

  return Temporal.PlainYearMonth.from({ year, month });
}


