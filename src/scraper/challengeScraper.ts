import { CalendarPage } from "pageObjects/CalendarPage";
import { HomePage } from "pageObjects/HomePage";
import type { DesiredMonthContext } from "types/DesiredMonthContext";

export async function challengeScrapper(date?: DesiredMonthContext) {
    const home = new HomePage();
    await home.init();
    if (date) {
        await home.logo.click();
        const calendar = new CalendarPage();
        await calendar.getChallengeByDay(date);
    } else {
        
    }
}