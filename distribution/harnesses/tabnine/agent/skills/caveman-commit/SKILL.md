---
name: caveman-commit
description: >
  Ultra-compressed commit message generator. Cuts noise from commit messages while preserving
  intent and reasoning. Conventional Commits format. Subject ≤50 chars, body only when "why"
  isn't obvious. Use when user says "write a commit", "commit message", "generate commit",
  "/commit", or invokes /caveman-commit. Auto-triggers when staging changes.
---

# Caveman Commit

Write commit messages terse and exact. Conventional Commits format. No fluff. Why over what.

## Rules

### Subject line

1. `<type>(`<scope>`): <imperative summary>` — `<scope>` optional

1. Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `build`, `ci`, `style`, `revert`

1. Imperative mood: "add", "fix", "remove" — not "added", "adds", "adding"

1. ≤50 chars when possible, hard cap 72

1. No trailing period

1. Match project convention for capitalization after the colon

#### Body (only if needed)

1. Skip entirely when subject is self-explanatory

1. Add body only for: non-obvious *why*, breaking changes, migration notes, linked issues

1. Wrap at 72 chars

1. Bullets `-` not `*`

1. Reference issues/PRs at end: `Closes #42`, `Refs #17`

#### What NEVER goes in

1. "This commit does X", "I", "we", "now", "currently" — the diff says what

1. "As requested by..." — use Co-authored-by trailer

1. "Generated with Claude Code" or any AI attribution

1. Emoji (unless project convention requires)

1. Restating the file name when scope already says it

## Examples

Diff: new endpoint for user profile with body explaining the why

1. ❌ "feat: add a new endpoint to get user profile information from the database"

1. ✅

```text
  feat(api): add GET /users/:id/profile
  Mobile client needs profile data without the full user payload
  to reduce LTE bandwidth on cold-launch screens.
  Closes #128
```

Diff: breaking API change

1. ✅

```text
  feat(api)!: rename /v1/orders to /v1/checkout
  BREAKING CHANGE: clients on /v1/orders must migrate to /v1/checkout
  before 2026-06-01. Old route returns 410 after that date.
```

## Auto-Clarity

Always include body for: breaking changes, security fixes, data migrations, anything reverting a prior commit. Never compress these into subject-only — future debuggers need the context.

## Boundaries

Only generates the commit message. Does not run `git commit`, does not stage files, does not amend. Output the message as a code block ready to paste. "stop caveman-commit" or "normal mode": revert to verbose commit style.
