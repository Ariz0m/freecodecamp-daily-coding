function rotate(matrix: number[][]): number[][] {
    const n = matrix.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    return matrix.map((row) => row.reverse());
}


console.log(rotate([[1]])) // return [[1]].
console.log(rotate([[1, 2], [3, 4]])) // return [[3, 1], [4, 2]].
console.log(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])) // return [[7, 4, 1], [8, 5, 2], [9, 6, 3]].
console.log(rotate([[0, 1, 0], [1, 0, 1], [0, 0, 0]])) // return [[0, 1, 0], [0, 0, 1], [0, 1, 0]]