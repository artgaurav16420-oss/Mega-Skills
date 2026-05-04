# Browser Automation

Activate this skill when you need to interact with a live web interface to verify functionality, capture data, or perform actions that don't have an API.

## Red Flags

1. "I can't see the UI"

1. "I'm not sure if the button is there"

1. "I need to verify the layout"

1. Testing a local web app manually

## The Process

### 1. Launch & Navigate

1. Use your browser tool to open the URL (local or remote).

1. Wait for the page to stabilize.

### 2. Inspect & Plan

1. Take a screenshot or read the DOM to understand the current state.

1. Identify the selectors for the elements you need to interact with.

### 3. Interact

Perform atomic actions:

1. **Click**: Buttons, links, checkboxes.

1. **Type**: Input fields, text areas.

1. **Select**: Dropdowns, radio buttons.

1. **Scroll**: To find hidden content.

### 4. Verify

1. After every interaction, verify the expected state change (e.g., "Success" message, navigation to new page).

1. Capture screenshots for your human partner to review.

### 5. Debugging

If an interaction fails:

1. Read the console logs.

1. Check for element visibility/overlap.

1. Try alternative selectors (XPath vs CSS).

## Success Criteria

1. The end-to-end user flow is verified.

1. Visual bugs are caught and documented.

1. Complex data is extracted accurately from the UI.
