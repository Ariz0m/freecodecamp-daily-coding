type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TwoDigitYearString = `${Digit}${Digit}`;
export type FourDigitYearString = `${Digit}${Digit}${Digit}${Digit}`;

export type TwoDigitYear = number | TwoDigitYearString;
export type FourDigitYear = number | FourDigitYearString;

export type Year = TwoDigitYear | FourDigitYear;

export type YearLength = 2 | 4;
export type YearByLength<L extends YearLength> = L extends 2 ? TwoDigitYear : FourDigitYear;
