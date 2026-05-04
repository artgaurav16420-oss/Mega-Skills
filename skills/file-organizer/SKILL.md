---
name: file-organizer
description: Intelligently organizes your files and folders across your computer by understanding context, finding duplicates, suggesting better structures, and automating cleanup tasks. Reduces cognitive load and keeps your digital workspace tidy without manual effort.
---

# File Organizer

This skill acts as your personal organization assistant, helping you maintain a clean, logical file structure across your computer without the mental overhead of constant manual organization.

## When to Use This Skill

1. Your Downloads folder is a chaotic mess

1. You can't find files because they're scattered everywhere

1. You have duplicate files taking up space

1. Your folder structure doesn't make sense anymore

1. You want to establish better organization habits

1. You're starting a new project and need a good structure

1. You're cleaning up before archiving old projects

## What This Skill Does

1. **Analyzes Current Structure**: Reviews your folders and files to understand what you have

1. **Finds Duplicates**: Identifies duplicate files across your system

1. **Suggests Organization**: Proposes logical folder structures based on your content

1. **Automates Cleanup**: Moves, renames, and organizes files with your approval

1. **Maintains Context**: Makes smart decisions based on file types, dates, and content

1. **Reduces Clutter**: Identifies old files you probably don't need anymore

## How to Use

### From Your Home Directory

```text
cd ~
```

Then run Claude Code and ask for help:

```text
Help me organize my Downloads folder
```

```text
Find duplicate files in my Documents folder
```

```text
Review my project directories and suggest improvements
```

### Specific Organization Tasks

```text
Organize these downloads into proper folders based on what they are
```

```text
Find duplicate files and help me decide which to keep
```

```text
Clean up old files I haven't touched in 6+ months
```

```text
Create a better folder structure for my [work/projects/photos/etc]
```

## Instructions

When a user requests file organization help:

1. **Understand the Scope**

   Ask clarifying questions:

1. Which directory needs organization? (Downloads, Documents, entire home folder?)
1. What's the main problem? (Can't find things, duplicates, too messy, no structure?)
1. Any files or folders to avoid? (Current projects, sensitive data?)
1. How aggressively to organize? (Conservative vs. comprehensive cleanup)

1. **Analyze Current State**

   Review the target directory:

```bash
## Get overview of current structure
   ls -la [target_directory]
## Check file types and sizes
   find [target_directory] -type f -exec file {} \; | head -20
## Identify largest files
   du -sh [target_directory]/* | sort -rh | head -20
## Count file types
   find [target_directory] -type f | sed 's/.*\.//' | sort | uniq -c | sort -rn
```

   Summarize findings:

1. Total files and folders
1. File type breakdown
1. Size distribution
1. Date ranges
1. Obvious organization issues

1. **Identify Organization Patterns**

   Based on the files, determine logical groupings:

   **By Type**:

1. Documents (PDFs, DOCX, TXT)
1. Images (JPG, PNG, SVG)
1. Videos (MP4, MOV)
1. Archives (ZIP, TAR, DMG)
1. Code/Projects (directories with code)
1. Spreadsheets (XLSX, CSV)
1. Presentations (PPTX, KEY)

   **By Purpose**:

1. Work vs. Personal
1. Active vs. Archive
1. Project-specific
1. Reference materials
1. Temporary/scratch files

   **By Date**:

1. Current year/month
1. Previous years
1. Very old (archive candidates)

1. **Find Duplicates**

   When requested, search for duplicates:

```bash
## Find exact duplicates by hash
   find [directory] -type f -exec md5 {} \; | sort | uniq -d
## Find files with same name
   find [directory] -type f -printf '%f\n' | sort | uniq -d
## Find similar-sized files
   find [directory] -type f -printf '%s %p\n' | sort -n
```

   For each set of duplicates:

1. Show all file paths
1. Display sizes and modification dates
1. Recommend which to keep (usually newest or best-named)
1. **Important**: Always ask for confirmation before deleting

1. **Propose Organization Plan**

   Present a clear plan before making changes:

```markdown
## Organization Plan for [Directory]
## Current State

   - X files across Y folders
   - [Size] total
   - File types: [breakdown]
   - Issues: [list problems]

## Proposed Structure
```

   [Directory]/
   ├── Work/
   │   ├── Projects/
   │   ├── Documents/
   │   └── Archive/
   ├── Personal/
   │   ├── Photos/
   │   ├── Documents/
   │   └── Media/
   └── Downloads/
       ├── To-Sort/
       └── Archive/

```text
## Changes I'll Make

   1. **Create new folders**: [list]
   1. **Move files**:
      - X PDFs → Work/Documents/
      - Y images → Personal/Photos/
      - Z old files → Archive/
   1. **Rename files**: [any renaming patterns]
   1. **Delete**: [duplicates or trash files]

## Files Needing Your Decision

   - [List any files you're unsure about]

   Ready to proceed? (yes/no/modify)
```

1. **Execute Organization**

   After approval, organize systematically:

```bash
## Create folder structure
   mkdir -p "path/to/new/folders"
## Move files with clear logging
   mv "old/path/file.pdf" "new/path/file.pdf"
## Rename files with consistent patterns
## Example: "YYYY-MM-DD - Description.ext"
```

   **Important Rules**:

1. Always confirm before deleting anything
1. Log all moves for potential undo
1. Preserve original modification dates
1. Handle filename conflicts gracefully
1. Stop and ask if you encounter unexpected situations

1. **Provide Summary and Maintenance Tips**

   After organizing:

```markdown
## Organization Complete! ✨
## What Changed

   - Created [X] new folders
   - Organized [Y] files
   - Freed [Z] GB by removing duplicates
   - Archived [W] old files

## New Structure
   [Show the new folder tree]
## Maintenance Tips
   To keep this organized:

   1. **Weekly**: Sort new downloads
   1. **Monthly**: Review and archive completed projects
   1. **Quarterly**: Check for new duplicates
   1. **Yearly**: Archive old files

## Quick Commands for You
```

## Find files modified this week

   find . -type f -mtime -7

## Sort downloads by type

   [custom command for their setup]

## Find duplicates

   [custom command]

```text
   Want to organize another folder?
```

## Examples

### Example 1: Organizing Downloads (From Justin Dielmann)

**User**: "My Downloads folder is a mess with 500+ files. Help me organize it."

**Process**:

1. Analyzes Downloads folder

1. Finds patterns: work docs, personal photos, installers, random PDFs

1. Proposes structure:
1. Downloads/
   1. Work/
   1. Personal/
   1. Installers/ (DMG, PKG files)
   1. Archive/
   1. ToSort/ (things needing decisions)

1. Asks for confirmation

1. Moves files intelligently based on content and names

1. Results: 500 files → 5 organized folders

### Example 2: Finding and Removing Duplicates

**User**: "Find duplicate files in my Documents and help me decide which to keep."

**Output**:

```markdown
## Found 23 Sets of Duplicates (156 MB total)
## Duplicate Set 1: "proposal.pdf"
- `/Documents/proposal.pdf` (2.3 MB, modified: 2024-03-15)
- `/Documents/old/proposal.pdf` (2.3 MB, modified: 2024-03-15)
- `/Desktop/proposal.pdf` (2.3 MB, modified: 2024-03-10)
**Recommendation**: Keep `/Documents/proposal.pdf` (most recent in correct location)
Delete the other 2 copies?
[Continue for all duplicates...]
```

### Example 3: Restructuring Projects Folder

**User**: "Review my ~/Projects directory and suggest improvements."

**Output**:

```markdown
## Analysis of ~/Projects
## Current Structure Issues
- Mix of active and archived projects (3+ years old)
- No consistent naming convention
- Some projects at root, others in random subfolders
- Duplicate folders (project-name, project-name-old, project-name-v2)
## Proposed Structure (2)
```

Projects/
├── Active/
│   ├── client-work/
│   ├── side-projects/
│   └── learning/
├── Archive/
│   ├── 2022/
│   ├── 2023/
│   └── 2024/
└── Templates/

```text
## Specific Changes
1. Move 12 projects not touched since 2022 → Archive/
2. Consolidate 4 duplicate project folders
3. Rename projects to consistent format: "client-name-project-name"
4. Create Archive for old work
Want me to implement this?
```

### Example 4: Organizing Photos by Date

**User**: "Organize my photo folders by year and month."

**Output**: Creates structure like:

```text
Photos/
├── 2023/
│   ├── 01-January/
│   ├── 02-February/
│   └── ...
├── 2024/
│   ├── 01-January/
│   └── ...
└── Unsorted/
```

Then moves photos based on EXIF data or file modification dates.

## Common Organization Tasks

### Downloads Cleanup

```text
Organize my Downloads folder - move documents to Documents,
images to Pictures, keep installers separate, and archive files
older than 3 months.
```

### Project Organization

```text
Review my Projects folder structure and help me separate active
projects from old ones I should archive.
```

### Duplicate Removal

```text
Find all duplicate files in my Documents folder and help me
decide which ones to keep.
```

### Desktop Cleanup

```text
My Desktop is covered in files. Help me organize everything into
my Documents folder properly.
```

### Photo Organization

```text
Organize all photos in this folder by date (year/month) based
on when they were taken.
```

### Work/Personal Separation

```text
Help me separate my work files from personal files across my
Documents folder.
```

## Pro Tips

1. **Start Small**: Begin with one messy folder (like Downloads) to build trust

1. **Regular Maintenance**: Run weekly cleanup on Downloads

1. **Consistent Naming**: Use "YYYY-MM-DD - Description" format for important files

1. **Archive Aggressively**: Move old projects to Archive instead of deleting

1. **Keep Active Separate**: Maintain clear boundaries between active and archived work

1. **Trust the Process**: Let Claude handle the cognitive load of where things go

## Best Practices

### Folder Naming

1. Use clear, descriptive names

1. Avoid spaces (use hyphens or underscores)

1. Be specific: "client-proposals" not "docs"

1. Use prefixes for ordering: "01-current", "02-archive"

### File Naming

1. Include dates: "2024-10-17-meeting-notes.md"

1. Be descriptive: "q3-financial-report.xlsx"

1. Avoid version numbers in names (use version control instead)

1. Remove download artifacts: "document-final-v2 (1).pdf" → "document.pdf"

### When to Archive

1. Projects not touched in 6+ months

1. Completed work that might be referenced later

1. Old versions after migration to new systems

1. Files you're hesitant to delete (archive first)

## Related Use Cases

1. Setting up organization for a new computer

1. Preparing files for backup/archiving

1. Cleaning up before storage cleanup

1. Organizing shared team folders

1. Structuring new project directories
