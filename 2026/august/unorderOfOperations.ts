type Operators = '+' | '-' | '*' | '/' | '%';

function evaluate(numbers: number[], operators: Operators[]): number {
    let result = 0;

    let operatorsCursor = 0;
    numbers.forEach((num, idx) => {
        if (operatorsCursor >= operators.length) operatorsCursor = 0;

        if (idx === 0) {
            result = num;
        } else if (idx === numbers.length - 1) {
            result = eval(`${result} ${operators[operatorsCursor]} ${num}`);    
        } else {
            result = eval(`${result} ${operators[operatorsCursor]} ${num}`);
            operatorsCursor++;
        }
    });

    return result;
}

console.log(evaluate([5, 6, 7, 8, 9], ['+', '-'])) // should return 3
console.log(evaluate([17, 61, 40, 24, 38, 14], ['+', '%'])) // should return 38
console.log(evaluate([20, 2, 4, 24, 12, 3], ['*', '/'])) // should return 60
console.log(evaluate([11, 4, 10, 17, 2], ['*', '*', '%'])) // should return 30
console.log(evaluate([33, 11, 29, 13], ['/', '-'])) // should return -2