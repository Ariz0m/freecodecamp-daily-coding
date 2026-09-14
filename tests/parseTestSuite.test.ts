import { parseTestSuite } from "src/scraper/parsers/parseTestSuite";
import type { ChallengeLocation } from "types/ChallengeLocation";
import type { TestOutputs } from "types/ChallengeScraped";

describe(parseTestSuite, () => {
    const location = {
        year: 2026,
        month: "September",
        fileName: "myFunction",
        functionName: "myFunction",
    } satisfies ChallengeLocation;

    const outputGenerator = (importPath: string, tests: TestOutputs) => {
        const { functionName } = location;
        let suite = `import { ${functionName} } from "${importPath}"
    
    describe(${functionName}, () => {
    
    `;

        for (const [functionCalled, expected] of tests) {
            const indexOfFirstParenthesis = functionCalled.indexOf("(");
            const indexOfSecondParenthesis = functionCalled.indexOf(")");
            const params = functionCalled.slice(indexOfFirstParenthesis + 1, indexOfSecondParenthesis);
            suite += `it('When called with ${params} should return ${expected}', () => {
            expect(${functionCalled}).toBe(${expected});
        });
        
        `;
        }
        suite += "}";
        return suite;
    };

    const importPath = parseTestSuite([], location).match(/from "(.+)"/)![1]!;

    it("Should generate a test suite with no test cases", () => {
        const tests: TestOutputs = [];
        expect(parseTestSuite(tests, location)).toBe(outputGenerator(importPath, tests));
    });

    it("Should generate a test suite with one test case and no params", () => {
        const tests = [["myFunction()", "42"]] as TestOutputs;
        expect(parseTestSuite(tests, location)).toBe(outputGenerator(importPath, tests));
    });

    it("Should generate a test suite with one test case and params", () => {
        const tests = [['myFunction("hello")', '"world"']] as TestOutputs;
        expect(parseTestSuite(tests, location)).toBe(outputGenerator(importPath, tests));
    });

    it("Should generate a test suite with multiple test cases", () => {
        const tests = [
            ["myFunction()", "42"],
            ['myFunction("hello")', '"world"'],
            ["myFunction(1, 2)", "3"],
        ] as TestOutputs;
        expect(parseTestSuite(tests, location)).toBe(outputGenerator(importPath, tests));
    });
});
