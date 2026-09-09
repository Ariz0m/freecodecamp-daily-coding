import {
  DEFAULT_LOCALE,
  parseMonth,
  parseYear,
  requireTemporal,
} from "src/utils/date/date";

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

export const CHALLENGE_DAY_HREF_PREFIX = "/learn/daily-coding-challenge/";

export function toPlainDate(
  input: CalendarDayInput,
  context: CalendarDayContext = {},
): Temporal.PlainDate {
  requireTemporal();

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

export function formatChallengeHrefSlug(date: Temporal.PlainDate): string {
  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");
  return `${month}-${day}`;
}

export function formatChallengeDayHref(date: Temporal.PlainDate): string {
  return `${CHALLENGE_DAY_HREF_PREFIX}${formatChallengeHrefSlug(date)}`;
}

export function formatChallengeAriaLabel(
  date: Temporal.PlainDate,
  locale: string = DEFAULT_LOCALE,
): string {
  return date.toLocaleString(locale, { month: "long", day: "numeric" });
}

export function getChallengeDayHrefSelector(date: Temporal.PlainDate): string {
  return `a[data-playwright-test-label="calendar-day"][href="${formatChallengeDayHref(date)}"]`;
}

export function getChallengeDayAriaLabelSelector(
  date: Temporal.PlainDate,
  locale: string = DEFAULT_LOCALE,
): string {
  return `a[data-playwright-test-label="calendar-day"][aria-label="${formatChallengeAriaLabel(date, locale)}"]`;
}

export function parseDisplayedMonthLabel(
  monthLabel: string,
  year: number,
  locale: string = DEFAULT_LOCALE,
): Temporal.PlainYearMonth {
  requireTemporal();

  return Temporal.PlainYearMonth.from({
    year,
    month: parseMonth(monthLabel.trim(), 1, locale),
  });
}

export function resolveDesiredYearMonth(
  desiredDay: DesiredMonthContext,
  referenceDate: Temporal.PlainDate = Temporal.Now.plainDateISO(),
  locale: string = DEFAULT_LOCALE,
): Temporal.PlainYearMonth {
  requireTemporal();

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

function parseCalendarDayString(
  input: string,
  context: CalendarDayContext,
): Temporal.PlainDate {
  const locale = context.locale ?? DEFAULT_LOCALE;
  const trimmed = input.trim();
  const year =
    context.year ??
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
    const month =
      context.yearMonth?.month ?? Temporal.Now.plainDateISO().month;
    return Temporal.PlainDate.from({ year, month, day: Number(trimmed) });
  }

  const ariaLabelMatch = /^([A-Za-z]+)\s+(\d{1,2})$/.exec(trimmed);
  if (ariaLabelMatch) {
    const monthName = ariaLabelMatch[1];
    const dayPart = ariaLabelMatch[2];
    if (monthName === undefined || dayPart === undefined) {
      throw new Error(`Unrecognized calendar day: "${input}".`);
    }
    const month = parseMonth(monthName, 1, locale);
    const day = Number(dayPart);
    return Temporal.PlainDate.from({ year, month, day });
  }

  throw new Error(
    `Unrecognized calendar day: "${input}". Use ISO (2026-08-07), MM-DD (08-07), a day number (7), or a label (August 7).`,
  );
}
