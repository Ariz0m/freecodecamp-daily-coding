import { DEFAULT_LOCALE } from "constants/defaultLocale";

export function formatMonthFolder(
  yearMonth: Temporal.PlainYearMonth,
  locale: string = DEFAULT_LOCALE,
): string {
  return yearMonth
    .toPlainDate({ day: 1 })
    .toLocaleString(locale, { month: "long" })
    .toLowerCase();
}