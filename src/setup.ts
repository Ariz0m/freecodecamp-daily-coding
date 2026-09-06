import { remote } from "webdriverio";

export const browser = await remote({
    capabilities: {
        browserName: 'chrome'
    }
});