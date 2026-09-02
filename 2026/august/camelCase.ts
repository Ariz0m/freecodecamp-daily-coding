/**
 * Takes a string and converts it to camelCase.
 * (_ ' ' -) are removed and the first letter of each word is capitalized except for the first word.
 * @param str Text to camelCase
 */
function toCamelCase(str: string): string {
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


console.log(toCamelCase("hello world")) // "helloWorld"
console.log(toCamelCase("HELLO WORLD")) //should return "helloWorld".
console.log(toCamelCase("secret agent-X")) //should return "secretAgentX".
console.log(toCamelCase("FREE cODE cAMP")) // should return "freeCodeCamp".
console.log(toCamelCase("ye old-_-sea  faring_buccaneer_-_with a - peg__leg----and a_parrot_ _named- _squawk"))// should return "yeOldSeaFaringBuccaneerWithAPegLegAndAParrotNamedSquawk"