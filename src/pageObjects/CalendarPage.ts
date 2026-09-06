import { HomePage } from "src/pageObjects/HomePage";
import { getChallengePeriodicityText } from "src/utils/getChallengePeriodicityText";
import { ChallengesPeriodicity } from "src/constants/challengesPeriodicity";

export class CalendarPage extends HomePage {
    get goToTodaysChallengeButton() {
        return this.$(`a=${getChallengePeriodicityText(ChallengesPeriodicity.DAILY)}`);
    }

    get currentDisplayedMonth() {
        return this.$('h2.text-center');
    }

    get previousMonthButton() {
        return this.$('button=<');
    }

    get nextMonth(){
        return this.$('button=>');
    }

    getChallengeByDay(day: string) {
        return this.$(day);
    }
}
