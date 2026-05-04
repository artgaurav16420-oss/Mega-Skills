# scripts-compress

## Overview

Community of 6 nodes

- **Size**: 6 nodes
- **Cohesion**: 0.0986
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| is_sensitive_path | Function | skills\caveman-compress\scripts\compress.py | 46-56 |
| strip_llm_wrapper | Function | skills\caveman-compress\scripts\compress.py | 59-64 |
| call_claude | Function | skills\caveman-compress\scripts\compress.py | 75-101 |
| build_compress_prompt | Function | skills\caveman-compress\scripts\compress.py | 104-120 |
| build_fix_prompt | Function | skills\caveman-compress\scripts\compress.py | 123-149 |
| compress_file | Function | skills\caveman-compress\scripts\compress.py | 155-254 |

## Execution Flows

- **compress_file** (criticality: 0.37, depth: 2)

## Dependencies

### Outgoing

- `print` (20 edge(s))
- `strip` (5 edge(s))
- `write_text` (4 edge(s))
- `get` (2 edge(s))
- `exists` (2 edge(s))
- `ValueError` (2 edge(s))
- `read_text` (2 edge(s))
- `unlink` (2 edge(s))
- `match` (2 edge(s))
- `lower` (2 edge(s))
- `join` (1 edge(s))
- `Anthropic` (1 edge(s))
- `create` (1 edge(s))
- `run` (1 edge(s))
- `RuntimeError` (1 edge(s))

### Incoming

- `skills\caveman-compress\scripts\compress.py` (6 edge(s))
