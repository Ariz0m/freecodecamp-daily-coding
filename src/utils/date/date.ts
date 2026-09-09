export const DEFAULT_LOCALE = "en";

export function requireTemporal(): void {
  if (!("Temporal" in globalThis)) {
    throw new Error(
      `Temporal requires Node.js 26+. Current version: ${process.version}.`,
    );
  }
}

export function parseYear(
  input: string | undefined,
  fallback: number,
): number {
  if (input === undefined) return fallback;

  const year = Number(input);
  if (!Number.isInteger(year)) {
    throw new Error(`Invalid year: "${input}". Use a whole number like 2026.`);
  }

  return year;
}

export function parseMonth(
  input: string | undefined,
  fallback: number,
  locale: string = DEFAULT_LOCALE,
): number {
  if (input === undefined) return fallback;

  const trimmed = input.trim();
  const asNumber = Number(trimmed);
  if (Number.isInteger(asNumber) && asNumber >= 1 && asNumber <= 12) {
    return asNumber;
  }

  const needle = trimmed.toLowerCase();
  for (let month = 1; month <= 12; month++) {
    const sample = Temporal.PlainDate.from({ year: 2000, month, day: 1 });
    const names = [
      sample.toLocaleString(locale, { month: "long" }),
      sample.toLocaleString(locale, { month: "short" }),
    ].map((name) => name.toLowerCase());

    if (names.includes(needle)) return month;
  }

  throw new Error(
    `Invalid month: "${input}". Use 1-12, a short name (aug), or a long name (august).`,
  );
}

export function formatMonthFolder(
  yearMonth: Temporal.PlainYearMonth,
  locale: string = DEFAULT_LOCALE,
): string {
  return yearMonth
    .toPlainDate({ day: 1 })
    .toLocaleString(locale, { month: "long" })
    .toLowerCase();
}

export type ResolveYearMonthOptions = {
  yearInput?: string;
  monthInput?: string;
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
  requireTemporal();

  const locale = options.locale ?? DEFAULT_LOCALE;
  const today = options.referenceDate ?? Temporal.Now.plainDateISO();
  const year = parseYear(options.yearInput, today.year);
  const month = parseMonth(options.monthInput, today.month, locale);

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
