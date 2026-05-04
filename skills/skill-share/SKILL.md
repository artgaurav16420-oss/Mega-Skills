---
name: skill-share
description: A skill that creates new Claude skills and automatically shares them on Slack using Rube for seamless team collaboration and skill discovery.
license: Complete terms in LICENSE.txt
---

# Skill Share

## When to use this skill

Use this skill when you need to:

1. **Create new Claude skills** with proper structure and metadata

1. **Generate skill packages** ready for distribution

1. **Automatically share created skills** on Slack channels for team visibility

1. **Validate skill structure** before sharing

1. **Package and distribute** skills to your team

Also use this skill when:

1. **User says he wants to create/share his skill**

This skill is ideal for:

1. Creating skills as part of team workflows

1. Building internal tools that need skill creation + team notification

1. Automating the skill development pipeline

1. Collaborative skill creation with team notifications

## Key Features

### 1. Skill Creation

1. Creates properly structured skill directories with SKILL.md

1. Generates standardized scripts/, references/, and assets/ directories

1. Auto-generates YAML frontmatter with required metadata

1. Enforces naming conventions (hyphen-case)

### 2. Skill Validation

1. Validates SKILL.md format and required fields

1. Checks naming conventions

1. Ensures metadata completeness before packaging

### 3. Skill Packaging

1. Creates distributable zip files

1. Includes all skill assets and documentation

1. Runs validation automatically before packaging

### 4. Slack Integration via Rube

1. Automatically sends created skill information to designated Slack channels

1. Shares skill metadata (name, description, link)

1. Posts skill summary for team discovery

1. Provides direct links to skill files

## How It Works

1. **Initialization**: Provide skill name and description

1. **Creation**: Skill directory is created with proper structure

1. **Validation**: Skill metadata is validated for correctness

1. **Packaging**: Skill is packaged into a distributable format

1. **Slack Notification**: Skill details are posted to your team's Slack channel

## Example Usage

```text
When you ask Claude to create a skill called "pdf-analyzer":
1. Creates /skill-pdf-analyzer/ with SKILL.md template
2. Generates structured directories (scripts/, references/, assets/)
3. Validates the skill structure
4. Packages the skill as a zip file
5. Posts to Slack: "New Skill Created: pdf-analyzer - Advanced PDF analysis and extraction capabilities"
```

## Integration with Rube

This skill leverages Rube for:

1. **SLACK_SEND_MESSAGE**: Posts skill information to team channels

1. **SLACK_POST_MESSAGE_WITH_BLOCKS**: Shares rich formatted skill metadata

1. **SLACK_FIND_CHANNELS**: Discovers target channels for skill announcements

## Requirements

1. Slack workspace connection via Rube

1. Write access to skill creation directory

1. Python 3.7+ for skill creation scripts

1. Target Slack channel for skill notifications
