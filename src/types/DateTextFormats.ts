import type { FourDigitYear } from "types/Year";
import type { NumberWithLeadingZero } from "types/NumberFormats";
import type { DelimiterNoSpace } from "types/DelimiterNoSpace";

export type Day = NumberWithLeadingZero;

type YearMonthDayWithDelimiter<D extends DelimiterNoSpace> =
  `${FourDigitYear}${D}${NumberWithLeadingZero}${D}${Day}`;

export type YearMonthDayHyphenSeparated = YearMonthDayWithDelimiter<"-">;
export type YearMonthDaySlashSeparated = YearMonthDayWithDelimiter<"/">;

export type YearMonthDay =
  | YearMonthDayHyphenSeparated
  | YearMonthDaySlashSeparated;
