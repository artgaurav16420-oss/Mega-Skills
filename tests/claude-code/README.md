# Claude Code Skills Tests

Automated tests for mega-skills skills using Claude Code CLI.

## Overview

This test suite verifies that skills are loaded correctly and Claude follows them as expected. Tests invoke Claude Code in headless mode (`claude -p`) and verify the behavior.

## Requirements

1. Claude Code CLI installed and in PATH (`claude --version` should work)
1. Local mega-skills plugin installed (see main README for installation)

## Running Tests

### Run all fast tests (recommended)

```bash
./run-skill-tests.sh
```

### Run integration tests (slow, 10-30 minutes)

```bash
./run-skill-tests.sh --integration
```

### Run specific test

```bash
./run-skill-tests.sh --test test-subagent-driven-development.sh
```

### Run with verbose output

```bash
./run-skill-tests.sh --verbose
```

### Set custom timeout

```bash
./run-skill-tests.sh --timeout 1800  # 30 minutes for integration tests
```

## Test Structure

### test-helpers.sh

Common functions for skills testing:

1. `run_claude "prompt" [timeout]` - Run Claude with prompt
1. `assert_contains output pattern name` - Verify pattern exists
1. `assert_not_contains output pattern name` - Verify pattern absent
1. `assert_count output pattern count name` - Verify exact count
1. `assert_order output pattern_a pattern_b name` - Verify order
1. `create_test_project` - Create temp test directory
1. `create_test_plan project_dir` - Create sample plan file

### Test Files

Each test file:

1. Sources `test-helpers.sh`
1. Runs Claude Code with specific prompts
1. Verifies expected behavior using assertions
1. Returns 0 on success, non-zero on failure

## Example Test

```bash
#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/test-helpers.sh"

echo "=== Test: My Skill ==="

## Ask Claude about the skill
output=$(run_claude "What does the my-skill skill do?" 30)

## Verify response
assert_contains "$output" "expected behavior" "Skill describes behavior"

echo "=== All tests passed ==="
```

## Current Tests

### Fast Tests (run by default)

#### test-subagent-driven-development.sh

Tests skill content and requirements (~2 minutes):

1. Skill loading and accessibility
1. Workflow ordering (spec compliance before code quality)
1. Self-review requirements documented
1. Plan reading efficiency documented
1. Spec compliance reviewer skepticism documented
1. Review loops documented
1. Task context provision documented

### Integration Tests (use --integration flag)

#### test-subagent-driven-development-integration.sh

Full workflow execution test (~10-30 minutes):

1. Creates real test project with Node.js setup
1. Creates implementation plan with 2 tasks
1. Executes plan using subagent-driven-development
1. Verifies actual behaviors:
1. Plan read once at start (not per task)
1. Full task text provided in subagent prompts
1. Subagents perform self-review before reporting
1. Spec compliance review happens before code quality
1. Spec reviewer reads code independently
1. Working implementation is produced
1. Tests pass
1. Proper git commits created

#### What it tests

1. The workflow actually works end-to-end
1. Our improvements are actually applied
1. Subagents follow the skill correctly
1. Final code is functional and tested

## Adding New Tests

1. Create new test file: `test-`<skill-name>`.sh`
1. Source test-helpers.sh
1. Write tests using `run_claude` and assertions
1. Add to test list in `run-skill-tests.sh`
1. Make executable: `chmod +x test-`<skill-name>`.sh`

## Timeout Considerations

1. Default timeout: 5 minutes per test
1. Claude Code may take time to respond
1. Adjust with `--timeout` if needed
1. Tests should be focused to avoid long runs

## Debugging Failed Tests

With `--verbose`, you'll see full Claude output:

```bash
./run-skill-tests.sh --verbose --test test-subagent-driven-development.sh
```

Without verbose, only failures show output.

## CI/CD Integration

To run in CI:

```bash
## Run with explicit timeout for CI environments
./run-skill-tests.sh --timeout 900

## Exit code 0 = success, non-zero = failure
```

## Notes

1. Tests verify skill *instructions*, not full execution
1. Full workflow tests would be very slow
1. Focus on verifying key skill requirements
1. Tests should be deterministic
1. Avoid testing implementation details
