import { join } from "node:path";

import type { ChallengeLocation } from "types/challengeLocation";

export function getSolutionDir(
  rootDir: string,
  location: Pick<ChallengeLocation, "year" | "monthFolder">,
): string {
  return join(rootDir, String(location.year), location.monthFolder);
}

export function getSolutionPath(
  rootDir: string,
  location: ChallengeLocation,
): string {
  return join(getSolutionDir(rootDir, location), `${location.fileName}.ts`);
}

export function getTestPath(
  rootDir: string,
  location: ChallengeLocation,
): string {
  return join(
    rootDir,
    "tests",
    String(location.year),
    location.monthFolder,
    `${location.fileName}.test.ts`,
  );
}
