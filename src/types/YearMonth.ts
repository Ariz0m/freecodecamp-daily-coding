import type { Month } from "src/types/Month";
import type { YearByLength, YearLength } from "src/types/NumberFormats";

type DelimiterNoSpace = "/" | "-";
type Delimiter = " " | DelimiterNoSpace;

type YearMonthWithDelimiter<D extends Delimiter, L extends YearLength = 4> =
  `${Month}${D}${YearByLength<L>}`;

export type YearMonthSpaceSeparated<L extends YearLength = 4> =
  YearMonthWithDelimiter<" ", L>;
export type YearMonthSlashSeparated<L extends YearLength = 4> =
  YearMonthWithDelimiter<"/", L>;
export type YearMonthHyphenSeparated<L extends YearLength = 4> =
  YearMonthWithDelimiter<"-", L>;

type YearMonthNoSpaceWithDelimiter<
  D extends DelimiterNoSpace,
  L extends YearLength = 4,
> = YearMonthWithDelimiter<D, L>;

export type YearMonthNoSpaceSeparated<L extends YearLength = 4> =
  | YearMonthNoSpaceWithDelimiter<"/", L>
  | YearMonthNoSpaceWithDelimiter<"-", L>;

type YearMonthByLength<L extends YearLength> =
  | YearMonthSpaceSeparated<L>
  | YearMonthSlashSeparated<L>
  | YearMonthHyphenSeparated<L>
  | YearMonthNoSpaceSeparated<L>;

export type YearMonthTwoDigit = YearMonthByLength<2>;
export type YearMonthFourDigit = YearMonthByLength<4>;

export type YearMonth = YearMonthTwoDigit | YearMonthFourDigit;
