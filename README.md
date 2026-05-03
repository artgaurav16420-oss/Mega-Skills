# Mega-Skills: The OS for AI Agents

![Mega-Skills Banner](https://raw.githubusercontent.com/artgaurav16420-oss/Mega-Skills/main/assets/mega_skills_banner.png)

## Transform any LLM into an elite Software Engineer. 62+ executable skills for the agentic era

[![GitHub stars](https://img.shields.io/github/stars/artgaurav16420-oss/Mega-Skills?style=for-the-badge&color=yellow)](https://github.com/artgaurav16420-oss/Mega-Skills/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/artgaurav16420-oss/Mega-Skills?style=for-the-badge&color=blue)](https://github.com/artgaurav16420-oss/Mega-Skills/network/members)
[![CI](https://github.com/artgaurav16420-oss/Mega-Skills/actions/workflows/ci.yml/badge.svg)](https://github.com/artgaurav16420-oss/Mega-Skills/actions)
[![License](https://img.shields.io/github/license/artgaurav16420-oss/Mega-Skills?style=for-the-badge&color=green)](https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/LICENSE)
[![Discord](https://img.shields.io/discord/123456789012345678?style=for-the-badge&label=Discord&logo=discord&color=7289DA)](https://discord.gg/35wsABTejz)

---

## 🚀 Quick Start & Installation

Mega-Skills is a zero-dependency plugin that works across the entire agentic ecosystem.

### One-Command Setup

Install Mega-Skills globally directly from GitHub:

```bash
npm install -g https://github.com/artgaurav16420-oss/Mega-Skills
mega-skills sync
```

> [!IMPORTANT]
> `npm install -g ...` + `mega-skills sync` installs the CLI and syncs skills for generic/local workflows. For harness-native loading (for example **Antigravity**), you must also run that harness's extension install command from the Supported Platforms table below.

### System Health Check

Ensure your environment is ready for "Beast Mode" skills:

```bash
mega-skills doctor
```

### 🧠 Automatic Skill Orchestration (World First)

**This repo combines useful AI Skills in one AUTO skill. No more manually selecting skills.**

Mega-Skills features an **Autonomous Orchestrator** not found in any other agent library. It eliminates manual skill selection by using semantic embeddings to trigger the right workflow at the right time.

Learn more in the dedicated skill spec: [`skills/auto-skills/SKILL.md`](skills/auto-skills/SKILL.md).

#### ⚡ Persistent Auto Mode (Agent Mode)

Activate session-wide autonomous orchestration. The agent will automatically select and follow the best skill for every subsequent task.

- **Activate**: Type `/auto-skills` in your agent chat.
- **Deactivate**: Type `/stop-auto-skills`.

> [!TIP]
> **Why it's a Game-Changer (11/10 Rating):**
> This feature transforms Mega-Skills from a library into a **Development OS**. It provides zero-friction methodology selection, persistent reasoning guardrails, and automatic token efficiency (via Caveman synergy). It is the world's first autonomous skill-selection engine for AI agents.

#### 🔍 One-Off Skill Matching

Find the best skill for a specific task without entering persistent mode:

```bash
mega-skills auto "Your task description here"
```

#### 🛠️ Setup & Indexing

Create the semantic index for the orchestrator (only needed once):

```bash
npm run index-skills
```

### 🧪 Verify Installation

After installing for your harness, run:

```bash
mega-skills verify antigravity
```

This checks core Auto-Skills files and status-prefix contract and exits non-zero if required pieces are missing.

### Supported Platforms

| Harness | Install | Update | Uninstall | Verify |
| :--- | :--- | :--- | :--- | :--- |
| **Antigravity** | `antigravity extension install https://github.com/artgaurav16420-oss/Mega-Skills` | Re-run install command, then `mega-skills sync` | `antigravity extension remove Mega-Skills` *(if supported by your version)* | Start chat, run `/auto-skills`, confirm `[Auto-Skills: ...]` prefix appears |
| **Claude Code** | `/plugin install https://github.com/artgaurav16420-oss/Mega-Skills` | Re-run install command, then `mega-skills sync` | `/plugin remove Mega-Skills` *(if supported)* | Start chat, run `/auto-skills`, confirm skill auto-selection message |
| **GitHub Copilot** | `copilot plugin install https://github.com/artgaurav16420-oss/Mega-Skills` | Re-run install command, then `mega-skills sync` | `copilot plugin remove Mega-Skills` *(if supported)* | Start session, activate auto mode, confirm orchestration response tag |
| **Gemini CLI** | `gemini extensions install https://github.com/artgaurav16420-oss/Mega-Skills` | Re-run install command, then `mega-skills sync` | `gemini extensions remove Mega-Skills` *(if supported)* | Start chat, enable auto mode, confirm automatic skill activation |
| **Other / Generic** | `git clone https://github.com/artgaurav16420-oss/Mega-Skills` | Pull latest repo changes, then `mega-skills sync` | Delete cloned folder and remove local plugin wiring | Run `mega-skills auto "test task"` and confirm a skill match |

### 🧭 Troubleshooting Decision Tree

1. Skills not appearing in harness chat? → Run harness install command from the table.
2. Installed but still not loading? → Run `mega-skills sync`, then restart harness session.
3. Auto-Skills active but behavior drifting? → Run `mega-skills /auto-skills` again and confirm status prefix appears.
4. Still failing? → Run `mega-skills verify antigravity` and inspect failing checks.

#### ⚠️ Known Pitfalls

1. `npm install -g ...` + `mega-skills sync` alone does **not** register harness-native extensions.
2. Harnesses usually need their own install command (table above) before skills appear in chat.
3. If updates do not appear, re-run harness install command first, then `mega-skills sync`.

#### 🔄 Updating After Installation

To pull the latest skills and orchestration updates, re-run your harness install command (this refreshes the extension registration) and then sync:

```bash
# Antigravity example
antigravity extension install https://github.com/artgaurav16420-oss/Mega-Skills
mega-skills sync
```

> Tip: Re-running the same install command is the safest cross-harness update path when a dedicated `update` subcommand is not available.

---

### 📘 Auto-Skills Example Transcript

```text
User: /auto-skills
CLI: [Auto-Skills: Activating persistent mode + caveman lock]

User: mega-skills auto "build auth flow then add tests"
CLI:
[Auto-Skills Status]
Mode: active
Prefix: [Auto-Skills: auto-skills + caveman | escalation:on]
Turn: 1
```

## 💎 Why Mega-Skills

Most AI agents fail because they lack a **methodology**. They guess, they hallucinate, and they ignore edge cases. **Mega-Skills** fixes this by injecting 62+ high-fidelity workflows directly into the agent's reasoning loop.

1. **🔥 62+ Specialized Skills**: From cinematic presentations to autonomous subagent swarms.
2. **🧠 Autonomous Orchestration**: The only repo with semantic skill-triggering via `/auto-skills`.
3. **⚡ Lightning Fast**: Native Git symlinks reduce repository size by **99%** (from ~22,000 files to <600).
4. **🛠️ Universal Compatibility**: Natively supports **Cursor, Windsurf, Claude Code, Aider, Devin,** and more.
5. **🏗️ Industrial Grade**: Includes system-level shims, **Self-Healing Diagnostics (`doctor`)**, and a **Code Knowledge Graph Wiki**.

---

## 🌟 Trending Skills Spotlight

### 🦴 Caveman Mode (`caveman`)

**The ultimate token-saver.** Forces agents to communicate in ultra-compressed, technical language. Cuts token usage by ~75% while maintaining 100% precision.
> "Why use many word when few word do trick?"

### 🕸️ Code Knowledge Graph (`docs/graph-wiki`)

**The repo's semantic nervous system.** An auto-generated knowledge base extracted from the codebase's community structure. Provides a portable, cross-linked wiki of functions, classes, and execution flows with zero manual documentation overhead.

### 🛡️ Security Auditor (`security-auditor`)

**Red-Team in your pocket.** Automatically performs static analysis to detect SQLi, XSS, and mobile-specific vulnerabilities before they ever hit a branch.

### 📊 Excel Mastery (`xlsx`)

**Industrial spreadsheet engineering.** Includes a full LibreOffice-powered recalculation engine to ensure formula integrity.

---

## ⚡ Unbeatable Skill Combos

Mega-Skills are designed to be **stacked**. Combine these skills to turn your agent into an elite engineering team:

| Combo Name | Skills Stack | Result |
| :--- | :--- | :--- |
| **The "Fortress"** | `security-auditor` + `test-driven-development` | Zero-vulnerability code with 100% test coverage. |
| **The "Scientist"** | `paper-to-code` + `advanced-rag-optimizer` | Implement state-of-the-art research with perfect retrieval grounding. |
| **The "Architect"** | `brainstorming` + `docs/graph-wiki` | Map out complex legacy codebases and design new systems with full context. |
| **The "Executive"** | `brainstorming` + `writing-plans` | Turn a vague idea into a professional roadmap and a production-ready codebase. |
| **The "Ghost"** | `caveman` + `memory-management` + `sequential-thinking` | Run 100+ turn sessions with zero context drift and minimal token cost. |

---

## 🏆 Master Skill Index (Tiered Value)

All skills are high-fidelity, but some define the very nature of agentic engineering.

### 🥇 Tier 1: The Core OS (Methodology & Reasoning)

*Fundamental skills that shape how the agent thinks and works.*

| Skill | Description | Value |
| :--- | :--- | :--- |
| `caveman` | Ultra-compressed communication (75% token savings) | 10/10 |
| `subagent-driven-development` | Autonomous multi-agent task delegation | 10/10 |
| `brainstorming` | Socratic architecture and requirements discovery | 10/10 |
| `test-driven-development` | Hard-enforced Red-Green-Refactor discipline | 10/10 |
| `writing-plans` | Atomic, verifiable implementation planning | 10/10 |
| `sequential-thinking` | Multi-turn reasoning and hypothesis mapping | 10/10 |
| `memory-management` | Persistent state tracking across long sessions | 10/10 |
| `systematic-debugging` | Hypothesis-driven root cause analysis | 10/10 |

### 🥈 Tier 2: Elite Engineering (Security, AI & Design)

*Professional-grade capabilities for complex technical domains.*

| Skill | Description | Value |
| :--- | :--- | :--- |
| `security-auditor` | Static analysis for SQLi, XSS, and Mobile threats | 9/10 |
| `paper-to-code` | Mathematical implementation of academic research | 9/10 |
| `advanced-rag-optimizer` | Production-grade RAG pipeline tuning | 9/10 |
| `infrastructure-as-code` | Terraform and Cloud automation guardrails | 9/10 |
| `claude-api` | Advanced Anthropic SDK patterns and prompt caching | 9/10 |
| `mcp-builder` | Building and debugging Model Context Protocol servers | 9/10 |
| `incident-postmortem` | Forensic SRE analysis of agentic failures | 9/10 |

### 🥉 Tier 3: Industrial Automation (Docs & Enterprise)

*Heavy-duty tools for data, documents, and workflows.*

| Skill | Description | Value |
| :--- | :--- | :--- |
| `xlsx` | Formula-aware Excel recalculation engine | 8/10 |
| `pdf` | Advanced PDF parsing, rotation, and form filling | 8/10 |
| `docx` | Programmatic Word document generation | 8/10 |
| `connect` | Composio-powered integration with 1000+ apps | 8/10 |
| `invoice-organizer` | Intelligent fiscal document management | 8/10 |
| `file-organizer` | Heuristic-based file system restructuring | 8/10 |
| `internal-comms` | Professional newsletter and FAQ generation | 8/10 |
| `doc-coauthoring` | Structured workflow for technical documentation | 8/10 |

(And 30+ more specialized skills inside the repo...)

---

## 🏗️ The Methodology: "The Golden Path"

Mega-Skills isn't a collection of scripts; it's a **Development OS**.

1. **Socratic Brainstorming**: If the spec isn't clear, the code won't be either.
2. **High-Fidelity Planning**: Atomic units of work with specific verification commands.
3. **Strict TDD**: Write a failing test, verify failure, implement, verify pass.
4. **Continuous State**: Persistent memory tracks decisions and context drift.

---

## 🔒 Security & Reliability

Mega-Skills is built for professional use-cases:

1. **Self-Healing Diagnostics**: Use `npx mega-skills doctor` to find and fix missing system binaries.
2. **Adversarial Testing**: Every core skill is pressure-tested against naive prompts to ensure 100% methodology adherence.
3. **Socket Shims**: Includes a custom C-level `LD_PRELOAD` shim (`soffice.py`) to run LibreOffice in restricted Unix environments.
4. **Isolated Macros**: Uses dedicated StarBasic namespaces (`MegaSkillsRecalc`) to prevent configuration drift.

---

## 🤝 Community & Support

1. **Discord**: [Join the Mega-Skills Community](https://discord.gg/35wsABTejz)
2. **Sponsorship**: [Sponsor Gaurav's work](https://github.com/artgaurav16420-oss)
3. **Contributing**: Read [CONTRIBUTING.md](CONTRIBUTING.md).

---

Made with ❤️ by [Gaurav](https://github.com/artgaurav16420-oss) and the Mega-Skills Open Source Community.
