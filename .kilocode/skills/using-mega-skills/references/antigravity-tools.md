# Antigravity Tool Mapping

Skills use Claude Code tool names. When you encounter these in a skill, use your platform equivalent:

| Skill references | Antigravity equivalent |
| :::::::::--- | :::::::::--- |
| `Read` (file reading) | `view_file` |
| `Write` (file creation) | `write_to_file` |
| `Edit` (file editing) | `replace_file_content` / `multi_replace_file_content` |
| `Bash` (run commands) | `run_command` |
| `Grep` (search content) | `grep_search` |
| `Glob` (find files) | `run_command` (using `dir /s /b`) |
| `TodoWrite` (tasks) | No direct equivalent — use artifacts (`task.md`) |
| `Skill` tool (invoke) | `view_file` on `SKILL.md` |
| `WebSearch` | `search_web` |
| `WebFetch` | `read_url_content` / `read_browser_page` |
| `Task` tool | `browser_subagent` (for web) or artifact tracking |

## Subagent Support

Antigravity supports `browser_subagent` for web tasks. For code tasks, use `implementation_plan.md` and `task.md` artifacts as defined in Planning Mode.
