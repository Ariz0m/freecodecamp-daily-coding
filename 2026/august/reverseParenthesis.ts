function decode(str: string): string {
    const stack: string[] = [];
    for (const char of str) {
        if (char !== ')') {
            stack.push(char);
            continue;
        }

        const current: string[] = [];

        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
            current.push(stack.pop()!);
        }
        
        stack.pop();
        stack.push(...current);
    }
    
    return ''.concat(...stack);
}

console.log(decode("(f(b(dc)e)a)")); // should return "abcdef".
console.log(decode("((is?)(a(t d)h)e(n y( uo)r)aC)")) // should return "Can you read this?".
console.log(decode("f(Ce(re))o((e(aC)m)d)p")) // should return "freeCodeCamp".