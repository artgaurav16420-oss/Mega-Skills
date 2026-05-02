# Persuasion Principles for Skill Design

## Overview

LLMs respond to the same persuasion principles as humans. Understanding this psychology helps you design more effective skills - not to manipulate, but to ensure critical practices are followed even under pressure.

**Research foundation:** Meincke et al. (2025) tested 7 persuasion principles with N=28,000 AI conversations. Persuasion techniques more than doubled compliance rates (33% → 72%, p < .001).

## The Seven Principles

### 1. Authority

**What it is:** Deference to expertise, credentials, or official sources.

#### How it works in skills

1. Imperative language: "YOU MUST", "Never", "Always"
1. Non-negotiable framing: "No exceptions"
1. Eliminates decision fatigue and rationalization

#### When to use

1. Discipline-enforcing skills (TDD, verification requirements)
1. Safety-critical practices
1. Established best practices

#### Example

```markdown
✅ Write code before test? Delete it. Start over. No exceptions.
❌ Consider writing tests first when feasible.
```

### 2. Commitment

**What it is:** Consistency with prior actions, statements, or public declarations.

#### How it works in skills (2)

1. Require announcements: "Announce skill usage"
1. Force explicit choices: "Choose A, B, or C"
1. Use tracking: TodoWrite for checklists

#### When to use (2)

1. Ensuring skills are actually followed
1. Multi-step processes
1. Accountability mechanisms

#### Example (2)

```markdown
✅ When you find a skill, you MUST announce: "I'm using [Skill Name]"
❌ Consider letting your partner know which skill you're using.
```

### 3. Scarcity

**What it is:** Urgency from time limits or limited availability.

#### How it works in skills (3)

1. Time-bound requirements: "Before proceeding"
1. Sequential dependencies: "Immediately after X"
1. Prevents procrastination

#### When to use (3)

1. Immediate verification requirements
1. Time-sensitive workflows
1. Preventing "I'll do it later"

#### Example (3)

```markdown
✅ After completing a task, IMMEDIATELY request code review before proceeding.
❌ You can review code when convenient.
```

### 4. Social Proof

**What it is:** Conformity to what others do or what's considered normal.

#### How it works in skills (4)

1. Universal patterns: "Every time", "Always"
1. Failure modes: "X without Y = failure"
1. Establishes norms

#### When to use (4)

1. Documenting universal practices
1. Warning about common failures
1. Reinforcing standards

#### Example (4)

```markdown
✅ Checklists without TodoWrite tracking = steps get skipped. Every time.
❌ Some people find TodoWrite helpful for checklists.
```

### 5. Unity

**What it is:** Shared identity, "we-ness", in-group belonging.

#### How it works in skills (5)

1. Collaborative language: "our codebase", "we're colleagues"
1. Shared goals: "we both want quality"

#### When to use (5)

1. Collaborative workflows
1. Establishing team culture
1. Non-hierarchical practices

#### Example (5)

```markdown
✅ We're colleagues working together. I need your honest technical judgment.
❌ You should probably tell me if I'm wrong.
```

### 6. Reciprocity

**What it is:** Obligation to return benefits received.

#### How it works

1. Use sparingly - can feel manipulative
1. Rarely needed in skills

#### When to avoid

1. Almost always (other principles more effective)

### 7. Liking

**What it is:** Preference for cooperating with those we like.

#### How it works (2)

1. **DON'T USE for compliance**
1. Conflicts with honest feedback culture
1. Creates sycophancy

#### When to avoid (2)

1. Always for discipline enforcement

## Principle Combinations by Skill Type

| Skill Type | Use | Avoid |
|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-----|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::----|
| Discipline-enforcing | Authority + Commitment + Social Proof | Liking, Reciprocity |
| Guidance/technique | Moderate Authority + Unity | Heavy authority |
| Collaborative | Unity + Commitment | Authority, Liking |
| Reference | Clarity only | All persuasion |

## Why This Works: The Psychology

### Bright-line rules reduce rationalization

1. "YOU MUST" removes decision fatigue
1. Absolute language eliminates "is this an exception?" questions
1. Explicit anti-rationalization counters close specific loopholes

#### Implementation intentions create automatic behavior

1. Clear triggers + required actions = automatic execution
1. "When X, do Y" more effective than "generally do Y"
1. Reduces cognitive load on compliance

#### LLMs are parahuman

1. Trained on human text containing these patterns
1. Authority language precedes compliance in training data
1. Commitment sequences (statement → action) frequently modeled
1. Social proof patterns (everyone does X) establish norms

## Ethical Use

### Legitimate

1. Ensuring critical practices are followed
1. Creating effective documentation
1. Preventing predictable failures

#### Illegitimate

1. Manipulating for personal gain
1. Creating false urgency
1. Guilt-based compliance

**The test:** Would this technique serve the user's genuine interests if they fully understood it?

## Research Citations

**Cialdini, R. B. (2021).** *Influence: The Psychology of Persuasion (New and Expanded).* Harper Business.

1. Seven principles of persuasion
1. Empirical foundation for influence research

**Meincke, L., Shapiro, D., Duckworth, A. L., Mollick, E., Mollick, L., & Cialdini, R. (2025).** Call Me A Jerk: Persuading AI to Comply with Objectionable Requests. University of Pennsylvania.

1. Tested 7 principles with N=28,000 LLM conversations
1. Compliance increased 33% → 72% with persuasion techniques
1. Authority, commitment, scarcity most effective
1. Validates parahuman model of LLM behavior

## Quick Reference

When designing a skill, ask:

1. **What type is it?** (Discipline vs. guidance vs. reference)
1. **What behavior am I trying to change?**
1. **Which principle(s) apply?** (Usually authority + commitment for discipline)
1. **Am I combining too many?** (Don't use all seven)
1. **Is this ethical?** (Serves user's genuine inter