function findDuplicates(arr: number[]): number[] {
    const seenMap = new Map<number, boolean>();
    const duplicate = new Set<number>();
    for (const num of arr) {
        const currMapValue = seenMap.get(num);
        if (currMapValue) duplicate.add(num);
        else seenMap.set(num, true);
    }

    return Array.from(duplicate).sort((a, b) => a - b);
}

console.log(findDuplicates([1, 2, 3, 4, 5])) //should return [].
console.log(findDuplicates([1, 2, 3, 4, 1, 2])) //should return [1, 2].
console.log(findDuplicates([2, 34, 0, 1, -6, 23, 5, 3, 2, 5, 67, -6, 23, 2, 43, 2, 12, 0, 2, 4, 4])) // should return [-6, 0, 2, 4, 5, 23].