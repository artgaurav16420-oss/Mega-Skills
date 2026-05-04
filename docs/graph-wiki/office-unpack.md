# office-unpack

## Overview

Community of 3 nodes

- **Size**: 3 nodes
- **Cohesion**: 0.0741
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| unpack | Function | skills\docx\scripts\office\unpack.py | 34-79 |
| _pretty_print_xml | Function | skills\docx\scripts\office\unpack.py | 82-88 |
| _escape_smart_quotes | Function | skills\docx\scripts\office\unpack.py | 91-98 |

## Execution Flows

- **unpack** (criticality: 0.36, depth: 1)

## Dependencies

### Outgoing

- `read_text` (2 edge(s))
- `Path` (2 edge(s))
- `str` (2 edge(s))
- `items` (1 edge(s))
- `replace` (1 edge(s))
- `write_text` (1 edge(s))
- `parseString` (1 edge(s))
- `write_bytes` (1 edge(s))
- `toprettyxml` (1 edge(s))
- `lower` (1 edge(s))
- `exists` (1 edge(s))
- `mkdir` (1 edge(s))
- `ZipFile` (1 edge(s))
- `extractall` (1 edge(s))
- `list` (1 edge(s))

### Incoming

- `skills\docx\scripts\office\unpack.py` (3 edge(s))
