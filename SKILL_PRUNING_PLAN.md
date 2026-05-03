# Skill Pruning Plan (Repo Size Optimization)

Date: 2026-05-03

## Objective
Reduce repository size while preserving Mega-Skills' Core OS value proposition for software engineering workflows.

## Keep Set (Do Not Remove)
These are core methodology skills and should remain in the default distribution:
- `caveman`
- `brainstorming`
- `writing-plans`
- `test-driven-development`
- `sequential-thinking`
- `memory-management`
- `systematic-debugging`
- `subagent-driven-development`

## Candidate Removal / Extraction Matrix

| Skill | Approx Size | Core Dependency Risk | User Impact | Recommendation |
| :--- | ---: | :---: | :---: | :--- |
| `writing-skills` | ~49.5 MB | Low | Medium | Move to optional `creator-pack` |
| `canvas-design` | ~5.6 MB | Low | Medium | Move to optional `creator-pack` |
| `docx` | ~1.1 MB | Low | Medium | Move to optional `office-pack` |
| `xlsx` | ~1.1 MB | Low | Medium | Move to optional `office-pack` |
| `slack-gif-creator` | ~0.2 MB | None | Low | Remove from default bundle |
| `youtube-downloader` | small | None | Low | Remove from default bundle |
| `twitter-algorithm-optimizer` | small | None | Low | Remove from default bundle |
| `domain-name-brainstormer` | small | None | Low | Remove from default bundle |
| `tailored-resume-generator` | small | None | Low | Remove from default bundle |
| `competitive-ads-extractor` | small | None | Low | Remove from default bundle |

## Phase Plan

### Phase 1 — Extract Large Non-Core Skills
1. Move `writing-skills`, `canvas-design`, `docx`, `xlsx` to optional packs.
2. Keep compatibility stubs that point to install instructions.
3. Update README tables to identify default vs optional packs.

### Phase 2 — Trim Niche Marketing/Media Skills from Default
1. Remove niche social/content/media skills from default sync.
2. Preserve them in an external repo or separate pack registry.

### Phase 3 — Validation and Regression Checks
Run:
```bash
node scripts/cli.js validate
npm run check:auto-skills-policy
npm run eval:auto-skills
node scripts/cli.js verify antigravity
```

### Phase 4 — Release
1. Publish release notes with migration instructions.
2. Add one-line guidance in README for installing optional packs.

## Success Metrics
- Reduce `skills/` footprint by at least 60%.
- Preserve Tier-1 skill availability in default install.
- Keep CI policy/eval checks green after extraction.

