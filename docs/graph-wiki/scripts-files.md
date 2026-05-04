# scripts-files

## Overview

Community of 9 nodes

- **Size**: 9 nodes
- **Cohesion**: 0.0571
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| get_slides_in_sldidlst | Function | skills\pptx\scripts\clean.py | 27-46 |
| remove_orphaned_slides | Function | skills\pptx\scripts\clean.py | 49-88 |
| remove_trash_directory | Function | skills\pptx\scripts\clean.py | 91-103 |
| get_slide_referenced_files | Function | skills\pptx\scripts\clean.py | 106-125 |
| remove_orphaned_rels_files | Function | skills\pptx\scripts\clean.py | 128-150 |
| get_referenced_files | Function | skills\pptx\scripts\clean.py | 153-168 |
| remove_orphaned_files | Function | skills\pptx\scripts\clean.py | 171-218 |
| update_content_types | Function | skills\pptx\scripts\clean.py | 221-238 |
| clean_unused_files | Function | skills\pptx\scripts\clean.py | 241-264 |

## Execution Flows

- **clean_unused_files** (criticality: 0.37, depth: 2)

## Dependencies

### Outgoing

- `exists` (15 edge(s))
- `str` (14 edge(s))
- `relative_to` (12 edge(s))
- `unlink` (9 edge(s))
- `append` (9 edge(s))
- `getAttribute` (7 edge(s))
- `glob` (7 edge(s))
- `parse` (5 edge(s))
- `getElementsByTagName` (5 edge(s))
- `resolve` (5 edge(s))
- `set` (4 edge(s))
- `replace` (4 edge(s))
- `extend` (3 edge(s))
- `is_file` (3 edge(s))
- `add` (2 edge(s))

### Incoming

- `skills\pptx\scripts\clean.py` (9 edge(s))
