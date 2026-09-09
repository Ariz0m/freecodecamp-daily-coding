import { remote } from "webdriverio";

export const browser = await remote({
    capabilities: {
        browserName: 'chrome'
    }
});

if (!("Temporal" in globalThis)) throw new Error(`Temporal requires Node.js 26+. Current version: ${process.version}.`);