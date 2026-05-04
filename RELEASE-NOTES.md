# Mega-Skills Release Notes

## v5.0.7 (2026-03-31)

### GitHub Copilot CLI Support

1. **SessionStart context injection** — Copilot CLI v1.0.11 added support for `additionalContext` in sessionStart hook output. The session-start hook now detects the `COPILOT_CLI` environment variable and emits the SDK-standard `{ "additionalContext": "..." }` format, giving Copilot CLI users the full mega-skills bootstrap at session start. (Original fix by @culinablaz in PR #910)
1. **Tool mapping** — added `references/copilot-tools.md` with the full Claude Code to Copilot CLI tool equivalence table
1. **Skill and README updates** — added Copilot CLI to the `using-mega-skills` skill's platform instructions and README installation section

### OpenCode Fixes

1. **Skills path consistency** — the bootstrap text no longer advertises a misleading `configDir/skills/mega-skills/` path that didn't match the runtime path. The agent should use the native `skill` tool, not navigate to files by path. Tests now use consistent paths derived from a single source of truth. (#847, #916)
1. **Bootstrap as user message** — moved bootstrap injection from `experimental.chat.system.transform` to `experimental.chat.messages.transform`, prepending to the first user message instead of adding a system message. Avoids token bloat from system messages repeated every turn (#750) and fixes compatibility with Qwen and other models that break on multiple system messages (#894).

## v5.0.6 (2026-03-24)

### Inline Self-Review Replaces Subagent Review Loops

The subagent review loop (dispatching a fresh agent to review plans/specs) doubled execution time (~25 min overhead) without measurably improving plan quality. Regression testing across 5 versions with 5 trials each showed identical quality scores regardless of whether the review loop ran.

1. **brainstorming** — replaced Spec Review Loop (subagent dispatch + 3-iteration cap) with inline Spec Self-Review checklist: placeholder scan, internal consistency, scope check, ambiguity check
1. **writing-plans** — replaced Plan Review Loop (subagent dispatch + 3-iteration cap) with inline Self-Review checklist: spec coverage, placeholder scan, type consistency
1. **writing-plans** — added explicit "No Placeholders" section defining plan failures (TBD, vague descriptions, undefined references, "similar to Task N")
1. Self-review catches 3-5 real bugs per run in ~30s instead of ~25 min, with comparable defect rates to the subagent approach

### Brainstorm Server

1. **Session directory restructured** — the brainstorm server session directory now contains two peer subdirectories: `content/` (HTML files served to the browser) and `state/` (events, server-info, pid, log). Previously, server state and user interaction data were stored alongside served content, making them accessible over HTTP. The `screen_dir` and `state_dir` paths are both included in the server-started JSON. (Reported by 吉田仁)

### Bug Fixes

1. **Owner-PID lifecycle fixes** — the brainstorm server's owner-PID monitoring had two bugs causing false shutdowns within 60 seconds: (1) EPERM from cross-user PIDs (Tailscale SSH, etc.) was treated as "process dead", and (2) on WSL the grandparent PID resolves to a short-lived subprocess that exits before the first lifecycle check. Fixed by treating EPERM as "alive" and validating the owner PID at startup — if it's already dead, monitoring is disabled and the server relies on the 30-minute idle timeout. This also removes the Windows/MSYS2-specific carve-out from `start-server.sh` since the server now handles it generically. (#879)
1. **writing-skills** — corrected false claim that SKILL.md frontmatter supports "only two fields"; now says "two required fields" and links to the agentskills.io specification for all supported fields (PR #882 by @arittr)

### Codex App Compatibility

1. **codex-tools** — added named agent dispatch mapping documenting how to translate Claude Code's named agent types to Codex's `spawn_agent` with worker roles (PR #647 by @arittr)
1. **codex-tools** — added environment detection and Codex App finishing sections for worktree-aware skills (by @arittr)
1. **Design spec** — added Codex App compatibility design spec (PRI-823) covering read-only environment detection, worktree-safe skill behavior, and sandbox fallback patterns (by @arittr)

## v5.0.5 (2026-03-17)

### Bug Fixes (2)

1. **Brainstorm server ESM fix** — renamed `server.js` → `server.cjs` so the brainstorming server starts correctly on Node.js 22+ where the root `package.json` `"type": "module"` caused `require()` to fail. (PR #784 by @sarbojitrana, fixes #774, #780, #783)
1. **Brainstorm owner-PID on Windows** — skip PID lifecycle monitoring on Windows/MSYS2 where the PID namespace is invisible to Node.js, preventing the server from self-terminating after 60 seconds. (#770, docs from PR #768 by @lucasyhzlu-debug)
1. **stop-server.sh reliability** — verify the server process actually died before reporting success. SIGTERM + 2s wait + SIGKILL fallback. (#723)

### Changed

1. **Execution handoff** — restore user choice between subagent-driven and inline execution after plan writing. Subagent-driven is recommended but no longer mandatory.

## v5.0.4 (2026-03-16)

### Review Loop Refinements

Dramatically reduces token usage and speeds up spec and plan reviews by eliminating unnecessary review passes and tightening reviewer focus.

1. **Single whole-plan review** — plan reviewer now reviews the complete plan in one pass instead of chunk-by-chunk. Removed all chunk-related concepts (`## Chunk N:` headings, 1000-line chunk limits, per-chunk dispatch).
1. **Raised the bar for blocking issues** — both spec and plan reviewer prompts now include a "Calibration" section: only flag issues that would cause real problems during implementation. Minor wording, stylistic preferences, and formatting quibbles should not block approval.
1. **Reduced max review iterations** — from 5 to 3 for both spec and plan review loops. If the reviewer is calibrated correctly, 3 rounds is plenty.
1. **Streamlined reviewer checklists** — spec reviewer trimmed from 7 categories to 5; plan reviewer from 7 to 4. Removed formatting-focused checks (task syntax, chunk size) in favor of substance (buildability, spec alignment).

### OpenCode

1. **One-line plugin install** — OpenCode plugin now auto-registers the skills directory via a `config` hook. No symlinks or `skills.paths` config needed. Install is just adding one line to `opencode.json`. (PR #753)
1. **Added `package.json`** so OpenCode can install mega-skills as an npm package from git.

### Bug Fixes (3)

1. **Verify server actually stopped** — `stop-server.sh` now confirms the process is dead before reporting success. SIGTERM + 2s wait + SIGKILL fallback. Reports failure if the process survives. (PR #751)
1. **Generic agent language** — brainstorm companion waiting page now says "the agent" instead of "Claude".

## v5.0.3 (2026-03-15)

### Cursor Support

1. **Cursor hooks** — added `hooks/hooks-cursor.json` with Cursor's camelCase format (`sessionStart`, `version: 1`) and updated `.cursor-plugin/plugin.json` to reference it. Fixed platform detection in `session-start` to check `CURSOR_PLUGIN_ROOT` first (Cursor may also set `CLAUDE_PLUGIN_ROOT`). (Based on PR #709)

### Bug Fixes (4)

1. **Stop firing SessionStart hook on `--resume`** — the startup hook was re-injecting context on resumed sessions, which already have the context in their conversation history. The hook now fires only on `startup`, `clear`, and `compact`.
1. **Bash 5.3+ hook hang** — replaced heredoc (`cat <<EOF`) with `printf` in `hooks/session-start`. Fixes indefinite hang on macOS with Homebrew bash 5.3+ caused by a bash regression with large variable expansion in heredocs. (#572, #571)
1. **POSIX-safe hook script** — replaced `${BASH_SOURCE[0]:-$0}` with `$0` in `hooks/session-start`. Fixes "Bad substitution" error on Ubuntu/Debian where `/bin/sh` is dash. (#553)
1. **Portable shebangs** — replaced `#!/bin/bash` with `#!/usr/bin/env bash` in all shell scripts. Fixes execution on NixOS, FreeBSD, and macOS with Homebrew bash where `/bin/bash` is outdated or missing. (#700)
1. **Brainstorm server on Windows** — auto-detect Windows/Git Bash (`OSTYPE=msys*`, `MSYSTEM`) and switch to foreground mode, fixing silent server failure caused by `nohup`/`disown` process reaping. (#737)
1. **Codex docs fix** — replaced deprecated `collab` flag with `multi_agent` in Codex documentation. (PR #749)

## v5.0.2 (2026-03-11)

### Zero-Dependency Brainstorm Server

#### Removed all vendored node_modules — server.js is now fully self-contained

1. Replaced Express/Chokidar/WebSocket dependencies with zero-dependency Node.js server using built-in `http`, `fs`, and `crypto` modules
1. Removed ~1,200 lines of vendored `node_modules/`, `package.json`, and `package-lock.json`
1. Custom WebSocket protocol implementation (RFC 6455 framing, ping/pong, proper close handshake)
1. Native `fs.watch()` file watching replaces Chokidar
1. Full test suite: HTTP serving, WebSocket protocol, file watching, and integration tests

### Brainstorm Server Reliability

1. **Auto-exit after 30 minutes idle** — server shuts down when no clients are connected, preventing orphaned processes
1. **Owner process tracking** — server monitors the parent harness PID and exits when the owning session dies
1. **Liveness check** — skill verifies server is responsive before reusing an existing instance
1. **Encoding fix** — proper `<meta charset="utf-8">` on served HTML pages

### Subagent Context Isolation

1. All delegation skills (brainstorming, dispatching-parallel-agents, requesting-code-review, subagent-driven-development, writing-plans) now include context isolation principle
1. Subagents receive only the context they need, preventing context window pollution

## v5.0.1 (2026-03-10)

### Agentskills Compliance

#### Brainstorm-server moved into skill directory

1. Moved `lib/brainstorm-server/` → `skills/brainstorming/scripts/` per the [agentskills.io](https://agentskills.io) specification
1. All `${CLAUDE_PLUGIN_ROOT}/lib/brainstorm-server/` references replaced with relative `scripts/` paths
1. Skills are now fully portable across platforms — no platform-specific env vars needed to locate scripts
1. `lib/` directory removed (was the last remaining content)

### New Features

#### Gemini CLI extension

1. Native Gemini CLI extension support via `gemini-extension.json` and `GEMINI.md` at repo root
1. `GEMINI.md` @imports `using-mega-skills` skill and tool mapping table at session start
1. Gemini CLI tool mapping reference (`skills/using-mega-skills/references/gemini-tools.md`) — translates Claude Code tool names (Read, Write, Edit, Bash, etc.) to Gemini CLI equivalents (read_file, write_file, replace, etc.)
1. Documents Gemini CLI limitations: no subagent support, skills fall back to `executing-plans`
1. Extension root at repo root for cross-platform compatibility (avoids Windows symlink issues)
1. Install instructions added to README

### Improvements

#### Multi-platform brainstorm server launch

1. Per-platform launch instructions in visual-companion.md: Claude Code (default mode), Codex (auto-foreground via `CODEX_CI`), Gemini CLI (`--foreground` with `is_background`), and fallback for other environments
1. Server now writes startup JSON to `$SCREEN_DIR/.server-info` so agents can find the URL and port even when stdout is hidden by background execution

#### Brainstorm server dependencies bundled

1. `node_modules` vendored into the repo so the brainstorm server works immediately on fresh plugin installs without requiring `npm` at runtime
1. Removed `fsevents` from bundled deps (macOS-only native binary; chokidar falls back gracefully without it)
1. Fallback auto-install via `npm install` if `node_modules` is missing

#### OpenCode tool mapping fix

1. `TodoWrite` → `todowrite` (was incorrectly mapped to `update_plan`); verified against OpenCode source

### Bug Fixes (5)

**Windows/Linux: single quotes break SessionStart hook** (#577, #529, #644, PR #585)

1. Single quotes around `${CLAUDE_PLUGIN_ROOT}` in hooks.json fail on Windows (cmd.exe doesn't recognize single quotes as path delimiters) and on Linux (single quotes prevent variable expansion)
1. Fix: replaced single quotes with escaped double quotes — works across macOS bash, Windows cmd.exe, Windows Git Bash, and Linux, with and without spaces in paths
1. Verified on Windows 11 (NT 10.0.26200.0) with Claude Code 2.1.72 and Git for Windows

**Brainstorming spec review loop skipped** (#677)

1. The spec review loop (dispatch spec-document-reviewer subagent, iterate until approved) existed in the prose "After the Design" section but was missing from the checklist and process flow diagram
1. Since agents follow the diagram and checklist more reliably than prose, the spec review step was being skipped entirely
1. Added step 7 (spec review loop) to the checklist and corresponding nodes to the dot graph
1. Tested with `claude --plugin-dir` and `claude-session-driver`: worker now correctly dispatches the reviewer

**Cursor install command** (PR #676)

1. Fixed Cursor install command in README: `/plugin-add` → `/add-plugin` (confirmed via Cursor 2.5 release announcement)

**User review gate in brainstorming** (#565)

1. Added explicit user review step between spec completion and writing-plans handoff
1. User must approve the spec before implementation planning begins
1. Checklist, process flow, and prose updated with the new gate

#### Session-start hook emits context only once per platform

1. Hook now detects whether it's running in Claude Code or another platform
1. Emits `hookSpecificOutput` for Claude Code, `additional_context` for others — prevents double context injection

#### Linting fix in token analysis script

1. `except:` → `except Exception:` in `tests/claude-code/analyze-token-usage.py`

### Maintenance

#### Removed dead code

1. Deleted `lib/skills-core.js` and its test (`tests/opencode/test-skills-core.js`) — unused since February 2026
1. Removed skills-core existence check from `tests/opencode/test-plugin-loading.sh`

### Community

1. @karuturi — Claude Code official marketplace install instructions (PR #610)
1. @mvanhorn — session-start hook dual-emit fix, OpenCode tool mapping fix
1. @daniel-graham — linting fix for bare except
1. PR #585 author — Windows/Linux hooks quoting fix

---

## v5.0.0 (2026-03-09)

### Breaking Changes

#### Specs and plans directory restructured

1. Specs (brainstorming output) now save to `docs/mega-skills/specs/YYYY-MM-DD-`<topic>`-design.md`
1. Plans (writing-plans output) now save to `docs/mega-skills/plans/YYYY-MM-DD-`<feature-name>`.md`
1. User preferences for spec/plan locations override these defaults
1. All internal skill references, test files, and example paths updated to match
1. Migration: move existing files from `docs/plans/` to new locations if desired

#### Subagent-driven development mandatory on capable harnesses

Writing-plans no longer offers a choice between subagent-driven and executing-plans. On harnesses with subagent support (Claude Code, Codex), subagent-driven-development is required. Executing-plans is reserved for harnesses without subagent capability, and now tells the user that Mega-Skills works better on a subagent-capable platform.

#### Executing-plans no longer batches

Removed the "execute 3 tasks then stop for review" pattern. Plans now execute continuously, stopping only for blockers.

#### Slash commands deprecated

`/brainstorm`, `/write-plan`, and `/execute-plan` now show deprecation notices pointing users to the corresponding skills. Commands will be removed in the next major release.

### New Features (2)

#### Visual brainstorming companion

Optional browser-based companion for brainstorming sessions. When a topic would benefit from visuals, the brainstorming skill offers to show mockups, diagrams, comparisons, and other content in a browser window alongside terminal conversation.

1. `lib/brainstorm-server/` — WebSocket server with browser helper library, session management scripts, and dark/light themed frame template ("Mega-Skills Brainstorming" with GitHub link)
1. `skills/brainstorming/visual-companion.md` — Progressive disclosure guide for server workflow, screen authoring, and feedback collection
1. Brainstorming skill adds a visual companion decision point to its process flow: after exploring project context, the skill evaluates whether upcoming questions involve visual content and offers the companion in its own message
1. Per-question decision: even after accepting, each question is evaluated for whether browser or terminal is more appropriate
1. Integration tests in `tests/brainstorm-server/`

#### Document review system

Automated review loops for spec and plan documents using subagent dispatch:

1. `skills/brainstorming/spec-document-reviewer-prompt.md` — Reviewer checks completeness, consistency, architecture, and YAGNI
1. `skills/writing-plans/plan-document-reviewer-prompt.md` — Reviewer checks spec alignment, task decomposition, file structure, and file size
1. Brainstorming dispatches spec reviewer after writing the design doc
1. Writing-plans includes chunk-based plan review loop after each section
1. Review loops repeat until approved or escalate after 5 iterations
1. End-to-end tests in `tests/claude-code/test-document-review-system.sh`
1. Design spec and implementation plan in `docs/mega-skills/`

#### Architecture guidance across the skill pipeline

Design-for-isolation and file-size-awareness guidance added to brainstorming, writing-plans, and subagent-driven-development:

1. **Brainstorming** — New sections: "Design for isolation and clarity" (clear boundaries, well-defined interfaces, independently testable units) and "Working in existing codebases" (follow existing patterns, targeted improvements only)
1. **Writing-plans** — New "File Structure" section: map out files and responsibilities before defining tasks. New "Scope Check" backstop: catch multi-subsystem specs that should have been decomposed during brainstorming
1. **SDD implementer** — New "Code Organization" section (follow plan's file structure, report concerns about growing files) and "When You're in Over Your Head" escalation guidance
1. **SDD code quality reviewer** — Now checks architecture, unit decomposition, plan conformance, and file growth
1. **Spec/plan reviewers** — Architecture and file size added to review criteria
1. **Scope assessment** — Brainstorming now assesses whether a project is too large for a single spec. Multi-subsystem requests are flagged early and decomposed into sub-projects, each with its own spec → plan → implementation cycle

#### Subagent-driven development improvements

1. **Model selection** — Guidance for choosing model capability by task type: cheap models for mechanical implementation, standard for integration, capable for architecture and review
1. **Implementer status protocol** — Subagents now report DONE, DONE_WITH_CONCERNS, BLOCKED, or NEEDS_CONTEXT. Controller handles each status appropriately: re-dispatching with more context, upgrading model capability, breaking tasks apart, or escalating to human

### Improvements (2)

#### Instruction priority hierarchy

Added explicit priority ordering to using-mega-skills:

1. User's explicit instructions (CLAUDE.md, AGENTS.md, direct requests) — highest priority
1. Mega-Skills skills — override default system behavior
1. Default system prompt — lowest priority

If CLAUDE.md or AGENTS.md says "don't use TDD" and a skill says "always use TDD," the user's instructions win.

#### SUBAGENT-STOP gate

Added `<SUBAGENT-STOP>` block to using-mega-skills. Subagents dispatched for specific tasks now skip the skill instead of activating the 1% rule and invoking full skill workflows.

#### Multi-platform improvements

1. Codex tool mapping moved to progressive disclosure reference file (`references/codex-tools.md`)
1. Platform Adaptation pointer added so non-Claude-Code platforms can find tool equivalents
1. Plan headers now address "agentic workers" instead of "Claude" specifically
1. Collab feature requirement documented in `docs/README.codex.md`

#### Writing-plans template updates

1. Plan steps now use checkbox syntax (`- [ ] **Step N:**`) for progress tracking
1. Plan header references both subagent-driven-development and executing-plans with platform-aware routing

---

## v4.3.1 (2026-02-21)

### Added

#### Cursor support

Mega-Skills now works with Cursor's plugin system. Includes a `.cursor-plugin/plugin.json` manifest and Cursor-specific installation instructions in the README. The SessionStart hook output now includes an `additional_context` field alongside the existing `hookSpecificOutput.additionalContext` for Cursor hook compatibility.

### Fixed

#### Windows: Restored polyglot wrapper for reliable hook execution (#518, #504, #491, #487, #466, #440)

Claude Code's `.sh` auto-detection on Windows was prepending `bash` to the hook command, breaking execution. The fix:

1. Renamed `session-start.sh` to `session-start` (extensionless) so auto-detection doesn't interfere
1. Restored `run-hook.cmd` polyglot wrapper with multi-location bash discovery (standard Git for Windows paths, then PATH fallback)
1. Exits silently if no bash is found rather than erroring
1. On Unix, the wrapper runs the script directly via `exec bash`
1. Uses POSIX-safe `dirname "$0"` path resolution (works on dash/sh, not just bash)

This fixes SessionStart failures on Windows with spaces in paths, missing WSL, `set -euo pipefail` fragility on MSYS, and backslash mangling.

## v4.3.0 (2026-02-12)

This fix should dramatically improve mega-skills skills compliance and should reduce the chances of Claude entering its native plan mode unintentionally.

### Changed (2)

#### Brainstorming skill now enforces its workflow instead of describing it

Models were skipping the design phase and jumping straight to implementation skills like frontend-design, or collapsing the entire brainstorming process into a single text block. The skill now uses hard gates, a mandatory checklist, and a graphviz process flow to enforce compliance:

1. `<HARD-GATE>`: no implementation skills, code, or scaffolding until design is presented and user approves
1. Explicit checklist (6 items) that must be created as tasks and completed in order
1. Graphviz process flow with `writing-plans` as the only valid terminal state
1. Anti-pattern callout for "this is too simple to need a design" — the exact rationalization models use to skip the process
1. Design section sizing based on section complexity, not project complexity

#### Using-mega-skills workflow graph intercepts EnterPlanMode

Added an `EnterPlanMode` intercept to the skill flow graph. When the model is about to enter Claude's native plan mode, it checks whether brainstorming has happened and routes through the brainstorming skill instead. Plan mode is never entered.

### Fixed (2)

#### SessionStart hook now runs synchronously

Changed `async: true` to `async: false` in hooks.json. When async, the hook could fail to complete before the model's first turn, meaning using-mega-skills instructions weren't in context for the first message.

## v4.2.0 (2026-02-05)

### Breaking Changes (2)

#### Codex: Replaced bootstrap CLI with native skill discovery

The `mega-skills-codex` bootstrap CLI, Windows `.cmd` wrapper, and related bootstrap content file have been removed. Codex now uses native skill discovery via `~/.agents/skills/mega-skills/` symlink, so the old `use_skill`/`find_skills` CLI tools are no longer needed.

Installation is now just clone + symlink (documented in INSTALL.md). No Node.js dependency required. The old `~/.codex/skills/` path is deprecated.

### Fixes

#### Windows: Fixed Claude Code 2.1.x hook execution (#331)

Claude Code 2.1.x changed how hooks execute on Windows: it now auto-detects `.sh` files in commands and prepends `bash`. This broke the polyglot wrapper pattern because `bash "run-hook.cmd" session-start.sh` tries to execute the `.cmd` file as a bash script.

Fix: hooks.json now calls session-start.sh directly. Claude Code 2.1.x handles the bash invocation automatically. Also added .gitattributes to enforce LF line endings for shell scripts (fixes CRLF issues on Windows checkout).

#### Windows: SessionStart hook runs async to prevent terminal freeze (#404, #413, #414, #419)

The synchronous SessionStart hook blocked the TUI from entering raw mode on Windows, freezing all keyboard input. Running the hook async prevents the freeze while still injecting mega-skills context.

#### Windows: Fixed O(n^2) `escape_for_json` performance

The character-by-character loop using `${input:$i:1}` was O(n^2) in bash due to substring copy overhead. On Windows Git Bash this took 60+ seconds. Replaced with bash parameter substitution (`${s//old/new}`) which runs each pattern as a single C-level pass — 7x faster on macOS, dramatically faster on Windows.

#### Codex: Fixed Windows/PowerShell invocation (#285, #243)

1. Windows doesn't respect shebangs, so directly invoking the extensionless `mega-skills-codex` script triggered an "Open with" dialog. All invocations now prefixed with `node`.
1. Fixed `~/` path expansion on Windows — PowerShell doesn't expand `~` when passed as an argument to `node`. Changed to `$HOME` which expands correctly in both bash and PowerShell.

#### Codex: Fixed path resolution in installer

Used `fileURLToPath()` instead of manual URL pathname parsing to correctly handle paths with spaces and special characters on all platforms.

#### Codex: Fixed stale skills path in writing-skills

Updated `~/.codex/skills/` reference (deprecated) to `~/.agents/skills/` for native discovery.

### Improvements (3)

#### Worktree isolation now required before implementation

Added `using-git-worktrees` as a required skill for both `subagent-driven-development` and `executing-plans`. Implementation workflows now explicitly require setting up an isolated worktree before starting work, preventing accidental work directly on main.

#### Main branch protection softened to require explicit consent

Instead of prohibiting main branch work entirely, the skills now allow it with explicit user consent. More flexible while still ensuring users are aware of the implications.

#### Simplified installation verification

Removed `/help` command check and specific slash command list from verification steps. Skills are primarily invoked by describing what you want to do, not by running specific commands.

#### Codex: Clarified subagent tool mapping in bootstrap

Improved documentation of how Codex tools map to Claude Code equivalents for subagent workflows.

### Tests

1. Added worktree requirement test for subagent-driven-development
1. Added main branch red flag warning test
1. Fixed case sensitivity in skill recognition test assertions

---

## v4.1.1 (2026-01-23)

### Fixes (2)

#### OpenCode: Standardized on `plugins/` directory per official docs (#343)

OpenCode's official documentation uses `~/.config/opencode/plugins/` (plural). Our docs previously used `plugin/` (singular). While OpenCode accepts both forms, we've standardized on the official convention to avoid confusion.

Changes:

1. Renamed `.opencode/plugin/` to `.opencode/plugins/` in repo structure
1. Updated all installation docs (INSTALL.md, README.opencode.md) across all platforms
1. Updated test scripts to match

#### OpenCode: Fixed symlink instructions (#339, #342)

1. Added explicit `rm` before `ln -s` (fixes "file already exists" errors on reinstall)
1. Added missing skills symlink step that was absent from INSTALL.md
1. Updated from deprecated `use_skill`/`find_skills` to native `skill` tool references

---

## v4.1.0 (2026-01-23)

### Breaking Changes (3)

#### OpenCode: Switched to native skills system

Mega-Skills for OpenCode now uses OpenCode's native `skill` tool instead of custom `use_skill`/`find_skills` tools. This is a cleaner integration that works with OpenCode's built-in skill discovery.

**Migration required:** Skills must be symlinked to `~/.config/opencode/skills/mega-skills/` (see updated installation docs).

### Fixes (3)

#### OpenCode: Fixed agent reset on session start (#226)

The previous bootstrap injection method using `session.prompt({ noReply: true })` caused OpenCode to reset the selected agent to "build" on first message. Now uses `experimental.chat.system.transform` hook which modifies the system prompt directly without side effects.

#### OpenCode: Fixed Windows installation (#232)

1. Removed dependency on `skills-core.js` (eliminates broken relative imports when file is copied instead of symlinked)
1. Added comprehensive Windows installation docs for cmd.exe, PowerShell, and Git Bash
1. Documented proper symlink vs junction usage for each platform

#### Claude Code: Fixed Windows hook execution for Claude Code 2.1.x

Claude Code 2.1.x changed how hooks execute on Windows: it now auto-detects `.sh` files in commands and prepends `bash `. This broke the polyglot wrapper pattern because `bash "run-hook.cmd" session-start.sh` tries to execute the .cmd file as a bash script.

Fix: hooks.json now calls session-start.sh directly. Claude Code 2.1.x handles the bash invocation automatically. Also added .gitattributes to enforce LF line endings for shell scripts (fixes CRLF issues on Windows checkout).

---

## v4.0.3 (2025-12-26)

### Improvements (4)

#### Strengthened using-mega-skills skill for explicit skill requests

Addressed a failure mode where Claude would skip invoking a skill even when the user explicitly requested it by name (e.g., "subagent-driven-development, please"). Claude would think "I know what that means" and start working directly instead of loading the skill.

Changes:

1. Updated "The Rule" to say "Invoke relevant or requested skills" instead of "Check for skills" - emphasizing active invocation over passive checking
1. Added "BEFORE any response or action" - the original wording only mentioned "response" but Claude would sometimes take action without responding first
1. Added reassurance that invoking a wrong skill is okay - reduces hesitation
1. Added new red flag: "I know what that means" → Knowing the concept ≠ using the skill

#### Added explicit skill request tests

New test suite in `tests/explicit-skill-requests/` that verifies Claude correctly invokes skills when users request them by name. Includes single-turn and multi-turn test scenarios.

## v4.0.2 (2025-12-23)

### Fixes (4)

#### Slash commands now user-only

Added `disable-model-invocation: true` to all three slash commands (`/brainstorm`, `/execute-plan`, `/write-plan`). Claude can no longer invoke these commands via the Skill tool—they're restricted to manual user invocation only.

The underlying skills (`mega-skills:brainstorming`, `mega-skills:executing-plans`, `mega-skills:writing-plans`) remain available for Claude to invoke autonomously. This change prevents confusion when Claude would invoke a command that just redirects to a skill anyway.

## v4.0.1 (2025-12-23)

### Fixes (5)

#### Clarified how to access skills in Claude Code

Fixed a confusing pattern where Claude would invoke a skill via the Skill tool, then try to Read the skill file separately. The `using-mega-skills` skill now explicitly states that the Skill tool loads skill content directly—no need to read files.

1. Added "How to Access Skills" section to `using-mega-skills`
1. Changed "read the skill" → "invoke the skill" in instructions
1. Updated slash commands to use fully qualified skill names (e.g., `mega-skills:brainstorming`)

**Added GitHub thread reply guidance to receiving-code-review** (h/t @ralphbean)

Added a note about replying to inline review comments in the original thread rather than as top-level PR comments.

**Added automation-over-documentation guidance to writing-skills** (h/t @EthanJStark)

Added guidance that mechanical constraints should be automated, not documented—save skills for judgment calls.

## v4.0.0 (2025-12-17)

### New Features (3)

#### Two-stage code review in subagent-driven-development

Subagent workflows now use two separate review stages after each task:

1. **Spec compliance review** - Skeptical reviewer verifies implementation matches spec exactly. Catches missing requirements AND over-building. Won't trust implementer's report—reads actual code.

1. **Code quality review** - Only runs after spec compliance passes. Reviews for clean code, test coverage, maintainability.

This catches the common failure mode where code is well-written but doesn't match what was requested. Reviews are loops, not one-shot: if reviewer finds issues, implementer fixes them, then reviewer checks again.

Other subagent workflow improvements:

1. Controller provides full task text to workers (not file references)
1. Workers can ask clarifying questions before AND during work
1. Self-review checklist before reporting completion
1. Plan read once at start, extracted to TodoWrite

New prompt templates in `skills/subagent-driven-development/`:

1. `implementer-prompt.md` - Includes self-review checklist, encourages questions
1. `spec-reviewer-prompt.md` - Skeptical verification against requirements
1. `code-quality-reviewer-prompt.md` - Standard code review

#### Debugging techniques consolidated with tools

`systematic-debugging` now bundles supporting techniques and tools:

1. `root-cause-tracing.md` - Trace bugs backward through call stack
1. `defense-in-depth.md` - Add validation at multiple layers
1. `condition-based-waiting.md` - Replace arbitrary timeouts with condition polling
1. `find-polluter.sh` - Bisection script to find which test creates pollution
1. `condition-based-waiting-example.ts` - Complete implementation from real debugging session

#### Testing anti-patterns reference

`test-driven-development` now includes `testing-anti-patterns.md` covering:

1. Testing mock behavior instead of real behavior
1. Adding test-only methods to production classes
1. Mocking without understanding dependencies
1. Incomplete mocks that hide structural assumptions

#### Skill test infrastructure

Three new test frameworks for validating skill behavior:

`tests/skill-triggering/` - Validates skills trigger from naive prompts without explicit naming. Tests 6 skills to ensure descriptions alone are sufficient.

`tests/claude-code/` - Integration tests using `claude -p` for headless testing. Verifies skill usage via session transcript (JSONL) analysis. Includes `analyze-token-usage.py` for cost tracking.

`tests/subagent-driven-dev/` - End-to-end workflow validation with two complete test projects:

1. `go-fractals/` - CLI tool with Sierpinski/Mandelbrot (10 tasks)
1. `svelte-todo/` - CRUD app with localStorage and Playwright (12 tasks)

### Major Changes

#### DOT flowcharts as executable specifications

Rewrote key skills using DOT/GraphViz flowcharts as the authoritative process definition. Prose becomes supporting content.

**The Description Trap** (documented in `writing-skills`): Discovered that skill descriptions override flowchart content when descriptions contain workflow summaries. Claude follows the short description instead of reading the detailed flowchart. Fix: descriptions must be trigger-only ("Use when X") with no process details.

#### Skill priority in using-mega-skills

When multiple skills apply, process skills (brainstorming, debugging) now explicitly come before implementation skills. "Build X" triggers brainstorming first, then domain skills.

#### brainstorming trigger strengthened

Description changed to imperative: "You MUST use this before any creative work—creating features, building components, adding functionality, or modifying behavior."

### Breaking Changes (4)

**Skill consolidation** - Six standalone skills merged:

1. `root-cause-tracing`, `defense-in-depth`, `condition-based-waiting` → bundled in `systematic-debugging/`
1. `testing-skills-with-subagents` → bundled in `writing-skills/`
1. `testing-anti-patterns` → bundled in `test-driven-development/`
1. `sharing-skills` removed (obsolete)

### Other Improvements

1. **render-graphs.js** - Tool to extract DOT diagrams from skills and render to SVG
1. **Rationalizations table** in using-mega-skills - Scannable format including new entries: "I need more context first", "Let me explore first", "This feels productive"
1. **docs/testing.md** - Guide to testing skills with Claude Code integration tests

---

## v3.6.2 (2025-12-03)

### Fixed (3)

1. **Linux Compatibility**: Fixed polyglot hook wrapper (`run-hook.cmd`) to use POSIX-compliant syntax
1. Replaced bash-specific `${BASH_SOURCE[0]:-$0}` with standard `$0` on line 16
1. Resolves "Bad substitution" error on Ubuntu/Debian systems where `/bin/sh` is dash
1. Fixes #141

---

## v3.5.1 (2025-11-24)

### Changed (3)

1. **OpenCode Bootstrap Refactor**: Switched from `chat.message` hook to `session.created` event for bootstrap injection
1. Bootstrap now injects at session creation via `session.prompt()` with `noReply: true`
1. Explicitly tells the model that using-mega-skills is already loaded to prevent redundant skill loading
1. Consolidated bootstrap content generation into shared `getBootstrapContent()` helper
1. Cleaner single-implementation approach (removed fallback pattern)

---

## v3.5.0 (2025-11-23)

### Added (2)

1. **OpenCode Support**: Native JavaScript plugin for OpenCode.ai
1. Custom tools: `use_skill` and `find_skills`
1. Message insertion pattern for skill persistence across context compaction
1. Automatic context injection via chat.message hook
1. Auto re-injection on session.compacted events
1. Three-tier skill priority: project > personal > mega-skills
1. Project-local skills support (`.opencode/skills/`)
1. Shared core module (`lib/skills-core.js`) for code reuse with Codex
1. Automated test suite with proper isolation (`tests/opencode/`)
1. Platform-specific documentation (`docs/README.opencode.md`, `docs/README.codex.md`)

### Changed (4)

1. **Refactored Codex Implementation**: Now uses shared `lib/skills-core.js` ES module
1. Eliminates code duplication between Codex and OpenCode
1. Single source of truth for skill discovery and parsing
1. Codex successfully loads ES modules via Node.js interop

1. **Improved Documentation**: Rewrote README to explain problem/solution clearly
1. Removed duplicate sections and conflicting information
1. Added complete workflow description (brainstorm → plan → execute → finish)
1. Simplified platform installation instructions
1. Emphasized skill-checking protocol over automatic activation claims

---

## v3.4.1 (2025-10-31)

### Improvements (5)

1. Optimized mega-skills bootstrap to eliminate redundant skill execution. The `using-mega-skills` skill content is now provided directly in session context, with clear guidance to use the Skill tool only for other skills. This reduces overhead and prevents the confusing loop where agents would execute `using-mega-skills` manually despite already having the content from session start.

## v3.4.0 (2025-10-30)

### Improvements (6)

1. Simplified `brainstorming` skill to return to original conversational vision. Removed heavyweight 6-phase process with formal checklists in favor of natural dialogue: ask questions one at a time, then present design in 200-300 word sections with validation. Keeps documentation and implementation handoff features.

## v3.3.1 (2025-10-28)

### Improvements (7)

1. Updated `brainstorming` skill to require autonomous recon before questioning, encourage recommendation-driven decisions, and prevent agents from delegating prioritization back to humans.
1. Applied writing clarity improvements to `brainstorming` skill following Strunk's "Elements of Style" principles (omitted needless words, converted negative to positive form, improved parallel construction).

### Bug Fixes (6)

1. Clarified `writing-skills` guidance so it points to the correct agent-specific personal skill directories (`~/.claude/skills` for Claude Code, `~/.codex/skills` for Codex).

## v3.3.0 (2025-10-28)

### New Features (4)

#### Experimental Codex Support

1. Added unified `mega-skills-codex` script with bootstrap/use-skill/find-skills commands
1. Cross-platform Node.js implementation (works on Windows, macOS, Linux)
1. Namespaced skills: `mega-skills:skill-name` for mega-skills skills, `skill-name` for personal
1. Personal skills override mega-skills skills when names match
1. Clean skill display: shows name/description without raw frontmatter
1. Helpful context: shows supporting files directory for each skill
1. Tool mapping for Codex: TodoWrite→update_plan, subagents→manual fallback, etc.
1. Bootstrap integration with minimal AGENTS.md for automatic startup
1. Complete installation guide and bootstrap instructions specific to Codex

#### Key differences from Claude Code integration

1. Single unified script instead of separate tools
1. Tool substitution system for Codex-specific equivalents
1. Simplified subagent handling (manual work instead of delegation)
1. Updated terminology: "Mega-Skills skills" instead of "Core skills"

### Files Added

1. `.codex/INSTALL.md` - Installation guide for Codex users
1. `.codex/mega-skills-bootstrap.md` - Bootstrap instructions with Codex adaptations
1. `.codex/mega-skills-codex` - Unified Node.js executable with all functionality

**Note:** Codex support is experimental. The integration provides core mega-skills functionality but may require refinement based on user feedback.

## v3.2.3 (2025-10-23)

### Improvements (8)

#### Updated using-mega-skills skill to use Skill tool instead of Read tool

1. Changed skill invocation instructions from Read tool to Skill tool
1. Updated description: "using Read tool" → "using Skill tool"
1. Updated step 3: "Use the Read tool" → "Use the Skill tool to read and run"
1. Updated rationalization list: "Read the current version" → "Run the current version"

The Skill tool is the proper mechanism for invoking skills in Claude Code. This update corrects the bootstrap instructions to guide agents toward the correct tool.

### Files Changed

1. Updated: `skills/using-mega-skills/SKILL.md` - Changed tool references from Read to Skill

## v3.2.2 (2025-10-21)

### Improvements (9)

#### Strengthened using-mega-skills skill against agent rationalization

1. Added EXTREMELY-IMPORTANT block with absolute language about mandatory skill checking
1. "If even 1% chance a skill applies, you MUST read it"
1. "You do not have a choice. You cannot rationalize your way out."
1. Added MANDATORY FIRST RESPONSE PROTOCOL checklist
1. 5-step process agents must complete before any response
1. Explicit "responding without this = failure" consequence
1. Added Common Rationalizations section with 8 specific evasion patterns
1. "This is just a simple question" → WRONG
1. "I can check files quickly" → WRONG
1. "Let me gather information first" → WRONG
1. Plus 5 more common patterns observed in agent behavior

These changes address observed agent behavior where they rationalize around skill usage despite clear instructions. The forceful language and pre-emptive counter-arguments aim to make non-compliance harder.

### Files Changed (2)

1. Updated: `skills/using-mega-skills/SKILL.md` - Added three layers of enforcement to prevent skill-skipping rationalization

## v3.2.1 (2025-10-20)

### New Features (5)

#### Code reviewer agent now included in plugin

1. Added `mega-skills:code-reviewer` agent to plugin's `agents/` directory
1. Agent provides systematic code review against plans and coding standards
1. Previously required users to have personal agent configuration
1. All skill references updated to use namespaced `mega-skills:code-reviewer`
1. Fixes #55

### Files Changed (3)

1. New: `agents/code-reviewer.md` - Agent definition with review checklist and output format
1. Updated: `skills/requesting-code-review/SKILL.md` - References to `mega-skills:code-reviewer`
1. Updated: `skills/subagent-driven-development/SKILL.md` - References to `mega-skills:code-reviewer`

## v3.2.0 (2025-10-18)

### New Features (6)

#### Design documentation in brainstorming workflow

1. Added Phase 4: Design Documentation to brainstorming skill
1. Design documents now written to `docs/plans/YYYY-MM-DD-`<topic>`-design.md` before implementation
1. Restores functionality from original brainstorming command that was lost during skill conversion
1. Documents written before worktree setup and implementation planning
1. Tested with subagent to verify compliance under time pressure

### Breaking Changes (5)

#### Skill reference namespace standardization

1. All internal skill references now use `mega-skills:` namespace prefix
1. Updated format: `mega-skills:test-driven-development` (previously just `test-driven-development`)
1. Affects all REQUIRED SUB-SKILL, RECOMMENDED SUB-SKILL, and REQUIRED BACKGROUND references
1. Aligns with how skills are invoked using the Skill tool
1. Files updated: brainstorming, executing-plans, subagent-driven-development, systematic-debugging, testing-skills-with-subagents, writing-plans, writing-skills

### Improvements (10)

#### Design vs implementation plan naming

1. Design documents use `-design.md` suffix to prevent filename collisions
1. Implementation plans continue using existing `YYYY-MM-DD-`<feature-name>`.md` format
1. Both stored in `docs/plans/` directory with clear naming distinction

## v3.1.1 (2025-10-17)

### Bug Fixes (7)

1. **Fixed command syntax in README** (#44) - Updated all command references to use correct namespaced syntax (`/mega-skills:brainstorm` instead of `/brainstorm`). Plugin-provided commands are automatically namespaced by Claude Code to avoid conflicts between plugins.

## v3.1.0 (2025-10-17)

### Breaking Changes (6)

#### Skill names standardized to lowercase

1. All skill frontmatter `name:` fields now use lowercase kebab-case matching directory names
1. Examples: `brainstorming`, `test-driven-development`, `using-git-worktrees`
1. All skill announcements and cross-references updated to lowercase format
1. This ensures consistent naming across directory names, frontmatter, and documentation

### New Features (7)

#### Enhanced brainstorming skill

1. Added Quick Reference table showing phases, activities, and tool usage
1. Added copyable workflow checklist for tracking progress
1. Added decision flowchart for when to revisit earlier phases
1. Added comprehensive AskUserQuestion tool guidance with concrete examples
1. Added "Question Patterns" section explaining when to use structured vs open-ended questions
1. Restructured Key Principles as scannable table

#### Anthropic best practices integration

1. Added `skills/writing-skills/anthropic-best-practices.md` - Official Anthropic skill authoring guide
1. Referenced in writing-skills SKILL.md for comprehensive guidance
1. Provides patterns for progressive disclosure, workflows, and evaluation

### Improvements (11)

#### Skill cross-reference clarity

1. All skill references now use explicit requirement markers:
1. `**REQUIRED BACKGROUND:**` - Prerequisites you must understand
1. `**REQUIRED SUB-SKILL:**` - Skills that must be used in workflow
1. `**Complementary skills:**` - Optional but helpful related skills
1. Removed old path format (`skills/collaboration/X` → just `X`)
1. Updated Integration sections with categorized relationships (Required vs Complementary)
1. Updated cross-reference documentation with best practices

#### Alignment with Anthropic best practices

1. Fixed description grammar and voice (fully third-person)
1. Added Quick Reference tables for scanning
1. Added workflow checklists Claude can copy and track
1. Appropriate use of flowcharts for non-obvious decision points
1. Improved scannable table formats
1. All skills well under 500-line recommendation

### Bug Fixes (8)

1. **Re-added missing command redirects** - Restored `commands/brainstorm.md` and `commands/write-plan.md` that were accidentally removed in v3.0 migration
1. Fixed `defense-in-depth` name mismatch (was `Defense-in-Depth-Validation`)
1. Fixed `receiving-code-review` name mismatch (was `Code-Review-Reception`)
1. Fixed `commands/brainstorm.md` reference to correct skill name
1. Removed references to non-existent related skills

### Documentation

#### writing-skills improvements

1. Updated cross-referencing guidance with explicit requirement markers
1. Added reference to Anthropic's official best practices
1. Improved examples showing proper skill reference format

## v3.0.1 (2025-10-16)

### Changes

We now use Anthropic's first-party skills system!

## v2.0.2 (2025-10-12)

### Bug Fixes (9)

1. **Fixed false warning when local skills repo is ahead of upstream** - The initialization script was incorrectly warning "New skills available from upstream" when the local repository had commits ahead of upstream. The logic now correctly distinguishes between three git states: local behind (should update), local ahead (no warning), and diverged (should warn).

## v2.0.1 (2025-10-12)

### Bug Fixes (10)

1. **Fixed session-start hook execution in plugin context** (#8, PR #9) - The hook was failing silently with "Plugin hook error" preventing skills context from loading. Fixed by:
1. Using `${BASH_SOURCE[0]:-$0}` fallback when BASH_SOURCE is unbound in Claude Code's execution context
1. Adding `|| true` to handle empty grep results gracefully when filtering status flags

---

## Mega-Skills v2.0.0 Release Notes

## Overview

Mega-Skills v2.0 makes skills more accessible, maintainable, and community-driven through a major architectural shift.

The headline change is **skills repository separation**: all skills, scripts, and documentation have moved from the plugin into a dedicated repository ([obra/mega-skills-skills]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).)]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).)))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).)))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).)))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).)))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).)))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).)))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).)))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).))))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)).)))))))))))))))))](https://github.com/artgaurav16420-oss/Mega-Skills-skills)).)))))))))))))))))) This transforms mega-skills from a monolithic plugin into a lightweight shim that manages a local clone of the skills repository. Skills auto-update on session start. Users fork and contribute improvements via standard git workflows. The skills library versions independently from the plugin.

Beyond infrastructure, this release adds nine new skills focused on problem-solving, research, and architecture. We rewrote the core **using-skills** documentation with imperative tone and clearer structure, making it easier for Claude to understand when and how to use skills. **find-skills** now outputs paths you can paste directly into the Read tool, eliminating friction in the skills discovery workflow.

Users experience seamless operation: the plugin handles cloning, forking, and updating automatically. Contributors find the new architecture makes improving and sharing skills trivial. This release lays the foundation for skills to evolve rapidly as a community resource.

## Breaking Changes (7)

### Skills Repository Separation

**The biggest change:** Skills no longer live in the plugin. They've been moved to a separate repository at [obra/mega-skills-skills]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).)]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).)))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).)))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).)))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).)))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).)))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).)))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).)))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).))))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills).)))))))))))))))))](https://github.com/artgaurav16420-oss/Mega-Skills-skills).))))))))))))))))))

#### What this means for you

1. **First install:** Plugin automatically clones skills to `~/.config/mega-skills/skills/`
1. **Forking:** During setup, you'll be offered the option to fork the skills repo (if `gh` is installed)
1. **Updates:** Skills auto-update on session start (fast-forward when possible)
1. **Contributing:** Work on branches, commit locally, submit PRs to upstream
1. **No more shadowing:** Old two-tier system (personal/core) replaced with single-repo branch workflow

#### Migration

If you have an existing installation:

1. Your old `~/.config/mega-skills/.git` will be backed up to `~/.config/mega-skills/.git.bak`
1. Old skills will be backed up to `~/.config/mega-skills/skills.bak`
1. Fresh clone of obra/mega-skills-skills will be created at `~/.config/mega-skills/skills/`

### Removed Features

1. **Personal mega-skills overlay system** - Replaced with git branch workflow
1. **setup-personal-mega-skills hook** - Replaced by initialize-skills.sh

## New Features (8)

### Skills Repository Infrastructure

**Automatic Clone & Setup** (`lib/initialize-skills.sh`)

1. Clones obra/mega-skills-skills on first run
1. Offers fork creation if GitHub CLI is installed
1. Sets up upstream/origin remotes correctly
1. Handles migration from old installation

#### Auto-Update

1. Fetches from tracking remote on every session start
1. Auto-merges with fast-forward when possible
1. Notifies when manual sync needed (branch diverged)
1. Uses pulling-updates-from-skills-repository skill for manual sync

### New Skills

**Problem-Solving Skills** (`skills/problem-solving/`)

1. **collision-zone-thinking** - Force unrelated concepts together for emergent insights
1. **inversion-exercise** - Flip assumptions to reveal hidden constraints
1. **meta-pattern-recognition** - Spot universal principles across domains
1. **scale-game** - Test at extremes to expose fundamental truths
1. **simplification-cascades** - Find insights that eliminate multiple components
1. **when-stuck** - Dispatch to right problem-solving technique

**Research Skills** (`skills/research/`)

1. **tracing-knowledge-lineages** - Understand how ideas evolved over time

**Architecture Skills** (`skills/architecture/`)

1. **preserving-productive-tensions** - Keep multiple valid approaches instead of forcing premature resolution

### Skills Improvements

#### using-skills (formerly getting-started)

1. Renamed from getting-started to using-skills
1. Complete rewrite with imperative tone (v4.0.0)
1. Front-loaded critical rules
1. Added "Why" explanations for all workflows
1. Always includes /SKILL.md suffix in references
1. Clearer distinction between rigid rules and flexible patterns

#### writing-skills

1. Cross-referencing guidance moved from using-skills
1. Added token efficiency section (word count targets)
1. Improved CSO (Claude Search Optimization) guidance

#### sharing-skills

1. Updated for new branch-and-PR workflow (v2.0.0)
1. Removed personal/core split references

**pulling-updates-from-skills-repository** (new)

1. Complete workflow for syncing with upstream
1. Replaces old "updating-skills" skill

### Tools Improvements

#### find-skills

1. Now outputs full paths with /SKILL.md suffix
1. Makes paths directly usable with Read tool
1. Updated help text

#### skill-run

1. Moved from scripts/ to skills/using-skills/
1. Improved documentation

### Plugin Infrastructure

#### Session Start Hook

1. Now loads from skills repository location
1. Shows full skills list at session start
1. Prints skills location info
1. Shows update status (updated successfully / behind upstream)
1. Moved "skills behind" warning to end of output

#### Environment Variables

1. `SUPERPOWERS_SKILLS_ROOT` set to `~/.config/mega-skills/skills`
1. Used consistently throughout all paths

## Bug Fixes (11)

1. Fixed duplicate upstream remote addition when forking
1. Fixed find-skills double "skills/" prefix in output
1. Removed obsolete setup-personal-mega-skills call from session-start
1. Fixed path references throughout hooks and commands

## Documentation (2)

### README

1. Updated for new skills repository architecture
1. Prominent link to mega-skills-skills repo
1. Updated auto-update description
1. Fixed skill names and references
1. Updated Meta skills list

### Testing Documentation

1. Added comprehensive testing checklist (`docs/TESTING-CHECKLIST.md`)
1. Created local marketplace config for testing
1. Documented manual testing scenarios

## Technical Details

### File Changes

#### Added (3)

1. `lib/initialize-skills.sh` - Skills repo initialization and auto-update
1. `docs/TESTING-CHECKLIST.md` - Manual testing scenarios
1. `.claude-plugin/marketplace.json` - Local testing config

#### Removed

1. `skills/` directory (82 files) - Now in obra/mega-skills-skills
1. `scripts/` directory - Now in obra/mega-skills-skills/skills/using-skills/
1. `hooks/setup-personal-mega-skills.sh` - Obsolete

#### Modified

1. `hooks/session-start.sh` - Use skills from ~/.config/mega-skills/skills
1. `commands/brainstorm.md` - Updated paths to SUPERPOWERS_SKILLS_ROOT
1. `commands/write-plan.md` - Updated paths to SUPERPOWERS_SKILLS_ROOT
1. `commands/execute-plan.md` - Updated paths to SUPERPOWERS_SKILLS_ROOT
1. `README.md` - Complete rewrite for new architecture

### Commit History

This release includes:

1. 20+ commits for skills repository separation
1. PR #1: Amplifier-inspired problem-solving and research skills
1. PR #2: Personal mega-skills overlay system (later replaced)
1. Multiple skill refinements and documentation improvements

## Upgrade Instructions

### Fresh Install

```bash
## In Claude Code
/plugin marketplace add obra/mega-skills-marketplace
/plugin install mega-skills@mega-skills-marketplace
```

The plugin handles everything automatically.

### Upgrading from v1.x

1. **Backup your personal skills** (if you have any):

```bash
   cp -r ~/.config/mega-skills/skills ~/mega-skills-skills-backup
```

1. **Update the plugin:**

```bash
   /plugin update mega-skills
```

1. **On next session start:**
1. Old installation will be backed up automatically
1. Fresh skills repo will be cloned
1. If you have GitHub CLI, you'll be offered the option to fork

1. **Migrate personal skills** (if you had any):
1. Create a branch in your local skills repo
1. Copy your personal skills from backup
1. Commit and push to your fork
1. Consider contributing back via PR

## What's Next

### For Users

1. Explore the new problem-solving skills
1. Try the branch-based workflow for skill improvements
1. Contribute skills back to the community

### For Contributors

1. Skills repository is now at [https://github.com/artgaurav16420-oss/Mega-Skills-skills]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))))))))))))](https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))))))))))))
1. Fork → Branch → PR workflow
1. See skills/meta/writing-skills/SKILL.md for TDD approach to documentation

## Known Issues

None at this time.

## Credits

1. Problem-solving skills inspired by Amplifier patterns
1. Community contributions and feedback
1. Extensive testing and iteration on skill effectiveness

---

**Full Changelog:** [https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main)]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main)))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main)))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main)))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main)))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main)))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main)))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main)))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main))))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main)))))))))))))))))](https://github.com/artgaurav16420-oss/Mega-Skills/compare/dd013f6...main))))))))))))))))))
**Skills Repository:** [https://github.com/artgaurav16420-oss/Mega-Skills-skills]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills-skills)))))))))))))))))](https://github.com/artgaurav16420-oss/Mega-Skills-skills))))))))))))))))))
**Issues:** [https://github.com/artgaurav16420-oss/Mega-Skills/issues]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))))))))](https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))))))))
