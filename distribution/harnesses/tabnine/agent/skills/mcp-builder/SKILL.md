---
name: mcp-builder
description: Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).
license: Complete terms in LICENSE.txt
---

# MCP Server Development Guide

## Overview

To create high-quality MCP (Model Context Protocol) servers that enable LLMs to effectively interact with external services, use this skill. An MCP server provides tools that allow LLMs to access external services and APIs. The quality of an MCP server is measured by how well it enables LLMs to accomplish real-world tasks using the tools provided.

---

## Process

## 🚀 High-Level Workflow

Creating a high-quality MCP server involves four main phases:

### Phase 1: Deep Research and Planning

#### 1.1 Understand Agent-Centric Design Principles

Before diving into implementation, understand how to design tools for AI agents by reviewing these principles:

#### Build for Workflows, Not Just API Endpoints

1. Don't simply wrap existing API endpoints - build thoughtful, high-impact workflow tools

1. Consolidate related operations (e.g., `schedule_event` that both checks availability and creates event)

1. Focus on tools that enable complete tasks, not just individual API calls

1. Consider what workflows agents actually need to accomplish

#### Optimize for Limited Context

1. Agents have constrained context windows - make every token count

1. Return high-signal information, not exhaustive data dumps

1. Provide "concise" vs "detailed" response format options

1. Default to human-readable identifiers over technical codes (names over IDs)

1. Consider the agent's context budget as a scarce resource

#### Design Actionable Error Messages

1. Error messages should guide agents toward correct usage patterns

1. Suggest specific next steps: "Try using filter='active_only' to reduce results"

1. Make errors educational, not just diagnostic

1. Help agents learn proper tool usage through clear feedback

#### Follow Natural Task Subdivisions

1. Tool names should reflect how humans think about tasks

1. Group related tools with consistent prefixes for discoverability

1. Design tools around natural workflows, not just API structure

#### Use Evaluation-Driven Development

1. Create realistic evaluation scenarios early

1. Let agent feedback drive tool improvements

1. Prototype quickly and iterate based on actual agent performance

#### 1.3 Study MCP Protocol Documentation

#### Fetch the latest MCP protocol documentation

Use WebFetch to load: `https://modelcontextprotocol.io/llms-full.txt`

This comprehensive document contains the complete MCP specification and guidelines.

#### 1.4 Study Framework Documentation

#### Load and read the following reference files

1. **MCP Best Practices**: [📋 View Best Practices](./reference/mcp_best_practices.md) - Core guidelines for all MCP servers

#### For Python implementations, also load

1. **Python SDK Documentation**: Use WebFetch to load `https://raw.githubusercontent.com/modelcontextprotocol/python-sdk/main/README.md`

1. [🐍 Python Implementation Guide](./reference/python_mcp_server.md) - Python-specific best practices and examples

#### For Node/TypeScript implementations, also load

1. **TypeScript SDK Documentation**: Use WebFetch to load `https://raw.githubusercontent.com/modelcontextprotocol/typescript-sdk/main/README.md`

1. [⚡ TypeScript Implementation Guide](./reference/node_mcp_server.md) - Node/TypeScript-specific best practices and examples

#### 1.5 Exhaustively Study API Documentation

To integrate a service, read through **ALL** available API documentation:

1. Official API reference documentation

1. Authentication and authorization requirements

1. Rate limiting and pagination patterns

1. Error responses and status codes

1. Available endpoints and their parameters

1. Data models and schemas

#### To gather comprehensive information, use web search and the WebFetch tool as needed

#### 1.6 Create a Comprehensive Implementation Plan

Based on your research, create a detailed plan that includes:

#### Tool Selection

1. List the most valuable endpoints/operations to implement

1. Prioritize tools that enable the most common and important use cases

1. Consider which tools work together to enable complex workflows

#### Shared Utilities and Helpers

1. Identify common API request patterns

1. Plan pagination helpers

1. Design filtering and formatting utilities

1. Plan error handling strategies

#### Input/Output Design

1. Define input validation models (Pydantic for Python, Zod for TypeScript)

1. Design consistent response formats (e.g., JSON or Markdown), and configurable levels of detail (e.g., Detailed or Concise)

1. Plan for large-scale usage (thousands of users/resources)

1. Implement character limits and truncation strategies (e.g., 25,000 tokens)

#### Error Handling Strategy

1. Plan graceful failure modes

1. Design clear, actionable, LLM-friendly, natural language error messages which prompt further action

1. Consider rate limiting and timeout scenarios

1. Handle authentication and authorization errors

---

### Phase 2: Implementation

Now that you have a comprehensive plan, begin implementation following language-specific best practices.

#### 2.1 Set Up Project Structure

#### For Python

1. Create a single `.py` file or organize into modules if complex (see [🐍 Python Guide](./reference/python_mcp_server.md))

1. Use the MCP Python SDK for tool registration

1. Define Pydantic models for input validation

#### For Node/TypeScript

1. Create proper project structure (see [⚡ TypeScript Guide](./reference/node_mcp_server.md))

1. Set up `package.json` and `tsconfig.json`

1. Use MCP TypeScript SDK

1. Define Zod schemas for input validation

#### 2.2 Implement Core Infrastructure First

#### To begin implementation, create shared utilities before implementing tools

1. API request helper functions

1. Error handling utilities

1. Response formatting functions (JSON and Markdown)

1. Pagination helpers

1. Authentication/token management

#### 2.3 Implement Tools Systematically

For each tool in the plan:

#### Define Input Schema

1. Use Pydantic (Python) or Zod (TypeScript) for validation

1. Include proper constraints (min/max length, regex patterns, min/max values, ranges)

1. Provide clear, descriptive field descriptions

1. Include diverse examples in field descriptions

#### Write Comprehensive Docstrings/Descriptions

1. One-line summary of what the tool does

1. Detailed explanation of purpose and functionality

1. Explicit parameter types with examples

1. Complete return type schema

1. Usage examples (when to use, when not to use)

1. Error handling documentation, which outlines how to proceed given specific errors

#### Implement Tool Logic

1. Use shared utilities to avoid code duplication

1. Follow async/await patterns for all I/O

1. Implement proper error handling

1. Support multiple response formats (JSON and Markdown)

1. Respect pagination parameters

1. Check character limits and truncate appropriately

#### Add Tool Annotations

1. `readOnlyHint`: true (for read-only operations)

1. `destructiveHint`: false (for non-destructive operations)

1. `idempotentHint`: true (if repeated calls have same effect)

1. `openWorldHint`: true (if interacting with external systems)

#### 2.4 Follow Language-Specific Best Practices

#### At this point, load the appropriate language guide

#### For Python: Load [🐍 Python Implementation Guide](./reference/python_mcp_server.md) and ensure the following

1. Using MCP Python SDK with proper tool registration

1. Pydantic v2 models with `model_config`

1. Type hints throughout

1. Async/await for all I/O operations

1. Proper imports organization

1. Module-level constants (CHARACTER_LIMIT, API_BASE_URL)

#### For Node/TypeScript: Load [⚡ TypeScript Implementation Guide](./reference/node_mcp_server.md) and ensure the following

1. Using `server.registerTool` properly

1. Zod schemas with `.strict()`

1. TypeScript strict mode enabled

1. No `any` types - use proper types

1. Explicit Promise`<T>` return types

1. Build process configured (`npm run build`)

---

### Phase 3: Review and Refine

After initial implementation:

#### 3.1 Code Quality Review

To ensure quality, review the code for:

1. **DRY Principle**: No duplicated code between tools

1. **Composability**: Shared logic extracted into functions

1. **Consistency**: Similar operations return similar formats

1. **Error Handling**: All external calls have error handling

1. **Type Safety**: Full type coverage (Python type hints, TypeScript types)

1. **Documentation**: Every tool has comprehensive docstrings/descriptions

#### 3.2 Test and Build

**Important:** MCP servers are long-running processes that wait for requests over stdio/stdin or sse/http. Running them directly in your main process (e.g., `python server.py` or `node dist/index.js`) will cause your process to hang indefinitely.

#### Safe ways to test the server

1. Use the evaluation harness (see Phase 4) - recommended approach

1. Run the server in tmux to keep it outside your main process

1. Use a timeout when testing: `timeout 5s python server.py`

#### For Python (2)

1. Verify Python syntax: `python -m py_compile your_server.py`

1. Check imports work correctly by reviewing the file

1. To manually test: Run server in tmux, then test with evaluation harness in main process

1. Or use the evaluation harness directly (it manages the server for stdio transport)

#### For Node/TypeScript (2)

1. Run `npm run build` and ensure it completes without errors

1. Verify dist/index.js is created

1. To manually test: Run server in tmux, then test with evaluation harness in main process

1. Or use the evaluation harness directly (it manages the server for stdio transport)

#### 3.3 Use Quality Checklist

To verify implementation quality, load the appropriate checklist from the language-specific guide:

1. Python: see "Quality Checklist" in [🐍 Python Guide](./reference/python_mcp_server.md)

1. Node/TypeScript: see "Quality Checklist" in [⚡ TypeScript Guide](./reference/node_mcp_server.md)

---

### Phase 4: Create Evaluations

After implementing your MCP server, create comprehensive evaluations to test its effectiveness.

#### Load [✅ Evaluation Guide](./reference/evaluation.md) for complete evaluation guidelines

#### 4.1 Understand Evaluation Purpose

Evaluations test whether LLMs can effectively use your MCP server to answer realistic, complex questions.

#### 4.2 Create 10 Evaluation Questions

To create effective evaluations, follow the process outlined in the evaluation guide:

1. **Tool Inspection**: List available tools and understand their capabilities

1. **Content Exploration**: Use READ-ONLY operations to explore available data

1. **Question Generation**: Create 10 complex, realistic questions

1. **Answer Verification**: Solve each question yourself to verify answers

#### 4.3 Evaluation Requirements

Each question must be:

1. **Independent**: Not dependent on other questions

1. **Read-only**: Only non-destructive operations required

1. **Complex**: Requiring multiple tool calls and deep exploration

1. **Realistic**: Based on real use cases humans would care about

1. **Verifiable**: Single, clear answer that can be verified by string comparison

1. **Stable**: Answer won't change over time

#### 4.4 Output Format

Create an XML file with this structure:

```xml
<evaluation>
  <qa_pair>
    <question>Find discussions about AI model launches with animal codenames. One model needed a specific safety designation that uses the format ASL-X. What number X was being determined for the model named after a spotted wild cat?</question>
    <answer>3</answer>
  </qa_pair>
<!-- More qa_pairs... -->
</evaluation>
```

---

## Reference Files

## 📚 Documentation Library

Load these resources as needed during development:

### Core MCP Documentation (Load First)

1. **MCP Protocol**: Fetch from `https://modelcontextprotocol.io/llms-full.txt` - Complete MCP specification

1. [📋 MCP Best Practices](./reference/mcp_best_practices.md) - Universal MCP guidelines including:
1. Server and tool naming conventions
1. Response format guidelines (JSON vs Markdown)
1. Pagination best practices
1. Character limits and truncation strategies
1. Tool development guidelines
1. Security and error handling standards

### SDK Documentation (Load During Phase 1/2)

1. **Python SDK**: Fetch from `https://raw.githubusercontent.com/modelcontextprotocol/python-sdk/main/README.md`

1. **TypeScript SDK**: Fetch from `https://raw.githubusercontent.com/modelcontextprotocol/typescript-sdk/main/README.md`

### Language-Specific Implementation Guides (Load During Phase 2)

1. [🐍 Python Implementation Guide](./reference/python_mcp_server.md) - Complete Python/FastMCP guide with:
1. Server initialization patterns
1. Pydantic model examples
1. Tool registration with `@mcp.tool`

1. Complete working examples
1. Quality checklist

1. [⚡ TypeScript Implementation Guide](./reference/node_mcp_server.md) - Complete TypeScript guide with:
1. Project structure
1. Zod schema patterns
1. Tool registration with `server.registerTool`

1. Complete working examples
1. Quality checklist

### Evaluation Guide (Load During Phase 4)

1. [✅ Evaluation Guide](./reference/evaluation.md) - Complete evaluation creation guide with:
1. Question creation guidelines
1. Answer verification strategies
1. XML format specifications
1. Example questions and answers
1. Running an evaluation with the provided scripts
