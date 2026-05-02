---
name: caveman-compress
description: >
  Compress natural language memory files (CLAUDE.md, todos, preferences) into caveman format
  to save input tokens. Preserves all technical substance, code, URLs, and structure.
  Compressed version overwrites the original file. Human-readable backup saved as FILE.original.md.
  Trigger: /caveman:compress FILEPATH or "compress memory file"
---

# Caveman Compress

## Purpose

Compress natural language files (CLAUDE.md, todos, preferences) into caveman-speak to reduce input tokens. Compressed version overwrites original. Human-readable backup saved as `<filename>.original.md`.

## Trigger

`/caveman:compress <filepath>` or when user asks to compress a memory file.

## Process

1. The compression scripts live in `caveman-compress/scripts/` (adjacent to this SKILL.md). If the path is not immediately available, search for `caveman-compress/scripts/__main__.py`.

1. Run:

cd caveman-compress && python3 -m scripts `<absolute_filepath>`

1. The CLI will:

1. detect file type (no tokens)

1. call Claude to compress

1. validate output (no tokens)

1. if errors: cherry-pick fix with Claude (targeted fixes only, no recompression)

1. retry up to 2 times

1. if still failing after 2 retries: report error to user, leave original file untouched

1. Return result to user

## Compression Rules

### Remove

1. Articles: a, an, the

1. Filler: just, really, basically, actually, simply, essentially, generally

1. Pleasantries: "sure", "certainly", "of course", "happy to", "I'd recommend"

1. Hedging: "it might be worth", "you could consider", "it would be good to"

1. Redundant phrasing: "in order to" → "to", "make sure to" → "ensure", "the reason is because" → "because"

1. Connective fluff: "however", "furthermore", "additionally", "in addition"

### Preserve EXACTLY (never modify)

1. Code blocks (fenced ``` and indented)

1. Inline code (`backtick content`)

1. URLs and links (full URLs, markdown links)

1. File paths (`/src/components/...`, `./config.yaml`)

1. Commands (`npm install`, `git commit`, `docker build`)

1. Technical terms (library names, API names, protocols, algorithms)

1. Proper nouns (project names, people, companies)

1. Dates, version numbers, numeric values

1. Environment variables (`$HOME`, `NODE_ENV`)

### Preserve Structure

1. All markdown headings (keep exact heading text, compress body below)

1. Bullet point hierarchy (keep nesting level)

1. Numbered lists (keep numbering)

1. Tables (compress cell text, keep structure)

1. Frontmatter/YAML headers in markdown files

### Compress

1. Use short synonyms: "big" not "extensive", "fix" not "implement a solution for", "use" not "utilize"

1. Fragments OK: "Run tests before commit" not "You should always run tests before committing"

1. Drop "you should", "make sure to", "remember to" — just state the action

1. Merge redundant bullets that say the same thing differently

1. Keep one example where multiple examples show the same pattern

CRITICAL RULE:
Anything inside ``` ... ``` must be copied EXACTLY.

Do not:

1. remove comments

1. remove spacing

1. reorder lines

1. shorten commands

1. simplify anything

Inline code (`...`) must be preserved EXACTLY.

Do not modify anything inside backticks.

If file contains code blocks:

1. Treat code blocks as read-only regions

1. Only compress text outside them

1. Do not merge sections around code

## Pattern

Original:
> You should always make sure to run the test suite before pushing any changes to the main branch. This is important because it helps catch bugs early and prevents broken builds from being deployed to production.

Compressed:
> Run tests before push to main. Catch bugs early, prevent broken prod deploys.

Original:
> The application uses a microservices architecture with the following components. The API gateway handles all incoming requests and routes them to the appropriate service. The authentication service is responsible for managing user sessions and JWT tokens.

Compressed:
> Microservices architecture. API gateway route all requests to services. Auth service manage user sessions + JWT tokens.

## Boundaries

1. ONLY compress natural language files (.md, .txt, .typ, .typst, .tex, extensionless)

1. NEVER modify: .py, .js, .ts, .json, .yaml, .yml, .toml, .env, .lock, .css, .html, .xml, .sql, .sh

1. If file has mixed content (prose + code), compress ONLY the prose sections

1. If unsure whether something is code or prose, leave it unchanged

1. Original file is backed up as FILE.original.md before overwriting

1. Never compress FILE.original.md (skip it)
