function getLaptopCost(laptops: number[], budget: number): number {
    let secondMostExprensive = 0, mostExpensive = 0, mostExpensiveWithinBudget = 0;

    const isWithinBudget = (cost: number) => cost <= budget;
    const isTheMostExpensive = (cost: number) => cost > mostExpensive;
    const isTheSecondMostExpensive = (cost: number) => cost > secondMostExprensive && cost < mostExpensive && cost !== mostExpensive;

    laptops.forEach((laptop) => {
        if (isTheMostExpensive(laptop)) {
            secondMostExprensive = mostExpensive;
            mostExpensive = laptop;
        } else if (isTheSecondMostExpensive(laptop)) {
            secondMostExprensive = laptop;
        }
        if (isWithinBudget(laptop) && laptop > mostExpensiveWithinBudget && laptop !== mostExpensiveWithinBudget) {
            mostExpensiveWithinBudget = laptop;
        }
    });

    return isWithinBudget(secondMostExprensive) ? secondMostExprensive : mostExpensiveWithinBudget;
}


console.log(getLaptopCost([1500, 2000, 1800, 1400], 1900)) // should return 1800
console.log(getLaptopCost([1500, 2000, 2000, 1800, 1400], 1900)) // should return 1800
console.log(getLaptopCost([2099, 1599, 1899, 1499], 2200)) // should return 1899
console.log(getLaptopCost([2099, 1599, 1899, 1499], 1000)) // should return 0
console.log(getLaptopCost([1200, 1500, 1600, 1800, 1400, 2000], 1450)) // should return 1400