import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import { remote } from "webdriverio";

const CACHE_DIR = join(process.cwd(), ".wdio-cache");

function clearIncompleteChromedriverCache(cacheDir: string): void {
  const chromedriverRoot = join(cacheDir, "chromedriver");
  if (!existsSync(chromedriverRoot)) return;

  for (const platformBuild of readdirSync(chromedriverRoot)) {
    const buildDir = join(chromedriverRoot, platformBuild);
    if (!statSync(buildDir).isDirectory()) continue;

    for (const subdir of readdirSync(buildDir)) {
      const driverDir = join(buildDir, subdir);
      if (!statSync(driverDir).isDirectory()) continue;

      const executable = join(driverDir, "chromedriver");
      if (!existsSync(executable)) {
        rmSync(buildDir, { recursive: true, force: true });
        break;
      }
    }
  }
}

let browserInstance: Awaited<ReturnType<typeof remote>> | undefined;

export async function getBrowser() {
  if (!browserInstance) {
    if (!("Temporal" in globalThis)) {
      throw new Error(
        `Temporal requires Node.js 26+. Current version: ${process.version}.`,
      );
    }

    clearIncompleteChromedriverCache(CACHE_DIR);

    browserInstance = await remote({
      capabilities: {
        browserName: "chrome",
      },
      cacheDir: CACHE_DIR,
    });
  }

  return browserInstance;
}
