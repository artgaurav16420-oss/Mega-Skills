# helpers-merge

## Overview

Community of 16 nodes

- **Size**: 16 nodes
- **Cohesion**: 0.3000
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| merge_runs | Function | skills\docx\scripts\office\helpers\merge_runs.py | 16-39 |
| _find_elements | Function | skills\docx\scripts\office\helpers\merge_runs.py | 44-56 |
| traverse | Function | skills\docx\scripts\office\helpers\merge_runs.py | 47-53 |
| _get_child | Function | skills\docx\scripts\office\helpers\merge_runs.py | 59-65 |
| _get_children | Function | skills\docx\scripts\office\helpers\merge_runs.py | 68-75 |
| _is_adjacent | Function | skills\docx\scripts\office\helpers\merge_runs.py | 78-88 |
| _remove_elements | Function | skills\docx\scripts\office\helpers\merge_runs.py | 93-96 |
| _strip_run_rsid_attrs | Function | skills\docx\scripts\office\helpers\merge_runs.py | 99-103 |
| _merge_runs_in | Function | skills\docx\scripts\office\helpers\merge_runs.py | 108-125 |
| _first_child_run | Function | skills\docx\scripts\office\helpers\merge_runs.py | 128-132 |
| _next_element_sibling | Function | skills\docx\scripts\office\helpers\merge_runs.py | 135-141 |
| _next_sibling_run | Function | skills\docx\scripts\office\helpers\merge_runs.py | 144-151 |
| _is_run | Function | skills\docx\scripts\office\helpers\merge_runs.py | 154-156 |
| _can_merge | Function | skills\docx\scripts\office\helpers\merge_runs.py | 159-167 |
| _merge_run_content | Function | skills\docx\scripts\office\helpers\merge_runs.py | 170-175 |
| _consolidate_text | Function | skills\docx\scripts\office\helpers\merge_runs.py | 178-199 |

## Execution Flows

- **merge_runs** (criticality: 0.38, depth: 3)

## Dependencies

### Outgoing

- `endswith` (6 edge(s))
- `removeChild` (3 edge(s))
- `toxml` (2 edge(s))
- `appendChild` (2 edge(s))
- `removeAttribute` (2 edge(s))
- `append` (2 edge(s))
- `list` (2 edge(s))
- `range` (1 edge(s))
- `len` (1 edge(s))
- `createTextNode` (1 edge(s))
- `startswith` (1 edge(s))
- `setAttribute` (1 edge(s))
- `hasAttribute` (1 edge(s))
- `strip` (1 edge(s))
- `values` (1 edge(s))

### Incoming

- `skills\docx\scripts\office\helpers\merge_runs.py` (16 edge(s))
