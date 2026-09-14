import type { ChallengesPeriodicity } from "constants/challengesPeriodicity";
import { getBrowser } from "src/setup";
import { getChallengePeriodicityText } from "utils/getChallengePeriodicityText";

export class HomePage {
  private browserInstance?: Awaited<ReturnType<typeof getBrowser>>;
  protected URL = 'https://www.freecodecamp.org/';

  get browser() {
    if (!this.browserInstance) {
      throw new Error("HomePage not initialized. Call init() before using the browser.");
    }

    return this.browserInstance;
  }

  async init() {
    this.browserInstance = await getBrowser();
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

  public async getChallengeButton(period: ChallengesPeriodicity) {
    const candidates = this.$$(this.dailyCodingClass);
    const text = getChallengePeriodicityText(period);
    for (const ele of candidates) {
      if (await ele.getText() === text) return ele;
    }

    throw new Error(`Today's challenge element wasn't found. Selector = ${this.dailyCodingClass}. Text searched = ${text}`);
  }
}