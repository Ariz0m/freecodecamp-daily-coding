type RGB =  "red" | "green"| "blue";

/**
 * Hex Generator
Given a named CSS color string, generate a random hexadecimal (hex) color code that is dominant in the given color.

The function should handle "red", "green", or "blue" as an input argument.
If the input is not one of those, the function should return "Invalid color".
The function should return a random six-character hex color code where the input color value is greater than any of the others.
Example of valid outputs for a given input:
Input	Output
"red"	"FF0000"
"green"	"00FF00"
"blue"	"0000FF"

 */
function generateHex(color: RGB | string): string {
    const validColors = ["red", "green", "blue"];

    if (!validColors.includes(color)) return "Invalid color";

    const hexBase = 16;
    const maxHexNumber = 255;

    const generateRandomNumber = (limit: number = maxHexNumber) => {
        return Math.floor(Math.random() * limit + 1);
    }

    const assertItsDouble = (str: string) => {
        return str.padStart(2, '0');
    }

    let result: string = '';
    const maxNumber = generateRandomNumber();

    const candidateHex = assertItsDouble(maxNumber.toString(hexBase));

    for (const element of validColors) {
        result += element !== color ? assertItsDouble(generateRandomNumber(maxNumber - 1).toString(hexBase)) : candidateHex;
    }

    return result;
}


console.log(generateHex('red'));