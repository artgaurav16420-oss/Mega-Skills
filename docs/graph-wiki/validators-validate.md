# validators-validate

## Overview

Community of 22 nodes

- **Size**: 22 nodes
- **Cohesion**: 0.1121
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| BaseSchemaValidator | Class | skills\docx\scripts\office\validators\base.py | 12-843 |
| __init__ | Function | skills\docx\scripts\office\validators\base.py | 94-107 |
| validate | Function | skills\docx\scripts\office\validators\base.py | 109-110 |
| repair | Function | skills\docx\scripts\office\validators\base.py | 112-113 |
| repair_whitespace_preservation | Function | skills\docx\scripts\office\validators\base.py | 115-141 |
| validate_xml | Function | skills\docx\scripts\office\validators\base.py | 143-168 |
| validate_namespaces | Function | skills\docx\scripts\office\validators\base.py | 170-197 |
| validate_unique_ids | Function | skills\docx\scripts\office\validators\base.py | 199-287 |
| validate_file_references | Function | skills\docx\scripts\office\validators\base.py | 289-383 |
| validate_all_relationship_ids | Function | skills\docx\scripts\office\validators\base.py | 385-467 |
| _get_expected_relationship_type | Function | skills\docx\scripts\office\validators\base.py | 469-490 |
| validate_content_types | Function | skills\docx\scripts\office\validators\base.py | 492-596 |
| validate_file_against_xsd | Function | skills\docx\scripts\office\validators\base.py | 598-634 |
| validate_against_xsd | Function | skills\docx\scripts\office\validators\base.py | 636-683 |
| _get_schema_path | Function | skills\docx\scripts\office\validators\base.py | 685-701 |
| _clean_ignorable_namespaces | Function | skills\docx\scripts\office\validators\base.py | 703-721 |
| _remove_ignorable_elements | Function | skills\docx\scripts\office\validators\base.py | 723-740 |
| _preprocess_for_mc_ignorable | Function | skills\docx\scripts\office\validators\base.py | 742-748 |
| _validate_single_file_xsd | Function | skills\docx\scripts\office\validators\base.py | 750-785 |
| _get_original_file_errors | Function | skills\docx\scripts\office\validators\base.py | 787-812 |
| _remove_template_tags_from_text_nodes | Function | skills\docx\scripts\office\validators\base.py | 814-843 |
| process_text_content | Function | skills\docx\scripts\office\validators\base.py | 821-831 |

## Execution Flows

- **validate_all_relationship_ids** (criticality: 0.48, depth: 1)
- **validate_against_xsd** (criticality: 0.48, depth: 4)
- **repair** (criticality: 0.36, depth: 1)

## Dependencies

### Outgoing

- `print` (36 edge(s))
- `append` (23 edge(s))
- `relative_to` (19 edge(s))
- `len` (18 edge(s))
- `str` (17 edge(s))
- `set` (15 edge(s))
- `lower` (14 edge(s))
- `parse` (10 edge(s))
- `split` (9 edge(s))
- `endswith` (9 edge(s))
- `getroot` (8 edge(s))
- `resolve` (7 edge(s))
- `startswith` (7 edge(s))
- `Path` (6 edge(s))
- `list` (6 edge(s))

### Incoming

- `skills\docx\scripts\office\validators\base.py` (1 edge(s))
