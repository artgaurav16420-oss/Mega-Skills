# scripts-mcpconnection

## Overview

Community of 25 nodes

- **Size**: 25 nodes
- **Cohesion**: 0.2125
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| MCPConnection | Class | skills\mcp-builder\scripts\connections.py | 13-70 |
| __init__ | Function | skills\mcp-builder\scripts\connections.py | 16-18 |
| _create_context | Function | skills\mcp-builder\scripts\connections.py | 21-22 |
| __aenter__ | Function | skills\mcp-builder\scripts\connections.py | 24-46 |
| __aexit__ | Function | skills\mcp-builder\scripts\connections.py | 48-53 |
| list_tools | Function | skills\mcp-builder\scripts\connections.py | 55-65 |
| call_tool | Function | skills\mcp-builder\scripts\connections.py | 67-70 |
| MCPConnectionStdio | Class | skills\mcp-builder\scripts\connections.py | 73-85 |
| __init__ | Function | skills\mcp-builder\scripts\connections.py | 76-80 |
| _create_context | Function | skills\mcp-builder\scripts\connections.py | 82-85 |
| MCPConnectionSSE | Class | skills\mcp-builder\scripts\connections.py | 88-97 |
| __init__ | Function | skills\mcp-builder\scripts\connections.py | 91-94 |
| _create_context | Function | skills\mcp-builder\scripts\connections.py | 96-97 |
| MCPConnectionHTTP | Class | skills\mcp-builder\scripts\connections.py | 100-109 |
| __init__ | Function | skills\mcp-builder\scripts\connections.py | 103-106 |
| _create_context | Function | skills\mcp-builder\scripts\connections.py | 108-109 |
| create_connection | Function | skills\mcp-builder\scripts\connections.py | 112-151 |
| parse_evaluation_file | Function | skills\mcp-builder\scripts\evaluation.py | 56-76 |
| extract_xml_content | Function | skills\mcp-builder\scripts\evaluation.py | 79-83 |
| agent_loop | Function | skills\mcp-builder\scripts\evaluation.py | 86-151 |
| evaluate_single_task | Function | skills\mcp-builder\scripts\evaluation.py | 154-184 |
| run_evaluation | Function | skills\mcp-builder\scripts\evaluation.py | 220-272 |
| parse_headers | Function | skills\mcp-builder\scripts\evaluation.py | 275-287 |
| parse_env_vars | Function | skills\mcp-builder\scripts\evaluation.py | 290-302 |
| main | Function | skills\mcp-builder\scripts\evaluation.py | 305-369 |

## Execution Flows

- **main** (criticality: 0.54, depth: 3)
- **__init__** (criticality: 0.45, depth: 1)
- **__init__** (criticality: 0.45, depth: 1)
- **__init__** (criticality: 0.45, depth: 1)

## Dependencies

### Outgoing

- `print` (14 edge(s))
- `len` (10 edge(s))
- `add_argument` (9 edge(s))
- `append` (6 edge(s))
- `ValueError` (5 edge(s))
- `sum` (5 edge(s))
- `strip` (5 edge(s))
- `time` (4 edge(s))
- `MCPConnection` (3 edge(s))
- `super` (3 edge(s))
- `enter_async_context` (2 edge(s))
- `to_thread` (2 edge(s))
- `next` (2 edge(s))
- `dumps` (2 edge(s))
- `str` (2 edge(s))

### Incoming

- `skills\mcp-builder\scripts\evaluation.py` (8 edge(s))
- `skills\mcp-builder\scripts\connections.py` (5 edge(s))
