---
name: commit-message
description: Generate a clean, concise, descriptive commit message by analyzing tracked and untracked git changes. Use when the user asks for a commit message, commit string, or suggested commit without committing.
---

# Commit Message

## Goal

Draft a commit message from the current working tree. Return the message in chat only — do **not** run `git commit`, `git add`, or `git push` unless the user explicitly asks.

## Workflow

Run these in parallel against the **current branch** unless the user names a specific branch:

```bash
git branch --show-current
git status
git diff
git diff --cached
git log --oneline -10
```

If the user gives a specific branch, compare or inspect that branch instead of assuming another one.

For untracked files, inspect their contents when needed:

```bash
git diff --no-index /dev/null <path>
```

## Analyze Changes

Review **all** relevant changes:

- Modified tracked files
- Staged and unstaged diffs together
- **Every untracked file** shown by `git status`

Summarize the **why**, not just the what. Classify the change when helpful: feature, refactor, fix, test, docs, chore.

### Untracked files (strict)

**Always include every untracked file** in the analysis and in the suggested commit message. The working tree is the source of truth.

The **only** allowed exclusions:

1. The user explicitly asks to omit specific paths or categories
2. Files that likely contain secrets (`.env`, credentials, tokens, keys) — warn the user; do not silently drop them from the analysis

**Do not** exclude untracked files based on your own judgment. Forbidden reasons include:

- "IDE or tooling" (e.g. `.cursor/`, `.vscode/`)
- "Probably not meant for the repo"
- "Should be a separate commit"
- "Unrelated to the main change"

If multiple areas changed, reflect **all** of them in one message (subject and/or body). Do not present a partial message and mention omitted paths only in a footnote. The user decides what to stage; the skill describes the full working tree.

## Message Style

Follow the repository's recent commit style from `git log`:

- Imperative mood (`Add`, `Refactor`, `Fix`, not `Added` / `Adding`)
- Concise subject line; add a body when the change spans multiple areas
- Body length: up to **4 sentences** by default; up to **8 sentences** when there are many changes
- Be descriptive enough that important changes are not left out
- Focus on purpose and impact

### Format

```
<subject line>

<optional body explaining why, not a file list>
```

Prefer a subject that stands alone. Add a body only when it adds context the subject cannot carry.

## Output

Return one suggested message that covers **all** analyzed changes (tracked, staged, and untracked). Ready to copy; use a fenced code block for the exact text.

Do **not** append "not included" lists for paths you chose to skip. If secrets were excluded, say so explicitly and warn — nothing else.

If the user will commit later, they may use:

```bash
git commit -m "$(cat <<'EOF'
<subject line>

<optional body>
EOF
)"
```

## Example

**Changes:** new `Year` types module, `YearMonth` refactor, `.vscode` settings for path-alias imports, calendar date parsing updates, new `.cursor/skills/commit-message/SKILL.md`.

**Suggested message:**

```
Add typed Month and YearMonth formats, VS Code settings, commit-message skill, and refactor calendar date parsing

Introduce month name constants and string-literal types for months and year-month inputs, extract resolveDesiredYearMonth into its own module, replace locale-based month parsing with constant-backed parsing, add .vscode settings to prefer non-relative path-alias imports, and add a Cursor skill for drafting commit messages from the full working tree.
```
