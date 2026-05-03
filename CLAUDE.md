# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Tooling
- **Sync Skills**: `npx mega-skills sync` (Initialize/update skills in target project)
- **Health Check**: `npx mega-skills doctor` (Verify system binaries and environment)
- **CLI Entry**: `node scripts/cli.js [command]` (Direct execution of CLI logic)
- **Auto Skill Selection**: `npx mega-skills auto "<task>"` (Find best skill for task)
- **Persistent Auto Mode**: `/auto-skills` (Activate session-wide orchestration)

### Maintenance
- **Version Bump**: `./scripts/bump-version.sh`
- **Skill Sync**: `node scripts/sync_skills.cjs`
- **Repo Hardening**: `node scripts/mega_hardener.cjs`

## High-Level Architecture

Mega-Skills is a **Zero-Dependency Plugin** designed as a "Development OS" for AI agents. It does not provide traditional software libraries but instead injects high-fidelity reasoning workflows (Skills) into agent loops.

### System Structure
- `skills/`: The heart of the project. Contains `SKILL.md` files that define agent behaviors, constraints, and methodologies.
- `scripts/`: Core operational logic (CLI, sync, validation).
- `distribution/`: Compiled/packaged versions of agent harnesses.
- `docs/graph-wiki/`: Detailed knowledge base and technical specifications.
- `agents/`: Specialized agent definitions.

### Key Design Principles
- **Behavioral Shaping**: Skills are not prose; they are behavioral code. Changes must be evaluated for impact on agent output.
- **Zero Dependencies**: The core must remain dependency-free to ensure universal compatibility across different agent harnesses (Claude Code, Cursor, Windsurf, etc.).
- **Methodology-First**: Prioritizes a specific sequence: Brainstorming $\rightarrow$ Planning $\rightarrow$ TDD $\rightarrow$ Implementation.

## Mandatory Agent Instructions

**You are working within the Mega-Skills ecosystem.**

1. **Always Check for Skills:** Before starting any task, search the `skills/` directory for a relevant `SKILL.md`.
2. **Follow Methodology:** You MUST follow the Core Methodology skills (brainstorming, writing-plans, test-driven-development, etc.) for all software development tasks.
3. **Use Specialized Tools:** Leverage the specialized Anthropic and Composio skills (pdf, connect, mcp-builder, etc.) as and when required.
4. **No Placeholders:** Never use placeholders or theoretical examples when a skill can provide real utility.

## PR & Contribution Guardrails

This repository has a very high PR rejection rate due to "agent slop." To avoid rejection:

1. **No Slop**: Every change must solve a real, experienced problem. Speculative "cleanup" or "compliance" changes are rejected.
2. **PR Template**: Fill every section of `.github/PULL_REQUEST_TEMPLATE.md` with specific, real answers.
3. **Human-in-the-Loop**: A human must review the complete diff before submission.
4. **Verification**: New harness support requires a full session transcript of the "Acceptance Test" (Let's make a react todo list $\rightarrow$ auto-trigger `brainstorming`).
5. **Skill Evals**: Any modification to skill content requires adversarial pressure testing and before/after eval results.
