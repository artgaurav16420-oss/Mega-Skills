# Installing Mega-Skills for OpenCode

## Prerequisites

1. [OpenCode.ai]([https://opencode.ai)]([https://opencode.ai))]([https://opencode.ai)))]([https://opencode.ai))))]([https://opencode.ai)))))]([https://opencode.ai))))))]([https://opencode.ai)))))))]([https://opencode.ai))))))))]([https://opencode.ai)))))))))]([https://opencode.ai))))))))))]([https://opencode.ai)))))))))))]([https://opencode.ai))))))))))))]([https://opencode.ai)))))))))))))]([https://opencode.ai))))))))))))))]([https://opencode.ai)))))))))))))))]([https://opencode.ai))))))))))))))))]([https://opencode.ai)))))))))))))))))](https://opencode.ai)))))))))))))))))) installed

## Installation

Add Mega-Skills to the `plugin` array in your `opencode.json` (global or project-level):

```json
{
  "plugin": ["mega-skills@git+[https://github.com/artgaurav16420-oss/Mega-Skills.git]([https://github.com/artgaurav16420-oss/Mega-Skills.git)]([https://github.com/artgaurav16420-oss/Mega-Skills.git))]([https://github.com/artgaurav16420-oss/Mega-Skills.git)))]([https://github.com/artgaurav16420-oss/Mega-Skills.git))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git)))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git))))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git)))))))](https://github.com/artgaurav16420-oss/Mega-Skills.git))))))))"]
}
```

Restart OpenCode. That's it — the plugin auto-installs and registers all skills.

Verify by asking: "Tell me about your mega-skills"

## Migrating from the old symlink-based install

If you previously installed superpowers using `git clone` and symlinks, remove the old setup:

```bash
## Remove old symlinks
rm -f ~/.config/opencode/plugins/superpowers.js
rm -rf ~/.config/opencode/skills/superpowers

## Optionally remove the cloned repo
rm -rf ~/.config/opencode/superpowers
```

Then follow the installation steps above.

## Usage

Use OpenCode's native `skill` tool:

```text
use skill tool to list skills
use skill tool to load mega-skills/brainstorming
```

## Updating

Mega-Skills updates automatically when you restart OpenCode.

To pin a specific version:

```json
{
  "plugin": ["mega-skills@git+[https://github.com/artgaurav16420-oss/Mega-Skills.git#v5.0.7-mega]([https://github.com/artgaurav16420-oss/Mega-Skills.git#v5.0.7-mega)]([https://github.com/artgaurav16420-oss/Mega-Skills.git#v5.0.7-mega))]([https://github.com/artgaurav16420-oss/Mega-Skills.git#v5.0.7-mega)))]([https://github.com/artgaurav16420-oss/Mega-Skills.git#v5.0.7-mega))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git#v5.0.7-mega)))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git#v5.0.7-mega))))))]([https://github.com/artgaurav16420-oss/Mega-Skills.git#v5.0.7-mega)))))))](https://github.com/artgaurav16420-oss/Mega-Skills.git#v5.0.7-mega))))))))"]
}
```

## Troubleshooting

### Plugin not loading

1. Check logs: `opencode run --print-logs "hello" 2>&1 | grep -i mega-skills`
1. Verify the plugin line in your `opencode.json`
1. Make sure you're running a recent version of OpenCode

### Skills not found

1. Use `skill` tool to list what's discovered
1. Check that the plugin is loading (see above)

### Tool mapping

When skills reference Claude Code tools:

1. `TodoWrite` → `todowrite`
1. `Task` with subagents → `@mention` syntax
1. `Skill` tool → OpenCode's native `skill` tool
1. File operations → your native tools

## Getting Help

1. Report issues: [Mega-Skills Issues]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/issues)))))))))))))))))](https://github.com/artgaurav16420-oss/Mega-Skills/issues))))))))))))))))))
1. Full documentation: [Mega-Skills README]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md)]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md)))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md)))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md)))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md)))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md)))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md)))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md)))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md))))))))))))))))]([https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md)))))))))))))))))](https://github.com/artgaurav16420-oss/Mega-Skills/blob/main/README.md))))))))))))))))))
