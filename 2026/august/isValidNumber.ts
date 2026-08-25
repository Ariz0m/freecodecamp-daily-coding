/**
 * Given a string representing a number, and an integer base from 2 to 36, determine whether the number is valid in that base.  
The string may contain integers, and uppercase or lowercase characters.
The check should be case-insensitive.
The base can be any number 2-36.
A number is valid if every character is a valid digit in the given base.
Example of valid digits for bases:
Base 2: 0-1
Base 8: 0-7
Base 10: 0-9
Base 16: 0-9 and A-F
Base 36: 0-9 and A-Z
 */
function isValidNumber(n: string, base: number): boolean {
    if (!Number.isInteger(base) || base < 2 || base > 36) {
        throw new Error(`Invalid base: ${base}. Base must be an integer from 2 to 36.`);
    }

    if (n.length === 0) {
        return false;
    }

    return [...n.toUpperCase()].every((character) => {
        const digit = character >= '0' && character <= '9'
            ? character.charCodeAt(0) - '0'.charCodeAt(0)
            : character >= 'A' && character <= 'Z'
                ? character.charCodeAt(0) - 'A'.charCodeAt(0) + 10
                : -1;
        
        console.log(`Character: ${character}, Digit: ${digit}, Base: ${base}`);
        return digit >= 0 && digit < base;
    });
}


console.log(isValidNumber("10101", 2))// should return true.
console.log(isValidNumber("10201", 2)) // should return false.
console.log(isValidNumber("76543210", 8)) // should return true.
console.log(isValidNumber("9876543210", 8)) // should return false.
console.log(isValidNumber("9876543210", 10)) // should return true.
console.log(isValidNumber("ABC", 10)) // should return false.
console.log(isValidNumber("ABC", 16)) // should return true.
console.log(isValidNumber("Z", 36)) // should return true.
console.log(isValidNumber("ABC", 20)) // should return true.
console.log(isValidNumber("4B4BA9", 16)) // should return true.
console.log(isValidNumber("5G3F8F", 16)) // should return false.
console.log(isValidNumber("5G3F8F", 16)) // should return true.
console.log(isValidNumber("abc", 10)) // should return false.
console.log(isValidNumber("abc", 16)) // should return true.
console.log(isValidNumber("AbC", 16)) // should return true.
console.log(isValidNumber("z", 36)) // should return true.