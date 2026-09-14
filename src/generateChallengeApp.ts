import { challengeScrapper } from "src/scraper/challengeScraper";
import { createChallengeLocation } from "utils/createChallengeLocation";
import { jestTestTemplate } from "src/generators/jestTestTemplate";
import { solutionTemplate } from "src/generators/solutionTemplate";
import { parseFunctionAndParams } from "src/scraper/parsers/parseFunctionAndParams";
import { parseTestSuite } from "src/scraper/parsers/parseTestSuite";

export async function generateChallengeApp(date: Temporal.PlainDate) {
    const challengeScrapped = await challengeScrapper(date);
    const challengeLocation = createChallengeLocation(challengeScrapped, date);
    solutionTemplate(challengeLocation, parseFunctionAndParams(challengeScrapped));
    jestTestTemplate(challengeLocation, parseTestSuite(challengeScrapped.tests, challengeLocation));
}