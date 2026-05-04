# codex-plugin-sync-assert

## Overview

Community of 28 nodes

- **Size**: 28 nodes
- **Cohesion**: 0.4182
- **Dominant Language**: bash

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| pass | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 14-16 |
| fail | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 18-21 |
| assert_equals | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 23-35 |
| assert_contains | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 37-48 |
| assert_not_contains | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 50-61 |
| assert_matches | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 63-74 |
| assert_path_absent | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 76-86 |
| assert_branch_absent | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 88-103 |
| assert_current_branch | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 105-113 |
| assert_file_equals | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 115-123 |
| configure_git_identity | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 131-136 |
| init_repo | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 138-143 |
| commit_fixture | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 145-150 |
| checkout_fixture_branch | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 152-157 |
| write_upstream_fixture | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 159-229 |
| write_destination_fixture | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 231-245 |
| dirty_tracked_destination_skill | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 247-255 |
| write_synced_destination_fixture | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 257-295 |
| write_stale_ignored_destination_fixture | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 297-306 |
| write_fake_gh | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 308-326 |
| run_preview | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 328-334 |
| run_bootstrap_preview | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 336-342 |
| run_preview_without_manifest | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 344-351 |
| run_preview_with_stale_ignored_destination | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 353-359 |
| run_apply | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 361-367 |
| run_help | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 369-374 |
| write_bootstrap_destination_fixture | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 376-383 |
| main | Function | tests\codex-plugin-sync\test-sync-to-codex-plugin.sh | 385-569 |

## Execution Flows

- **main** (criticality: 0.37, depth: 2)

## Dependencies

### Outgoing

- `echo` (31 edge(s))
- `printf` (15 edge(s))
- `git` (14 edge(s))
- `cat` (14 edge(s))
- `"$BASH_UNDER_TEST"` (6 edge(s))
- `mkdir` (6 edge(s))
- `sed` (3 edge(s))
- `grep` (3 edge(s))
- `set` (2 edge(s))
- `mktemp` (1 edge(s))
- `trap` (1 edge(s))
- `exit` (1 edge(s))
- `rm` (1 edge(s))
- `chmod` (1 edge(s))
- `cp` (1 edge(s))

### Incoming

- `tests\codex-plugin-sync\test-sync-to-codex-plugin.sh` (28 edge(s))
