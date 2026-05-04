# core-text

## Overview

Community of 7 nodes

- **Size**: 7 nodes
- **Cohesion**: 0.1304
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| get_font | Function | skills\slack-gif-creator\core\typography.py | 25-55 |
| draw_text_with_outline | Function | skills\slack-gif-creator\core\typography.py | 58-111 |
| draw_text_with_shadow | Function | skills\slack-gif-creator\core\typography.py | 114-161 |
| draw_text_with_glow | Function | skills\slack-gif-creator\core\typography.py | 164-215 |
| draw_text_in_box | Function | skills\slack-gif-creator\core\typography.py | 218-291 |
| get_text_size | Function | skills\slack-gif-creator\core\typography.py | 294-313 |
| get_optimal_font_size | Function | skills\slack-gif-creator\core\typography.py | 316-336 |

## Execution Flows

- **get_optimal_font_size** (criticality: 0.37, depth: 2)
- **draw_text_with_outline** (criticality: 0.36, depth: 1)
- **draw_text_with_shadow** (criticality: 0.36, depth: 1)
- **draw_text_with_glow** (criticality: 0.36, depth: 1)
- **draw_text_in_box** (criticality: 0.36, depth: 1)

## Dependencies

### Outgoing

- `Draw` (7 edge(s))
- `text` (7 edge(s))
- `textbbox` (5 edge(s))
- `range` (5 edge(s))
- `new` (2 edge(s))
- `convert` (2 edge(s))
- `int` (1 edge(s))
- `rectangle` (1 edge(s))
- `alpha_composite` (1 edge(s))
- `truetype` (1 edge(s))
- `load_default` (1 edge(s))

### Incoming

- `skills\slack-gif-creator\core\typography.py` (7 edge(s))
