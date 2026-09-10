export type NumberOrTextNumber = number | `${number}`;
export type NumberOrTextNumberWithLeadingZero = NumberOrTextNumber | `0${NumberOrTextNumber}`;