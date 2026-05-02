# Memory Management

Activate this skill when you need to persist information across multiple turns, summarize complex state, or retrieve previously established facts that aren't currently in the active context.

## Red Flags
- Asking the user the same question twice
- Forgetting a previous design decision
- Loosing track of a multi-step plan
- "What was I doing?"

## Rationalizations
- "I'll remember this" (Context windows are finite and slippery)
- "It's in the chat history" (History gets truncated/compressed)

## The Process

### 1. Identify Key Information
Information that MUST be remembered:
- **Design Decisions**: Why we chose X over Y.
- **Project State**: What tasks are finished vs. pending.
- **User Preferences**: Specific ways the user likes things done.
- **Discovery Results**: API endpoints, file paths, or complex logic.

### 2. Store in "Short-Term Memory"
Update your internal "Status" or "Task List" at the end of every turn. 
- Use the `task.md` or `status.md` files as your primary memory banks.

### 3. Store in "Long-Term Memory" (KIs)
If information is useful beyond the current task (e.g., repository architecture, common bugs, deployment steps):
- Create a **Knowledge Item (KI)**.
- Store it in the `knowledge/` directory (if supported) or the project's documentation.

### 4. Retrieval
Before starting a new sub-task:
- Read your previous `task.md` or `plan.md`.
- Look for any "Memory" tags or KIs that might apply.

### 5. Compression
If the memory is getting too large:
- Create a **Summary Memory**.
- Consolidate multiple facts into a single, high-density summary.
- Replace the original scattered notes with the summary.

## Success Criteria
- Zero "re-asking" for previously provided information.
- Smooth transition between sub-tasks without context loss.
- High-density, high-accuracy summaries available on demand.
