# MCP Server Evaluation Guide

## Overview

This document provides guidance on creating comprehensive evaluations for MCP servers. Evaluations test whether LLMs can effectively use your MCP server to answer realistic, complex questions using only the tools provided.

---

## Quick Reference

### Evaluation Requirements

1. Create 10 human-readable questions
1. Questions must be READ-ONLY, INDEPENDENT, NON-DESTRUCTIVE
1. Each question requires multiple tool calls (potentially dozens)
1. Answers must be single, verifiable values
1. Answers must be STABLE (won't change over time)

### Output Format

```xml
<evaluation>
   <qa_pair>
      <question>Your question here</question>
      <answer>Single verifiable answer</answer>
   </qa_pair>
</evaluation>
```

---

## Purpose of Evaluations

The measure of quality of an MCP server is NOT how well or comprehensively the server implements tools, but how well these implementations (input/output schemas, docstrings/descriptions, functionality) enable LLMs with no other context and access ONLY to the MCP servers to answer realistic and difficult questions.

## Evaluation Overview

Create 10 human-readable questions requiring ONLY READ-ONLY, INDEPENDENT, NON-DESTRUCTIVE, and IDEMPOTENT operations to answer. Each question should be:

1. Realistic
1. Clear and concise
1. Unambiguous
1. Complex, requiring potentially dozens of tool calls or steps
1. Answerable with a single, verifiable value that you identify in advance

## Question Guidelines

### Core Requirements

1. **Questions MUST be independent**
1. Each question should NOT depend on the answer to any other question
1. Should not assume prior write operations from processing another question

1. **Questions MUST require ONLY NON-DESTRUCTIVE AND IDEMPOTENT tool use**
1. Should not instruct or require modifying state to arrive at the correct answer

1. **Questions must be REALISTIC, CLEAR, CONCISE, and COMPLEX**
1. Must require another LLM to use multiple (potentially dozens of) tools or steps to answer

### Complexity and Depth

1. **Questions must require deep exploration**
1. Consider multi-hop questions requiring multiple sub-questions and sequential tool calls
1. Each step should benefit from information found in previous questions

1. **Questions may require extensive paging**
1. May need paging through multiple pages of results
1. May require querying old data (1-2 years out-of-date) to find niche information
1. The questions must be DIFFICULT

1. **Questions must require deep understanding**
1. Rather than surface-level knowledge
1. May pose complex ideas as True/False questions requiring evidence
1. May use multiple-choice format where LLM must search different hypotheses

1. **Questions must not be solvable with straightforward keyword search**
1. Do not include specific keywords from the target content
1. Use synonyms, related concepts, or paraphrases
1. Require multiple searches, analyzing multiple related items, extracting context, then deriving the answer

### Tool Testing

1. **Questions should stress-test tool return values**
1. May elicit tools returning large JSON objects or lists, overwhelming the LLM
1. Should require understanding multiple modalities of data:
   1. IDs and names
   1. Timestamps and datetimes (months, days, years, seconds)
   1. File IDs, names, extensions, and mimetypes
   1. URLs, GIDs, etc.
1. Should probe the tool's ability to return all useful forms of data

1. **Questions should MOSTLY reflect real human use cases**
1. The kinds of information retrieval tasks that HUMANS assisted by an LLM would care about

1. **Questions may require dozens of tool calls**
   1. This challenges LLMs with limited context
   1. Encourages MCP server tools to reduce information returned

1. **Include ambiguous questions**
   1. May be ambiguous OR require difficult decisions on which tools to call
   1. Force the LLM to potentially make mistakes or misinterpret
   1. Ensure that despite AMBIGUITY, there is STILL A SINGLE VERIFIABLE ANSWER

### Stability

1. **Questions must be designed so the answer DOES NOT CHANGE**
   1. Do not ask questions that rely on "current state" which is dynamic
   1. For example, do not count:
   1. Number of reactions to a post
   1. Number of replies to a thread
   1. Number of members in a channel

1. **DO NOT let the MCP server RESTRICT the kinds of questions you create**
   1. Create challenging and complex questions
   1. Some may not be solvable with the available MCP server tools
   1. Questions may require specific output formats (datetime vs. epoch time, JSON vs. MARKDOWN)
   1. Questions may require dozens of tool calls to complete

## Answer Guidelines

### Verification

1. **Answers must be VERIFIABLE via direct string comparison**
1. If the answer can be re-written in many formats, clearly specify the output format in the QUESTION
1. Examples: "Use YYYY/MM/DD.", "Respond True or False.", "Answer A, B, C, or D and nothing else."
1. Answer should be a single VERIFIABLE value such as:
   1. User ID, user name, display name, first name, last name
   1. Channel ID, channel name
   1. Message ID, string
   1. URL, title
   1. Numerical quantity
   1. Timestamp, datetime
   1. Boolean (for True/False questions)
   1. Email address, phone number
   1. File ID, file name, file extension
   1. Multiple choice answer
1. Answers must not require special formatting or complex, structured output
1. Answer will be verified using DIRECT STRING COMPARISON

### Readability

1. **Answers should generally prefer HUMAN-READABLE formats**
1. Examples: names, first name, last name, datetime, file name, message string, URL, yes/no, true/false, a/b/c/d
1. Rather than opaque IDs (though IDs are acceptable)
1. The VAST MAJORITY of answers should be human-readable

### Stability (2)

1. **Answers must be STABLE/STATIONARY**
1. Look at old content (e.g., conversations that have ended, projects that have launched, questions answered)
1. Create QUESTIONS based on "closed" concepts that will always return the same answer
1. Questions may ask to consider a fixed time window to insulate from non-stationary answers
1. Rely on context UNLIKELY to change
1. Example: if finding a paper name, be SPECIFIC enough so answer is not confused with papers published later

1. **Answers must be CLEAR and UNAMBIGUOUS**
1. Questions must be designed so there is a single, clear answer
1. Answer can be derived from using the MCP server tools

### Diversity

1. **Answers must be DIVERSE**
1. Answer should be a single VERIFIABLE value in diverse modalities and formats
1. User concept: user ID, user name, display name, first name, last name, email address, phone number
1. Channel concept: channel ID, channel name, channel topic
1. Message concept: message ID, message string, timestamp, month, day, year

1. **Answers must NOT be complex structures**
1. Not a list of values
1. Not a complex object
1. Not a list of IDs or strings
1. Not natural language text
1. UNLESS the answer can be straightforwardly verified using DIRECT STRING COMPARISON
1. And can be realistically reproduced
1. It should be unlikely that an LLM would return the same list in any other order or format

## Evaluation Process

### Step 1: Documentation Inspection

Read the documentation of the target API to understand:

1. Available endpoints and functionality
1. If ambiguity exists, fetch additional information from the web
1. Parallelize this step AS MUCH AS POSSIBLE
1. Ensure each subagent is ONLY examining documentation from the file system or on the web

### Step 2: Tool Inspection

List the tools available in the MCP server:

1. Inspect the MCP server directly
1. Understand input/output schemas, docstrings, and descriptions
1. WITHOUT calling the tools themselves at this stage

### Step 3: Developing Understanding

Repeat steps 1 & 2 until you have a good understanding:

1. Iterate multiple times
1. Think about the kinds of tasks you want to create
1. Refine your understanding
1. At NO stage should you READ the code of the MCP server implementation itself
1. Use your intuition and understanding to create reasonable, realistic, but VERY challenging tasks

### Step 4: Read-Only Content Inspection

After understanding the API and tools, USE the MCP server tools:

1. Inspect content using READ-ONLY and NON-DESTRUCTIVE operations ONLY
1. Goal: identify specific content (e.g., users, channels, messages, projects, tasks) for creating realistic questions
1. Should NOT call any tools that modify state
1. Will NOT read the code of the MCP server implementation itself
1. Parallelize this step with individual sub-agents pursuing independent explorations
1. Ensure each subagent is only performing READ-ONLY, NON-DESTRUCTIVE, and IDEMPOTENT operations
1. BE CAREFUL: SOME TOOLS may return LOTS OF DATA which would cause you to run out of CONTEXT
1. Make INCREMENTAL, SMALL, AND TARGETED tool calls for exploration
1. In all tool call requests, use the `limit` parameter to limit results (<10)
1. Use pagination

### Step 5: Task Generation

After inspecting the content, create 10 human-readable questions:

1. An LLM should be able to answer these with the MCP server
1. Follow all question and answer guidelines above

## Output Format (2)

Each QA pair consists of a question and an answer. The output should be an XML file with this structure:

```xml
<evaluation>
   <qa_pair>
      <question>Find the project created in Q2 2024 with the highest number of completed tasks. What is the project name?</question>
      <answer>Website Redesign</answer>
   </qa_pair>
   <qa_pair>
      <question>Search for issues labeled as "bug" that were closed in March 2024. Which user closed the most issues? Provide their username.</question>
      <answer>sarah_dev</answer>
   </qa_pair>
   <qa_pair>
      <question>Look for pull requests that modified files in the /api directory and were merged between January 1 and January 31, 2024. How many different contributors worked on these PRs?</question>
      <answer>7</answer>
   </qa_pair>
   <qa_pair>
      <question>Find the repository with the most stars that was created before 2023. What is the repository name?</question>
      <answer>data-pipeline</answer>
   </qa_pair>
</evaluation>
```

## Evaluation Examples

### Good Questions

#### Example 1: Multi-hop question requiring deep exploration (GitHub MCP)

```xml
<qa_pair>
   <question>Find the repository that was archived in Q3 2023 and had previously been the most forked project in the organization. What was the primary programming language used in that repository?</question>
   <answer>Python</answer>
</qa_pair>
```

This question is good because:

1. Requires multiple searches to find archived repositories
1. Needs to identify which had the most forks before archival
1. Requires examining repository details for the language
1. Answer is a simple, verifiable value
1. Based on historical (closed) data that won't change

#### Example 2: Requires understanding context without keyword matching (Project Management MCP)

```xml
<qa_pair>
   <question>Locate the initiative focused on improving customer onboarding that was completed in late 2023. The project lead created a retrospective document after completion. What was the lead's role title at that time?</question>
   <answer>Product Manager</answer>
</qa_pair>
```

This question is good because:

1. Doesn't use specific project name ("initiative focused on improving customer onboarding")
1. Requires finding completed projects from specific timeframe
1. Needs to identify the project lead and their role
1. Requires understanding context from retrospective documents
1. Answer is human-readable and stable
1. Based on completed work (won't change)

#### Example 3: Complex aggregation requiring multiple steps (Issue Tracker MCP)

```xml
<qa_pair>
   <question>Among all bugs reported in January 2024 that were marked as critical priority, which assignee resolved the highest percentage of their assigned bugs within 48 hours? Provide the assignee's username.</question>
   <answer>alex_eng</answer>
</qa_pair>
```

This question is good because:

1. Requires filtering bugs by date, priority, and status
1. Needs to group by assignee and calculate resolution rates
1. Requires understanding timestamps to determine 48-hour windows
1. Tests pagination (potentially many bugs to process)
1. Answer is a single username
1. Based on historical data from specific time period

#### Example 4: Requires synthesis across multiple data types (CRM MCP)

```xml
<qa_pair>
   <question>Find the account that upgraded from the Starter to Enterprise plan in Q4 2023 and had the highest annual contract value. What industry does this account operate in?</question>
   <answer>Healthcare</answer>
</qa_pair>
```

This question is good because:

1. Requires understanding subscription tier changes
1. Needs to identify upgrade events in specific timeframe
1. Requires comparing contract values
1. Must access account industry information
1. Answer is simple and verifiable
1. Based on completed historical transactions

### Poor Questions

#### Example 1: Answer changes over time

```xml
<qa_pair>
   <question>How many open issues are currently assigned to the engineering team?</question>
   <answer>47</answer>
</qa_pair>
```

This question is poor because:

1. The answer will change as issues are created, closed, or reassigned
1. Not based on stable/stationary data
1. Relies on "current state" which is dynamic

#### Example 2: Too easy with keyword search

```xml
<qa_pair>
   <question>Find the pull request with title "Add authentication feature" and tell me who created it.</question>
   <answer>developer123</answer>
</qa_pair>
```

This question is poor because:

1. Can be solved with a straightforward keyword search for exact title
1. Doesn't require deep exploration or understanding
1. No synthesis or analysis needed

#### Example 3: Ambiguous answer format

```xml
<qa_pair>
   <question>List all the repositories that have Python as their primary language.</question>
   <answer>repo1, repo2, repo3, data-pipeline, ml-tools</answer>
</qa_pair>
```

This question is poor because:

1. Answer is a list that could be returned in any order
1. Difficult to verify with direct string comparison
1. LLM might format differently (JSON array, comma-separated, newline-separated)
1. Better to ask for a specific aggregate (count) or superlative (most stars)

## Verification Process

After creating evaluations:

1. **Examine the XML file** to understand the schema
1. **Load each task instruction** and in parallel using the MCP server and tools, identify the correct answer by attempting to solve the task YOURSELF
1. **Flag any operations** that require WRITE or DESTRUCTIVE operations
1. **Accumulate all CORRECT answers** and replace any incorrect answers in the document
1. **Remove any `<qa_pair>`** that require WRITE or DESTRUCTIVE operations

Remember to parallelize solving tasks to avoid running out of context, then accumulate all answers and make changes to the file at the end.

## Tips for Creating Quality Evaluations

1. **Think Hard and Plan Ahead** before generating tasks
1. **Parallelize Where Opportunity Arises** to speed up the process and manage context
1. **Focus on Realistic Use Cases** that humans would actually want to accomplish
1. **Create Challenging Questions** that test the limits of the MCP server's capabilities
1. **Ensure Stability** by using historical data and closed concepts
1. **Verify Answers** by solving the questions yourself using the MCP server tools
1. **Iterate and Refine** based on what you learn during the process

---

## Running Evaluations

After creating your evaluation file, you can use the provided evaluation harness to test your MCP server.

## Setup

1. **Install Dependencies**

```bash
   pip install -r scripts/requirements.txt
```

   Or install manually:

```bash
   pip install anthropic mcp
```

1. **Set API Key**

```bash
   export ANTHROPIC_API_KEY=your_api_key_here
```

## Evaluation File Format

Evaluation files use XML format with `<qa_pair>` elements:

```xml
<evaluation>
   <qa_pair>
      <question>Find the project created in Q2 2024 with the highest number of completed tasks. What is the project name?</question>
      <answer>Website Redesign</answer>
   </qa_pair>
   <qa_pair>
      <question>Search for issues labeled as "bug" that were closed in March 2024. Which user closed the most issues? Provide their username.</question>
      <answer>sarah_dev</answer>
   </qa_pair>
</evaluation>
```

## Running Evaluations (2)

The evaluation script (`scripts/evaluation.py`) supports three transport types:

### Important

1. **stdio transport**: The evaluation script automatically launches and manages the MCP server process for you. Do not run the server manually.
1. **sse/http transports**: You must start the MCP server separately before running the evaluation. The script connects to the already-running server at the specified URL.

### 1. Local STDIO Server

For locally-run MCP servers (script launches the server automatically):

```bash
python scripts/evaluation.py \
  -t stdio \
  -c python \
  -a my_mcp_server.py \
  evaluation.xml
```

With environment variables:

```bash
python scripts/evaluation.py \
  -t stdio \
  -c python \
  -a my_mcp_server.py \
  -e API_KEY=abc123 \
  -e DEBUG=true \
  evaluation.xml
```

### 2. Server-Sent Events (SSE)

For SSE-based MCP servers (you must start the server first):

```bash
python scripts/evaluation.py \
  -t sse \
  -u [https://example.com/mcp](https://e)xample.com/mcp)]([https://example.com/mcp))](https://e)xample.com/mcp)))]([https://example.com/mcp))))](https://e)xample.com/mcp)))))]([https://example.com/mcp))))))](https://e)xample.com/mcp)))))))](https://example.com/mcp) \
  -H "Authorization: Bearer token123" \
  -H "X-Custom-Header: value" \
  evaluation.xml
```

### 3. HTTP (Streamable HTTP)

For HTTP-based MCP servers (you must start the server first):

```bash
python scripts/evaluation.py \
  -t http \
  -u [https://example.com/mcp](https://e)xample.com/mcp)]([https://example.com/mcp))](https://e)xample.com/mcp)))]([https://example.com/mcp))))](https://e)xample.com/mcp)))))]([https://example.com/mcp))))))](https://e)xample.com/mcp)))))))](https://example.com/mcp) \
  -H "Authorization: Bearer token123" \
  evaluation.xml
```

## Command-Line Options

```text
usage: evaluation.py [-h] [-t {stdio,sse,http}] [-m MODEL] [-c COMMAND]
                     [-a ARGS [ARGS ...]] [-e ENV [ENV ...]] [-u URL]
                     [-H HEADERS [HEADERS ...]] [-o OUTPUT]
                     eval_file

positional arguments:
  eval_file             Path to evaluation XML file

optional arguments:
  -h, --help            Show help message
  -t, --transport       Transport type: stdio, sse, or http (default: stdio)
  -m, --model           Claude model to use (default: claude-3-7-sonnet-20250219)
  -o, --output          Output file for report (default: print to stdout)

stdio options:
  -c, --command         Command to run MCP server (e.g., python, node)
  -a, --args            Arguments for the command (e.g., server.py)
  -e, --env             Environment variables in KEY=VALUE format

sse/http options:
  -u, --url             MCP server URL
  -H, --header          HTTP headers in 'Key: Value' format
```

## Output

The evaluation script generates a detailed report including:

1. **Summary Statistics**:
1. Accuracy (correct/total)
1. Average task duration
1. Average tool calls per task
1. Total tool calls

1. **Per-Task Results**:
1. Prompt and expected response
1. Actual response from the agent
1. Whether the answer was correct (✅/❌)
1. Duration and tool call details
1. Agent's summary of its approach
1. Agent's feedback on the tools

### Save Report to File

```bash
python scripts/evaluation.py \
  -t stdio \
  -c python \
  -a my_server.py \
  -o evaluation_report.md \
  evaluation.xml
```

## Complete Example Workflow

Here's a complete example of creating and running an evaluation:

1. **Create your evaluation file** (`my_evaluation.xml`):

```xml
<evaluation>
   <qa_pair>
      <question>Find the user who created the most issues in January 2024. What is their username?</question>
      <answer>alice_developer</answer>
   </qa_pair>
   <qa_pair>
      <question>Among all pull requests merged in Q1 2024, which repository had the highest number? Provide the repository name.</question>
      <answer>backend-api</answer>
   </qa_pair>
   <qa_pair>
      <question>Find the project that was completed in December 2023 and had the longest duration from start to finish. How many days did it take?</question>
      <answer>127</answer>
   </qa_pair>
</evaluation>
```

1. **Install dependencies**:

```bash
pip install -r scripts/requirements.txt
export ANTHROPIC_API_KEY=your_api_key
```

1. **Run evaluation**:

```bash
python scripts/evaluation.py \
  -t stdio \
  -c python \
  -a github_mcp_server.py \
  -e GITHUB_TOKEN=ghp_xxx \
  -o github_eval_report.md \
  my_evaluation.xml
```

1. **Review the report** in `github_eval_report.md` to:
1. See which questions passed/failed
1. Read the agent's feedback on your tools
1. Identify areas for improvement
1. Iterate on your MCP server design

## Troubleshooting

### Connection Errors

If you get connection errors:

1. **STDIO**: Verify the command and arguments are correct
1. **SSE/HTTP**: Check the URL is accessible and headers are correct
1. Ensure any required API keys are set in environment variables or headers

### Low Accuracy

If many evaluations fail:

1. Review the agent's feedback for each task
1. Check if tool descriptions are clear and comprehensive
1. Verify input parameters are well-documented
1. Consider whether tools return too much or too little data
1. Ensure error messages are actionable

### Timeout Issues

If tasks are timing out:

1. Use a more capable model (e.g., `claude-3-7-sonnet-20250219`)
1. Check if tools are returning too much data
1. Verify pagination is working correctly
1. Consider simplifying complex questions
