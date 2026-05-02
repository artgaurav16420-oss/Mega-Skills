# Cross-Platform Polyglot Hooks for Claude Code

Claude Code plugins need hooks that work on Windows, macOS, and Linux. This document explains the polyglot wrapper technique that makes this possible.

## The Problem

Claude Code runs hook commands through the system's default shell:

1. **Windows**: CMD.exe
1. **macOS/Linux**: bash or sh

This creates several challenges:

1. **Script execution**: Windows CMD can't execute `.sh` files directly - it tries to open them in a text editor
1. **Path format**: Windows uses backslashes (`C:\path`), Unix uses forward slashes (`/path`)
1. **Environment variables**: `$VAR` syntax doesn't work in CMD
1. **No `bash` in PATH**: Even with Git Bash installed, `bash` isn't in the PATH when CMD runs

## The Solution: Polyglot `.cmd` Wrapper

A polyglot script is valid syntax in multiple languages simultaneously. Our wrapper is valid in both CMD and bash:

```cmd
: << 'CMDBLOCK'
@echo off
"C:\Program Files\Git\bin\bash.exe" -l -c "\"$(cygpath -u \"$CLAUDE_PLUGIN_ROOT\")/hooks/session-start.sh\""
exit /b
CMDBLOCK

## Unix shell runs from here
"${CLAUDE_PLUGIN_ROOT}/hooks/session-start.sh"
```

### How It Works

#### On Windows (CMD.exe)

1. `: << 'CMDBLOCK'` - CMD sees `:` as a label (like `:label`) and ignores `<< 'CMDBLOCK'`
1. `@echo off` - Suppresses command echoing
1. The bash.exe command runs with:
1. `-l` (login shell) to get proper PATH with Unix utilities
1. `cygpath -u` converts Windows path to Unix format (`C:\foo` → `/c/foo`)
1. `exit /b` - Exits the batch script, stopping CMD here
1. Everything after `CMDBLOCK` is never reached by CMD

#### On Unix (bash/sh)

1. `: << 'CMDBLOCK'` - `:` is a no-op, `<< 'CMDBLOCK'` starts a heredoc
1. Everything until `CMDBLOCK` is consumed by the heredoc (ignored)
1. `# Unix shell runs from here` - Comment
1. The script runs directly with the Unix path

## File Structure

```text
hooks/
├── hooks.json           # Points to the .cmd wrapper
├── session-start.cmd    # Polyglot wrapper (cross-platform entry point)
└── session-start.sh     # Actual hook logic (bash script)
```

### hooks.json

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume|clear|compact",
        "hooks": [
          {
            "type": "command",
            "command": "\"${CLAUDE_PLUGIN_ROOT}/hooks/session-start.cmd\""
          }
        ]
      }
    ]
  }
}
```

Note: The path must be quoted because `${CLAUDE_PLUGIN_ROOT}` may contain spaces on Windows (e.g., `C:\Program Files\...`).

## Requirements

### Windows

1. **Git for Windows** must be installed (provides `bash.exe` and `cygpath`)
1. Default installation path: `C:\Program Files\Git\bin\bash.exe`
1. If Git is installed elsewhere, the wrapper needs modification

### Unix (macOS/Linux)

1. Standard bash or sh shell
1. The `.cmd` file must have execute permission (`chmod +x`)

## Writing Cross-Platform Hook Scripts

Your actual hook logic goes in the `.sh` file. To ensure it works on Windows (via Git Bash):

### Do

1. Use pure bash builtins when possible
1. Use `$(command)` instead of backticks
1. Quote all variable expansions: `"$VAR"`
1. Use `printf` or here-docs for output

### Avoid

1. External commands that may not be in PATH (sed, awk, grep)
1. If you must use them, they're available in Git Bash but ensure PATH is set up (use `bash -l`)

### Example: JSON Escaping Without sed/awk

Instead of:

```bash
escaped=$(echo "$content" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | awk '{printf "%s\\n", $0}')
```

Use pure bash:

```bash
escape_for_json() {
    local input="$1"
    local output=""
    local i char
    for (( i=0; i<${#input}; i++ )); do
        char="${input:$i:1}"
        case "$char" in
            $'\\') output+='\\' ;;
            '"') output+='\"' ;;
            $'\n') output+='\n' ;;
            $'\r') output+='\r' ;;
            $'\t') output+='\t' ;;
            *) output+="$char" ;;
        esac
    done
    printf '%s' "$output"
}
```

## Reusable Wrapper Pattern

For plugins with multiple hooks, you can create a generic wrapper that takes the script name as an argument:

### run-hook.cmd

```cmd
: << 'CMDBLOCK'
@echo off
set "SCRIPT_DIR=%~dp0"
set "SCRIPT_NAME=%~1"
"C:\Program Files\Git\bin\bash.exe" -l -c "cd \"$(cygpath -u \"%SCRIPT_DIR%\")\" && \"./%SCRIPT_NAME%\""
exit /b
CMDBLOCK

## Unix shell runs from here (2)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCRIPT_NAME="$1"
shift
"${SCRIPT_DIR}/${SCRIPT_NAME}" "$@"
```

### hooks.json using the reusable wrapper

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "\"${CLAUDE_PLUGIN_ROOT}/hooks/run-hook.cmd\" session-start.sh"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"${CLAUDE_PLUGIN_ROOT}/hooks/run-hook.cmd\" validate-bash.sh"
          }
        ]
      }
    ]
  }
}
```

## Troubleshooting

### "bash is not recognized"

CMD can't find bash. The wrapper uses the full path `C:\Program Files\Git\bin\bash.exe`. If Git is installed elsewhere, update the path.

### "cygpath: command not found" or "dirname: command not found"

Bash isn't running as a login shell. Ensure `-l` flag is used.

### Path has weird `\/` in it

`${CLAUDE_PLUGIN_ROOT}` expanded to a Windows path ending with backslash, then `/hooks/...` was appended. Use `cygpath` to convert the entire path.

### Script opens in text editor instead of running

The hooks.json is pointing directly to the `.sh` file. Point to the `.cmd` wrapper instead.

### Works in terminal but not as hook

Claude Code may run hooks differently. Test by simulating the hook environment:

```powershell
$env:CLAUDE_PLUGIN_ROOT = "C:\path\to\plugin"
cmd /c "C:\path\to\plugin\hooks\session-start.cmd"
```

## Related Issues

1. [anthropics/claude-code#9758]([https://github.com/anthropics/claude-code/issues/9758)]([https://github.com/anthropics/claude-code/issues/9758))]([https://github.com/anthropics/claude-code/issues/9758)))]([https://github.com/anthropics/claude-code/issues/9758))))]([https://github.com/anthropics/claude-code/issues/9758)))))]([https://github.com/anthropics/claude-code/issues/9758))))))]([https://github.com/anthropics/claude-code/issues/9758)))))))]([https://github.com/anthropics/claude-code/issues/9758))))))))]([https://github.com/anthropics/claude-code/issues/9758)))))))))]([https://github.com/anthropics/claude-code/issues/9758))))))))))]([https://github.com/anthropics/claude-code/issues/9758)))))))))))]([https://github.com/anthropics/claude-code/issues/9758))))))))))))]([https://github.com/anthropics/claude-code/issues/9758)))))))))))))]([https://github.com/anthropics/claude-code/issues/9758))))))))))))))]([https://github.com/anthropics/claude-code/issues/9758)))))))))))))))]([https://github.com/anthropics/claude-code/issues/9758))))))))))))))))]([https://github.com/anthropics/claude-code/issues/9758)))))))))))))))))](https://github.com/anthropics/claude-code/issues/9758)))))))))))))))))) - .sh scripts open in editor on Windows
1. [anthropics/claude-code#3417]([https://github.com/anthropics/claude-code/issues/3417)]([https://github.com/anthropics/claude-code/issues/3417))]([https://github.com/anthropics/claude-code/issues/3417)))]([https://github.com/anthropics/claude-code/issues/3417))))]([https://github.com/anthropics/claude-code/issues/3417)))))]([https://github.com/anthropics/claude-code/issues/3417))))))]([https://github.com/anthropics/claude-code/issues/3417)))))))]([https://github.com/anthropics/claude-code/issues/3417))))))))]([https://github.com/anthropics/claude-code/issues/3417)))))))))]([https://github.com/anthropics/claude-code/issues/3417))))))))))]([https://github.com/anthropics/claude-code/issues/3417)))))))))))]([https://github.com/anthropics/claude-code/issues/3417))))))))))))]([https://github.com/anthropics/claude-code/issues/3417)))))))))))))]([https://github.com/anthropics/claude-code/issues/3417))))))))))))))]([https://github.com/anthropics/claude-code/issues/3417)))))))))))))))]([https://github.com/anthropics/claude-code/issues/3417))))))))))))))))]([https://github.com/anthropics/claude-code/issues/3417)))))))))))))))))](https://github.com/anthropics/claude-code/issues/3417)))))))))))))))))) - Hooks don't work on Windows
1. [anthropics/claude-code#6023]([https://github.com/anthropics/claude-code/issues/6023)]([https://github.com/anthropics/claude-code/issues/6023))]([https://github.com/anthropics/claude-code/issues/6023)))]([https://github.com/anthropics/claude-code/issues/6023))))]([https://github.com/anthropics/claude-code/issues/6023)))))]([https://github.com/anthropics/claude-code/issues/6023))))))]([https://github.com/anthropics/claude-code/issues/6023)))))))]([https://github.com/anthropics/claude-code/issues/6023))))))))]([https://github.com/anthropics/claude-code/issues/6023)))))))))]([https://github.com/anthropics/claude-code/issues/6023))))))))))]([https://github.com/anthropics/claude-code/issues/6023)))))))))))]([https://github.com/anthropics/claude-code/issues/6023))))))))))))]([https://github.com/anthropics/claude-code/issues/6023)))))))))))))]([https://github.com/anthropics/claude-code/issues/6023))))))))))))))]([https://github.com/anthropics/claude-code/issues/6023)))))))))))))))]([https://github.com/anthropics/claude-code/issues/6023))))))))))))))))]([https://github.com/anthropics/claude-code/issues/6023)))))))))))))))))](https://github.com/anthropics/claude-code/issues/6023)))))))))))))))))) - CLAUDE_PROJECT_DIR not found
