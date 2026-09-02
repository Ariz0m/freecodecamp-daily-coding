/**
 * Challenge: 
 * https://www.freecodecamp.org/learn/daily-coding-challenge/08-22
 * Message Decoder
 * Given a secret message string, and an integer representing the number of letters that were used to shift the message to encode it, return
 * the decoded string.
 * A positive number means the message was shifted forward in the alphabet.
 * A negative number means the message was shifted backward in the alphabet.
 * Case matters, decoded characters should retain the case of their encoded counterparts.
 * Non-alphabetical characters should not get decoded.
 * 
 * Note:
 * While the original challenge was only to decode a message, I was coding while my girlfriend was watching me, and she asked me to also
 * implement the encoding function, so I did.
*/

const lettersLowercase = "abcdefghijklmnopqrstuvwxyz";
const lettersUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lettersRegex = /[a-zA-Z]/;
const lettersUppercaseRegex = /[A-Z]/;

function normalizeIndex(index: number): number {
    const lettersCount = lettersLowercase.length;
    return ((index % lettersCount) + lettersCount) % lettersCount;
}

function decode(message: string, shift: number): string {
    let decodedMessage: string = '';
    for (const char of message) {
        if (!lettersRegex.test(char)) {
            decodedMessage += char;
            continue;
        }
        const lettersList = lettersUppercaseRegex.test(char) ? lettersUppercase : lettersLowercase;
        const index = lettersList.indexOf(char);
        const newIndex = normalizeIndex(index - shift);
        decodedMessage += lettersList[newIndex];
    }
    return decodedMessage;
}

function encode(message: string, shift: number): string {
    let encodedMessage: string = '';
    for (const char of message) {
        if (!lettersRegex.test(char)) {
            encodedMessage += char;
            continue;
        }
        const lettersList = lettersUppercaseRegex.test(char) ? lettersUppercase : lettersLowercase;
        const index = lettersList.indexOf(char);
        const newIndex = normalizeIndex(index + shift);
        encodedMessage += lettersList[newIndex];
    }
    return encodedMessage;
}

console.log(decode("Byffi Qilfx!", 20));
console.log(decode("Xlmw mw e wigvix qiwweki.", 4));
const bb = encode("Ale y Ari juntos por siempre.", Number.MAX_SAFE_INTEGER - 21);
console.log(bb);
console.log(decode(bb, Number.MAX_SAFE_INTEGER - 21));