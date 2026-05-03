---
name: auto-skills
description: "Persistent AI skill orchestration mode. Automatically selects and activates the best skill for every task in the session."
---

# Auto-Skills Mode

**YOU ARE IN AUTO-SKILLS MODE.** This mode is persistent and session-wide.

## Behavior Rules

1. **ACTIVE EVERY RESPONSE**: This mode remains active for all subsequent tasks until explicitly stopped via `/stop-auto-skills`.
2. **MANDATORY ORCHESTRATION**: For EVERY user request that involves a task (coding, research, design, etc.), you MUST find the most relevant skill before proceeding.
3. **TURN-BY-TURN REVALIDATION**: At the start of every reply, quickly re-check whether the active skill is still correct for the latest user intent.
4. **SELF-CORRECTION**: If you find yourself working without a skill, stop and trigger orchestration immediately.
5. **TOKEN EFFICIENCY**: Always activate the `mega-skills:caveman` skill alongside any orchestrated skill to minimize token usage during autonomous sessions.
6. **DUAL-SKILL LOCK**: Treat `caveman` as mandatory while auto mode is active; if it is missing in any turn, re-activate it before continuing.

## Execution Flow

1. **Identify Task**: Determine the core objective of the user's message.
2. **List & Match**:
   - Run `rg "^description:" skills/**/SKILL.md` to see available skills quickly.
   - OR run `node scripts/cli.js auto "[task]"` if you want embedding-based precision.
3. **Activate**:
   - Read the chosen `SKILL.md` using `view_file`.
   - Announce activation: `[Auto-Skills: Activating <skill-name> + caveman]`.
4. **Execute**: Follow the chosen skill's instructions exactly.

## Stickiness Guardrails

- **Response Prefix**: Start every response with `[Auto-Skills: <ActiveSkillName>]` to maintain state in context.
- **No Drifting**: Do not skip the orchestration step even for "simple" tasks.
- **Heartbeat Check**: Every 3-5 turns, restate active mode in one short line: `[Auto-Skills: Still active with <ActiveSkillName>]`.
- **Context-Recovery Rule**: If conversation drifts or memory is uncertain, re-run orchestration before answering the task.
- **Caveman Recovery Rule**: If a reply is generated without caveman constraints, pause and restate/rewrite the answer in caveman style.
- **Mode Toggle**: Only deactivate if the user types `/stop-auto-skills` or "stop auto skills".

## Termination

When deactivating:

- Announce: `[Auto-Skills: Deactivating. Returning to manual mode.]`
