---
name: raffle-winner-picker
description: Picks random winners from lists, spreadsheets, or Google Sheets for giveaways, raffles, and contests. Ensures fair, unbiased selection with transparency.
---

# Raffle Winner Picker

This skill randomly selects winners from lists, spreadsheets, or Google Sheets for giveaways and contests.

## When to Use This Skill

1. Running social media giveaways

1. Picking raffle winners at events

1. Randomly selecting participants for surveys or tests

1. Choosing winners from contest submissions

1. Fair distribution of limited spots or resources

1. Random team assignments

## What This Skill Does

1. **Random Selection**: Uses cryptographically random selection

1. **Multiple Sources**: Works with CSV, Excel, Google Sheets, or plain lists

1. **Multiple Winners**: Can pick one or multiple winners

1. **Duplicate Prevention**: Ensures the same person can't win twice

1. **Transparent Results**: Shows the selection process clearly

1. **Winner Details**: Displays all relevant information about winners

## How to Use

### From Google Sheets

```text
Pick a random row from this Google Sheet to select a winner
for a giveaway: [Sheet URL]
```

### From Local File

```text
Pick 3 random winners from entries.csv
```

### From List

```text
Pick a random winner from this list:
- Alice (alice@email.com)
- Bob (bob@email.com)
- Carol (carol@email.com)
...
```

### Multiple Winners

```text
Pick 5 random winners from contest-entries.xlsx,
make sure no duplicates
```

## Example

**User**: "Pick a random row from this Google Sheet to select a winner for a giveaway."

**Output**:

```text
Accessing Google Sheet...
Total entries found: 247
Randomly selecting winner...
🎉 WINNER SELECTED! 🎉
Row #142
Name: Sarah Johnson
Email: sarah.j@email.com
Entry Date: March 10, 2024
Comment: "Love your newsletter!"
Selection method: Cryptographically random
Timestamp: 2024-03-15 14:32:18 UTC
Would you like to:
- Pick another winner (excluding Sarah)?
- Export winner details?
- Pick runner-ups?
```

**Inspired by:** Lenny's use case - picking a Sora 2 giveaway winner from his subscriber Slack community

## Features

### Fair Selection

1. Uses secure random number generation

1. No bias or patterns

1. Transparent process

1. Repeatable with seed (for verification)

### Exclusions

```text
Pick a random winner excluding previous winners:
Alice, Bob, Carol
```

### Weighted Selection

```text
Pick a winner with weighted probability based on
the "entries" column (1 entry = 1 ticket)
```

### Runner-ups

```text
Pick 1 winner and 3 runner-ups from the list
```

## Example Workflows

### Social Media Giveaway

1. Export entries from Google Form to Sheets

1. "Pick a random winner from [Sheet URL]"

1. Verify winner details

1. Announce publicly with timestamp

### Event Raffle

1. Create CSV of attendee names and emails

1. "Pick 10 random winners from attendees.csv"

1. Export winner list

1. Email winners directly

### Team Assignment

1. Have list of participants

1. "Randomly split this list into 4 equal teams"

1. Review assignments

1. Share team rosters

## Tips

1. **Document the process**: Save the timestamp and method

1. **Public announcement**: Share selection details for transparency

1. **Check eligibility**: Verify winner meets contest rules

1. **Have backups**: Pick runner-ups in case winner is ineligible

1. **Export results**: Save winner list for records

## Privacy & Fairness

✓ Uses cryptographically secure randomness
✓ No manipulation possible
✓ Timestamp recorded for verification
✓ Can provide seed for third-party verification
✓ Respects data privacy

## Common Use Cases

1. Newsletter subscriber giveaways

1. Product launch raffles

1. Conference ticket drawings

1. Beta tester selection

1. Focus group participant selection

1. Random prize distribution at events
