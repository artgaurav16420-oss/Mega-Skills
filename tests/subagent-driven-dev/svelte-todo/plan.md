# Svelte Todo List - Implementation Plan

Execute this plan using the `mega-skills:subagent-driven-development` skill.

## Context

Building a todo list app with Svelte. See `design.md` for full specification.

## Tasks

### Task 1: Project Setup

Create the Svelte project with Vite.

#### Do

1. Run `npm create vite@latest . -- --template svelte-ts`
1. Install dependencies with `npm install`
1. Verify dev server works
1. Clean up default Vite template content from App.svelte

#### Verify

1. `npm run dev` starts server
1. App shows minimal "Svelte Todos" heading
1. `npm run build` succeeds

---

### Task 2: Todo Store

Create the Svelte store for todo state management.

#### Do (2)

1. Create `src/lib/store.ts`
1. Define `Todo` interface with id, text, completed
1. Create writable store with initial empty array
1. Export functions: `addTodo(text)`, `toggleTodo(id)`, `deleteTodo(id)`, `clearCompleted()`
1. Create `src/lib/store.test.ts` with tests for each function

#### Verify (2)

1. Tests pass: `npm run test` (install vitest if needed)

---

### Task 3: localStorage Persistence

Add persistence layer for todos.

#### Do (3)

1. Create `src/lib/storage.ts`
1. Implement `loadTodos(): Todo[]` and `saveTodos(todos: Todo[])`
1. Handle JSON parse errors gracefully (return empty array)
1. Integrate with store: load on init, save on change
1. Add tests for load/save/error handling

#### Verify (3)

1. Tests pass
1. Manual test: add todo, refresh page, todo persists

---

### Task 4: TodoInput Component

Create the input component for adding todos.

#### Do (4)

1. Create `src/lib/TodoInput.svelte`
1. Text input bound to local state
1. Add button calls `addTodo()` and clears input
1. Enter key also submits
1. Disable Add button when input is empty
1. Add component tests

#### Verify (4)

1. Tests pass
1. Component renders input and button

---

### Task 5: TodoItem Component

Create the single todo item component.

#### Do (5)

1. Create `src/lib/TodoItem.svelte`
1. Props: `todo: Todo`
1. Checkbox toggles completion (calls `toggleTodo`)
1. Text with strikethrough when completed
1. Delete button (X) calls `deleteTodo`
1. Add component tests

#### Verify (5)

1. Tests pass
1. Component renders checkbox, text, delete button

---

### Task 6: TodoList Component

Create the list container component.

#### Do (6)

1. Create `src/lib/TodoList.svelte`
1. Props: `todos: Todo[]`
1. Renders TodoItem for each todo
1. Shows "No todos yet" when empty
1. Add component tests

#### Verify (6)

1. Tests pass
1. Component renders list of TodoItems

---

### Task 7: FilterBar Component

Create the filter and status bar component.

#### Do (7)

1. Create `src/lib/FilterBar.svelte`
1. Props: `todos: Todo[]`, `filter: Filter`, `onFilterChange: (f: Filter) => void`
1. Show count: "X items left" (incomplete count)
1. Three filter buttons: All, Active, Completed
1. Active filter is visually highlighted
1. "Clear completed" button (hidden when no completed todos)
1. Add component tests

#### Verify (7)

1. Tests pass
1. Component renders count, filters, clear button

---

### Task 8: App Integration

Wire all components together in App.svelte.

#### Do (8)

1. Import all components and store
1. Add filter state (default: 'all')
1. Compute filtered todos based on filter state
1. Render: heading, TodoInput, TodoList, FilterBar
1. Pass appropriate props to each component

#### Verify (8)

1. App renders all components
1. Adding todos works
1. Toggling works
1. Deleting works

---

### Task 9: Filter Functionality

Ensure filtering works end-to-end.

#### Do (9)

1. Verify filter buttons change displayed todos
1. 'all' shows all todos
1. 'active' shows only incomplete todos
1. 'completed' shows only completed todos
1. Clear completed removes completed todos and resets filter if needed
1. Add integration tests

#### Verify (9)

1. Filter tests pass
1. Manual verification of all filter states

---

### Task 10: Styling and Polish

Add CSS styling for usability.

#### Do (10)

1. Style the app to match the design mockup
1. Completed todos have strikethrough and muted color
1. Active filter button is highlighted
1. Input has focus styles
1. Delete button appears on hover (or always on mobile)
1. Responsive layout

#### Verify (10)

1. App is visually usable
1. Styles don't break functionality

---

### Task 11: End-to-End Tests

Add Playwright tests for full user flows.

#### Do (11)

1. Install Playwright: `npm init playwright@latest`
1. Create `tests/todo.spec.ts`
1. Test flows:
1. Add a todo
1. Complete a todo
1. Delete a todo
1. Filter todos
1. Clear completed
1. Persistence (add, reload, verify)

#### Verify (11)

1. `npx playwright test` passes

---

### Task 12: README

Document the project.

#### Do (12)

1. Create `README.md` with:
1. Project description
1. Setup: `npm install`
1. Development: `npm run dev`
1. Testing: `npm test` and `npx playwright test`
1. Build: `npm run build`

#### Verify (12)

1. README accurately describes the project
1. Instructions work
