---
name: meeting-insights-analyzer
description: Analyzes meeting transcripts and recordings to uncover behavioral patterns, communication insights, and actionable feedback. Identifies when you avoid conflict, use filler words, dominate conversations, or miss opportunities to listen. Perfect for professionals seeking to improve their communication and leadership skills.
---

# Meeting Insights Analyzer

This skill transforms your meeting transcripts into actionable insights about your communication patterns, helping you become a more effective communicator and leader.

## When to Use This Skill

1. Analyzing your communication patterns across multiple meetings

1. Getting feedback on your leadership and facilitation style

1. Identifying when you avoid difficult conversations

1. Understanding your speaking habits and filler words

1. Tracking improvement in communication skills over time

1. Preparing for performance reviews with concrete examples

1. Coaching team members on their communication style

## What This Skill Does

1. **Pattern Recognition**: Identifies recurring behaviors across meetings like:
1. Conflict avoidance or indirect communication
1. Speaking ratios and turn-taking
1. Question-asking vs. statement-making patterns
1. Active listening indicators
1. Decision-making approaches

1. **Communication Analysis**: Evaluates communication effectiveness:
1. Clarity and directness
1. Use of filler words and hedging language
1. Tone and sentiment patterns
1. Meeting control and facilitation

1. **Actionable Feedback**: Provides specific, timestamped examples with:
1. What happened
1. Why it matters
1. How to improve

1. **Trend Tracking**: Compares patterns over time when analyzing multiple meetings

## How to Use

### Basic Setup

1. Download your meeting transcripts to a folder (e.g., `~/meetings/`)

1. Navigate to that folder in Claude Code

1. Ask for the analysis you want

### Quick Start Examples

```text
Analyze all meetings in this folder and tell me when I avoided conflict.
```

```text
Look at my meetings from the past month and identify my communication patterns.
```

```text
Compare my facilitation style between these two meeting folders.
```

### Advanced Analysis

```text
Analyze all transcripts in this folder and:
1. Identify when I interrupted others
2. Calculate my speaking ratio
3. Find moments I avoided giving direct feedback
4. Track my use of filler words
5. Show examples of good active listening
```

## Instructions

When a user requests meeting analysis:

1. **Discover Available Data**
1. Scan the folder for transcript files (.txt, .md, .vtt, .srt, .docx)
1. Check if files contain speaker labels and timestamps
1. Confirm the date range of meetings
1. Identify the user's name/identifier in transcripts

1. **Clarify Analysis Goals**

   If not specified, ask what they want to learn:

1. Specific behaviors (conflict avoidance, interruptions, filler words)
1. Communication effectiveness (clarity, directness, listening)
1. Meeting facilitation skills
1. Speaking patterns and ratios
1. Growth areas for improvement

1. **Analyze Patterns**

   For each requested insight:

   **Conflict Avoidance**:

1. Look for hedging language ("maybe", "kind of", "I think")
1. Indirect phrasing instead of direct requests
1. Changing subject when tension arises
1. Agreeing without commitment ("yeah, but...")
1. Not addressing obvious problems

   **Speaking Ratios**:

1. Calculate percentage of meeting spent speaking
1. Count interruptions (by and of the user)
1. Measure average speaking turn length
1. Track question vs. statement ratios

   **Filler Words**:

1. Count "um", "uh", "like", "you know", "actually", etc.
1. Note frequency per minute or per speaking turn
1. Identify situations where they increase (nervous, uncertain)

   **Active Listening**:

1. Questions that reference others' previous points
1. Paraphrasing or summarizing others' ideas
1. Building on others' contributions
1. Asking clarifying questions

   **Leadership & Facilitation**:

1. Decision-making approach (directive vs. collaborative)
1. How disagreements are handled
1. Inclusion of quieter participants
1. Time management and agenda control
1. Follow-up and action item clarity

1. **Provide Specific Examples**

   For each pattern found, include:

```markdown
### [Pattern Name]
   **Finding**: [One-sentence summary of the pattern]
   **Frequency**: [X times across Y meetings]
   **Examples**:

   1. **[Meeting Name/Date]** - [Timestamp]

      **What Happened**:
      > [Actual quote from transcript]
      **Why This Matters**:
      [Explanation of the impact or missed opportunity]
      **Better Approach**:
      [Specific alternative phrasing or behavior]
   [Repeat for 2-3 strongest examples]
```

1. **Synthesize Insights**

   After analyzing all patterns, provide:

```markdown
## Meeting Insights Summary
   **Analysis Period**: [Date range]
   **Meetings Analyzed**: [X meetings]
   **Total Duration**: [X hours]
## Key Patterns Identified
### 1. [Primary Pattern]

   - **Observed**: [What you saw]
   - **Impact**: [Why it matters]
   - **Recommendation**: [How to improve]

### 2. [Second Pattern]
   [Same structure]
## Communication Strengths

   1. [Strength 1 with example]
   1. [Strength 2 with example]
   1. [Strength 3 with example]

## Growth Opportunities

   1. **[Area 1]**: [Specific, actionable advice]
   1. **[Area 2]**: [Specific, actionable advice]
   1. **[Area 3]**: [Specific, actionable advice]

## Speaking Statistics

   - Average speaking time: [X% of meeting]
   - Questions asked: [X per meeting average]
   - Filler words: [X per minute]
   - Interruptions: [X given / Y received per meeting]

## Next Steps
   [3-5 concrete actions to improve communication]
```

1. **Offer Follow-Up Options**
1. Track these same metrics in future meetings
1. Deep dive into specific meetings or patterns
1. Compare to industry benchmarks
1. Create a personal communication development plan
1. Generate a summary for performance reviews

## Examples

### Example 1: Conflict Avoidance Analysis (Inspired by Dan Shipper)

**User**: "I download all of my meeting recordings and put them in a folder. Tell me all the times I've subtly avoided conflict."

**Output**:

```markdown
## Conflict Avoidance Patterns
Found 23 instances across 15 meetings where you used indirect
communication or avoided addressing tensions directly.
## Pattern: Hedging on Critical Feedback
**Frequency**: 8 times across 7 meetings
**Example 1: 1:1 with Sarah** - 00:14:32
**What Happened**:
> "So, I was thinking... maybe we could, like, potentially
> consider looking at the timeline again? I mean, if you
> think that makes sense. But whatever you think is best!"
**Why This Matters**:
You needed to address that Sarah's project was behind schedule,
but the hedging language ("maybe", "potentially", "if you think")
and the deflection at the end ("whatever you think") made it easy
for her to miss the urgency.
**Better Approach**:
"Sarah, the project is two weeks behind schedule. We need to
discuss what's blocking progress and create a new timeline
today."
[Additional examples...]
## Recommendations
1. **Name the issue directly** in the first sentence
2. **Remove hedging words** like "maybe," "kind of," "sort of"
3. **Ask specific questions** instead of hinting
4. **Schedule difficult conversations** instead of raising them casually
```

### Example 2: Leadership Facilitation

**User**: "Analyze my team meetings and tell me about my facilitation style."

**Output**: Provides insights on:

1. How much you speak vs. team members (60% vs. 40%)

1. Whether you ask questions or make statements (3:1 ratio)

1. How you handle disagreements (tendency to resolve too quickly)

1. Who speaks least and whether you draw them in

1. Examples of good and missed facilitation moments

### Example 3: Personal Development Tracking

**User**: "Compare my meetings from Q1 vs. Q2 to see if I've improved my listening skills."

**Output**: Creates a comparative analysis showing:

1. Decrease in interruptions (8 per meeting → 3 per meeting)

1. Increase in clarifying questions (2 → 7 per meeting)

1. Improvement in building on others' ideas

1. Specific examples showing the difference

1. Remaining areas for growth

## Setup Tips

### Getting Meeting Transcripts

**From Granola** (free with Lenny's newsletter subscription):

1. Granola auto-transcribes your meetings

1. Export transcripts to a folder: [Instructions on how]

1. Point Claude Code to that folder

**From Zoom**:

1. Enable cloud recording with transcription

1. Download VTT or SRT files after meetings

1. Store in a dedicated folder

**From Google Meet**:

1. Use Google Docs auto-transcription

1. Save transcript docs to a folder

1. Download as .txt files or give Claude Code access

**From Fireflies.ai, Otter.ai, etc.**:

1. Export transcripts in bulk

1. Store in a local folder

1. Run analysis on the folder

### Best Practices

1. **Consistent naming**: Use `YYYY-MM-DD - Meeting Name.txt` format

1. **Regular analysis**: Review monthly or quarterly for trends

1. **Specific queries**: Ask about one behavior at a time for depth

1. **Privacy**: Keep sensitive meeting data local

1. **Action-oriented**: Focus on one improvement area at a time

## Common Analysis Requests

1. "When do I avoid difficult conversations?"

1. "How often do I interrupt others?"

1. "What's my speaking vs. listening ratio?"

1. "Do I ask good questions?"

1. "How do I handle disagreement?"

1. "Am I inclusive of all voices?"

1. "Do I use too many filler words?"

1. "How clear are my action items?"

1. "Do I stay on agenda or get sidetracked?"

1. "How has my communication changed over time?"

## Related Use Cases

1. Creating a personal development plan from insights

1. Preparing performance review materials with examples

1. Coaching direct reports on their communication

1. Analyzing customer calls for sales or support patterns

1. Studying negotiation tactics and outcomes
