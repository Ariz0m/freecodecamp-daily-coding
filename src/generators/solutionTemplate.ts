import { mkdirSync, writeFileSync } from "fs";
import { getSolutionDir, getSolutionPath } from "src/generators/paths";
import type { ChallengeLocation } from "types/ChallengeLocation";

export function solutionTemplate(location: ChallengeLocation, text: string) {
    mkdirSync(getSolutionDir(import.meta.dirname, location));
    writeFileSync(getSolutionPath(import.meta.dirname, location), text);
}