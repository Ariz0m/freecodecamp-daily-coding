import type { Config } from "jest";

const config: Config = {
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^solution/(.*)$": "<rootDir>/$1",
  },
};

export default config;
