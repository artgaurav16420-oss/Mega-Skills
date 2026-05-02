---
name: using-git-worktrees
description: Use when starting feature work that needs isolation from current workspace or before executing implementation plans - creates isolated git worktrees with smart directory selection and safety verification
---

# Using Git Worktrees

## Overview

Git worktrees create isolated workspaces sharing the same repository, allowing work on multiple branches simultaneously without switching.

**Core principle:** Systematic directory selection + safety verification = reliable isolation.

**Announce at start:** "I'm using the using-git-worktrees skill to set up an isolated workspace."

## Directory Selection Process

Follow this priority order:

### 1. Check Existing Directories

```bash
## Check in priority order
ls -d .worktrees 2>/dev/null     # Preferred (hidden)
ls -d worktrees 2>/dev/null      # Alternative
```

**If found:** Use that directory. If both exist, `.worktrees` wins.

### 2. Check CLAUDE.md

```bash
grep -i "worktree.*director" CLAUDE.md 2>/dev/null
```

**If preference specified:** Use it without asking.

### 3. Ask User

If no directory exists and no CLAUDE.md preference:

```text
No worktree directory found. Where should I create worktrees?
1. .worktrees/ (project-local, hidden)
2. ~/.config/mega-skills/worktrees/<project-name>/ (global location)
Which would you prefer?
```

## Safety Verification

### For Project-Local Directories (.worktrees or worktrees)

#### MUST verify directory is ignored before creating worktree

```bash
## Check if directory is ignored (respects local, global, and system gitignore)
git check-ignore -q .worktrees 2>/dev/null || git check-ignore -q worktrees 2>/dev/null
```

### If NOT ignored

Per Jesse's rule "Fix broken things immediately":

1. Add appropriate line to .gitignore

1. Commit the change

1. Proceed with worktree creation

**Why critical:** Prevents accidentally committing worktree contents to repository.

### For Global Directory (~/.config/mega-skills/worktrees)

No .gitignore verification needed - outside project entirely.

## Creation Steps

### 1. Detect Project Name

```bash
project=$(basename "$(git rev-parse --show-toplevel)")
```

### 2. Create Worktree

```bash
## Determine full path
case $LOCATION in
  .worktrees|worktrees)
    path="$LOCATION/$BRANCH_NAME"
    ;;
  ~/.config/mega-skills/worktrees/*)
    path="~/.config/mega-skills/worktrees/$project/$BRANCH_NAME"
    ;;
esac
## Create worktree with new branch
git worktree add "$path" -b "$BRANCH_NAME"
cd "$path"
```

### 3. Run Project Setup

Auto-detect and run appropriate setup:

```bash
## Node.js
if [ -f package.json ]; then npm install; fi
## Rust
if [ -f Cargo.toml ]; then cargo build; fi
## Python
if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
if [ -f pyproject.toml ]; then poetry install; fi
## Go
if [ -f go.mod ]; then go mod download; fi
```

### 4. Verify Clean Baseline

Run tests to ensure worktree starts clean:

```bash
## Examples - use project-appropriate command
npm test
cargo test
pytest
go test ./...
```

**If tests fail:** Report failures, ask whether to proceed or investigate.

**If tests pass:** Report ready.

### 5. Report Location

```text
Worktree ready at <full-path>
Tests passing (<N> tests, 0 failures)
Ready to implement <feature-name>
```

## Quick Reference

| Situation | Action |
|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-----|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-----|
| `.worktrees/` exists | Use it (verify ignored) |

| `worktrees/` exists | Use it (verify ignored) |

| Both exist | Use `.worktrees/` |

| Neither exists | Check CLAUDE.md → Ask user |
| Directory not ignored | Add to .gitignore + commit |
| Tests fail during baseline | Report failures + ask |
| No package.json/Cargo.toml | Skip dependency install |

## Common Mistakes

### Skipping ignore verification

1. **Problem:** Worktree contents get tracked, pollute git status

1. **Fix:** Always use `git check-ignore` before creating project-local worktree

### Assuming directory location

1. **Problem:** Creates inconsistency, violates project conventions

1. **Fix:** Follow priority: existing > CLAUDE.md > ask

### Proceeding with failing tests

1. **Problem:** Can't distinguish new bugs from pre-existing issues

1. **Fix:** Report failures, get explicit permission to proceed

### Hardcoding setup commands

1. **Problem:** Breaks on projects using different tools

1. **Fix:** Auto-detect from project files (package.json, etc.)

## Example Workflow

```text
You: I'm using the using-git-worktrees skill to set up an isolated workspace.
[Check .worktrees/ - exists]
[Verify ignored - git check-ignore confirms .worktrees/ is ignored]
[Create worktree: git worktree add .worktrees/auth -b feature/auth]
[Run npm install]
[Run npm test - 47 passing]
Worktree ready at /Users/jesse/myproject/.worktrees/auth
Tests passing (47 tests, 0 failures)
Ready to implement auth feature
```

## Red Flags

### Never

1. Create worktree without verifying it's ignored (project-local)

1. Skip baseline test verification

1. Proceed with failing tests without asking

1. Assume directory location when ambiguous

1. Skip CLAUDE.md check

#### Always

1. Follow directory priority: existing > CLAUDE.md > ask

1. Verify directory is ignored for project-local

1. Auto-detect and run project setup

1. Verify clean test baseline

## Integration

### Called by

1. **brainstorming** (Phase 4) - REQUIRED when design is approved and implementation follows

1. **subagent-driven-development** - REQUIRED before executing any tasks

1. **executing-plans** - REQUIRED before executing any tasks

1. Any skill needing isolated workspace

#### Pairs with

1. **finishing-a-development-branch** - R