# scripts-cmd

## Overview

Community of 7 nodes

- **Size**: 7 nodes
- **Cohesion**: 0.1310
- **Dominant Language**: bash

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| read_json_field | Function | scripts\bump-version.sh | 26-32 |
| write_json_field | Function | scripts\bump-version.sh | 35-41 |
| declared_files | Function | scripts\bump-version.sh | 45-47 |
| audit_excludes | Function | scripts\bump-version.sh | 50-52 |
| cmd_check | Function | scripts\bump-version.sh | 56-92 |
| cmd_audit | Function | scripts\bump-version.sh | 94-164 |
| cmd_bump | Function | scripts\bump-version.sh | 166-194 |

## Execution Flows

- **cmd_bump** (criticality: 0.37, depth: 2)

## Dependencies

### Outgoing

- `echo` (27 edge(s))
- `read` (7 edge(s))
- `printf` (5 edge(s))
- `jq` (4 edge(s))
- `sort` (3 edge(s))
- `true` (2 edge(s))
- `uniq` (2 edge(s))
- `return` (2 edge(s))
- `grep` (2 edge(s))
- `continue` (2 edge(s))
- `sed` (2 edge(s))
- `head` (1 edge(s))
- `awk` (1 edge(s))
- `cut` (1 edge(s))
- `break` (1 edge(s))

### Incoming

- `scripts\bump-version.sh` (7 edge(s))
