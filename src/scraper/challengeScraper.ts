import { CalendarPage } from "pageObjects/CalendarPage";
import { HomePage } from "pageObjects/HomePage";
import { ChallengesPeriodicity } from "constants/challengesPeriodicity";
import { ChallengePage } from "pageObjects/ChallengePage";
import { LearnPage } from "pageObjects/LearnPage";
import { toCamelCase } from "utils/string/toCamelCase";
import type { DesiredMonthContext } from "types/DesiredMonthContext";
import type { ChallengeScrapped } from "types/ChallengeScraped";

export async function challengeScrapper(date?: DesiredMonthContext): Promise<ChallengeScrapped> {
    const home = new HomePage();
    await home.init();
    const calendar = new CalendarPage();

    if (date) {
        await home.logo.click();
        const learnPage = new LearnPage();
        await (await learnPage.getChallengeButton(ChallengesPeriodicity.ARCHIVE)).click();
        await (await calendar.getChallengeByDay(date)).click();
    } else {
        await (await home.getChallengeButton(ChallengesPeriodicity.DAILY)).click();
    }

    const challengePage = new ChallengePage();
    const tests = await challengePage.testResults();

    await challengePage.changePageLayout();

    return {
        fileName: toCamelCase(await challengePage.challengeTitle.getText()),
        functionName: await challengePage.functionName(),
        functionParams: await challengePage.functionParams(),
        tests
    };
}