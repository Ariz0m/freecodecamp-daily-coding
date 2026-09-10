import type { Month } from "src/types/Month";
import { MonthLowercaseLongText, MonthLowercaseShortText } from "constants/months";

/**
 * Parses Month to number in a 1 - 12 basis.
 * @param input 
 * @param fallback 
 * @returns 
 */
export function parseMonth(
  input: Month | undefined,
  fallback: number
): number {
  if (input === undefined) return fallback;

  const trimmed = typeof input === 'string' ? input.trim() : input;
  const asNumber = Number(trimmed);
  if (Number.isInteger(asNumber) && asNumber >= 1 && asNumber <= 12) {
    return asNumber;
  }

  const inputLowerCase = (trimmed as string).toLowerCase() as MonthLowercaseLongText | MonthLowercaseShortText;
  const monthsText = inputLowerCase.length > 3 ? MonthLowercaseLongText : MonthLowercaseShortText;
  const month = Object.keys(monthsText).indexOf(inputLowerCase);
  
  if (month === -1 ) throw new Error(`Invalid month: "${input}". Use 1-12, a short name (aug), or a long name (august).`);

  return month + 1

}
