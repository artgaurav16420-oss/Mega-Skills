# core-slack

## Overview

Community of 5 nodes

- **Size**: 5 nodes
- **Cohesion**: 0.0820
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| check_slack_size | Function | skills\slack-gif-creator\core\validators.py | 11-56 |
| validate_dimensions | Function | skills\slack-gif-creator\core\validators.py | 59-119 |
| validate_gif | Function | skills\slack-gif-creator\core\validators.py | 122-197 |
| get_optimization_suggestions | Function | skills\slack-gif-creator\core\validators.py | 200-237 |
| is_slack_ready | Function | skills\slack-gif-creator\core\validators.py | 241-264 |

## Execution Flows

- **is_slack_ready** (criticality: 0.47, depth: 2)

## Dependencies

### Outgoing

- `print` (21 edge(s))
- `append` (12 edge(s))
- `get` (6 edge(s))
- `Path` (2 edge(s))
- `exists` (2 edge(s))
- `min` (2 edge(s))
- `stat` (1 edge(s))
- `max` (1 edge(s))
- `float` (1 edge(s))
- `open` (1 edge(s))
- `seek` (1 edge(s))
- `str` (1 edge(s))

### Incoming

- `skills\slack-gif-creator\core\validators.py` (5 edge(s))
