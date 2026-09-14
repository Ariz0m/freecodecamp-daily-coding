import { DEFAULT_LOCALE } from "constants/defaultLocale";
import type { ChallengeLocation } from "types/ChallengeLocation";
import type { ChallengeScrapped } from "types/ChallengeScraped";

export function createChallengeLocation(challengeScrapped: ChallengeScrapped, date: Temporal.PlainDate): ChallengeLocation {
    const { fileName, functionName } = challengeScrapped;
    const month = date.toLocaleString(DEFAULT_LOCALE, { month: 'long' }), { year } = date;

    return {
        fileName,
        functionName,
        month,
        year
    }
}