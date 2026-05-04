# validators-diff

## Overview

Community of 8 nodes

- **Size**: 8 nodes
- **Cohesion**: 0.1529
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| RedliningValidator | Class | skills\docx\scripts\office\validators\redlining.py | 11-243 |
| __init__ | Function | skills\docx\scripts\office\validators\redlining.py | 13-20 |
| repair | Function | skills\docx\scripts\office\validators\redlining.py | 22-23 |
| validate | Function | skills\docx\scripts\office\validators\redlining.py | 25-102 |
| _generate_detailed_diff | Function | skills\docx\scripts\office\validators\redlining.py | 104-125 |
| _get_git_word_diff | Function | skills\docx\scripts\office\validators\redlining.py | 127-196 |
| _remove_author_tracked_changes | Function | skills\docx\scripts\office\validators\redlining.py | 198-227 |
| _extract_text_content | Function | skills\docx\scripts\office\validators\redlining.py | 229-243 |

## Execution Flows

- **validate** (criticality: 0.47, depth: 2)

## Dependencies

### Outgoing

- `append` (7 edge(s))
- `print` (7 edge(s))
- `join` (5 edge(s))
- `Path` (4 edge(s))
- `findall` (4 edge(s))
- `str` (4 edge(s))
- `strip` (4 edge(s))
- `get` (4 edge(s))
- `iter` (3 edge(s))
- `parse` (3 edge(s))
- `getroot` (3 edge(s))
- `TemporaryDirectory` (2 edge(s))
- `write_text` (2 edge(s))
- `run` (2 edge(s))
- `split` (2 edge(s))

### Incoming

- `skills\docx\scripts\office\validators\redlining.py` (1 edge(s))
