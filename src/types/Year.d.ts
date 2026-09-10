type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ValidTwoDigits = 1 | 2;

export type TwoDigitYearString = `${ValidTwoDigits}${Digit}`;
export type FourDigitYearString = `${2}${0}${ValidTwoDigits}${Digit}`;

export type TwoDigitYear = number | TwoDigitYearString;
export type FourDigitYear = number | FourDigitYearString;

export type Year = TwoDigitYear | FourDigitYear;

export type YearLength = 2 | 4;
export type YearByLength<L extends YearLength> = L extends 2 ? TwoDigitYear : FourDigitYear;
