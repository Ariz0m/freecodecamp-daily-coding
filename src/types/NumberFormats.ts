export type NumberOrTextNumber = number | `${number}`;
export type NumberWithLeadingZero = NumberOrTextNumber | `0${NumberOrTextNumber}`;