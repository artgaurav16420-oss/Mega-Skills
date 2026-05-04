---
name: requesting-code-review
description: Use when completing tasks, implementing major features, or before merging to verify work meets requirements
---

# Requesting Code Review

Dispatch code-reviewer subagent to catch issues before they cascade. The reviewer gets precisely crafted context for evaluation — never your session's history. This keeps the reviewer focused on the work product, not your thought process, and preserves your own context for continued work.

**Core principle:** Review early, review often.

## When to Request Review

### Mandatory

1. After each task in subagent-driven development

1. After completing major feature

1. Before merge to main

#### Optional but valuable

1. When stuck (fresh perspective)

1. Before refactoring (baseline check)

1. After fixing complex bug

## How to Request

### 1. Get git SHAs

```bash
BASE_SHA=$(git rev-parse HEAD~1)  # or origin/main
HEAD_SHA=$(git rev-parse HEAD)
```

#### 2. Dispatch code-reviewer subagent

Use Task tool with code-reviewer role, fill template at `code-reviewer.md`

#### Placeholders

1. `{WHAT_WAS_IMPLEMENTED}` - What you just built

1. `{PLAN_OR_REQUIREMENTS}` - What it should do

1. `{BASE_SHA}` - Starting commit

1. `{HEAD_SHA}` - Ending commit

1. `{DESCRIPTION}` - Brief summary

#### 3. Act on feedback

1. Fix Critical issues immediately

1. Fix Important issues before proceeding

1. Note Minor issues for later

1. Push back if reviewer is wrong (with reasoning)

## Example

```dot
[Just completed Task 2: Add verification function]
You: Let me request code review before proceeding.
BASE_SHA=$(git log --oneline | grep "Task 1" | head -1 | awk '{print $1}')
HEAD_SHA=$(git rev-parse HEAD)
[Dispatch code-reviewer subagent]
  WHAT_WAS_IMPLEMENTED: Verification and repair functions for conversation index
  PLAN_OR_REQUIREMENTS: Task 2 from docs/mega-skills/plans/deployment-plan.md
  BASE_SHA: a7981ec
  HEAD_SHA: 3df7661
  DESCRIPTION: Added verifyIndex() and repairIndex() with 4 issue types
[Subagent returns]:
  Strengths: Clean architecture, real tests
  Issues:
    Important: Missing progress indicators
    Minor: Magic number (100) for reporting interval
  Assessment: Ready to proceed
You: [Fix progress indicators]
[Continue to Task 3]
```

## Integration with Workflows

### Subagent-Driven Development

1. Review after EACH task

1. Catch issues before they compound

1. Fix before moving to next task

#### Executing Plans

1. Review after each batch (3 tasks)

1. Get feedback, apply, continue

#### Ad-Hoc Development

1. Review before merge

1. Review when stuck

## Red Flags

### Never

1. Skip review because "it's simple"

1. Ignore Critical issues

1. Proceed with unfixed Important issues

1. Argue with valid technical feedback

#### If reviewer wrong

1. Push back with technical reasoning

1. Show code/tests that prove it works

1. Request clarification

See template at: requesting-code-review/code-reviewer.md
