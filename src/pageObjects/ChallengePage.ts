import { HomePage } from "pageObjects/HomePage";
import type { ChainablePromiseElement } from "webdriverio";

export class ChallengePage extends HomePage {

    /** Regex to remove non alphabet characters among all string */
    nonAlphabetCharactersRegex = /[^a-zA-z]/g;

    get challengeTitle() {
        return this.$('[data-playwright-test-label="challenge-title"]')
    }

    get instructionsButton() {
        return this.$('button=Instructions');
    }

    get consoleButton() {
        return this.$('button=Console');
    }

    get testOutputs() {
        return this.$$('.test-output');
    }

    get codeCanvas() {
        return this.$('[data-playwright-test-label="editor-container-scriptjs"]');
    }

    get functionNameElement() {
        const functionReservedWord = this.codeCanvas.$('span=function');
        return functionReservedWord.nextElement();
    }

    async textFromElement(element: ChainablePromiseElement) {
        return await element.getText();
    }

    async functionName() {
        return (await this.textFromElement(this.functionNameElement)).replace(this.nonAlphabetCharactersRegex, '');
    }

    async functionParams(): Promise<string[]> {
        const params: string[] = [];
        let lastElement = this.functionNameElement;
        let lastElementText = await this.textFromElement(lastElement);

        while (lastElementText !== ')') {
            if (lastElementText === ',' || lastElementText === '(') continue;

            params.push(lastElementText);

            lastElement = lastElement.nextElement();
            lastElementText = await this.textFromElement(lastElement);
        }

        return params;
    }

    /**
     * Since page layout changes screen resolutions this changes classes and DOM structure. So we clean up to make more easy the selectors.
     * Initial state is both enabled, so keep that in mind.
     */
    async changePageLayout() {
        await Promise.all([this.instructionsButton.click(), this.consoleButton.click()]);
    }

    get testResultsList() {
        return this.$$('[data-playwright-test-label="test-result"]');
    }

    async testResults(): Promise<string[][]> {
        const actualAndExpectedList: string[][] = [];

        for (const listItem of this.testResultsList) {
            const actualAndExpected = listItem.$$('<code />');
            actualAndExpectedList.push(await Promise.all([actualAndExpected[0]?.getText(), actualAndExpected[1]?.getText()]) as string[]);
        }

        const listLength = actualAndExpectedList.length;
        const errorStatus = actualAndExpectedList.some(([callable, expected]) => callable === undefined || expected === undefined);

        if (listLength === 0 || errorStatus ) {
            throw new Error(`Error while fetching tests.\nList length: ${listLength}.\nError status:${errorStatus}.\nList: ${actualAndExpectedList}`);
        }

        return actualAndExpectedList;
    }
}