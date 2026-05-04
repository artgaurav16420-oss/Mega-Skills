# Memory Management

Activate this skill when you need to persist information across multiple turns, summarize complex state, or retrieve previously established facts that aren't currently in the active context.

## Red Flags

1. Asking the user the same question twice

1. Forgetting a previous design decision

1. Loosing track of a multi-step plan

1. "What was I doing?"

## Rationalizations

1. "I'll remember this" (Context windows are finite and slippery)

1. "It's in the chat history" (History gets truncated/compressed)

## The Process

### 1. Identify Key Information

Information that MUST be remembered:

1. **Design Decisions**: Why we chose X over Y.

1. **Project State**: What tasks are finished vs. pending.

1. **User Preferences**: Specific ways the user likes things done.

1. **Discovery Results**: API endpoints, file paths, or complex logic.

### 2. Store in "Short-Term Memory"

Update your internal "Status" or "Task List" at the end of every turn.

1. Use the `task.md` or `status.md` files as your primary memory banks.

### 3. Store in "Long-Term Memory" (KIs)

If information is useful beyond the current task (e.g., repository architecture, common bugs, deployment steps):

1. Create a **Knowledge Item (KI)**.

1. Store it in the `knowledge/` directory (if supported) or the project's documentation.

### 4. Retrieval

Before starting a new sub-task:

1. Read your previous `task.md` or `plan.md`.

1. Look for any "Memory" tags or KIs that might apply.

### 5. Compression

If the memory is getting too large:

1. Create a **Summary Memory**.

1. Consolidate multiple facts into a single, high-density summary.

1. Replace the original scattered notes with the summary.

## Success Criteria

1. Zero "re-asking" for previously provided information.

1. Smooth transition between sub-tasks without context loss.

1. High-density, high-accuracy summaries available on demand.
