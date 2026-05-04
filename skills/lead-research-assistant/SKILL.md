---
name: lead-research-assistant
description: Identifies high-quality leads for your product or service by analyzing your business, searching for target companies, and providing actionable contact strategies. Perfect for sales, business development, and marketing professionals.
---

# Lead Research Assistant

This skill helps you identify and qualify potential leads for your business by analyzing your product/service, understanding your ideal customer profile, and providing actionable outreach strategies.

## When to Use This Skill

1. Finding potential customers or clients for your product/service

1. Building a list of companies to reach out to for partnerships

1. Identifying target accounts for sales outreach

1. Researching companies that match your ideal customer profile

1. Preparing for business development activities

## What This Skill Does

1. **Understands Your Business**: Analyzes your product/service, value proposition, and target market

1. **Identifies Target Companies**: Finds companies that match your ideal customer profile based on:
1. Industry and sector
1. Company size and location
1. Technology stack and tools they use
1. Growth stage and funding
1. Pain points your product solves

1. **Prioritizes Leads**: Ranks companies based on fit score and relevance

1. **Provides Contact Strategies**: Suggests how to approach each lead with personalized messaging

1. **Enriches Data**: Gathers relevant information about decision-makers and company context

## How to Use

### Basic Usage

Simply describe your product/service and what you're looking for:

```text
I'm building [product description]. Find me 10 companies in [location/industry]
that would be good leads for this.
```

### With Your Codebase

For even better results, run this from your product's source code directory:

```text
Look at what I'm building in this repository and identify the top 10 companies
in [location/industry] that would benefit from this product.
```

### Advanced Usage

For more targeted research:

```text
My product: [description]
Ideal customer profile:
- Industry: [industry]
- Company size: [size range]
- Location: [location]
- Current pain points: [pain points]
- Technologies they use: [tech stack]
Find me 20 qualified leads with contact strategies for each.
```

## Instructions

When a user requests lead research:

1. **Understand the Product/Service**
1. If in a code directory, analyze the codebase to understand the product
1. Ask clarifying questions about the value proposition
1. Identify key features and benefits
1. Understand what problems it solves

1. **Define Ideal Customer Profile**
1. Determine target industries and sectors
1. Identify company size ranges
1. Consider geographic preferences
1. Understand relevant pain points
1. Note any technology requirements

1. **Research and Identify Leads**
1. Search for companies matching the criteria
1. Look for signals of need (job postings, tech stack, recent news)
1. Consider growth indicators (funding, expansion, hiring)
1. Identify companies with complementary products/services
1. Check for budget indicators

1. **Prioritize and Score**
1. Create a fit score (1-10) for each lead
1. Consider factors like:
   1. Alignment with ICP
   1. Signals of immediate need
   1. Budget availability
   1. Competitive landscape
   1. Timing indicators

1. **Provide Actionable Output**

   For each lead, provide:

1. **Company Name** and website
1. **Why They're a Good Fit**: Specific reasons based on their business
1. **Priority Score**: 1-10 with explanation
1. **Decision Maker**: Role/title to target (e.g., "VP of Engineering")
1. **Contact Strategy**: Personalized approach suggestions
1. **Value Proposition**: How your product solves their specific problem
1. **Conversation Starters**: Specific points to mention in outreach
1. **LinkedIn URL**: If available, for easy connection

1. **Format the Output**

   Present results in a clear, scannable format:

```markdown
## Lead Research Results
## Summary

   - Total leads found: [X]
   - High priority (8-10): [X]
   - Medium priority (5-7): [X]
   - Average fit score: [X]

   ---
## Lead 1: [Company Name]
   **Website**: [URL]
   **Priority Score**: [X/10]
   **Industry**: [Industry]
   **Size**: [Employee count/revenue range]
   **Why They're a Good Fit**:
   [2-3 specific reasons based on their business]
   **Target Decision Maker**: [Role/Title]
   **LinkedIn**: [URL if available]
   **Value Proposition for Them**:
   [Specific benefit for this company]
   **Outreach Strategy**:
   [Personalized approach - mention specific pain points, recent company news, or relevant context]
   **Conversation Starters**:

   - [Specific point 1]
   - [Specific point 2]

   ---
   [Repeat for each lead]
```

1. **Offer Next Steps**
1. Suggest saving results to a CSV for CRM import
1. Offer to draft personalized outreach messages
1. Recommend prioritization based on timing
1. Suggest follow-up research for top leads

## Examples

### Example 1: From Lenny's Newsletter

**User**: "I'm building a tool that masks sensitive data in AI coding assistant queries. Find potential leads."

**Output**: Creates a prioritized list of companies that:

1. Use AI coding assistants (Copilot, Cursor, etc.)

1. Handle sensitive data (fintech, healthcare, legal)

1. Have evidence in their GitHub repos of using coding agents

1. May have accidentally exposed sensitive data in code

1. Includes LinkedIn URLs of relevant decision-makers

### Example 2: Local Business

**User**: "I run a consulting practice for remote team productivity. Find me 10 companies in the Bay Area that recently went remote."

**Output**: Identifies companies that:

1. Recently posted remote job listings

1. Announced remote-first policies

1. Are hiring distributed teams

1. Show signs of remote work challenges

1. Provides personalized outreach strategies for each

## Tips for Best Results

1. **Be specific** about your product and its unique value

1. **Run from your codebase** if applicable for automatic context

1. **Provide context** about your ideal customer profile

1. **Specify constraints** like industry, location, or company size

1. **Request follow-up** research on promising leads for deeper insights

## Related Use Cases

1. Drafting personalized outreach emails after identifying leads

1. Building a CRM-ready CSV of qualified prospects

1. Researching specific companies in detail

1. Analyzing competitor customer bases

1. Identifying partnership opportunities
