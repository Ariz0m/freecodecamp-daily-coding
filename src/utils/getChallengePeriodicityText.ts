import { ChallengesPeriodicity } from "constants/challengesPeriodicity";
import { ChallengesPeriodicityText } from "constants/challengesPeriodicityText";

export function getChallengePeriodicityText(period: ChallengesPeriodicity): ChallengesPeriodicityText {
    switch (period) {
        case ChallengesPeriodicity.ARCHIVE:
            return ChallengesPeriodicityText.ARCHIVE;
        
        case ChallengesPeriodicity.DAILY:
            return ChallengesPeriodicityText.DAILY;
    }
}