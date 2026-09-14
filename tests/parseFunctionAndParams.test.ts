import { parseFunctionAndParams } from "src/scraper/parsers/parseFunctionAndParams";
import type { ChallengeScrapped } from "types/ChallengeScraped";

describe(parseFunctionAndParams, () => {

    const outputGenerator = (functionName: string, params: string = '') => `export function ${functionName}(${params}) {\n}`;

    it('Should return foo() with no params', () => {
        const obj = { functionName: 'foo', functionParams: ['']} as ChallengeScrapped;
        expect(parseFunctionAndParams(obj)).toBe(outputGenerator('foo'));
    });

    it('Should return foo(bar) with one param', () => {
        const obj = { functionName: 'foo', functionParams: ['bar']} as ChallengeScrapped;
        expect(parseFunctionAndParams(obj)).toBe(outputGenerator('foo', 'bar'));
    });

    it('Should return foo(bar, baz) with two params', () => {
        const obj = { functionName: 'foo', functionParams: ['bar', 'baz']} as ChallengeScrapped;
        expect(parseFunctionAndParams(obj)).toBe(outputGenerator('foo', 'bar, baz'));
    });
});