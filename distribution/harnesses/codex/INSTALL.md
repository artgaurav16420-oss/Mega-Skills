# Installing Mega-Skills for Codex

Enable mega-skills skills in Codex via native skill discovery. Just clone and symlink.

## Prerequisites

1. Git

## Installation

1. **Clone the mega-skills repository:**

```bash
   git clone [https://github.com/artgaurav16420-oss/Mega-Skills.git]([https://github.com/artgaurav16420-oss/Mega-Skills.git)]([https://github.com/artgaurav16420-oss/Mega-Skills.git))]([https://github.com/artgaurav16420-oss/Mega-Skills.git)))]([https://github.com/artgaurav16420-oss/Mega-Skills.git))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git)))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git))))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git)))))))](https://github.com/artgaurav16420-oss/Mega-Skills.git)))))))) ~/.codex/mega-skills
```

1. **Create the skills symlink:**

```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/mega-skills/skills ~/.agents/skills/mega-skills
```

### Windows (PowerShell)

```powershell
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
   cmd /c mklink /J "$env:USERPROFILE\.agents\skills\mega-skills" "$env:USERPROFILE\.codex\mega-skills\skills"
```

1. **Restart Codex** (quit and relaunch the CLI) to discover the skills.

## Migrating from old bootstrap

If you installed mega-skills before native skill discovery, you need to:

1. **Update the repo:**

```bash
   cd ~/.codex/mega-skills && git pull
```

1. **Create the skills symlink** (step 2 above) — this is the new discovery mechanism.

1. **Remove the old bootstrap block** from `~/.codex/AGENTS.md` — any block referencing `mega-skills-codex bootstrap` is no longer needed.

1. **Restart Codex.**

## Verify

```bash
ls -la ~/.agents/skills/mega-skills
```

You should see a symlink (or junction on Windows) pointing to your mega-skills skills directory.

## Updating

```bash
cd ~/.codex/mega-skills && git pull
```

Skills update instantly through the symlink.

## Uninstalling

```bash
rm ~/.agents/skills/mega-skills
```

Optionally delete the clone: `rm -rf ~/.codex/mega-skills`.
