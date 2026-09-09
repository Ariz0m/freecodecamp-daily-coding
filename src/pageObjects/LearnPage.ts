import { HomePage } from "pageObjects/HomePage";
import type { ChallengesPeriodicity } from "constants/challengesPeriodicity";

export class LearnPage extends HomePage {
    async getChallengeButton(period: ChallengesPeriodicity) {
        return super.getChallengeButton(period);
    }

    get logo() {
        return super.logo;
    }
}