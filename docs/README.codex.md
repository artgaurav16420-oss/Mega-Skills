# Mega-Skills for Codex

Guide for using Mega-Skills with OpenAI Codex via native skill discovery.

## Quick Install

Tell Codex:

```text
Fetch and follow instructions from [https://raw.githubusercontent.com/obra/mega-skills/refs/heads/main/.codex/INSTALL.md]([https://raw.githubusercontent.com/obra/mega-skills/refs/heads/main/.codex/INSTALL.md)]([https://raw.githubusercontent.com/obra/mega-skills/refs/heads/main/.codex/INSTALL.md))]([https://raw.githubusercontent.com/obra/mega-skills/refs/heads/main/.codex/INSTALL.md)))]([https://raw.githubusercontent.com/obra/mega-skills/refs/heads/main/.codex/INSTALL.md))))]([https://raw.githubusercontent.com/obra/mega-skills/refs/heads/main/.codex/INSTALL.md)))))]([https://raw.githubusercontent.com/obra/mega-skills/refs/heads/main/.codex/INSTALL.md))))))]([https://raw.githubusercontent.com/obra/mega-skills/refs/heads/main/.codex/INSTALL.md)))))))](https://raw.githubusercontent.com/obra/mega-skills/refs/heads/main/.codex/INSTALL.md))))))))
```

## Manual Installation

### Prerequisites

1. OpenAI Codex CLI
1. Git

### Steps

1. Clone the repo:

```bash
   git clone [https://github.com/artgaurav16420-oss/Mega-Skills.git]([https://github.com/artgaurav16420-oss/Mega-Skills.git)]([https://github.com/artgaurav16420-oss/Mega-Skills.git))]([https://github.com/artgaurav16420-oss/Mega-Skills.git)))]([https://github.com/artgaurav16420-oss/Mega-Skills.git))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git)))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git))))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git)))))))](https://github.com/artgaurav16420-oss/Mega-Skills.git)))))))) ~/.codex/mega-skills
```

1. Create the skills symlink:

```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/mega-skills/skills ~/.agents/skills/mega-skills
```

1. Restart Codex.

1. **For subagent skills** (optional): Skills like `dispatching-parallel-agents` and `subagent-driven-development` require Codex's multi-agent feature. Add to your Codex config:

```toml
   [features]
   multi_agent = true
```

### Windows

Use a junction instead of a symlink (works without Developer Mode):

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\mega-skills" "$env:USERPROFILE\.codex\mega-skills\skills"
```

## How It Works

Codex has native skill discovery — it scans `~/.agents/skills/` at startup, parses SKILL.md frontmatter, and loads skills on demand. Mega-Skills skills are made visible through a single symlink:

```text
~/.agents/skills/mega-skills/ → ~/.codex/mega-skills/skills/
```

The `using-mega-skills` skill is discovered automatically and enforces skill usage discipline — no additional configuration needed.

## Usage

Skills are discovered automatically. Codex activates them when:

1. You mention a skill by name (e.g., "use brainstorming")
1. The task matches a skill's description
1. The `using-mega-skills` skill directs Codex to use one

### Personal Skills

Create your own skills in `~/.agents/skills/`:

```bash
mkdir -p ~/.agents/skills/my-skill
```

Create `~/.agents/skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: Use when [condition] - [what it does]
---

## My Skill

[Your skill content here]
```

The `description` field is how Codex decides when to activate a skill automatically — write it as a clear trigger condition.

## Updating

```bash
cd ~/.codex/mega-skills && git pull
```

Skills update instantly through the symlink.

## Uninstalling

```bash
rm ~/.agents/skills/mega-skills
```

### Windows (PowerShell)

```powershell
Remove-Item "$env:USERPROFILE\.agents\skills\mega-skills"
```

Optionally delete the clone: `rm -rf ~/.codex/mega-skills` (Windows: `Remove-Item -Recurse -Force "$env:USERPROFILE\.codex\mega-skills"`).

## Troubleshooting

### Skills not showing up

1. Verify the symlink: `ls -la ~/.agents/skills/mega-skills`
1. Check skills exist: `ls ~/.codex/mega-skills/skills`
1. Restart Codex — skills are discovered at startup

### Windows junction issues

Junctions normally work without special permissions. If creation fails, try running PowerShell as administrator.

## Getting Help

1. Report issues: [https://github.com/artgaurav16420-oss/Mega-Skills/issues]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))))))))](https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))))))))
1. Main documentation: [https://github.com/artgaurav16420-oss/Mega-Skills]([https://github.com/artgaurav16420-oss/Mega-Skills)]([https://github.com/artgaurav16420-oss/Mega-Skills))]([https://github.com/artgaurav16420-oss/Mega-Skills)))]([https://github.com/artgaurav16420-oss/Mega-Skills))))]([https://github.com/artgaurav16420-oss/Mega-Skills)))))]([https://github.com/artgaurav16420-oss/Mega-Skills))))))]([https://github.com/artgaurav16420-oss/Mega-Skills)))))))]([https://github.com/artgaurav16420-oss/Mega-Skills))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills)))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills)))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills)))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills)))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills))))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills)))))))))))))))))](https://github.com/artgaurav16420-oss/Mega-Skills))))))))))))))))))
