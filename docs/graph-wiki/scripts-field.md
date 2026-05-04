# scripts-field

## Overview

Community of 6 nodes

- **Size**: 6 nodes
- **Cohesion**: 0.0847
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| get_full_annotation_field_id | Function | skills\pdf\scripts\extract_form_field_info.py | 9-16 |
| make_field_dict | Function | skills\pdf\scripts\extract_form_field_info.py | 19-44 |
| get_field_info | Function | skills\pdf\scripts\extract_form_field_info.py | 47-107 |
| write_field_info | Function | skills\pdf\scripts\extract_form_field_info.py | 110-115 |
| fill_pdf_fields | Function | skills\pdf\scripts\fill_fillable_fields.py | 11-52 |
| validation_error_for_field_value | Function | skills\pdf\scripts\fill_fillable_fields.py | 55-71 |

## Execution Flows

- **fill_pdf_fields** (criticality: 0.45, depth: 2)
- **write_field_info** (criticality: 0.37, depth: 2)

## Dependencies

### Outgoing

- `get` (12 edge(s))
- `print` (6 edge(s))
- `len` (3 edge(s))
- `append` (3 edge(s))
- `open` (3 edge(s))
- `items` (2 edge(s))
- `values` (2 edge(s))
- `PdfReader` (2 edge(s))
- `get_fields` (1 edge(s))
- `set` (1 edge(s))
- `add` (1 edge(s))
- `enumerate` (1 edge(s))
- `list` (1 edge(s))
- `sort` (1 edge(s))
- `join` (1 edge(s))

### Incoming

- `skills\pdf\scripts\extract_form_field_info.py` (4 edge(s))
- `skills\pdf\scripts\fill_fillable_fields.py` (2 edge(s))
