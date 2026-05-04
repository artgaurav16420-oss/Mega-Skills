# scripts-validate

## Overview

Community of 18 nodes

- **Size**: 18 nodes
- **Cohesion**: 0.3636
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| ValidationResult | Class | skills\caveman-compress\scripts\validate.py | 16-27 |
| __init__ | Function | skills\caveman-compress\scripts\validate.py | 17-20 |
| add_error | Function | skills\caveman-compress\scripts\validate.py | 22-24 |
| add_warning | Function | skills\caveman-compress\scripts\validate.py | 26-27 |
| read_file | Function | skills\caveman-compress\scripts\validate.py | 30-31 |
| extract_headings | Function | skills\caveman-compress\scripts\validate.py | 37-38 |
| extract_code_blocks | Function | skills\caveman-compress\scripts\validate.py | 41-82 |
| extract_urls | Function | skills\caveman-compress\scripts\validate.py | 85-86 |
| extract_paths | Function | skills\caveman-compress\scripts\validate.py | 89-90 |
| count_bullets | Function | skills\caveman-compress\scripts\validate.py | 93-94 |
| extract_inline_codes | Function | skills\caveman-compress\scripts\validate.py | 97-100 |
| validate_headings | Function | skills\caveman-compress\scripts\validate.py | 106-114 |
| validate_code_blocks | Function | skills\caveman-compress\scripts\validate.py | 117-122 |
| validate_urls | Function | skills\caveman-compress\scripts\validate.py | 125-130 |
| validate_paths | Function | skills\caveman-compress\scripts\validate.py | 133-138 |
| validate_bullets | Function | skills\caveman-compress\scripts\validate.py | 141-151 |
| validate_inline_codes | Function | skills\caveman-compress\scripts\validate.py | 154-167 |
| validate | Function | skills\caveman-compress\scripts\validate.py | 173-186 |

## Execution Flows

- **validate** (criticality: 0.62, depth: 2)

## Dependencies

### Outgoing

- `len` (6 edge(s))
- `append` (5 edge(s))
- `findall` (5 edge(s))
- `group` (5 edge(s))
- `set` (4 edge(s))
- `match` (2 edge(s))
- `strip` (2 edge(s))
- `sub` (2 edge(s))
- `Counter` (2 edge(s))
- `keys` (2 edge(s))
- `split` (1 edge(s))
- `join` (1 edge(s))
- `read_text` (1 edge(s))
- `abs` (1 edge(s))
- `items` (1 edge(s))

### Incoming

- `skills\caveman-compress\scripts\validate.py` (15 edge(s))
