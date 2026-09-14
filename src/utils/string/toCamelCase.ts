/**
 * Takes a string and converts it to camelCase.
 * (_ ' ' -) are removed and the first letter of each word is capitalized except for the first word.
 * @param str Text to camelCase
 */
export function toCamelCase(str: string): string {
    const lowerCaseStr = str.toLowerCase();
    const separatorRegex = /[\s_-]+/;
    let result: string = '';
    let capitalizeNext: boolean = false;
    for (const char of lowerCaseStr) {
        if (separatorRegex.test(char)) {
            capitalizeNext = true;
            continue;
        }
        if (capitalizeNext) {
            result += char.toUpperCase();
            capitalizeNext = false;
            continue;
        }
        result += char;
    }
    return result;
}