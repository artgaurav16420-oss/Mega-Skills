# Testing Mega-Skills Skills

This document describes how to test Mega-Skills skills, particularly the integration tests for complex skills like `subagent-driven-development`.

## Overview

Testing skills that involve subagents, workflows, and complex interactions requires running actual Claude Code sessions in headless mode and verifying their behavior through session transcripts.

## Test Structure

```text
tests/
├── claude-code/
│   ├── test-helpers.sh                    # Shared test utilities
│   ├── test-subagent-driven-development-integration.sh
│   ├── analyze-token-usage.py             # Token analysis tool
│   └── run-skill-tests.sh                 # Test runner (if exists)
```

## Running Tests

### Integration Tests

Integration tests execute real Claude Code sessions with actual skills:

```bash
## Run the subagent-driven-development integration test
cd tests/claude-code
./test-subagent-driven-development-integration.sh
```

**Note:** Integration tests can take 10-30 minutes as they execute real implementation plans with multiple subagents.

### Requirements

1. Must run from the **mega-skills plugin directory** (not from temp directories)
1. Claude Code must be installed and available as `claude` command
1. Local dev marketplace must be enabled: `"mega-skills@mega-skills-dev": true` in `~/.claude/settings.json`

## Integration Test: subagent-driven-development

### What It Tests

The integration test verifies the `subagent-driven-development` skill correctly:

1. **Plan Loading**: Reads the plan once at the beginning
1. **Full Task Text**: Provides complete task descriptions to subagents (doesn't make them read files)
1. **Self-Review**: Ensures subagents perform self-review before reporting
1. **Review Order**: Runs spec compliance review before code quality review
1. **Review Loops**: Uses review loops when issues are found
1. **Independent Verification**: Spec reviewer reads code independently, doesn't trust implementer reports

### How It Works

1. **Setup**: Creates a temporary Node.js project with a minimal implementation plan
1. **Execution**: Runs Claude Code in headless mode with the skill
1. **Verification**: Parses the session transcript (`.jsonl` file) to verify:
1. Skill tool was invoked
1. Subagents were dispatched (Task tool)
1. TodoWrite was used for tracking
1. Implementation files were created
1. Tests pass
1. Git commits show proper workflow
1. **Token Analysis**: Shows token usage breakdown by subagent

### Test Output

```text
========================================
 Integration Test: subagent-driven-development
========================================

Test project: /tmp/tmp.xyz123

=== Verification Tests ===

Test 1: Skill tool invoked...
  [PASS] subagent-driven-development skill was invoked

Test 2: Subagents dispatched...
  [PASS] 7 subagents dispatched

Test 3: Task tracking...
  [PASS] TodoWrite used 5 time(s)

Test 6: Implementation verification...
  [PASS] src/math.js created
  [PASS] add function exists
  [PASS] multiply function exists
  [PASS] test/math.test.js created
  [PASS] Tests pass

Test 7: Git commit history...
  [PASS] Multiple commits created (3 total)

Test 8: No extra features added...
  [PASS] No extra features added

=========================================
 Token Usage Analysis
=========================================

Usage Breakdown:
----------------------------------------------------------------------------------------------------
Agent           Description                          Msgs      Input     Output      Cache     Cost
----------------------------------------------------------------------------------------------------
main            Main session (coordinator)             34         27      3,996  1,213,703 $   4.09
3380c209        implementing Task 1: Create Add Function     1          2        787     24,989 $   0.09
34b00fde        implementing Task 2: Create Multiply Function     1          4        644     25,114 $   0.09
3801a732        reviewing whether an implementation matches...   1          5        703     25,742 $   0.09
4c142934        doing a final code review...                    1          6        854     25,319 $   0.09
5f017a42        a code reviewer. Review Task 2...               1          6        504     22,949 $   0.08
a6b7fbe4        a code reviewer. Review Task 1...               1          6        515     22,534 $   0.08
f15837c0        reviewing whether an implementation matches...   1          6        416     22,485 $   0.07
----------------------------------------------------------------------------------------------------

TOTALS:
  Total messages:         41
  Input tokens:           62
  Output tokens:          8,419
  Cache creation tokens:  132,742
  Cache read tokens:      1,382,835

  Total input (incl cache): 1,515,639
  Total tokens:             1,524,058

  Estimated cost: $4.67
  (at $3/$15 per M tokens for input/output)

========================================
 Test Summary
========================================

STATUS: PASSED
```

## Token Analysis Tool

### Usage

Analyze token usage from any Claude Code session:

```bash
python3 tests/claude-code/analyze-token-usage.py ~/.claude/projects/<project-dir>/<session-id>.jsonl
```

### Finding Session Files

Session transcripts are stored in `~/.claude/projects/` with the working directory path encoded:

```bash
## Example for /Users/jesse/Documents/GitHub/mega-skills/mega-skills
SESSION_DIR="$HOME/.claude/projects/-Users-jesse-Documents-GitHub-mega-skills-mega-skills"

## Find recent sessions
ls -lt "$SESSION_DIR"/*.jsonl | head -5
```

### What It Shows

1. **Main session usage**: Token usage by the coordinator (you or main Claude instance)
1. **Per-subagent breakdown**: Each Task invocation with:
1. Agent ID
1. Description (extracted from prompt)
1. Message count
1. Input/output tokens
1. Cache usage
1. Estimated cost
1. **Totals**: Overall token usage and cost estimate

### Understanding the Output

1. **High cache reads**: Good - means prompt caching is working
1. **High input tokens on main**: Expected - coordinator has full context
1. **Similar costs per subagent**: Expected - each gets similar task complexity
1. **Cost per task**: Typical range is $0.05-$0.15 per subagent depending on task

## Troubleshooting

### Skills Not Loading

**Problem**: Skill not found when running headless tests

**Solutions**:

1. Ensure you're running FROM the mega-skills directory: `cd /path/to/mega-skills && tests/...`
1. Check `~/.claude/settings.json` has `"mega-skills@mega-skills-dev": true` in `enabledPlugins`
1. Verify skill exists in `skills/` directory

### Permission Errors

**Problem**: Claude blocked from writing files or accessing directories

**Solutions**:

1. Use `--permission-mode bypassPermissions` flag
1. Use `--add-dir /path/to/temp/dir` to grant access to test directories
1. Check file permissions on test directories

### Test Timeouts

**Problem**: Test takes too long and times out

**Solutions**:

1. Increase timeout: `timeout 1800 claude ...` (30 minutes)
1. Check for infinite loops in skill logic
1. Review subagent task complexity

### Session File Not Found

**Problem**: Can't find session transcript after test run

**Solutions**:

1. Check the correct project directory in `~/.claude/projects/`
1. Use `find ~/.claude/projects -name "*.jsonl" -mmin -60` to find recent sessions
1. Verify test actually ran (check for errors in test output)

## Writing New Integration Tests

### Template

```bash
#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/test-helpers.sh"

## Create test project
TEST_PROJECT=$(create_test_project)
trap "cleanup_test_project $TEST_PROJECT" EXIT

## Set up test files
cd "$TEST_PROJECT"

## Run Claude with skill
PROMPT="Your test prompt here"
cd "$SCRIPT_DIR/../.." && timeout 1800 claude -p "$PROMPT" \
  --allowed-tools=all \
  --add-dir "$TEST_PROJECT" \
  --permission-mode bypassPermissions \
  2>&1 | tee output.txt

## Find and analyze session
WORKING_DIR_ESCAPED=$(echo "$SCRIPT_DIR/../.." | sed 's/\\//-/g' | sed 's/^-//')
SESSION_DIR="$HOME/.claude/projects/$WORKING_DIR_ESCAPED"
SESSION_FILE=$(find "$SESSION_DIR" -name "*.jsonl" -type f -mmin -60 | sort -r | head -1)

## Verify behavior by parsing session transcript
if grep -q '"name":"Skill".*"skill":"your-skill-name"' "$SESSION_FILE"; then
    echo "[PASS] Skill was invoked"
fi

## Show token analysis
python3 "$SCRIPT_DIR/analyze-token-usage.py" "$SESSION_FILE"
```

### Best Practices

1. **Always cleanup**: Use trap to cleanup temp directories
1. **Parse transcripts**: Don't grep user-facing output - parse the `.jsonl` session file
1. **Grant permissions**: Use `--permission-mode bypassPermissions` and `--add-dir`
1. **Run from plugin dir**: Skills only load when running from the mega-skills directory
1. **Show token usage**: Always include token analysis for cost visibility
1. **Test real behavior**: Verify actual files created, tests passing, commits made

## Session Transcript Format

Session transcripts are JSONL (JSON Lines) files where each line is a JSON object representing a message or tool result.

### Key Fields

```json
{
  "type": "assistant",
  "message": {
    "content": [...],
    "usage": {
      "input_tokens": 27,
      "output_tokens": 3996,
      "cache_read_input_tokens": 1213703
    }
  }
}
```

### Tool Results

```json
{
  "type": "user",
  "toolUseResult": {
    "agentId": "3380c209",
    "usage": {
      "input_tokens": 2,
      "output_tokens": 787,
      "cache_read_input_tokens": 24989
    },
    "prompt": "You are implementing Task 1...",
    "content": [{"type": "text", "text": "..."}]
  }
}
```

The `agentId` field links to subagent sessions, and the `usage` field contains token usage for that specific subagent invocation.
