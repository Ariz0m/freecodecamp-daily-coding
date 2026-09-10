import type {
  FourDigitYear,
  NumberOrTextNumber,
  TwoDigitYear,
} from "src/types/NumberFormats";

export type Year = FourDigitYear | TwoDigitYear;
export type Day = NumberOrTextNumber;
