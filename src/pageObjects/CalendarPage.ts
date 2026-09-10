import { ChallengesPeriodicityText } from "constants/challengesPeriodicityText";
import { DEFAULT_LOCALE } from "constants/defaultLocale";
import { HomePage } from "pageObjects/HomePage";
import {
    resolveDesiredYearMonth,
    toPlainDate,
    type CalendarDayContext,
    type CalendarDayInput,
    type DesiredMonthContext,
} from "date/calendar";
import { parseMonth } from "date/parseMonth";

type MonthNavigationDirection = 'previous' | 'next';

export class CalendarPage extends HomePage {
    private displayedYear = Temporal.Now.plainDateISO().year;

    private CHALLENGE_DAY_HREF_PREFIX = "/learn/daily-coding-challenge/";
    
    private readonly MonthNavigationDirectionText: Readonly<Record<MonthNavigationDirection, MonthNavigationDirection>> = {
        previous: 'previous',
        next: 'next',
    }
    
    private readonly MonthNavigationDirectionSymbol: Readonly<Record<MonthNavigationDirection, string>> = {
        previous: '<',
        next: '>'
    }
    
    get goToTodaysChallengeButton() {
        return this.$(`a=${ChallengesPeriodicityText.DAILY}`);
    }
    
    get currentDisplayedMonth() {
        return this.$('h2.text-center');
    }
    
    get previousMonthButton() {
        return this.$(`button=${this.MonthNavigationDirectionSymbol.previous}`);
    }
    
    get nextMonth() {
        return this.$(`button=${this.MonthNavigationDirectionSymbol.next}`);
    }

    formatChallengeHrefSlug(date: Temporal.PlainDate): string {
        const month = String(date.month).padStart(2, "0");
        const day = String(date.day).padStart(2, "0");
        return `${month}-${day}`;
    }

    formatChallengeDayHref(date: Temporal.PlainDate): string {
        return `${this.CHALLENGE_DAY_HREF_PREFIX}${this.formatChallengeHrefSlug(date)}`;
    }

    parseDisplayedMonthLabel(
      monthLabel: string,
      year: number,
      locale: string = DEFAULT_LOCALE,
    ): Temporal.PlainYearMonth {
      
    
      return Temporal.PlainYearMonth.from({
        year,
        month: parseMonth(monthLabel.trim(), 1, locale),
      });
    }

    getChallengeDayHrefSelector(date: Temporal.PlainDate): string {
        return `a[data-playwright-test-label="calendar-day"][href="${this.formatChallengeDayHref(date)}"]`;
    }
    
    private async getDisplayedYearMonth(): Promise<Temporal.PlainYearMonth> {
        const monthLabel = await this.currentDisplayedMonth.getText();
        return this.parseDisplayedMonthLabel(monthLabel, this.displayedYear);
    }

    private getMonthButton(direction: MonthNavigationDirection) {
        return direction === this.MonthNavigationDirectionText.previous
            ? this.previousMonthButton
            : this.nextMonth;
    }

    private async navigateMonths(
        totalClicks: number,
        direction: MonthNavigationDirection,
    ) {
        const monthButton = this.getMonthButton(direction);

        for (let clicks = 0; clicks < totalClicks; clicks++) {
            const currentMonth = parseMonth(
                (await this.currentDisplayedMonth.getText()).trim(),
                1,
            );
            await monthButton.click();
            const newMonth = parseMonth(
                (await this.currentDisplayedMonth.getText()).trim(),
                1,
            );

            if (currentMonth === 12 && newMonth === 1) {
                this.displayedYear++;
            } else if (currentMonth === 1 && newMonth === 12) {
                this.displayedYear--;
            }
        }
    }

    async moveToDesiredYear(year: number, fromYear?: number) {
        const referenceYear = fromYear ?? this.displayedYear;
        const diffYears = year - referenceYear;

        if (diffYears === 0) return;

        const direction =
            diffYears < 0
                ? this.MonthNavigationDirectionText.previous
                : this.MonthNavigationDirectionText.next;
        await this.navigateMonths(Math.abs(diffYears) * 12, direction);
    }

    async moveToDesiredMonth(desiredDay: DesiredMonthContext) {

        const target = resolveDesiredYearMonth(desiredDay);
        let displayed = await this.getDisplayedYearMonth();

        if (displayed.year !== target.year) {
            await this.moveToDesiredYear(target.year, displayed.year);
            displayed = await this.getDisplayedYearMonth();
        }

        const monthDiff = target.month - displayed.month;
        if (monthDiff === 0) return;

        const direction =
            monthDiff < 0
                ? this.MonthNavigationDirectionText.previous
                : this.MonthNavigationDirectionText.next;
        await this.navigateMonths(Math.abs(monthDiff), direction);
    }

    async getChallengeByDay(day: CalendarDayInput, context?: CalendarDayContext) {
        const date = toPlainDate(day, context);
        await this.moveToDesiredMonth(date);
        return this.$(this.getChallengeDayHrefSelector(date));
    }
}
