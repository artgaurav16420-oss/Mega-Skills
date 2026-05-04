---
name: content-research-writer
description: Assists in writing high-quality content by conducting research, adding citations, improving hooks, iterating on outlines, and providing real-time feedback on each section. Transforms your writing process from solo effort to collaborative partnership.
---

# Content Research Writer

This skill acts as your writing partner, helping you research, outline, draft, and refine content while maintaining your unique voice and style.

## When to Use This Skill

1. Writing blog posts, articles, or newsletters

1. Creating educational content or tutorials

1. Drafting thought leadership pieces

1. Researching and writing case studies

1. Producing technical documentation with sources

1. Writing with proper citations and references

1. Improving hooks and introductions

1. Getting section-by-section feedback while writing

## What This Skill Does

1. **Collaborative Outlining**: Helps you structure ideas into coherent outlines

1. **Research Assistance**: Finds relevant information and adds citations

1. **Hook Improvement**: Strengthens your opening to capture attention

1. **Section Feedback**: Reviews each section as you write

1. **Voice Preservation**: Maintains your writing style and tone

1. **Citation Management**: Adds and formats references properly

1. **Iterative Refinement**: Helps you improve through multiple drafts

## How to Use

### Setup Your Writing Environment

Create a dedicated folder for your article:

```text
mkdir ~/writing/my-article-title
cd ~/writing/my-article-title
```

Create your draft file:

```text
touch article-draft.md
```

Open Claude Code from this directory and start writing.

### Basic Workflow

1. **Start with an outline**:

```text
Help me create an outline for an article about [topic]
```

1. **Research and add citations**:

```text
Research [specific topic] and add citations to my outline
```

1. **Improve the hook**:

```text
Here's my introduction. Help me make the hook more compelling.
```

1. **Get section feedback**:

```text
I just finished the "Why This Matters" section. Review it and give feedback.
```

1. **Refine and polish**:

```text
Review the full draft for flow, clarity, and consistency.
```

## Instructions

When a user requests writing assistance:

1. **Understand the Writing Project**

   Ask clarifying questions:

1. What's the topic and main argument?
1. Who's the target audience?
1. What's the desired length/format?
1. What's your goal? (educate, persuade, entertain, explain)
1. Any existing research or sources to include?
1. What's your writing style? (formal, conversational, technical)

1. **Collaborative Outlining**

   Help structure the content:

```markdown
## Article Outline: [Title]
## Hook

   - [Opening line/story/statistic]
   - [Why reader should care]

## Introduction

   - Context and background
   - Problem statement
   - What this article covers

## Main Sections
### Section 1: [Title]

   - Key point A
   - Key point B
   - Example/evidence
   - [Research needed: specific topic]

### Section 2: [Title]

   - Key point C
   - Key point D
   - Data/citation needed

### Section 3: [Title]

   - Key point E
   - Counter-arguments
   - Resolution

## Conclusion

   - Summary of main points
   - Call to action
   - Final thought

## Research To-Do

   - [ ] Find data on [topic]
   - [ ] Get examples of [concept]
   - [ ] Source citation for [claim]

```

   **Iterate on outline**:

1. Adjust based on feedback
1. Ensure logical flow
1. Identify research gaps
1. Mark sections for deep dives

1. **Conduct Research**

   When user requests research on a topic:

1. Search for relevant information
1. Find credible sources
1. Extract key facts, quotes, and data
1. Add citations in requested format

   Example output:

```markdown
## Research: AI Impact on Productivity
   Key Findings:

   1. **Productivity Gains**: Studies show 40% time savings for

      content creation tasks [1]

   1. **Adoption Rates**: 67% of knowledge workers use AI tools

      weekly [2]

   1. **Expert Quote**: "AI augments rather than replaces human

      creativity" - Dr. Jane Smith, MIT [3]
   Citations:
   [1] McKinsey Global Institute. (2024). "The Economic Potential
       of Generative AI"
   [2] Stack Overflow Developer Survey (2024)
   [3] Smith, J. (2024). MIT Technology Review interview
   Added to outline under Section 2.
```

1. **Improve Hooks**

   When user shares an introduction, analyze and strengthen:

   **Current Hook Analysis**:

1. What works: [positive elements]
1. What could be stronger: [areas for improvement]
1. Emotional impact: [current vs. potential]

   **Suggested Alternatives**:

   Option 1: [Bold statement]
   > [Example]
   *Why it works: [explanation]*

   Option 2: [Personal story]
   > [Example]
   *Why it works: [explanation]*

   Option 3: [Surprising data]
   > [Example]
   *Why it works: [explanation]*

   **Questions to hook**:

1. Does it create curiosity?
1. Does it promise value?
1. Is it specific enough?
1. Does it match the audience?

1. **Provide Section-by-Section Feedback**

   As user writes each section, review for:

```markdown
## Feedback: [Section Name]
## What Works Well ✓

   - [Strength 1]
   - [Strength 2]
   - [Strength 3]

## Suggestions for Improvement
### Clarity

   - [Specific issue] → [Suggested fix]
   - [Complex sentence] → [Simpler alternative]

### Flow

   - [Transition issue] → [Better connection]
   - [Paragraph order] → [Suggested reordering]

### Evidence

   - [Claim needing support] → [Add citation or example]
   - [Generic statement] → [Make more specific]

### Style

   - [Tone inconsistency] → [Match your voice better]
   - [Word choice] → [Stronger alternative]

## Specific Line Edits
   Original:
   > [Exact quote from draft]
   Suggested:
   > [Improved version]
   Why: [Explanation]
## Questions to Consider

   - [Thought-provoking question 1]
   - [Thought-provoking question 2]

   Ready to move to next section!
```

1. **Preserve Writer's Voice**

   Important principles:

1. **Learn their style**: Read existing writing samples
1. **Suggest, don't replace**: Offer options, not directives
1. **Match tone**: Formal, casual, technical, friendly
1. **Respect choices**: If they prefer their version, support it
1. **Enhance, don't override**: Make their writing better, not different

   Ask periodically:

1. "Does this sound like you?"
1. "Is this the right tone?"
1. "Should I be more/less [formal/casual/technical]?"

1. **Citation Management**

   Handle references based on user preference:

   **Inline Citations**:

```markdown
   Studies show 40% productivity improvement (McKinsey, 2024).
```

   **Numbered References**:

```markdown
   Studies show 40% productivity improvement [1].
   [1] McKinsey Global Institute. (2024)...
```

   **Footnote Style**:

```markdown
   Studies show 40% productivity improvement^1
   ^1: McKinsey Global Institute. (2024)...
```

   Maintain a running citations list:

```markdown
## References

   1. Author. (Year). "Title". Publication.
   1. Author. (Year). "Title". Publication.

   ...
```

1. **Final Review and Polish**

   When draft is complete, provide comprehensive feedback:

```markdown
## Full Draft Review
## Overall Assessment
   **Strengths**:

   - [Major strength 1]
   - [Major strength 2]
   - [Major strength 3]

   **Impact**: [Overall effectiveness assessment]
## Structure & Flow

   - [Comments on organization]
   - [Transition quality]
   - [Pacing assessment]

## Content Quality

   - [Argument strength]
   - [Evidence sufficiency]
   - [Example effectiveness]

## Technical Quality

   - Grammar and mechanics: [assessment]
   - Consistency: [assessment]
   - Citations: [completeness check]

## Readability

   - Clarity score: [evaluation]
   - Sentence variety: [evaluation]
   - Paragraph length: [evaluation]

## Final Polish Suggestions

   1. **Introduction**: [Specific improvements]
   1. **Body**: [Specific improvements]
   1. **Conclusion**: [Specific improvements]
   1. **Title**: [Options if needed]

## Pre-Publish Checklist

   - [ ] All claims sourced
   - [ ] Citations formatted
   - [ ] Examples clear
   - [ ] Transitions smooth
   - [ ] Call to action present
   - [ ] Proofread for typos

   Ready to publish! 🚀
```

## Examples

### Example 1: Teresa Torres's Workflow

**User**: "I'm writing an article about continuous discovery. Help me create an outline."

**Process**:

1. Collaborates on outline structure

1. Identifies research needs

1. User starts writing introduction

1. Reviews and improves the hook

1. User writes each section

1. Provides feedback after each section

1. Conducts research and adds citations

1. Final review of complete draft

1. Polish and prep for publishing

**Result**: Well-researched, properly cited article written in Teresa's voice with strong structure and flow.

### Example 2: Research-Heavy Article

**User**: "I'm writing about AI's impact on product management. Help me find current data and examples."

**Output**:

```markdown
## Research Compiled
### Recent Data
- Gartner: 80% of PMs will use AI tools by 2025 [1]
- Survey: 45% report faster feature shipping [2]
- Case study: Airbnb's AI-assisted prioritization [3]
### Expert Quotes
- "AI amplifies PM judgment, not replaces it" - Marty Cagan
- [Additional quotes with citations]
### Real Examples
1. **Company A**: Used AI for user research synthesis
   - Result: 60% time savings
   - Source: [citation]
2. **Company B**: AI-powered roadmap analysis
   - Result: Better stakeholder alignment
   - Source: [citation]
All added to your outline with proper citations.
```

### Example 3: Hook Improvement

**User's Original Hook**:
> "Product management is changing because of AI. In this article, I'll discuss some ways AI affects product managers."

**Improved Options**:

**Option 1 (Data-driven)**:
> "Last month, I asked AI to analyze 500 customer interviews. It took 30 minutes instead of 3 weeks. Product management will never be the same."

**Option 2 (Question)**:
> "What if you could talk to every customer, read every review, and analyze every support ticket—all before your morning coffee?"

**Option 3 (Story)**:
> "Sarah spent two weeks building the wrong feature. Not because she didn't understand her users, but because she couldn't process the hundreds of interviews fast enough to spot the pattern."

### Example 4: Section Feedback

**User**: "Just finished my 'Common Mistakes' section. Thoughts?"

**Response**:

```markdown
## Feedback: Common Mistakes Section
## What Works Well ✓ (2)
- Strong examples (the Slack notification story)
- Clear structure (3 mistakes, clean layout)
- Practical advice for each mistake
## Suggestions
### Make It More Specific
Your second point says "Bad prioritization" but could be stronger:
Current:
> "Many teams prioritize badly by focusing on features instead of outcomes."
Suggested:
> "I've watched teams ship 14 features in a quarter yet move none of their key metrics. They prioritized activity over progress."
### Add Data
The third mistake would benefit from evidence:
> "[Add citation]: Studies show teams without regular user contact are 3x more likely to build unused features [needs source]"
### Flow Improvement
Consider reordering: Mistake 3 → Mistake 2 → Mistake 1
This builds from small to big impact.
Ready for the next section!
```

## Writing Workflows

### Blog Post Workflow

1. Outline together

1. Research key points

1. Write introduction → get feedback

1. Write body sections → feedback each

1. Write conclusion → final review

1. Polish and edit

### Newsletter Workflow

1. Discuss hook ideas

1. Quick outline (shorter format)

1. Draft in one session

1. Review for clarity and links

1. Quick polish

### Technical Tutorial Workflow

1. Outline steps

1. Write code examples

1. Add explanations

1. Test instructions

1. Add troubleshooting section

1. Final review for accuracy

### Thought Leadership Workflow

1. Brainstorm unique angle

1. Research existing perspectives

1. Develop your thesis

1. Write with strong POV

1. Add supporting evidence

1. Craft compelling conclusion

## Pro Tips

1. **Work in VS Code**: Better than web Claude for long-form writing

1. **One section at a time**: Get feedback incrementally

1. **Save research separately**: Keep a research.md file

1. **Version your drafts**: article-v1.md, article-v2.md, etc.

1. **Read aloud**: Use feedback to identify clunky sentences

1. **Set deadlines**: "I want to finish the draft today"

1. **Take breaks**: Write, get feedback, pause, revise

## File Organization

Recommended structure for writing projects:

```text
~/writing/article-name/
├── outline.md          # Your outline
├── research.md         # All research and citations
├── draft-v1.md         # First draft
├── draft-v2.md         # Revised draft
├── final.md            # Publication-ready
├── feedback.md         # Collected feedback
└── sources/            # Reference materials
    ├── study1.pdf
    └── article2.md
```

## Best Practices

### For Research

1. Verify sources before citing

1. Use recent data when possible

1. Balance different perspectives

1. Link to original sources

### For Feedback

1. Be specific about what you want: "Is this too technical?"

1. Share your concerns: "I'm worried this section drags"

1. Ask questions: "Does this flow logically?"

1. Request alternatives: "What's another way to explain this?"

### For Voice

1. Share examples of your writing

1. Specify tone preferences

1. Point out good matches: "That sounds like me!"

1. Flag mismatches: "Too formal for my style"

## Related Use Cases

1. Creating social media posts from articles

1. Adapting content for different audiences

1. Writing email newsletters

1. Drafting technical documentation

1. Creating presentation content

1. Writing case studies

1. Developing course outlines
