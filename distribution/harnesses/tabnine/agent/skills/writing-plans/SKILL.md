---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching code
---

# Writing Plans

## Overview

Write comprehensive implementation plans assuming the engineer has zero context for our codebase and questionable taste. Document everything they need to know: which files to touch for each task, code, testing, docs they might need to check, how to test it. Give them the whole plan as bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

Assume they are a skilled developer, but know almost nothing about our toolset or problem domain. Assume they don't know good test design very well.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

**Context:** This should be run in a dedicated worktree (created by brainstorming skill).

**Save plans to:** `docs/mega-skills/plans/YYYY-MM-DD-`<feature-name>`.md`

1. (User preferences for plan location override this default)

## Scope Check

If the spec covers multiple independent subsystems, it should have been broken into sub-project specs during brainstorming. If it wasn't, suggest breaking this into separate plans — one per subsystem. Each plan should produce working, testable software on its own.

## File Structure

Before defining tasks, map out which files will be created or modified and what each one is responsible for. This is where decomposition decisions get locked in.

1. Design units with clear boundaries and well-defined interfaces. Each file should have one clear responsibility.

1. You reason best about code you can hold in context at once, and your edits are more reliable when files are focused. Prefer smaller, focused files over large ones that do too much.

1. Files that change together should live together. Split by responsibility, not by technical layer.

1. In existing codebases, follow established patterns. If the codebase uses large files, don't unilaterally restructure - but if a file you're modifying has grown unwieldy, including a split in the plan is reasonable.

This structure informs the task decomposition. Each task should produce self-contained changes that make sense independently.

## Bite-Sized Task Granularity

### Each step is one action (2-5 minutes)

1. "Write the failing test" - step

1. "Run it to make sure it fails" - step

1. "Implement the minimal code to make the test pass" - step

1. "Run the tests and make sure they pass" - step

1. "Commit" - step

## Plan Document Header

### Every plan MUST start with this header

```markdown
## [Feature Name] Implementation Plan
> **For agentic workers:** REQUIRED SUB-SKILL: Use mega-skills:subagent-driven-development (recommended) or mega-skills:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
**Goal:** [One sentence describing what this builds]
**Architecture:** [2-3 sentences about approach]
**Tech Stack:** [Key technologies/libraries]
---
```

## Task Structure

````markdown
### Task N: [Component Name]
**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`
- [ ] **Step 1: Write the failing test**
```

def test_specific_behavior():
    result = function(input)
    assert result == expected

```text
- [ ] **Step 2: Run test to verify it fails**
Run: `pytest tests/path/test.py::test_name -v`
Expected: FAIL with "function not defined"
- [ ] **Step 3: Write minimal implementation**
```

def function(input):
    return expected

```text
- [ ] **Step 4: Run test to verify it passes**
Run: `pytest tests/path/test.py::test_name -v`
Expected: PASS
- [ ] **Step 5: Commit**
```

git add tests/path/test.py src/path/file.py
git commit -m "feat: add specific feature"

```text
```

## No Placeholders

Every step must contain the actual content an engineer needs. These are **plan failures** — never write them:

1. "TBD", "TODO", "implement later", "fill in details"

1. "Add appropriate error handling" / "add validation" / "handle edge cases"

1. "Write tests for the above" (without actual test code)

1. "Similar to Task N" (repeat the code — the engineer may be reading tasks out of order)

1. Steps that describe what to do without showing how (code blocks required for code steps)

1. References to types, functions, or methods not defined in any task

## Remember

1. Exact file paths always

1. Complete code in every step — if a step changes code, show the code

1. Exact commands with expected output

1. DRY, YAGNI, TDD, frequent commits

## Self-Review

After writing the complete plan, look at the spec with fresh eyes and check the plan against it. This is a checklist you run yourself — not a subagent dispatch.

**1. Spec coverage:** Skim each section/requirement in the spec. Can you point to a task that implements it? List any gaps.

**2. Placeholder scan:** Search your plan for red flags — any of the patterns from the "No Placeholders" section above. Fix them.

**3. Type consistency:** Do the types, method signatures, and property names you used in later tasks match what you defined in earlier tasks? A function called `clearLayers()` in Task 3 but `clearFullLayers()` in Task 7 is a bug.

If you find issues, fix them inline. No need to re-review — just fix and move on. If you find a spec requirement with no task, add the task.

## Execution Handoff

After saving the plan, offer execution choice:

### "Plan complete and saved to `docs/mega-skills/plans/<filename>.md`. Two execution options

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

#### Which approach?"

#### If Subagent-Driven chosen

1. **REQUIRED SUB-SKILL:** Use mega-skills:subagent-driven-development

1. Fresh subagent per task + two-stage review

#### If Inline Execution chosen

1. **REQUIRED SUB-SKILL:** Use mega-skills:executing-plans

1. Batch execution with checkpoints for review
