import type { FourDigitYear } from "types/Year";
import type { NumberOrTextNumberWithLeadingZero } from "types/NumberFormats";
import type { DelimiterNoSpace } from "types/DelimiterNoSpace";

export type Day = NumberOrTextNumberWithLeadingZero;

type YearMonthDayWithDelimiter<D extends DelimiterNoSpace> =
  `${FourDigitYear}${D}${NumberOrTextNumberWithLeadingZero}${D}${Day}`;

export type YearMonthDayHyphenSeparated = YearMonthDayWithDelimiter<"-">;
export type YearMonthDaySlashSeparated = YearMonthDayWithDelimiter<"/">;

export type YearMonthDay =
  | YearMonthDayHyphenSeparated
  | YearMonthDaySlashSeparated;
