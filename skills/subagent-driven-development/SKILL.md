---
name: subagent-driven-development
description: Use when executing implementation plans with independent tasks in the current session
---

# Subagent-Driven Development

Execute plan by dispatching fresh subagent per task, with two-stage review after each: spec compliance review first, then code quality review.

**Why subagents:** You delegate tasks to specialized agents with isolated context. By precisely crafting their instructions and context, you ensure they stay focused and succeed at their task. They should never inherit your session's context or history — you construct exactly what they need. This also preserves your own context for coordination work.

**Core principle:** Fresh subagent per task + two-stage review (spec then quality) = high quality, fast iteration

## When to Use

```dot
digraph when_to_use {
    "Have implementation plan?" [shape=diamond];
    "Tasks mostly independent?" [shape=diamond];
    "Stay in this session?" [shape=diamond];
    "subagent-driven-development" [shape=box];
    "executing-plans" [shape=box];
    "Manual execution or brainstorm first" [shape=box];
    "Have implementation plan?" -> "Tasks mostly independent?" [label="yes"];
    "Have implementation plan?" -> "Manual execution or brainstorm first" [label="no"];
    "Tasks mostly independent?" -> "Stay in this session?" [label="yes"];
    "Tasks mostly independent?" -> "Manual execution or brainstorm first" [label="no - tightly coupled"];
    "Stay in this session?" -> "subagent-driven-development" [label="yes"];
    "Stay in this session?" -> "executing-plans" [label="no - parallel session"];
}
```

### vs. Executing Plans (parallel session)

1. Same session (no context switch)

1. Fresh subagent per task (no context pollution)

1. Two-stage review after each task: spec compliance first, then code quality

1. Faster iteration (no human-in-loop between tasks)

## The Process

```dot
digraph process {
    rankdir=TB;
    subgraph cluster_per_task {
        label="Per Task";
        "Dispatch implementer subagent (./implementer-prompt.md)" [shape=box];
        "Implementer subagent asks questions?" [shape=diamond];
        "Answer questions, provide context" [shape=box];
        "Implementer subagent implements, tests, commits, self-reviews" [shape=box];
        "Dispatch spec reviewer subagent (./spec-reviewer-prompt.md)" [shape=box];
        "Spec reviewer subagent confirms code matches spec?" [shape=diamond];
        "Implementer subagent fixes spec gaps" [shape=box];
        "Dispatch code quality reviewer subagent (./code-quality-reviewer-prompt.md)" [shape=box];
        "Code quality reviewer subagent approves?" [shape=diamond];
        "Implementer subagent fixes quality issues" [shape=box];
        "Mark task complete in TodoWrite" [shape=box];
    }
    "Read plan, extract all tasks with full text, note context, create TodoWrite" [shape=box];
    "More tasks remain?" [shape=diamond];
    "Dispatch final code reviewer subagent for entire implementation" [shape=box];
    "Use mega-skills:finishing-a-development-branch" [shape=box style=filled fillcolor=lightgreen];
    "Read plan, extract all tasks with full text, note context, create TodoWrite" -> "Dispatch implementer subagent (./implementer-prompt.md)";
    "Dispatch implementer subagent (./implementer-prompt.md)" -> "Implementer subagent asks questions?";
    "Implementer subagent asks questions?" -> "Answer questions, provide context" [label="yes"];
    "Answer questions, provide context" -> "Dispatch implementer subagent (./implementer-prompt.md)";
    "Implementer subagent asks questions?" -> "Implementer subagent implements, tests, commits, self-reviews" [label="no"];
    "Implementer subagent implements, tests, commits, self-reviews" -> "Dispatch spec reviewer subagent (./spec-reviewer-prompt.md)";
    "Dispatch spec reviewer subagent (./spec-reviewer-prompt.md)" -> "Spec reviewer subagent confirms code matches spec?";
    "Spec reviewer subagent confirms code matches spec?" -> "Implementer subagent fixes spec gaps" [label="no"];
    "Implementer subagent fixes spec gaps" -> "Dispatch spec reviewer subagent (./spec-reviewer-prompt.md)" [label="re-review"];
    "Spec reviewer subagent confirms code matches spec?" -> "Dispatch code quality reviewer subagent (./code-quality-reviewer-prompt.md)" [label="yes"];
    "Dispatch code quality reviewer subagent (./code-quality-reviewer-prompt.md)" -> "Code quality reviewer subagent approves?";
    "Code quality reviewer subagent approves?" -> "Implementer subagent fixes quality issues" [label="no"];
    "Implementer subagent fixes quality issues" -> "Dispatch code quality reviewer subagent (./code-quality-reviewer-prompt.md)" [label="re-review"];
    "Code quality reviewer subagent approves?" -> "Mark task complete in TodoWrite" [label="yes"];
    "Mark task complete in TodoWrite" -> "More tasks remain?";
    "More tasks remain?" -> "Dispatch implementer subagent (./implementer-prompt.md)" [label="yes"];
    "More tasks remain?" -> "Dispatch final code reviewer subagent for entire implementation" [label="no"];
    "Dispatch final code reviewer subagent for entire implementation" -> "Use mega-skills:finishing-a-development-branch";
}
```

## Model Selection

Use the least powerful model that can handle each role to conserve cost and increase speed.

**Mechanical implementation tasks** (isolated functions, clear specs, 1-2 files): use a fast, cheap model. Most implementation tasks are mechanical when the plan is well-specified.

**Integration and judgment tasks** (multi-file coordination, pattern matching, debugging): use a standard model.

**Architecture, design, and review tasks**: use the most capable available model.

### Task complexity signals

1. Touches 1-2 files with a complete spec → cheap model

1. Touches multiple files with integration concerns → standard model

1. Requires design judgment or broad codebase understanding → most capable model

## Handling Implementer Status

Implementer subagents report one of four statuses. Handle each appropriately:

**DONE:** Proceed to spec compliance review.

**DONE_WITH_CONCERNS:** The implementer completed the work but flagged doubts. Read the concerns before proceeding. If the concerns are about correctness or scope, address them before review. If they're observations (e.g., "this file is getting large"), note them and proceed to review.

**NEEDS_CONTEXT:** The implementer needs information that wasn't provided. Provide the missing context and re-dispatch.

**BLOCKED:** The implementer cannot complete the task. Assess the blocker:

1. If it's a context problem, provide more context and re-dispatch with the same model

1. If the task requires more reasoning, re-dispatch with a more capable model

1. If the task is too large, break it into smaller pieces

1. If the plan itself is wrong, escalate to the human

**Never** ignore an escalation or force the same model to retry without changes. If the implementer said it's stuck, something needs to change.

## Prompt Templates

1. `./implementer-prompt.md` - Dispatch implementer subagent

1. `./spec-reviewer-prompt.md` - Dispatch spec compliance reviewer subagent

1. `./code-quality-reviewer-prompt.md` - Dispatch code quality reviewer subagent

## Example Workflow

```text
You: I'm using Subagent-Driven Development to execute this plan.
[Read plan file once: docs/mega-skills/plans/feature-plan.md]
[Extract all 5 tasks with full text and context]
[Create TodoWrite with all tasks]
Task 1: Hook installation script
[Get Task 1 text and context (already extracted)]
[Dispatch implementation subagent with full task text + context]
Implementer: "Before I begin - should the hook be installed at user or system level?"
You: "User level (~/.config/mega-skills/hooks/)"
Implementer: "Got it. Implementing now..."
[Later] Implementer:
  - Implemented install-hook command
  - Added tests, 5/5 passing
  - Self-review: Found I missed --force flag, added it
  - Committed
[Dispatch spec compliance reviewer]
Spec reviewer: ✅ Spec compliant - all requirements met, nothing extra
[Get git SHAs, dispatch code quality reviewer]
Code reviewer: Strengths: Good test coverage, clean. Issues: None. Approved.
[Mark Task 1 complete]
Task 2: Recovery modes
[Get Task 2 text and context (already extracted)]
[Dispatch implementation subagent with full task text + context]
Implementer: [No questions, proceeds]
Implementer:
  - Added verify/repair modes
  - 8/8 tests passing
  - Self-review: All good
  - Committed
[Dispatch spec compliance reviewer]
Spec reviewer: ❌ Issues:
  - Missing: Progress reporting (spec says "report every 100 items")
  - Extra: Added --json flag (not requested)
[Implementer fixes issues]
Implementer: Removed --json flag, added progress reporting
[Spec reviewer reviews again]
Spec reviewer: ✅ Spec compliant now
[Dispatch code quality reviewer]
Code reviewer: Strengths: Solid. Issues (Important): Magic number (100)
[Implementer fixes]
Implementer: Extracted PROGRESS_INTERVAL constant
[Code reviewer reviews again]
Code reviewer: ✅ Approved
[Mark Task 2 complete]
...
[After all tasks]
[Dispatch final code-reviewer]
Final reviewer: All requirements met, ready to merge
Done!
```

## Advantages

### vs. Manual execution

1. Subagents follow TDD naturally

1. Fresh context per task (no confusion)

1. Parallel-safe (subagents don't interfere)

1. Subagent can ask questions (before AND during work)

#### vs. Executing Plans

1. Same session (no handoff)

1. Continuous progress (no waiting)

1. Review checkpoints automatic

#### Efficiency gains

1. No file reading overhead (controller provides full text)

1. Controller curates exactly what context is needed

1. Subagent gets complete information upfront

1. Questions surfaced before work begins (not after)

#### Quality gates

1. Self-review catches issues before handoff

1. Two-stage review: spec compliance, then code quality

1. Review loops ensure fixes actually work

1. Spec compliance prevents over/under-building

1. Code quality ensures implementation is well-built

#### Cost

1. More subagent invocations (implementer + 2 reviewers per task)

1. Controller does more prep work (extracting all tasks upfront)

1. Review loops add iterations

1. But catches issues early (cheaper than debugging later)

## Red Flags

### Never

1. Start implementation on main/master branch without explicit user consent

1. Skip reviews (spec compliance OR code quality)

1. Proceed with unfixed issues

1. Dispatch multiple implementation subagents in parallel (conflicts)

1. Make subagent read plan file (provide full text instead)

1. Skip scene-setting context (subagent needs to understand where task fits)

1. Ignore subagent questions (answer before letting them proceed)

1. Accept "close enough" on spec compliance (spec reviewer found issues = not done)

1. Skip review loops (reviewer found issues = implementer fixes = review again)

1. Let implementer self-review replace actual review (both are needed)

1. **Start code quality review before spec compliance is ✅** (wrong order)

1. Move to next task while either review has open issues

#### If subagent asks questions

1. Answer clearly and completely

1. Provide additional context if needed

1. Don't rush them into implementation

#### If reviewer finds issues

1. Implementer (same subagent) fixes them

1. Reviewer reviews again

1. Repeat until approved

1. Don't skip the re-review

#### If subagent fails task

1. Dispatch fix subagent with specific instructions

1. Don't try to fix manually (context pollution)

## Integration

### Required workflow skills

1. **mega-skills:using-git-worktrees** - REQUIRED: Set up isolated workspace before starting

1. **mega-skills:writing-plans** - Creates the plan this skill executes

1. **mega-skills:requesting-code-review** - Code review template for reviewer subagents

1. **mega-skills:finishing-a-development-branch** - Complete development after all tasks

#### Subagents should use

1. **mega-skills:test-driven-development** - Subagents follow TDD for each task

#### Alternative workflow

1. **mega-skills:executing-plans** - Use for parallel session instead of same-session execution
