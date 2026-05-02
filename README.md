# Mega Superpowers

**Mega Superpowers** is the ultimate software development methodology for coding agents. It combines the structured workflow of the original **Superpowers** system with the high-utility skill libraries from **Anthropic** and **Composio**.

It is a complete software development methodology for your coding agents, built on top of a set of composable skills and some initial instructions that make sure your agent uses them.

## How it works

It starts from the moment you fire up your coding agent. As soon as it sees that you're building something, it *doesn't* just jump into trying to write code. Instead, it steps back and asks you what you're really trying to do.

Once it's teased a spec out of the conversation, it shows it to you in chunks short enough to actually read and digest.

After you've signed off on the design, your agent puts together an implementation plan that's clear enough for an enthusiastic junior engineer with poor taste, no judgement, no project context, and an aversion to testing to follow. It emphasizes true red/green TDD, YAGNI (You Aren't Gonna Need It), and DRY.

Next up, once you say "go", it launches a *subagent-driven-development* process, having agents work through each engineering task, inspecting and reviewing their work, and continuing forward. It's not uncommon for Claude to be able to work autonomously for a couple hours at a time without deviating from the plan you put together.

There's a bunch more to it, but that's the core of the system. And because the skills trigger automatically, you don't need to do anything special. Your coding agent just has **Mega Superpowers**.

## Sponsorship

If Mega Superpowers has helped you do stuff that makes money and you are so inclined, I'd greatly appreciate it if you'd consider [sponsoring Gaurav's work](https://github.com/artgaurav16420-oss).

## Installation

**Note:** Installation differs by platform.

### Antigravity (Native Support)

```bash
antigravity extension install https://github.com/artgaurav16420-oss/Mega-Skills
```

To update:

```bash
antigravity extension update mega-superpowers
```

### Gemini CLI

```bash
gemini extensions install https://github.com/artgaurav16420-oss/Mega-Skills
```

### Claude Code

```bash
/plugin install mega-superpowers@https://github.com/artgaurav16420-oss/Mega-Skills
```

### OpenCode

Tell OpenCode:

```bash
Fetch and follow instructions from https://raw.githubusercontent.com/artgaurav16420-oss/Superpowers-including-Antigravity/refs/heads/main/.opencode/INSTALL.md
```

### GitHub Copilot CLI

```bash
copilot plugin install mega-superpowers@https://github.com/artgaurav16420-oss/Mega-Skills
```

## The Basic Workflow

1. **brainstorming** - Activates before writing code. Refines rough ideas through questions, explores alternatives, presents design in sections for validation. Saves design document.
2. **using-git-worktrees** - Activates after design approval. Creates isolated workspace on new branch, runs project setup, verifies clean test baseline.
3. **writing-plans** - Activates with approved design. Breaks work into bite-sized tasks (2-5 minutes each). Every task has exact file paths, complete code, verification steps.
4. **subagent-driven-development** or **executing-plans** - Activates with plan. Dispatches fresh subagent per task with two-stage review (spec compliance, then code quality), or executes in batches with human checkpoints.
5. **test-driven-development** - Activates during implementation. Enforces RED-GREEN-REFACTOR: write failing test, watch it fail, write minimal code, watch it pass, commit. Deletes code written before tests.
6. **requesting-code-review** - Activates between tasks. Reviews against plan, reports issues by severity. Critical issues block progress.
7. **finishing-a-development-branch** - Activates when tasks complete. Verifies tests, presents options (merge/PR/keep/discard), cleans up worktree.

**The agent checks for relevant skills before any task.** Mandatory workflows, not suggestions.

## Complete Skills Index

The full library contains 59 composable skills, ordered by utility:

### 🛠️ Core Methodology (The Superpowers)
- **test-driven-development** - RED-GREEN-REFACTOR cycle: write tests first
- **writing-plans** - Detailed implementation planning and task breakdown
- **brainstorming** - Socratic design and spec refinement
- **subagent-driven-development** - Autonomous task completion via subagents
- **systematic-debugging** - 4-phase root cause analysis and fixing
- **using-git-worktrees** - Isolated development environments
- **verification-before-completion** - Final fix validation
- **finishing-a-development-branch** - Merge and cleanup workflow
- **receiving-code-review** & **requesting-code-review** - PR workflow

### 🏗️ Advanced Developer Tools
- **mcp-builder** - Model Context Protocol server creation assistant
- **claude-api** - Anthropic SDK and prompt optimization
- **webapp-testing** - Playwright-based frontend testing
- **web-artifacts-builder** - Advanced shadcn/ui and React artifacts
- **artifacts-builder** - Build complex React/Tailwind artifacts
- **langsmith-fetch** - Debugging agent traces and performance
- **skill-creator** & **writing-skills** - Authoring new agent capabilities

### 📄 Document & Data Processing
- **pdf**, **docx**, **pptx**, **xlsx** - Professional document manipulation
- **invoice-organizer** - Automated receipt and invoice management
- **file-organizer** - Intelligent asset and folder management

### 🔌 Integrations & Research
- **connect** & **connect-apps** - Integration with 1000+ external services
- **lead-research-assistant** - Sales and lead generation automation
- **content-research-writer** - Research-backed content creation
- **developer-growth-analysis** - Personal coding growth reports
- **meeting-insights-analyzer** - Communication pattern analysis
- **domain-name-brainstormer** - Creative naming and availability

### 🎨 Creative & Content Tools
- **frontend-design** - Production-grade web interfaces
- **canvas-design** - Visual design and poster creation
- **slack-gif-creator** - Custom animations for Slack
- **twitter-algorithm-optimizer** - Reach and engagement optimization
- **youtube-downloader** - Video and audio acquisition
- **algorithmic-art** - Create generative art with code
- **brand-guidelines** - Apply professional brand styling
- **theme-factory** - Universal styling for artifacts

### ⚙️ Utilities
- **cavecrew** - Subagent delegation and context compression
- **caveman** suite - Ultra-compressed agent communication modes
- **changelog-generator** - Automated release notes from git
- **image-enhancer** - Resolution and clarity improvement
- **raffle-winner-picker** - Fair random selection
- **skill-share** - Team skill discovery via Slack
- **doc-coauthoring** - Structured documentation workflow

## Philosophy

- **Test-Driven Development** - Write tests first, always
- **Systematic over ad-hoc** - Process over guessing
- **Complexity reduction** - Simplicity as primary goal
- **Evidence over claims** - Verify before declaring success

## Contributing

1. Fork the repository
2. Switch to the 'dev' branch
3. Create a branch for your work
4. Follow the `writing-skills` skill for creating and testing new and modified skills
5. Submit a PR.

## License

MIT License - see LICENSE file for details

## Community

Mega Superpowers is maintained by [Gaurav](https://github.com/artgaurav16420-oss), based on the methodology by Jesse Vincent and the Prime Radiant team, augmented with libraries from Anthropic and Composio.

- **Discord**: [Join us](https://discord.gg/35wsABTejz) for community support.
- **Issues**: <https://github.com/artgaurav16420-oss/Mega-Skills/issues>
