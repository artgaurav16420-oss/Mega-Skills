# office-pack

## Overview

Community of 3 nodes

- **Size**: 3 nodes
- **Cohesion**: 0.0455
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| pack | Function | skills\docx\scripts\office\pack.py | 24-66 |
| _run_validation | Function | skills\docx\scripts\office\pack.py | 69-105 |
| _condense_xml | Function | skills\docx\scripts\office\pack.py | 108-128 |

## Execution Flows

- **pack** (criticality: 0.36, depth: 1)

## Dependencies

### Outgoing

- `Path` (4 edge(s))
- `print` (3 edge(s))
- `append` (2 edge(s))
- `rglob` (2 edge(s))
- `open` (1 edge(s))
- `parse` (1 edge(s))
- `getElementsByTagName` (1 edge(s))
- `endswith` (1 edge(s))
- `list` (1 edge(s))
- `strip` (1 edge(s))
- `removeChild` (1 edge(s))
- `write_bytes` (1 edge(s))
- `toxml` (1 edge(s))
- `infer_author_func` (1 edge(s))
- `skills\docx\scripts\office\validators\__init__.py::DOCXSchemaValidator` (1 edge(s))

### Incoming

- `skills\docx\scripts\office\pack.py` (3 edge(s))
