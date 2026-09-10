import type { 
    MonthCapitalizeLongText, 
    MonthCapitalizeShortText, 
    MonthLowercaseLongText, 
    MonthLowercaseShortText, 
    MonthUppercaseLongText, 
    MonthUppercaseShortText
} from "constants/months";

export type MonthText = MonthLongText | MonthShortText;

export type MonthShortText = MonthCapitalizeShortText |
MonthLowercaseShortText |
MonthUppercaseShortText;

export type MonthLongText = MonthCapitalizeLongText |
MonthLowercaseLongText |
MonthUppercaseLongText;

export type MonthCapitilizeText = MonthCapitalizeLongText | MonthCapitalizeShortText;
export type MonthLowercaseText = MonthLowercaseLongText | MonthLowercaseShortText;
export type MonthUppercaseText = MonthUppercaseLongText | MonthUppercaseShortText;