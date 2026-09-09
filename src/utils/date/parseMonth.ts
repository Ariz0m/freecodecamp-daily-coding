import { DEFAULT_LOCALE } from "constants/defaultLocale";

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
