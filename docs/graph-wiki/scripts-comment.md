# scripts-comment

## Overview

Community of 10 nodes

- **Size**: 10 nodes
- **Cohesion**: 0.1398
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| _generate_hex_id | Function | skills\docx\scripts\comment.py | 68-69 |
| _encode_smart_quotes | Function | skills\docx\scripts\comment.py | 80-83 |
| _append_xml | Function | skills\docx\scripts\comment.py | 86-95 |
| _find_para_id | Function | skills\docx\scripts\comment.py | 98-105 |
| _get_next_rid | Function | skills\docx\scripts\comment.py | 108-118 |
| _has_relationship | Function | skills\docx\scripts\comment.py | 121-126 |
| _has_content_type | Function | skills\docx\scripts\comment.py | 129-134 |
| _ensure_comment_relationships | Function | skills\docx\scripts\comment.py | 137-176 |
| _ensure_comment_content_types | Function | skills\docx\scripts\comment.py | 179-215 |
| add_comment | Function | skills\docx\scripts\comment.py | 218-290 |

## Execution Flows

- **add_comment** (criticality: 0.37, depth: 2)

## Dependencies

### Outgoing

- `parseString` (8 edge(s))
- `read_text` (7 edge(s))
- `exists` (7 edge(s))
- `getElementsByTagName` (6 edge(s))
- `setAttribute` (5 edge(s))
- `getAttribute` (5 edge(s))
- `copy` (4 edge(s))
- `appendChild` (3 edge(s))
- `toxml` (3 edge(s))
- `Path` (3 edge(s))
- `items` (2 edge(s))
- `createElement` (2 edge(s))
- `write_bytes` (2 edge(s))
- `join` (1 edge(s))
- `importNode` (1 edge(s))

### Incoming

- `skills\docx\scripts\comment.py` (10 edge(s))
