import { HomePage } from "pageObjects/HomePage";
import {
    getChallengeDayHrefSelector,
    parseDisplayedMonthLabel,
    resolveDesiredYearMonth,
    toPlainDate,
    type CalendarDayContext,
    type CalendarDayInput,
    type DesiredMonthContext,
} from "src/utils/date/calendar";
import { parseMonth } from "utils/date/parseMonth";
import { ChallengesPeriodicityText } from "src/constants/challengesPeriodicityText";

export class CalendarPage extends HomePage {
    private displayedYear = Temporal.Now.plainDateISO().year;

    get goToTodaysChallengeButton() {
        return this.$(`a=${ChallengesPeriodicityText.DAILY}`);
    }

    get currentDisplayedMonth() {
        return this.$('h2.text-center');
    }

    get previousMonthButton() {
        return this.$(`button=${MONTH_NAVIGATION_BUTTON_LABELS.previous}`);
    }

    get nextMonth() {
        return this.$(`button=${MONTH_NAVIGATION_BUTTON_LABELS.next}`);
    }

    async moveToDesiredYear(year: number, fromYear?: number) {
        const referenceYear = fromYear ?? this.displayedYear;
        const diffYears = year - referenceYear;

        if (diffYears === 0) return;

        const direction =
            diffYears < 0
                ? MonthNavigationDirection.previous
                : MonthNavigationDirection.next;
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
                ? MonthNavigationDirection.previous
                : MonthNavigationDirection.next;
        await this.navigateMonths(Math.abs(monthDiff), direction);
    }

    private async getDisplayedYearMonth(): Promise<Temporal.PlainYearMonth> {
        const monthLabel = await this.currentDisplayedMonth.getText();
        return parseDisplayedMonthLabel(monthLabel, this.displayedYear);
    }

    private getMonthButton(direction: MonthNavigationDirection) {
        return direction === MonthNavigationDirection.previous
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

    async getChallengeByDay(day: CalendarDayInput, context?: CalendarDayContext) {
        const date = toPlainDate(day, context);
        await this.moveToDesiredMonth(date);
        return this.$(getChallengeDayHrefSelector(date));
    }
}

const MonthNavigationDirection = {
    previous: "previous",
    next: "next",
} as const;

type MonthNavigationDirection =
    (typeof MonthNavigationDirection)[keyof typeof MonthNavigationDirection];

const MONTH_NAVIGATION_BUTTON_LABELS: Record<MonthNavigationDirection, string> = {
    [MonthNavigationDirection.previous]: "<",
    [MonthNavigationDirection.next]: ">",
};