import { HomePage } from "src/pageObjects/HomePage";

export class ChallengePage extends HomePage {
    get challengeTitle() {
        return this.$('[data-playwright-test-label="challenge-title"]')
    }

    get testOutputs() {
        return this.$$('.test-output');
    }
}