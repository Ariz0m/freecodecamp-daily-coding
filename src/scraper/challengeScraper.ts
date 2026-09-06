import { CalendarPage } from "src/pageObjects/CalendarPage";
import { HomePage } from "src/pageObjects/HomePage";

export async function challengeScrapper(date?: string) {
    const home = new HomePage();
    await home.init();
    if (!!date) {
        await home.logo.click();
        const calendar = new CalendarPage();
        await calendar.getChallengeByDay(date);
    } else {
        
    }
}