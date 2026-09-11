import type { ChallengesPeriodicity } from "constants/challengesPeriodicity";
import { browser } from "src/setup";
import { getChallengePeriodicityText } from "utils/getChallengePeriodicityText";

export class HomePage {
  private Browser = browser;
  protected URL = 'https://www.freecodecamp.org/';

  get browser() {
    return this.Browser;
  }

  async init() {
    await this.browser.url(this.URL);
  }

  protected $(selector: any) {
    return this.browser.$(selector);
  }

  protected $$(selector: any) {
    return this.browser.$$(selector);
  }

  get logo() {
    return this.$('[data-playwright-test-label="header-universal-nav-logo"]');
  }

  private dailyCodingClass = '.daily-coding-challenge-button';

  protected async getChallengeButton(period: ChallengesPeriodicity) {
    const candidates = this.$$(this.dailyCodingClass);
    const text = getChallengePeriodicityText(period);
    for (const ele of candidates) {
      if (await ele.getText() === text) return ele;
    }

    throw new Error(`Today's challenge element wasn't found. Selector = ${this.dailyCodingClass}. Text searched = ${text}`);
  }
}