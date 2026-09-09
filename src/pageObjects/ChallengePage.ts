import { HomePage } from "pageObjects/HomePage";

export class ChallengePage extends HomePage {
    get challengeTitle() {
        return this.$('[data-playwright-test-label="challenge-title"]')
    }

    get testOutputs() {
        return this.$$('.test-output');
    }

    get codeCanvas() {
        return this.$('[data-playwright-test-label="editor-pane"]');
    }

    get functionAndParams() {
        const code = this.codeCanvas;
    }
}