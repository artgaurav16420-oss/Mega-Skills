# Browser Automation

Activate this skill when you need to interact with a live web interface to verify functionality, capture data, or perform actions that don't have an API.

## Red Flags

- "I can't see the UI"
- "I'm not sure if the button is there"
- "I need to verify the layout"
- Testing a local web app manually

## The Process

### 1. Launch & Navigate

- Use your browser tool to open the URL (local or remote).
- Wait for the page to stabilize.

### 2. Inspect & Plan

- Take a screenshot or read the DOM to understand the current state.
- Identify the selectors for the elements you need to interact with.

### 3. Interact

Perform atomic actions:

- **Click**: Buttons, links, checkboxes.
- **Type**: Input fields, text areas.
- **Select**: Dropdowns, radio buttons.
- **Scroll**: To find hidden content.

### 4. Verify

- After every interaction, verify the expected state change (e.g., "Success" message, navigation to new page).
- Capture screenshots for your human partner to review.

### 5. Debugging

If an interaction fails:

- Read the console logs.
- Check for element visibility/overlap.
- Try alternative selectors (XPath vs CSS).

## Success Criteria

- The end-to-end user flow is verified.
- Visual bugs are caught and documented.
- Complex data is extracted accurately from the UI.


