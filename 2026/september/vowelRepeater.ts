function repeatVowels(str: string): string {
    const vowelsRegex = /[aeiou]/i;

    let repeat = 0;
    let newStr = '';

    for (const char of str) {
        if (vowelsRegex.test(char)) {
            newStr += `${char}${char.toLowerCase().repeat(repeat)}`;
            repeat++;
        } else newStr += char;
    }

    return newStr;
}

console.log(repeatVowels("I like eating ice cream in Iceland")) //should return "I liikeee eeeeaaaaatiiiiiing iiiiiiiceeeeeeee creeeeeeeeeaaaaaaaaaam iiiiiiiiiiin Iiiiiiiiiiiiceeeeeeeeeeeeelaaaaaaaaaaaaaand"