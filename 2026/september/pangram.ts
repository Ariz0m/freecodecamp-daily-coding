function isPangram(sentence: string, letters: string): boolean {
    const alphabetRegex = /[a-z]/;
    const lettersUsedMap = new Map<string, true>(
        sentence
        .toLowerCase()
        .split('')
        .filter(char => alphabetRegex.test(char))
        .map(char => [char, true])
    );
    
    const allWords = lettersUsedMap.keys().toArray().length;

    if (letters.length !== allWords) return false;

    for (const char of letters) {
        if (!lettersUsedMap.get(char)) return false;
    }

    return true;
}

console.log(isPangram("hello", "helo")) //should return true
console.log(isPangram("hello", "hel")) // should return false
console.log(isPangram("hello", "helow")) //should return false
console.log(isPangram("hello world", "helowrd")) //should return true
console.log(isPangram("Hello World!", "helowrd")) //should return true
console.log(isPangram("Hello World!", "heliowrd")) //should return false
console.log(isPangram("freeCodeCamp", "frcdmp")) //should return false
console.log(isPangram("The quick brown fox jumps over the lazy dog.", "abcdefghijklmnopqrstuvwxyz"))// should return true