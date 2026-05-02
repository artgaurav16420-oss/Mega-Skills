---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes
---

# Systematic Debugging

## Overview

Random fixes waste time and create new bugs. Quick patches mask underlying issues.

**Core principle:** ALWAYS find root cause before attempting fixes. Symptom fixes are failure.

### Violating the letter of this process is violating the spirit of debugging

## The Iron Law

```text
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you haven't completed Phase 1, you cannot propose fixes.

## When to Use

Use for ANY technical issue:

1. Test failures

1. Bugs in production

1. Unexpected behavior

1. Performance problems

1. Build failures

1. Integration issues

### Use this ESPECIALLY when

1. Under time pressure (emergencies make guessing tempting)

1. "Just one quick fix" seems obvious

1. You've already tried multiple fixes

1. Previous fix didn't work

1. You don't fully understand the issue

#### Don't skip when

1. Issue seems simple (simple bugs have root causes too)

1. You're in a hurry (rushing guarantees rework)

1. Manager wants it fixed NOW (systematic is faster than thrashing)

## The Four Phases

You MUST complete each phase before proceeding to the next.

### Phase 1: Root Cause Investigation

#### BEFORE attempting ANY fix

1. **Read Error Messages Carefully**
1. Don't skip past errors or warnings
1. They often contain the exact solution
1. Read stack traces completely
1. Note line numbers, file paths, error codes

1. **Reproduce Consistently**
1. Can you trigger it reliably?
1. What are the exact steps?
1. Does it happen every time?
1. If not reproducible → gather more data, don't guess

1. **Check Recent Changes**
1. What changed that could cause this?
1. Git diff, recent commits
1. New dependencies, config changes
1. Environmental differences

1. **Gather Evidence in Multi-Component Systems**

#### WHEN system has multiple components (CI → build → signing, API → service → database)

#### BEFORE proposing fixes, add diagnostic instrumentation

```text
   For EACH component boundary:

     - Log what data enters component
     - Log what data exits component
     - Verify environment/config propagation
     - Check state at each layer

   Run once to gather evidence showing WHERE it breaks
   THEN analyze evidence to identify failing component
   THEN investigate that specific component
```

#### Example (multi-layer system)

```bash
## Layer 1: Workflow
   echo "=== Secrets available in workflow: ==="
   echo "IDENTITY: ${IDENTITY:+SET}${IDENTITY:-UNSET}"
## Layer 2: Build script
   echo "=== Env vars in build script: ==="
   env | grep IDENTITY || echo "IDENTITY not in environment"
## Layer 3: Signing script
   echo "=== Keychain state: ==="
   security list-keychains
   security find-identity -v
## Layer 4: Actual signing
   codesign --sign "$IDENTITY" --verbose=4 "$APP"
```

   **This reveals:** Which layer fails (secrets → workflow ✓, workflow → build ✗)

1. **Trace Data Flow**

## WHEN error is deep in call stack

   See `root-cause-tracing.md` in this directory for the complete backward tracing technique.

### Quick version

1. Where does bad value originate?
1. What called this with bad value?
1. Keep tracing up until you find the source
1. Fix at source, not at symptom

### Phase 2: Pattern Analysis

#### Find the pattern before fixing

1. **Find Working Examples**
1. Locate similar working code in same codebase
1. What works that's similar to what's broken?

1. **Compare Against References**
1. If implementing pattern, read reference implementation COMPLETELY
1. Don't skim - read every line
1. Understand the pattern fully before applying

1. **Identify Differences**
1. What's different between working and broken?
1. List every difference, however small
1. Don't assume "that can't matter"

1. **Understand Dependencies**
1. What other components does this need?
1. What settings, config, environment?
1. What assumptions does it make?

### Phase 3: Hypothesis and Testing

#### Scientific method

1. **Form Single Hypothesis**
1. State clearly: "I think X is the root cause because Y"
1. Write it down
1. Be specific, not vague

1. **Test Minimally**
1. Make the SMALLEST possible change to test hypothesis
1. One variable at a time
1. Don't fix multiple things at once

1. **Verify Before Continuing**
1. Did it work? Yes → Phase 4
1. Didn't work? Form NEW hypothesis
1. DON'T add more fixes on top

1. **When You Don't Know**
1. Say "I don't understand X"
1. Don't pretend to know
1. Ask for help
1. Research more

### Phase 4: Implementation

#### Fix the root cause, not the symptom

1. **Create Failing Test Case**
1. Simplest possible reproduction
1. Automated test if possible
1. One-off test script if no framework
1. MUST have before fixing
1. Use the `mega-skills:test-driven-development` skill for writing proper failing tests

1. **Implement Single Fix**
1. Address the root cause identified
1. ONE change at a time
1. No "while I'm here" improvements
1. No bundled refactoring

1. **Verify Fix**
1. Test passes now?
1. No other tests broken?
1. Issue actually resolved?

1. **If Fix Doesn't Work**
1. STOP
1. Count: How many fixes have you tried?
1. If < 3: Return to Phase 1, re-analyze with new information
1. **If ≥ 3: STOP and question the architecture (step 5 below)**
1. DON'T attempt Fix #4 without architectural discussion

1. **If 3+ Fixes Failed: Question Architecture**

#### Pattern indicating architectural problem

1. Each fix reveals new shared state/coupling/problem in different place
1. Fixes require "massive refactoring" to implement
1. Each fix creates new symptoms elsewhere

#### STOP and question fundamentals

1. Is this pattern fundamentally sound?
1. Are we "sticking with it through sheer inertia"?
1. Should we refactor architecture vs. continue fixing symptoms?

#### Discuss with your human partner before attempting more fixes

   This is NOT a failed hypothesis - this is a wrong architecture.

## Red Flags - STOP and Follow Process

If you catch yourself thinking:

1. "Quick fix for now, investigate later"

1. "Just try changing X and see if it works"

1. "Add multiple changes, run tests"

1. "Skip the test, I'll manually verify"

1. "It's probably X, let me fix that"

1. "I don't fully understand but this might work"

1. "Pattern says X but I'll adapt it differently"

1. "Here are the main problems: [lists fixes without investigation]"

1. Proposing solutions before tracing data flow

1. **"One more fix attempt" (when already tried 2+)**

1. **Each fix reveals new problem in different place**

### ALL of these mean: STOP. Return to Phase 1

**If 3+ fixes failed:** Question the architecture (see Phase 4.5)

## your human partner's Signals You're Doing It Wrong

### Watch for these redirections

1. "Is that not happening?" - You assumed without verifying

1. "Will it show us...?" - You should have added evidence gathering

1. "Stop guessing" - You're proposing fixes without understanding

1. "Ultrathink this" - Question fundamentals, not just symptoms

1. "We're stuck?" (frustrated) - Your approach isn't working

**When you see these:** STOP. Return to Phase 1.

## Common Rationalizations

| Excuse | Reality |
|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-----|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---|
| "Issue is simple, don't need process" | Simple issues have root causes too. Process is fast for simple bugs. |
| "Emergency, no time for process" | Systematic debugging is FASTER than guess-and-check thrashing. |
| "Just try this first, then investigate" | First fix sets the pattern. Do it right from the start. |
| "I'll write test after confirming fix works" | Untested fixes don't stick. Test first proves it. |
| "Multiple fixes at once saves time" | Can't isolate what worked. Causes new bugs. |
| "Reference too long, I'll adapt the pattern" | Partial understanding guarantees bugs. Read it completely. |
| "I see the problem, let me fix it" | Seeing symptoms ≠ understanding root cause. |
| "One more fix attempt" (after 2+ failures) | 3+ failures = architectural problem. Question pattern, don't fix again. |

## Quick Reference

| Phase | Key Activities | Success Criteria |
|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::----|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---|
| **1. Root Cause** | Read errors, reproduce, check changes, gather evidence | Understand WHAT and WHY |
| **2. Pattern** | Find working examples, compare | Identify differences |
| **3. Hypothesis** | Form theory, test minimally | Confirmed or new hypothesis |
| **4. Implementation** | Create test, fix, verify | Bug resolved, tests pass |

## When Process Reveals "No Root Cause"

If systematic investigation reveals issue is truly environmental, timing-dependent, or external:

1. You've completed the process

1. Document what you investigated

1. Implement appropriate handling (retry, timeout, error message)

1. Add monitoring/logging for future investigation

**But:** 95% of "no root cause" cases are incomplete investigation.

## Supporting Techniques

These techniques are part of systematic debugging and available in this directory:

1. **`root-cause-tracing.md`** - Trace bugs ba