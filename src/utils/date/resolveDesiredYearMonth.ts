import type { DesiredMonthContext } from "types/DesiredMonthContext";
import { parseMonth } from "date/parseMonth";
import { parseYear } from "date/parseYear";
import type { Month } from "types/Month";
import type { Year } from "types/Year";

export function resolveDesiredYearMonth(
  desiredDay: DesiredMonthContext,
  referenceDate: Temporal.PlainDate = Temporal.Now.plainDateISO()
): Temporal.PlainYearMonth {

  if (desiredDay instanceof Date) {
    return Temporal.PlainYearMonth.from({
      year: desiredDay.getFullYear(),
      month: desiredDay.getMonth() + 1,
    });
  }

  if (typeof desiredDay === "object" &&
    "day" in desiredDay &&
    "month" in desiredDay &&
    "year" in desiredDay) {
    return desiredDay.toPlainYearMonth();
  }

  if (typeof desiredDay === "string") {
    const trimmed = desiredDay.trim();
    const monthYearMatch = /^([A-Za-z]+|\d{1,2})(?:\s+|[/-])(\d{4})$/.exec(trimmed);
    if (monthYearMatch) {
      const monthPart = monthYearMatch[1];
      const yearPart = monthYearMatch[2];
      if (monthPart === undefined || yearPart === undefined) {
        throw new Error(`Invalid month context: "${desiredDay}".`);
      }

      return Temporal.PlainYearMonth.from({
        year: parseYear(yearPart as Year, referenceDate.year),
        month: parseMonth(monthPart as Month, referenceDate.month),
      });
    }

    return Temporal.PlainYearMonth.from({
      year: referenceDate.year,
      month: parseMonth(trimmed as Month, referenceDate.month),
    });
  }

  const month: number = typeof desiredDay.month === "number"
    ? desiredDay.month
    : parseMonth(desiredDay.month, referenceDate.month);
  const year = desiredDay.year === undefined
    ? referenceDate.year
    : typeof desiredDay.year === "number"
      ? desiredDay.year
      : parseYear(desiredDay.year as Year, referenceDate.year);

  return Temporal.PlainYearMonth.from({ year, month });
}