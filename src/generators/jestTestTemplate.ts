import type { ChallengeLocation } from "types/ChallengeLocation";
import { mkdirSync, writeFileSync } from "fs";
import { getTestDir, getTestPath } from "src/generators/paths";

export function jestTestTemplate(location: ChallengeLocation, text: string) {
    mkdirSync(getTestDir(import.meta.dirname, location));
    writeFileSync(getTestPath(import.meta.dirname, location), text);
}