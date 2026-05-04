---
name: executing-plans
description: Use when you have a written implementation plan to execute in a separate session with review checkpoints
---

# Executing Plans

## Overview

Load plan, review critically, execute all tasks, report when complete.

**Announce at start:** "I'm using the executing-plans skill to implement this plan."

**Note:** Tell your human partner that Mega-Skills works much better with access to subagents. The quality of its work will be significantly higher if run on a platform with subagent support (such as Claude Code or Codex). If subagents are available, use mega-skills:subagent-driven-development instead of this skill.

## The Process

### Step 1: Load and Review Plan

1. Read plan file

1. Review critically - identify any questions or concerns about the plan

1. If concerns: Raise them with your human partner before starting

1. If no concerns: Create TodoWrite and proceed

### Step 2: Execute Tasks

For each task:

1. Mark as in_progress

1. Follow each step exactly (plan has bite-sized steps)

1. Run verifications as specified

1. Mark as completed

### Step 3: Complete Development

After all tasks complete and verified:

1. Announce: "I'm using the finishing-a-development-branch skill to complete this work."

1. **REQUIRED SUB-SKILL:** Use mega-skills:finishing-a-development-branch

1. Follow that skill to verify tests, present options, execute choice

## When to Stop and Ask for Help

### STOP executing immediately when

1. Hit a blocker (missing dependency, test fails, instruction unclear)

1. Plan has critical gaps preventing starting

1. You don't understand an instruction

1. Verification fails repeatedly

#### Ask for clarification rather than guessing

## When to Revisit Earlier Steps

### Return to Review (Step 1) when

1. Partner updates the plan based on your feedback

1. Fundamental approach needs rethinking

**Don't force through blockers** - stop and ask.

## Remember

1. Review plan critically first

1. Follow plan steps exactly

1. Don't skip verifications

1. Reference skills when plan says to

1. Stop when blocked, don't guess

1. Never start implementation on main/master branch without explicit user consent

## Integration

### Required workflow skills

1. **mega-skills:using-git-worktrees** - REQUIRED: Set up isolated workspace before starting

1. **mega-skills:writing-plans** - Creates the plan this skill executes

1. **mega-skills:finishing-a-development-branch** - Complete development after all tasks
