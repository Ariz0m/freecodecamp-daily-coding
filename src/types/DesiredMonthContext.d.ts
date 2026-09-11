import type { YearMonth } from "types/YearMonth";
import type { Month } from "types/Month";


export type DesiredMonthContext = {
    month: Month;
    year?: string | number;
} |
    YearMonth |
    Date |
    Temporal.PlainDate;
