function rgbToHex(rgb: `rgb(${number}, ${number}, ${number})`): `#${string}` {
    const leftParenthesis = rgb.indexOf('('), rightParenthesis = rgb.indexOf(')');
    
    if (leftParenthesis === -1 || rightParenthesis === -1) throw new Error(`Parenthesis not founded.\nLeft = ${leftParenthesis}.\nRight = ${rightParenthesis}`);

    const str = rgb.slice(leftParenthesis + 1, rightParenthesis);
    const [red, green, blue] = str.split(',').map((num) => {
        const rgbNumber = parseInt(num);
        return rgbNumber.toString(16).padStart(2, '0');
    });

    return `#${red}${green}${blue}`;
}

console.log(rgbToHex("rgb(255, 255, 255)")) //should return "#ffffff".
console.log(rgbToHex("rgb(1, 11, 111)")) //should return "#010b6f".
console.log(rgbToHex("rgb(173, 216, 230)")) //should return "#add8e6".
console.log(rgbToHex("rgb(79, 123, 201)")) //should return "#4f7bc9"