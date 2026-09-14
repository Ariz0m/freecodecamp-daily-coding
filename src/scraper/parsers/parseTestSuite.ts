import { getSolutionPath } from "src/generators/paths";
import type { ChallengeLocation } from "types/ChallengeLocation";
import type { TestOutputs, FunctionCallAndExpected } from "types/ChallengeScraped";

export function parseTestSuite(tests: TestOutputs, location: ChallengeLocation): string {
    return generateTestSuite(tests, location);
}

function generateTestSuite(tests: TestOutputs, location: ChallengeLocation): string {
    const { functionName } = location;
    let suite = `import { ${functionName} } from "${getSolutionPath(import.meta.dirname, location).replace('.ts', '')}"
    
    describe(${functionName}, () => {
    
    `;

    suite += generateTests(tests);
    suite += '}';

    return suite;
}

function generateTests(functionCalledAndExpecteds: TestOutputs): string {
    let tests = '';
    for (const [functionCalled, expected] of functionCalledAndExpecteds){
        const indexOfFirstParenthesis = functionCalled.indexOf('('), indexOfSecondParenthesis = functionCalled.indexOf(')');
        const params = functionCalled.slice(indexOfFirstParenthesis + 1, indexOfSecondParenthesis);
        tests += `it('When called with ${params} should return ${expected}', () => {
            ${generateExpected(functionCalled, expected)}
        });
        
        `;
    }
    return tests;
}

function generateExpected(functionCalled: string, expected: string): string {
    return `expect(${functionCalled}).toBe(${expected});`;
}