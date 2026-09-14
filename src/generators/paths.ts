import { join } from "node:path";
import type { ChallengeLocation } from "types/ChallengeLocation";

export function getSolutionDir(
  rootDir: string,
  location: ChallengeLocation,
): string {
  return join(rootDir, String(location.year), location.month);
}

export function getSolutionPath(
  rootDir: string,
  location: ChallengeLocation,
): string {
  return join(getSolutionDir(rootDir, location), `${location.fileName}.ts`);
}
export function getTestDir(
    rootDir: string,
    location: ChallengeLocation,
): string {
    return join(
    rootDir,
    "tests",
    String(location.year),
    location.month
  );
}

export function getTestPath(
  rootDir: string,
  location: ChallengeLocation,
): string {
  return join(getTestDir(rootDir, location), `${location.fileName}.test.ts`);
}
