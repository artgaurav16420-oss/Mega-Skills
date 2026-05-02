---
name: connect-apps
description: Connect Claude to external apps like Gmail, Slack, GitHub. Use this skill when the user wants to send emails, create issues, post messages, or take actions in external services.
---

# Connect Apps

Connect Claude to 1000+ apps. Actually send emails, create issues, post messages - not just generate text about it.

## Quick Start

### Step 1: Install the Plugin

```text
/plugin install composio-toolrouter
```

### Step 2: Run Setup

```text
/composio-toolrouter:setup
```

This will:

1. Ask for your free API key (get one at [platform.composio.dev](<https://platform.composio.dev/?utm_source=Github&utm_content=AwesomeSkills))>

1. Configure Claude's connection to 1000+ apps

1. Take about 60 seconds

### Step 3: Try It

After setup, restart Claude Code and try:

```text
Send me a test email at YOUR_EMAIL@example.com
```

If it works, you're connected!

## What You Can Do

| Ask Claude to... | What happens |
|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-----|
| "Send email to sarah@acme.com about the launch" | Actually sends the email |
| "Create GitHub issue: fix login bug" | Creates the issue |
| "Post to Slack #general: deploy complete" | Posts the message |
| "Add meeting notes to Notion" | Adds to Notion |

## Supported Apps

**Email:** Gmail, Outlook, SendGrid
**Chat:** Slack, Discord, Teams, Telegram
**Dev:** GitHub, GitLab, Jira, Linear
**Docs:** Notion, Google Docs, Confluence
**Data:** Sheets, Airtable, PostgreSQL

### And 1000+ more

## How It Works

1. You ask Claude to do something

1. Composio Tool Router finds the right tool

1. First time? You'll authorize via OAuth (one-time)

1. Action executes and returns result

## Troubleshooting

1. **"Plugin not found"** → Make sure you ran `/plugin install composio-toolrouter`

1. **"Need to authorize"** → Click the OAuth link Claude provides, then say "done"

1. **Action failed** → Check you have permissions in the target app

---

<p align="center"