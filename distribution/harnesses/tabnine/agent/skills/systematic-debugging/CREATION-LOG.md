# Creation Log: Systematic Debugging Skill

Reference example of extracting, structuring, and bulletproofing a critical skill.

## Source Material

Extracted debugging framework from `/Users/jesse/.claude/CLAUDE.md`:

1. 4-phase systematic process (Investigation → Pattern Analysis → Hypothesis → Implementation)
1. Core mandate: ALWAYS find root cause, NEVER fix symptoms
1. Rules designed to resist time pressure and rationalization

## Extraction Decisions

### What to include

1. Complete 4-phase framework with all rules
1. Anti-shortcuts ("NEVER fix symptom", "STOP and re-analyze")
1. Pressure-resistant language ("even if faster", "even if I seem in a hurry")
1. Concrete steps for each phase

#### What to leave out

1. Project-specific context
1. Repetitive variations of same rule
1. Narrative explanations (condensed to principles)

## Structure Following skill-creation/SKILL.md

1. **Rich when_to_use** - Included symptoms and anti-patterns
1. **Type: technique** - Concrete process with steps
1. **Keywords** - "root cause", "symptom", "workaround", "debugging", "investigation"
1. **Flowchart** - Decision point for "fix failed" → re-analyze vs add more fixes
1. **Phase-by-phase breakdown** - Scannable checklist format
1. **Anti-patterns section** - What NOT to do (critical for this skill)

## Bulletproofing Elements

Framework designed to resist rationalization under pressure:

### Language Choices

1. "ALWAYS" / "NEVER" (not "should" / "try to")
1. "even if faster" / "even if I seem in a hurry"
1. "STOP and re-analyze" (explicit pause)
1. "Don't skip past" (catches the actual behavior)

### Structural Defenses

1. **Phase 1 required** - Can't skip to implementation
1. **Single hypothesis rule** - Forces thinking, prevents shotgun fixes
1. **Explicit failure mode** - "IF your first fix doesn't work" with mandatory action
1. **Anti-patterns section** - Shows exactly what shortcuts look like

### Redundancy

1. Root cause mandate in overview + when_to_use + Phase 1 + implementation rules
1. "NEVER fix symptom" appears 4 times in different contexts
1. Each phase has explicit "don't skip" guidance

## Testing Approach

Created 4 validation tests following skills/meta/testing-skills-with-subagents:

### Test 1: Academic Context (No Pressure)

1. Simple bug, no time pressure
1. **Result:** Perfect compliance, complete investigation

### Test 2: Time Pressure + Obvious Quick Fix

1. User "in a hurry", symptom fix looks easy
1. **Result:** Resisted shortcut, followed full process, found real root cause

### Test 3: Complex System + Uncertainty

1. Multi-layer failure, unclear if can find root cause
1. **Result:** Systematic investigation, traced through all layers, found source

### Test 4: Failed First Fix

1. Hypothesis doesn't work, temptation to add more fixes
1. **Result:** Stopped, re-analyzed, formed new hypothesis (no shotgun)

**All tests passed.** No rationalizations found.

## Iterations

### Initial Version

1. Complete 4-phase framework
1. Anti-patterns section
1. Flowchart for "fix failed" decision

### Enhancement 1: TDD Reference

1. Added link to skills/testing/test-driven-development
1. Note explaining TDD's "simplest code" ≠ debugging's "root cause"
1. Prevents confusion between methodologies

## Final Outcome

Bulletproof skill that:

1. ✅ Clearly mandates root cause investigation
1. ✅ Resists time pressure rationalization
1. ✅ Provides concrete steps for each phase
1. ✅ Shows anti-patterns explicitly
1. ✅ Tested under multiple pressure scenarios
1. ✅ Clarifies relationship to TDD
1. ✅ Ready for use

## Key Insight

**Most important bulletproofing:** Anti-patterns section showing exact shortcuts that feel justified in the moment. When Claude thinks "I'll just add this one quick fix", seeing that exact pattern listed as wrong creates cognitive friction.

## Usage Example

When encountering a bug:

1. Load skill: skills/debugging/systematic-debugging
1. Read overview (10 sec) - reminded of mandate
1. Follow Phase 1 checklist - forced investigation
1. If tempted to skip - see anti-pattern, stop
1. Complete all phases - root cause found

**Time investment:** 5-10 minutes
**Time saved:** Hours of symptom-whack-a-mole

---

*Created: 2025-10-03*
*Purpose: Reference example for skill extraction and bulletproofing*
