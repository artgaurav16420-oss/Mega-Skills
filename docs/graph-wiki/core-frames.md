# core-frames

## Overview

Community of 8 nodes

- **Size**: 8 nodes
- **Cohesion**: 0.1136
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| GIFBuilder | Class | skills\slack-gif-creator\core\gif_builder.py | 16-246 |
| __init__ | Function | skills\slack-gif-creator\core\gif_builder.py | 19-31 |
| add_frame | Function | skills\slack-gif-creator\core\gif_builder.py | 33-49 |
| add_frames | Function | skills\slack-gif-creator\core\gif_builder.py | 51-54 |
| optimize_colors | Function | skills\slack-gif-creator\core\gif_builder.py | 56-111 |
| deduplicate_frames | Function | skills\slack-gif-creator\core\gif_builder.py | 113-146 |
| save | Function | skills\slack-gif-creator\core\gif_builder.py | 148-242 |
| clear | Function | skills\slack-gif-creator\core\gif_builder.py | 244-246 |

## Execution Flows

- **add_frames** (criticality: 0.36, depth: 1)
- **save** (criticality: 0.36, depth: 1)

## Dependencies

### Outgoing

- `len` (14 edge(s))
- `print` (14 edge(s))
- `array` (7 edge(s))
- `fromarray` (5 edge(s))
- `append` (5 edge(s))
- `convert` (3 edge(s))
- `range` (3 edge(s))
- `min` (3 edge(s))
- `quantize` (3 edge(s))
- `resize` (2 edge(s))
- `int` (2 edge(s))
- `vstack` (2 edge(s))
- `reshape` (2 edge(s))
- `isinstance` (1 edge(s))
- `abs` (1 edge(s))

### Incoming

- `skills\slack-gif-creator\core\gif_builder.py` (1 edge(s))
