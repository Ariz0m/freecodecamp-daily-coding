function tribonacciSequence(startSequence: number[], length: number): number[] {
    if (length <= 0) return [];

    const result: number[] = [];

    for (let i = 0; i < length; i++) {
        const currentElementInStartSequence = startSequence[i];

        if (!!currentElementInStartSequence) {
            result.push(currentElementInStartSequence);
            continue;
        }

        const pastElement = result[i - 2] || 0, antePenultimateElement = result[i - 3] || 0, currentElement = result[i - 1] || 0;

        result.push(currentElement + pastElement + antePenultimateElement);
    }

    return result;
}


console.log(tribonacciSequence([0, 0, 1], 20)) //should return [0, 0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504, 927, 1705, 3136, 5768, 10609, 19513].
console.log(tribonacciSequence([21, 32, 43], 1)) //should return [21].
console.log(tribonacciSequence([0, 0, 1], 0)) //should return [].
console.log(tribonacciSequence([10, 20, 30], 2)) //should return [10, 20].
console.log(tribonacciSequence([10, 20, 30], 3)) //should return [10, 20, 30].
console.log(tribonacciSequence([123, 456, 789], 8)) //should return [123, 456, 789, 1368, 2613, 4770, 8751, 16134].