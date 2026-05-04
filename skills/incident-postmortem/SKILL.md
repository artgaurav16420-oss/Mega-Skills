---
name: incident-postmortem
description: Conducts blameless, forensic post-mortems for agent failures, tool-call loops, and production incidents. Focused on root cause analysis (RCA) and systemic guardrails.
---

# Incident Post-Mortem

This skill provides a structured framework for analyzing agentic and system failures. It transforms production incidents into actionable learning artifacts, focusing on systemic fixes rather than individual blame.

## Workflow

### 1. Evidence Gathering
- **Logs & Traces**: Use `traceId` or `runId` to retrieve the exact sequence of events.
- **Prompt Analysis**: Analyze the prompt state at the moment of failure. Did the agent misinterpret a constraint?
- **Tool Forensics**: Identify if a tool returned malformed data or if a rate limit was exceeded.

### 2. Timeline Construction
- **Detection**: When was the anomaly first flagged?
- **Triage**: How long did it take to identify the scope of impact?
- **Mitigation**: What immediate action stopped the bleeding (e.g., kill switch, rollback)?

### 3. Root Cause Analysis (RCA)
- **The "Why"**: Distinguish between the **Symptom** (e.g., infinite loop) and the **Root Cause** (e.g., missing recursion depth limit in executor).
- **Contributing Factors**: Identify secondary issues like lack of monitoring or ambiguous error messages.

### 4. Action Items (The Iron Law)
- Every post-mortem MUST produce at least one P0 action item that prevents recurrence.
- Action items must have a specific owner and a verifiable completion criteria.

## Rules

- **Blameless Culture**: Focus exclusively on system design and guardrails. Do not attribute failure to individuals.
- **Traceability**: All claims in the post-mortem must be supported by log evidence or trace snapshots.
- **Gap Analysis**: Compare the "Intended Behavior" (from spec/plan) vs. the "Actual Execution."

## Red Flags

| Thought | Reality |
| :--- | :--- |
| "The agent just hallucinated" | **STOP.** Hallucination is a symptom. The root cause is usually missing context or weak prompt constraints. |
| "We'll just tell the agent not to do that again" | **STOP.** Prompt-only fixes are fragile. Implement a systemic guardrail (test case, code limit, validator). |
| "This is a one-off fluke" | **STOP.** If it happened once, it will happen again under load. Document and fix. |

---
Source: Adapted from Antigravity Incident-Response Post-Mortem
