# scripts-slide

## Overview

Community of 6 nodes

- **Size**: 6 nodes
- **Cohesion**: 0.1569
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| get_next_slide_number | Function | skills\pptx\scripts\add_slide.py | 27-30 |
| create_slide_from_layout | Function | skills\pptx\scripts\add_slide.py | 33-87 |
| duplicate_slide | Function | skills\pptx\scripts\add_slide.py | 90-127 |
| _add_to_content_types | Function | skills\pptx\scripts\add_slide.py | 130-138 |
| _add_to_presentation_rels | Function | skills\pptx\scripts\add_slide.py | 141-155 |
| _get_next_slide_id | Function | skills\pptx\scripts\add_slide.py | 158-162 |

## Execution Flows

- **create_slide_from_layout** (criticality: 0.36, depth: 1)
- **duplicate_slide** (criticality: 0.36, depth: 1)

## Dependencies

### Outgoing

- `print` (6 edge(s))
- `write_text` (5 edge(s))
- `read_text` (4 edge(s))
- `int` (3 edge(s))
- `max` (3 edge(s))
- `exists` (3 edge(s))
- `replace` (2 edge(s))
- `findall` (2 edge(s))
- `exit` (2 edge(s))
- `copy2` (2 edge(s))
- `mkdir` (1 edge(s))
- `sub` (1 edge(s))
- `group` (1 edge(s))
- `glob` (1 edge(s))
- `match` (1 edge(s))

### Incoming

- `skills\pptx\scripts\add_slide.py` (6 edge(s))
