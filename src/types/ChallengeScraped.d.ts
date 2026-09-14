export type FunctionCallAndExpected = [string, string];
export type TestOutputs = FunctionCallAndExpected[];

export type ChallengeScrapped = {
    fileName: string,
    functionName: string,
    functionParams: string[],
    tests: TestOutputs
}