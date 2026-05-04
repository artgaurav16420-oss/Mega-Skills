# office-soffice

## Overview

Community of 8 nodes

- **Size**: 8 nodes
- **Cohesion**: 0.1039
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| get_soffice_env | Function | skills\xlsx\scripts\office\soffice.py | 24-32 |
| run_soffice | Function | skills\xlsx\scripts\office\soffice.py | 35-37 |
| _needs_shim | Function | skills\xlsx\scripts\office\soffice.py | 44-50 |
| _ensure_shim | Function | skills\xlsx\scripts\office\soffice.py | 53-65 |
| has_gtimeout | Function | skills\xlsx\scripts\recalc.py | 32-39 |
| setup_libreoffice_macro | Function | skills\xlsx\scripts\recalc.py | 42-68 |
| recalc | Function | skills\xlsx\scripts\recalc.py | 71-162 |
| main | Function | skills\xlsx\scripts\recalc.py | 165-181 |

## Execution Flows

- **main** (criticality: 0.46, depth: 3)
- **run_soffice** (criticality: 0.37, depth: 2)

## Dependencies

### Outgoing

- `print` (9 edge(s))
- `str` (6 edge(s))
- `Path` (5 edge(s))
- `run` (5 edge(s))
- `exists` (4 edge(s))
- `close` (3 edge(s))
- `len` (3 edge(s))
- `system` (3 edge(s))
- `write_text` (2 edge(s))
- `load_workbook` (2 edge(s))
- `iter_rows` (2 edge(s))
- `isinstance` (2 edge(s))
- `gettempdir` (1 edge(s))
- `unlink` (1 edge(s))
- `socket` (1 edge(s))

### Incoming

- `skills\xlsx\scripts\office\soffice.py` (4 edge(s))
- `skills\xlsx\scripts\recalc.py` (4 edge(s))
