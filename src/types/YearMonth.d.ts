import type { Month } from "types/Month";
import type { YearByLength, YearLength } from "types/Year";
import type { DelimiterNoSpace } from "types/DelimiterNoSpace";
import type { Delimiter } from "src/types/Delimiter.d";

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
