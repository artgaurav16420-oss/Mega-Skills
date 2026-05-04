# scripts-overlay

## Overview

Community of 5 nodes

- **Size**: 5 nodes
- **Cohesion**: 0.3103
- **Dominant Language**: bash

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| die | Function | scripts\sync-to-codex-plugin.sh | 162-162 |
| overlay_destination_paths | Function | scripts\sync-to-codex-plugin.sh | 227-244 |
| copy_local_destination_overlay | Function | scripts\sync-to-codex-plugin.sh | 246-259 |
| prepare_preview_checkout | Function | scripts\sync-to-codex-plugin.sh | 265-280 |
| prepare_apply_checkout | Function | scripts\sync-to-codex-plugin.sh | 282-287 |

## Execution Flows

- **prepare_preview_checkout** (criticality: 0.37, depth: 2)

## Dependencies

### Outgoing

- `git` (7 edge(s))
- `echo` (1 edge(s))
- `exit` (1 edge(s))
- `read` (1 edge(s))
- `mkdir` (1 edge(s))
- `dirname` (1 edge(s))
- `cp` (1 edge(s))
- `rm` (1 edge(s))
- `mktemp` (1 edge(s))

### Incoming

- `scripts\sync-to-codex-plugin.sh` (5 edge(s))
