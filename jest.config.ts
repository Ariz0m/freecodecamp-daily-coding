import { defineConfig } from "jest";

export default defineConfig({
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    // Strip .js extensions from relative imports (NodeNext compat)
    "^(\\.{1,2}/.*)\\.js$": "$1",
    // Mirror tsconfig paths
    "^src/(.*)$": "<rootDir>/src/$1",
    "^date/(.*)$": "<rootDir>/src/utils/date/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^constants/(.*)$": "<rootDir>/src/constants/$1",
    "^solution/(.*)$": "<rootDir>/$1",
  },
});