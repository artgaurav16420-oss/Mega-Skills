# claude-code-analyze

## Overview

Community of 4 nodes

- **Size**: 4 nodes
- **Cohesion**: 0.2267
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| analyze_main_session | Function | tests\claude-code\analyze-token-usage.py | 12-70 |
| format_tokens | Function | tests\claude-code\analyze-token-usage.py | 72-74 |
| calculate_cost | Function | tests\claude-code\analyze-token-usage.py | 76-81 |
| main | Function | tests\claude-code\analyze-token-usage.py | 83-165 |

## Execution Flows

- **main** (criticality: 0.61, depth: 1)

## Dependencies

### Outgoing

- `print` (28 edge(s))
- `get` (12 edge(s))
- `exit` (2 edge(s))
- `defaultdict` (1 edge(s))
- `open` (1 edge(s))
- `loads` (1 edge(s))
- `split` (1 edge(s))
- `startswith` (1 edge(s))
- `dict` (1 edge(s))
- `len` (1 edge(s))
- `exists` (1 edge(s))
- `Path` (1 edge(s))
- `sorted` (1 edge(s))
- `keys` (1 edge(s))
- `values` (1 edge(s))

### Incoming

- `tests\claude-code\analyze-token-usage.py` (4 edge(s))
