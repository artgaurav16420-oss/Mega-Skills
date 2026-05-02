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
antigravity extension install https://github.com/artgaurav16420-oss/Superpowers-including-Antigravity
```

To update:

```bash
antigravity extension update mega-superpowers
```

### Gemini CLI

```bash
gemini extensions install https://github.com/artgaurav16420-oss/Superpowers-including-Antigravity
```

### Claude Code

```bash
/plugin install mega-superpowers@https://github.com/artgaurav16420-oss/Superpowers-including-Antigravity
```

### OpenCode

Tell OpenCode:

```bash
Fetch and follow instructions from https://raw.githubusercontent.com/artgaurav16420-oss/Superpowers-including-Antigravity/refs/heads/main/.opencode/INSTALL.md
```

### GitHub Copilot CLI

```bash
copilot plugin install mega-superpowers@https://github.com/artgaurav16420-oss/Superpowers-including-Antigravity
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

## What's Inside

Mega Superpowers includes three major skill libraries:

### 1. Superpowers Methodology (Core)

The original software development lifecycle skills:

- **test-driven-development**
- **systematic-debugging**
- **brainstorming**
- **writing-plans**
- **subagent-driven-development**
- ... and more.

### 2. Anthropic Skills Library

Essential tools for file manipulation and analysis:

- **pdf**, **docx**, **xlsx**, **pptx** - Professional document handling
- **frontend-design**, **canvas-design** - UI/UX and visual design
- **claude-api** - Anthropic SDK optimization
- **mcp-builder** - Tool creation assistant

### 3. Composio "Awesome Claude" Skills

Advanced automation and integration skills:

- **connect** & **connect-apps** - Connect to 1000+ external services
- **lead-research-assistant**, **content-research-writer** - Research automation
- **youtube-downloader**, **twitter-algorithm-optimizer** - Social media tools
- **file-organizer**, **invoice-organizer** - Productivity enhancements

### Complete Skills Index

The full library contains 59 composable skills:

- **algorithmic-art** - Create generative art with code
- **artifacts-builder** - Build complex React/Tailwind artifacts
- **brainstorming** - Socratic design and spec refinement
- **brand-guidelines** - Apply professional brand styling
- **canvas-design** - Visual design and poster creation
- **cavecrew** - Subagent delegation and compression
- **caveman** suite - Ultra-compressed agent communication
- **changelog-generator** - Automated release notes from git
- **claude-api** - Anthropic SDK and prompt optimization
- **competitive-ads-extractor** - Competitor ad analysis
- **connect** & **connect-apps** - Integration with 1000+ services
- **content-research-writer** - Research-backed content creation
- **developer-growth-analysis** - Personal coding growth reports
- **dispatching-parallel-agents** - Multi-agent orchestration
- **doc-coauthoring** - Structured documentation workflow
- **docx**, **pdf**, **pptx**, **xlsx** - Professional document handling
- **domain-name-brainstormer** - Creative naming and availability
- **executing-plans** - Batch task execution
- **file-organizer** & **invoice-organizer** - Asset management
- **finishing-a-development-branch** - Merge and cleanup workflow
- **frontend-design** - Production-grade web interfaces
- **image-enhancer** - Resolution and clarity improvement
- **internal-comms** - Professional company updates
- **langsmith-fetch** - Debugging agent traces
- **lead-research-assistant** - Sales and lead generation
- **mcp-builder** - Model Context Protocol server creation
- **meeting-insights-analyzer** - Communication pattern analysis
- **raffle-winner-picker** - Fair random selection
- **receiving-code-review** & **requesting-code-review** - PR workflow
- **skill-creator** & **writing-skills** - Authoring new agent capabilities
- **skill-share** - Team skill discovery
- **slack-gif-creator** - Custom animations for Slack
- **subagent-driven-development** - Autonomous task completion
- **systematic-debugging** - 4-phase root cause analysis
- **tailored-resume-generator** - Job-specific resume optimization
- **test-driven-development** - RED-GREEN-REFACTOR cycle
- **theme-factory** - Universal styling for artifacts
- **twitter-algorithm-optimizer** - Reach and engagement optimization
- **using-git-worktrees** - Isolated development environments
- **verification-before-completion** - Final fix validation
- **web-artifacts-builder** - Advanced shadcn/ui artifacts
- **webapp-testing** - Playwright-based frontend testing
- **writing-plans** - Detailed implementation planning
- **youtube-downloader** - Video and audio acquisition

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
- **Issues**: <https://github.com/artgaurav16420-oss/Superpowers-including-Antigravity/issues>
