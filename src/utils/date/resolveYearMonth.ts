import { DEFAULT_LOCALE } from "constants/defaultLocale";
import { parseMonth } from "date/parseMonth";
import { parseYear } from "date/parseYear";
import type { Month } from "src/types/Month";
import type { Year } from "src/types/Year";
import { formatMonthFolder } from "utils/formatDirectory/formatMonthFolder";

export type ResolveYearMonthOptions = {
  yearInput?: Year;
  monthInput?: Month;
  referenceDate?: Temporal.PlainDate;
  locale?: string;
};

export type ResolvedYearMonth = {
  yearMonth: Temporal.PlainYearMonth;
  monthFolder: string;
};

export function resolveYearMonth(
  options: ResolveYearMonthOptions = {},
): ResolvedYearMonth {
  const locale = options.locale ?? DEFAULT_LOCALE;
  const today = options.referenceDate ?? Temporal.Now.plainDateISO();
  const year = parseYear(options.yearInput, today.year);
  const month = parseMonth(options.monthInput, today.month);

  let yearMonth: Temporal.PlainYearMonth;
  try {
    yearMonth = Temporal.PlainYearMonth.from(
      { year, month },
      { overflow: "reject" },
    );
  } catch {
    throw new Error(`Invalid date: year=${year}, month=${month}.`);
  }

  return {
    yearMonth,
    monthFolder: formatMonthFolder(yearMonth, locale),
  };
}
