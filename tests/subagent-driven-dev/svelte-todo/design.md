# Svelte Todo List - Design

## Overview

A simple todo list application built with Svelte. Supports creating, completing, and deleting todos with localStorage persistence.

## Features

1. Add new todos
1. Mark todos as complete/incomplete
1. Delete todos
1. Filter by: All / Active / Completed
1. Clear all completed todos
1. Persist to localStorage
1. Show count of remaining items

## User Interface

```text
┌─────────────────────────────────────────┐
│  Svelte Todos                           │
├─────────────────────────────────────────┤
│  [________________________] [Add]       │
├─────────────────────────────────────────┤
│  [ ] Buy groceries                  [x] │
│  [✓] Walk the dog                   [x] │
│  [ ] Write code                     [x] │
├─────────────────────────────────────────┤
│  2 items left                           │
│  [All] [Active] [Completed]  [Clear ✓]  │
└─────────────────────────────────────────┘
```

## Components

```text
src/
  App.svelte           # Main app, state management
  lib/
    TodoInput.svelte   # Text input + Add button
    TodoList.svelte    # List container
    TodoItem.svelte    # Single todo with checkbox, text, delete
    FilterBar.svelte   # Filter buttons + clear completed
    store.ts           # Svelte store for todos
    storage.ts         # localStorage persistence
```

## Data Model

```typescript
interface Todo {
  id: string;        // UUID
  text: string;      // Todo text
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';
```

## Acceptance Criteria

1. Can add a todo by typing and pressing Enter or clicking Add
1. Can toggle todo completion by clicking checkbox
1. Can delete a todo by clicking X button
1. Filter buttons show correct subset of todos
1. "X items left" shows count of incomplete todos
1. "Clear completed" removes all completed todos
1. Todos persist across page refresh (localStorage)
1. Empty state shows helpful message
1. All tests pass
