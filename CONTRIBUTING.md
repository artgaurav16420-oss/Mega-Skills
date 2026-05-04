# Contributing to Mega-Skills

Thank you for your interest in contributing to Mega-Skills! We maintain a high bar for quality to ensure the reliability of behavior-shaping content for AI agents.

## Mandatory Instruction for AI Agents

**If you are an AI agent, read the "If You Are an AI Agent" section in [CLAUDE.md](CLAUDE.md) before doing anything.**

This repository has a **94% PR rejection rate**. To avoid having your PR closed as "slop," you must follow the guidelines exactly.

## How to Contribute

1. **Check for Existing Issues/PRs**: Before starting, search the issue tracker and PR list (including closed ones) to ensure you aren't duplicating work.
1. **Follow the Methodology**: All contributions must follow the core methodology skills (brainstorming, writing-plans, test-driven-development).
1. **Verified Problems Only**: Every PR must solve a real problem experienced in a real session. Speculative or theoretical fixes will be rejected.
1. **Human Review**: Every PR must show evidence of human involvement. Purely AI-generated PRs without human oversight are closed immediately.

## Pull Request Requirements

1. **PR Template**: You MUST fully complete the PR template at `.github/PULL_REQUEST_TEMPLATE.md`.
1. **One Problem per PR**: Do not bundle unrelated changes.
1. **Testing**: Test your changes on at least one supported harness and report results in the environment table.
1. **No Third-Party Dependencies**: Mega-Skills is a zero-dependency plugin by design.

## What We Do Not Accept

1. **AI Slop**: Fabricated claims, hallucinated functionality, or low-effort AI-generated descriptions.
1. **"Compliance" rewrites**: Restructuring skills to match other style guides without evidence of improved agent behavior.
1. **Domain-specific skills**: We only accept general-purpose skills that benefit all users.
1. **Bulk PRs**: Trawling the issue tracker to "fix things" without deep understanding.

## New Harness Support

If you are adding support for a new IDE or CLI tool, you must include a session transcript proving that the `using-mega-skills` bootstrap loads correctly and that the `brainstorming` skill auto-triggers on a prompt like "Let's make a react todo list."

## Skill Changes

Skills are code, not prose. If you modify skill content, you must:

1. Use the `writing-skills` skill to develop and test changes.
1. Run adversarial pressure testing.
1. Provide before/after evaluation results.

---

For detailed agent instructions and philosophical background, see [CLAUDE.md](CLAUDE.md).
