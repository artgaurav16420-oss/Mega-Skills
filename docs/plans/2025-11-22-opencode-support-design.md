# OpenCode Support Design

**Date:** 2025-11-22
**Author:** Bot & Jesse
**Status:** Design Complete, Awaiting Implementation

## Overview

Add full mega-skills support for OpenCode.ai using a native OpenCode plugin architecture that shares core functionality with the existing Codex implementation.

## Background

OpenCode.ai is a coding agent similar to Claude Code and Codex. Previous attempts to port mega-skills to OpenCode (PR #93, PR #116) used file-copying approaches. This design takes a different approach: building a native OpenCode plugin using their JavaScript/TypeScript plugin system while sharing code with the Codex implementation.

### Key Differences Between Platforms

1. **Claude Code**: Native Anthropic plugin system + file-based skills
1. **Codex**: No plugin system → bootstrap markdown + CLI script
1. **OpenCode**: JavaScript/TypeScript plugins with event hooks and custom tools API

### OpenCode's Agent System

1. **Primary agents**: Build (default, full access) and Plan (restricted, read-only)
1. **Subagents**: General (research, searching, multi-step tasks)
1. **Invocation**: Automatic dispatch by primary agents OR manual `@mention` syntax
1. **Configuration**: Custom agents in `opencode.json` or `~/.config/opencode/agent/`

## Architecture

### High-Level Structure

1. **Shared Core Module** (`lib/skills-core.js`)
1. Common skill discovery and parsing logic
1. Used by both Codex and OpenCode implementations

1. **Platform-Specific Wrappers**
1. Codex: CLI script (`.codex/mega-skills-codex`)
1. OpenCode: Plugin module (`.opencode/plugin/mega-skills.js`)

1. **Skill Directories**
1. Core: `~/.config/opencode/mega-skills/skills/` (or installed location)
1. Personal: `~/.config/opencode/skills/` (shadows core skills)

### Code Reuse Strategy

Extract common functionality from `.codex/mega-skills-codex` into shared module:

```javascript
// lib/skills-core.js
module.exports = {
  extractFrontmatter(filePath),      // Parse name + description from YAML
  findSkillsInDir(dir, maxDepth),    // Recursive SKILL.md discovery
  findAllSkills(dirs),                // Scan multiple directories
  resolveSkillPath(skillName, dirs), // Handle shadowing (personal > core)
  checkForUpdates(repoDir)           // Git fetch/status check
};
```

### Skill Frontmatter Format

Current format (no `when_to_use` field):

```yaml
---
name: skill-name
description: Use when [condition] - [what it does]; [additional context]
---
```

## OpenCode Plugin Implementation

### Custom Tools

#### Tool 1: `use_skill`

Loads a specific skill's content into the conversation (equivalent to Claude's Skill tool).

```javascript
{
  name: 'use_skill',
  description: 'Load and read a specific skill to guide your work',
  schema: z.object({
    skill_name: z.string().describe('Name of skill (e.g., "mega-skills:brainstorming")')
  }),
  execute: async ({ skill_name }) => {
    const { skillPath, content, frontmatter } = resolveAndReadSkill(skill_name);
    const skillDir = path.dirname(skillPath);

    return `# ${frontmatter.name}
## ${frontmatter.description}
## Supporting tools and docs are in ${skillDir}
## ============================================

${content}`;
  }
}
```

### Tool 2: `find_skills`

Lists all available skills with metadata.

```javascript
{
  name: 'find_skills',
  description: 'List all available skills',
  schema: z.object({}),
  execute: async () => {
    const skills = discoverAllSkills();
    return skills.map(s =>
      `${s.namespace}:${s.name}
  ${s.description}
  Directory: ${s.directory}
`).join('\n');
  }
}
```

### Session Startup Hook

When a new session starts (`session.started` event):

1. **Inject using-mega-skills content**
1. Full content of the using-mega-skills skill
1. Establishes mandatory workflows

1. **Run find_skills automatically**
1. Display full list of available skills upfront
1. Include skill directories for each

1. **Inject tool mapping instructions**

```markdown
   **Tool Mapping for OpenCode:**
   When skills reference tools you don't have, substitute:
   - `TodoWrite` → `update_plan`
   - `Task` with subagents → Use OpenCode subagent system (@mention)
   - `Skill` tool → `use_skill` custom tool
   - Read, Write, Edit, Bash → Your native equivalents

   **Skill directories contain:**
   - Supporting scripts (run with bash)
   - Additional documentation (read with read tool)
   - Utilities specific to that skill
```

1. **Check for updates** (non-blocking)
1. Quick git fetch with timeout
1. Notify if updates available

### Plugin Structure

```javascript
// .opencode/plugin/mega-skills.js
const skillsCore = require('../../lib/skills-core');
const path = require('path');
const fs = require('fs');
const { z } = require('zod');

export const Mega-SkillsPlugin = async ({ client, directory, $ }) => {
  const mega-skillsDir = path.join(process.env.HOME, '.config/opencode/mega-skills');
  const personalDir = path.join(process.env.HOME, '.config/opencode/skills');

  return {
    'session.started': async () => {
      const usingMega-Skills = await readSkill('using-mega-skills');
      const skillsList = await findAllSkills();
      const toolMapping = getToolMappingInstructions();

      return {
        context: `${usingMega-Skills}\n\n${skillsList}\n\n${toolMapping}`
      };
    },

    tools: [
      {
        name: 'use_skill',
        description: 'Load and read a specific skill',
        schema: z.object({
          skill_name: z.string()
        }),
        execute: async ({ skill_name }) => {
          // Implementation using skillsCore
        }
      },
      {
        name: 'find_skills',
        description: 'List all available skills',
        schema: z.object({}),
        execute: async () => {
          // Implementation using skillsCore
        }
      }
    ]
  };
};
```

## File Structure

```text
mega-skills/
├── lib/
│   └── skills-core.js           # NEW: Shared skill logic
├── .codex/
│   ├── mega-skills-codex        # UPDATED: Use skills-core
│   ├── mega-skills-bootstrap.md
│   └── INSTALL.md
├── .opencode/
│   ├── plugin/
│   │   └── mega-skills.js       # NEW: OpenCode plugin
│   └── INSTALL.md               # NEW: Installation guide
└── skills/                       # Unchanged
```

## Implementation Plan

### Phase 1: Refactor Shared Core

1. Create `lib/skills-core.js`
1. Extract frontmatter parsing from `.codex/mega-skills-codex`
1. Extract skill discovery logic
1. Extract path resolution (with shadowing)
1. Update to use only `name` and `description` (no `when_to_use`)

1. Update `.codex/mega-skills-codex` to use shared core
1. Import from `../lib/skills-core.js`
1. Remove duplicated code
1. Keep CLI wrapper logic

1. Test Codex implementation still works
1. Verify bootstrap command
1. Verify use-skill command
1. Verify find-skills command

### Phase 2: Build OpenCode Plugin

1. Create `.opencode/plugin/mega-skills.js`
1. Import shared core from `../../lib/skills-core.js`
1. Implement plugin function
1. Define custom tools (use_skill, find_skills)
1. Implement session.started hook

1. Create `.opencode/INSTALL.md`
1. Installation instructions
1. Directory setup
1. Configuration guidance

1. Test OpenCode implementation
1. Verify session startup bootstrap
1. Verify use_skill tool works
1. Verify find_skills tool works
1. Verify skill directories are accessible

### Phase 3: Documentation & Polish

1. Update README with OpenCode support
1. Add OpenCode installation to main docs
1. Update RELEASE-NOTES
1. Test both Codex and OpenCode work correctly

## Next Steps

1. **Create isolated workspace** (using git worktrees)
1. Branch: `feature/opencode-support`

1. **Follow TDD where applicable**
1. Test shared core functions
1. Test skill discovery and parsing
1. Integration tests for both platforms

1. **Incremental implementation**
1. Phase 1: Refactor shared core + update Codex
1. Verify Codex still works before moving on
1. Phase 2: Build OpenCode plugin
1. Phase 3: Documentation and polish

1. **Testing strategy**
1. Manual testing with real OpenCode installation
1. Verify skill loading, directories, scripts work
1. Test both Codex and OpenCode side-by-side
1. Verify tool mappings work correctly

1. **PR and merge**
1. Create PR with complete implementation
1. Test in clean environment
1. Merge to main

## Benefits

1. **Code reuse**: Single source of truth for skill discovery/parsing
1. **Maintainability**: Bug fixes apply to both platforms
1. **Extensibility**: Easy to add future platforms (Cursor, Windsurf, etc.)
1. **Native integration**: Uses OpenCode's plugin system properly
1. **Consistency**: Same skill experience across all platforms
