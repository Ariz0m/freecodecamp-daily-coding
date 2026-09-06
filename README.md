# freeCodeCamp Daily Coding

Personal workspace for [freeCodeCamp Daily Coding Challenges](https://www.freecodecamp.org/). Solutions live as standalone TypeScript files with no runtime dependencies. Tooling under `src/` scrapes challenge details, generates Jest tests, and copies solutions to the clipboard for submission.

## Requirements

- [Node.js](https://nodejs.org/) 26+
- [pnpm](https://pnpm.io/) 11+

```bash
pnpm install
```

## Project layout

```
2026/
  august/
    pangram.ts           # solution (standalone, no imports)
  september/
    ...

tests/
  2026/
    august/
      pangram.test.ts    # generated Jest tests (mirrors solution paths)
    september/
      ...

src/
  cli/                   # command entry points
  scraper/               # WebdriverIO scraping (standalone, no WDIO CLI)
  pageObjects/           # page object model for navigation
  generators/            # solution and test file templates
  clipboard/             # copy solution to clipboard
  types/                 # shared types for scraped challenge data
  utils/                 # date parsing and other shared helpers
  app.ts                 # orchestrator
  setup.ts               # browser bootstrap
```

| Area | Purpose |
|------|---------|
| `2026/<month>/` | Challenge solutions only, grouped by year and month |
| `tests/2026/<month>/` | Generated Jest tests, mirroring the solution directory structure |
| `src/` | Scraper, generators, and CLI tooling — not imported by solutions |

Solutions in `2026/` are excluded from `tsconfig.json` so they stay dependency-free.

## Tooling architecture

Tooling under `src/` follows a single data flow:

```
pageObjects/  →  scraper/  →  types/  →  generators/  →  disk
(navigation)     (extract)    (shape)    (file content)
```

Each layer has one job: **page objects** navigate the browser, the **scraper** reads the page, **types** define the extracted shape, and **generators** turn that into file contents.

### `types/` — contracts between layers

Shared TypeScript types only. No WebdriverIO, no `fs`, no template strings.

| File | Purpose |
|------|---------|
| `challenge.ts` | Main scraped challenge: title, description, function name, parameters, return type |
| `testCase.ts` | One example from the page: inputs, expected output, optional label |
| `challengeLocation.ts` | Where files go: `year`, `month`, `monthFolder`, `fileName` |
| `generatedFiles.ts` | Output of generation: `{ solutionPath, testPath, solutionContent, testContent }` |

The scraper **returns** a `Challenge`; generators **accept** a `Challenge`.

```typescript
// types/testCase.ts
export type TestCase = {
  args: unknown[];
  expected: unknown;
  description?: string;
};

// types/challenge.ts
export type Challenge = {
  location: ChallengeLocation;
  functionName: string;
  parameters: { name: string; type: string }[];
  returnType: string;
  description: string;
  testCases: TestCase[];
};
```

### `scraper/` — browser → structured data

Reads the live freeCodeCamp page and returns a `Challenge`. Uses `pageObjects/` for navigation and `parsers/` for DOM extraction.

| File | Purpose |
|------|---------|
| `challengeScraper.ts` | High-level API: `scrapeChallenge(browser, date?)` → `Challenge` |
| `parsers/challengePage.ts` | Extract title, description, and function signature from the challenge view |
| `parsers/testCases.ts` | Parse example inputs and outputs from the page |
| `parsers/index.ts` | Re-export parsers |

**Belongs here:** waiting for elements, reading text, normalizing scraped strings into `TestCase[]`.

**Does not belong here:** writing files (generators or CLI), page navigation (page objects), Jest template strings (generators).

### `generators/` — structured data → file contents

Pure functions: `Challenge` → strings ready to write. No browser.

| File | Purpose |
|------|---------|
| `solutionTemplate.ts` | `generateSolution(challenge)` → solution file body |
| `jestTestTemplate.ts` | `generateTest(challenge)` → `.test.ts` body |
| `paths.ts` | `getSolutionPath`, `getTestPath` — resolve output paths from a `ChallengeLocation` |

`solutionTemplate.ts` emits an exported function scaffold. `jestTestTemplate.ts` emits a Jest file that imports the solution via the `solution/` alias and builds `it(...)` blocks from scraped `testCases`:

```typescript
// generated tests/2026/august/pangram.test.ts
import { isPangram } from "solution/2026/august/pangram";

describe("isPangram", () => {
  it("...", () => {
    expect(isPangram("hello", "helo")).toBe(true);
  });
});
```

**Does not belong here:** scraping, clipboard handling, CLI argument parsing.

### `utils/` — shared helpers

| File | Purpose |
|------|---------|
| `date.ts` | Parse year/month CLI input, resolve `Temporal.PlainYearMonth`, format month folder names (`august`, etc.) |

Used by `cli/new-challenge.ts` and `generators/paths.ts` when placing files under `2026/` and `tests/`.

### How it connects in `cli/new-challenge.ts`

1. Bootstrap the browser (`setup.ts`)
2. Navigate to the challenge (`pageObjects/`)
3. Scrape → `Challenge` (`scraper/`)
4. Generate content and paths (`generators/`)
5. Write files to `2026/` and `tests/` (`cli/`)

`app.ts` can coordinate the same steps if you want a single orchestration entry point.

### Quick reference

| Question | Answer |
|----------|--------|
| What is a test case on the page? | `types/testCase.ts` |
| How do I read test cases from the DOM? | `scraper/parsers/testCases.ts` |
| Who calls the browser and returns `Challenge`? | `scraper/challengeScraper.ts` |
| Who builds the Jest file string? | `generators/jestTestTemplate.ts` |
| Who builds the solution scaffold? | `generators/solutionTemplate.ts` |
| Who writes to `2026/` and `tests/`? | `cli/new-challenge.ts` |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm new` | Scrape a challenge and generate the solution + test files |
| `pnpm copy` | Copy a solution to the clipboard for pasting on the challenge page |
| `pnpm test` | Run Jest against `tests/**/*.test.ts` |
| `pnpm start` | Run arbitrary TypeScript via `tsx` |

## Daily workflow

1. **Create** — `pnpm new` fetches the current (or specified) challenge, writes a scaffold under `2026/<month>/`, and generates a test file under `tests/2026/<month>/`.
2. **Solve** — implement the function in the generated solution file.
3. **Verify** — `pnpm test` runs the scraped test cases locally.
4. **Submit** — `pnpm copy <path>` copies the solution to your clipboard for pasting on freeCodeCamp.

## TypeScript

The project uses TypeScript 7 with `module` / `moduleResolution` set to `nodenext`. There is no build step (`noEmit: true`); tooling runs directly via `tsx`.

### Imports

Tooling code uses path aliases with a `src/` prefix and no file extension:

```typescript
import { ChallengeScraper } from "src/scraper/challengeScraper";
import type { Challenge } from "src/types/challenge";
```

Challenge solutions do not import from `src/` or any package. Generated test files import the solution through the `solution/` path alias:

```typescript
// tests/2026/august/pangram.test.ts
import { isPangram } from "solution/2026/august/pangram";
```

Jest resolves `src/*` and `solution/*` imports via `moduleNameMapper` in `jest.config.ts`. The same `solution/*` mapping is defined in `tsconfig.json` for editor support.

## Stack

| Package | Role |
|---------|------|
| [TypeScript](https://www.typescriptlang.org/) 7 | Editor support and tooling types |
| [tsx](https://github.com/privatenumber/tsx) | Run tooling without a build step |
| [WebdriverIO](https://webdriver.io/) | Browser automation for scraping (used as a library, not the WDIO test runner) |
| [Jest](https://jestjs.io/) 30 | Verify solutions against scraped test cases |
