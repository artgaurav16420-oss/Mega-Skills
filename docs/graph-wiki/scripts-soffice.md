# scripts-soffice

## Overview

Community of 11 nodes

- **Size**: 11 nodes
- **Cohesion**: 0.0813
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| get_soffice_env | Function | skills\pptx\scripts\office\soffice.py | 24-32 |
| run_soffice | Function | skills\pptx\scripts\office\soffice.py | 35-37 |
| _needs_shim | Function | skills\pptx\scripts\office\soffice.py | 44-50 |
| _ensure_shim | Function | skills\pptx\scripts\office\soffice.py | 53-65 |
| main | Function | skills\pptx\scripts\thumbnail.py | 40-92 |
| get_slide_info | Function | skills\pptx\scripts\thumbnail.py | 95-118 |
| build_slide_list | Function | skills\pptx\scripts\thumbnail.py | 121-146 |
| create_hidden_placeholder | Function | skills\pptx\scripts\thumbnail.py | 149-155 |
| convert_to_images | Function | skills\pptx\scripts\thumbnail.py | 158-193 |
| create_grids | Function | skills\pptx\scripts\thumbnail.py | 196-222 |
| create_grid | Function | skills\pptx\scripts\thumbnail.py | 225-285 |

## Execution Flows

- **main** (criticality: 0.46, depth: 3)
- **run_soffice** (criticality: 0.37, depth: 2)

## Dependencies

### Outgoing

- `str` (9 edge(s))
- `len` (6 edge(s))
- `print` (6 edge(s))
- `getAttribute` (5 edge(s))
- `Path` (4 edge(s))
- `run` (4 edge(s))
- `append` (4 edge(s))
- `exists` (3 edge(s))
- `open` (3 edge(s))
- `int` (3 edge(s))
- `min` (3 edge(s))
- `add_argument` (3 edge(s))
- `exit` (3 edge(s))
- `save` (2 edge(s))
- `RuntimeError` (2 edge(s))

### Incoming

- `skills\pptx\scripts\thumbnail.py` (7 edge(s))
- `skills\pptx\scripts\office\soffice.py` (4 edge(s))
