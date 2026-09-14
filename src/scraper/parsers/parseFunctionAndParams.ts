import type { ChallengeScrapped } from "types/ChallengeScraped";

export function parseFunctionAndParams({ functionName, functionParams }: ChallengeScrapped): string {
    let params: string = '';

    for (let index = 0; index < functionParams.length; index++) {
        const param = functionParams[index]!;
        
        params += param;

        if (index < functionParams.length - 1) params += ', ';
    }

    return `export function ${functionName}(${params}) {\n}`;
}