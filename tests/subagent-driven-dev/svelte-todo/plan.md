# Svelte Todo List - Implementation Plan

Execute this plan using the `mega-skills:subagent-driven-development` skill.

## Context

Building a todo list app with Svelte. See `design.md` for full specification.

## Tasks

### Task 1: Project Setup

Create the Svelte project with Vite.

#### Do

- Run `npm create vite@latest . -- --template svelte-ts`
- Install dependencies with `npm install`
- Verify dev server works
- Clean up default Vite template content from App.svelte

#### Verify

- `npm run dev` starts server
- App shows minimal "Svelte Todos" heading
- `npm run build` succeeds

---

### Task 2: Todo Store

Create the Svelte store for todo state management.

#### Do (2)

- Create `src/lib/store.ts`
- Define `Todo` interface with id, text, completed
- Create writable store with initial empty array
- Export functions: `addTodo(text)`, `toggleTodo(id)`, `deleteTodo(id)`, `clearCompleted()`
- Create `src/lib/store.test.ts` with tests for each function

#### Verify (2)

- Tests pass: `npm run test` (install vitest if needed)

---

### Task 3: localStorage Persistence

Add persistence layer for todos.

#### Do (3)

- Create `src/lib/storage.ts`
- Implement `loadTodos(): Todo[]` and `saveTodos(todos: Todo[])`
- Handle JSON parse errors gracefully (return empty array)
- Integrate with store: load on init, save on change
- Add tests for load/save/error handling

#### Verify (3)

- Tests pass
- Manual test: add todo, refresh page, todo persists

---

### Task 4: TodoInput Component

Create the input component for adding todos.

#### Do (4)

- Create `src/lib/TodoInput.svelte`
- Text input bound to local state
- Add button calls `addTodo()` and clears input
- Enter key also submits
- Disable Add button when input is empty
- Add component tests

#### Verify (4)

- Tests pass
- Component renders input and button

---

### Task 5: TodoItem Component

Create the single todo item component.

#### Do (5)

- Create `src/lib/TodoItem.svelte`
- Props: `todo: Todo`
- Checkbox toggles completion (calls `toggleTodo`)
- Text with strikethrough when completed
- Delete button (X) calls `deleteTodo`
- Add component tests

#### Verify (5)

- Tests pass
- Component renders checkbox, text, delete button

---

### Task 6: TodoList Component

Create the list container component.

#### Do (6)

- Create `src/lib/TodoList.svelte`
- Props: `todos: Todo[]`
- Renders TodoItem for each todo
- Shows "No todos yet" when empty
- Add component tests

#### Verify (6)

- Tests pass
- Component renders list of TodoItems

---

### Task 7: FilterBar Component

Create the filter and status bar component.

#### Do (7)

- Create `src/lib/FilterBar.svelte`
- Props: `todos: Todo[]`, `filter: Filter`, `onFilterChange: (f: Filter) => void`
- Show count: "X items left" (incomplete count)
- Three filter buttons: All, Active, Completed
- Active filter is visually highlighted
- "Clear completed" button (hidden when no completed todos)
- Add component tests

#### Verify (7)

- Tests pass
- Component renders count, filters, clear button

---

### Task 8: App Integration

Wire all components together in App.svelte.

#### Do (8)

- Import all components and store
- Add filter state (default: 'all')
- Compute filtered todos based on filter state
- Render: heading, TodoInput, TodoList, FilterBar
- Pass appropriate props to each component

#### Verify (8)

- App renders all components
- Adding todos works
- Toggling works
- Deleting works

---

### Task 9: Filter Functionality

Ensure filtering works end-to-end.

#### Do (9)

- Verify filter buttons change displayed todos
- 'all' shows all todos
- 'active' shows only incomplete todos
- 'completed' shows only completed todos
- Clear completed removes completed todos and resets filter if needed
- Add integration tests

#### Verify (9)

- Filter tests pass
- Manual verification of all filter states

---

### Task 10: Styling and Polish

Add CSS styling for usability.

#### Do (10)

- Style the app to match the design mockup
- Completed todos have strikethrough and muted color
- Active filter button is highlighted
- Input has focus styles
- Delete button appears on hover (or always on mobile)
- Responsive layout

#### Verify (10)

- App is visually usable
- Styles don't break functionality

---

### Task 11: End-to-End Tests

Add Playwright tests for full user flows.

#### Do (11)

- Install Playwright: `npm init playwright@latest`
- Create `tests/todo.spec.ts`
- Test flows:
  - Add a todo
  - Complete a todo
  - Delete a todo
  - Filter todos
  - Clear completed
  - Persistence (add, reload, verify)

#### Verify (11)

- `npx playwright test` passes

---

### Task 12: README

Document the project.

#### Do (12)

- Create `README.md` with:
  - Project description
  - Setup: `npm install`
  - Development: `npm run dev`
  - Testing: `npm test` and `npx playwright test`
  - Build: `npm run build`

#### Verify (12)

- README accurately describes the project
- Instructions work
