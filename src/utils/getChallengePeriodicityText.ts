import { ChallengesPeriodicity } from "src/constants/challengesPeriodicity";

export function getChallengePeriodicityText(period: ChallengesPeriodicity) {
    switch (period) {
        case ChallengesPeriodicity.ARCHIVE:
            return 'Go to Daily Coding Challenge Archive'
        
        case ChallengesPeriodicity.DAILY:
            return `Go to Today's Challenge`;
    }
}