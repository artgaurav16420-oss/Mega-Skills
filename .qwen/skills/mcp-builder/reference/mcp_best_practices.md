# MCP Server Development Best Practices and Guidelines

## Overview

This document compiles essential best practices and guidelines for building Model Context Protocol (MCP) servers. It covers naming conventions, tool design, response formats, pagination, error handling, security, and compliance requirements.

---

## Quick Reference

### Server Naming

1. **Python**: `{service}_mcp` (e.g., `slack_mcp`)
1. **Node/TypeScript**: `{service}-mcp-server` (e.g., `slack-mcp-server`)

### Tool Naming

1. Use snake_case with service prefix
1. Format: `{service}_{action}_{resource}`
1. Example: `slack_send_message`, `github_create_issue`

### Response Formats

1. Support both JSON and Markdown formats
1. JSON for programmatic processing
1. Markdown for human readability

### Pagination

1. Always respect `limit` parameter
1. Return `has_more`, `next_offset`, `total_count`
1. Default to 20-50 items

### Character Limits

1. Set CHARACTER_LIMIT constant (typically 25,000)
1. Truncate gracefully with clear messages
1. Provide guidance on filtering

---

## Table of Contents

1. Server Naming Conventions
1. Tool Naming and Design
1. Response Format Guidelines
1. Pagination Best Practices
1. Character Limits and Truncation
1. Tool Development Best Practices
1. Transport Best Practices
1. Testing Requirements
1. OAuth and Security Best Practices
1. Resource Management Best Practices
1. Prompt Management Best Practices
1. Error Handling Standards
1. Documentation Requirements
1. Compliance and Monitoring

---

## 1. Server Naming Conventions

Follow these standardized naming patterns for MCP servers:

**Python**: Use format `{service}_mcp` (lowercase with underscores)

1. Examples: `slack_mcp`, `github_mcp`, `jira_mcp`, `stripe_mcp`

**Node/TypeScript**: Use format `{service}-mcp-server` (lowercase with hyphens)

1. Examples: `slack-mcp-server`, `github-mcp-server`, `jira-mcp-server`

The name should be:

1. General (not tied to specific features)
1. Descriptive of the service/API being integrated
1. Easy to infer from the task description
1. Without version numbers or dates

---

## 2. Tool Naming and Design

### Tool Naming Best Practices

1. **Use snake_case**: `search_users`, `create_project`, `get_channel_info`
1. **Include service prefix**: Anticipate that your MCP server may be used alongside other MCP servers
1. Use `slack_send_message` instead of just `send_message`
1. Use `github_create_issue` instead of just `create_issue`
1. Use `asana_list_tasks` instead of just `list_tasks`
1. **Be action-oriented**: Start with verbs (get, list, search, create, etc.)
1. **Be specific**: Avoid generic names that could conflict with other servers
1. **Maintain consistency**: Use consistent naming patterns within your server

### Tool Design Guidelines

1. Tool descriptions must narrowly and unambiguously describe functionality
1. Descriptions must precisely match actual functionality
1. Should not create confusion with other MCP servers
1. Should provide tool annotations (readOnlyHint, destructiveHint, idempotentHint, openWorldHint)
1. Keep tool operations focused and atomic

---

## 3. Response Format Guidelines

All tools that return data should support multiple formats for flexibility:

### JSON Format (`response_format="json"`)

1. Machine-readable structured data
1. Include all available fields and metadata
1. Consistent field names and types
1. Suitable for programmatic processing
1. Use for when LLMs need to process data further

### Markdown Format (`response_format="markdown"`, typically default)

1. Human-readable formatted text
1. Use headers, lists, and formatting for clarity
1. Convert timestamps to human-readable format (e.g., "2024-01-15 10:30:00 UTC" instead of epoch)
1. Show display names with IDs in parentheses (e.g., "@john.doe (U123456)")
1. Omit verbose metadata (e.g., show only one profile image URL, not all sizes)
1. Group related information logically
1. Use for when presenting information to users

---

## 4. Pagination Best Practices

For tools that list resources:

1. **Always respect the `limit` parameter**: Never load all results when a limit is specified
1. **Implement pagination**: Use `offset` or cursor-based pagination
1. **Return pagination metadata**: Include `has_more`, `next_offset`/`next_cursor`, `total_count`
1. **Never load all results into memory**: Especially important for large datasets
1. **Default to reasonable limits**: 20-50 items is typical
1. **Include clear pagination info in responses**: Make it easy for LLMs to request more data

Example pagination response structure:

```json
{
  "total": 150,
  "count": 20,
  "offset": 0,
  "items": [...],
  "has_more": true,
  "next_offset": 20
}
```

---

## 5. Character Limits and Truncation

To prevent overwhelming responses with too much data:

1. **Define CHARACTER_LIMIT constant**: Typically 25,000 characters at module level
1. **Check response size before returning**: Measure the final response length
1. **Truncate gracefully with clear indicators**: Let the LLM know data was truncated
1. **Provide guidance on filtering**: Suggest how to use parameters to reduce results
1. **Include truncation metadata**: Show what was truncated and how to get more

Example truncation handling:

```python
CHARACTER_LIMIT = 25000

if len(result) > CHARACTER_LIMIT:
    truncated_data = data[:max(1, len(data) // 2)]
    response["truncated"] = True
    response["truncation_message"] = (
        f"Response truncated from {len(data)} to {len(truncated_data)} items. "
        f"Use 'offset' parameter or add filters to see more results."
    )
```

---

## 6. Transport Options

MCP servers support multiple transport mechanisms for different deployment scenarios:

### Stdio Transport

**Best for**: Command-line tools, local integrations, subprocess execution

**Characteristics**:

1. Standard input/output stream communication
1. Simple setup, no network configuration needed
1. Runs as a subprocess of the client
1. Ideal for desktop applications and CLI tools

**Use when**:

1. Building tools for local development environments
1. Integrating with desktop applications (e.g., Claude Desktop)
1. Creating command-line utilities
1. Single-user, single-session scenarios

### HTTP Transport

**Best for**: Web services, remote access, multi-client scenarios

**Characteristics**:

1. Request-response pattern over HTTP
1. Supports multiple simultaneous clients
1. Can be deployed as a web service
1. Requires network configuration and security considerations

**Use when**:

1. Serving multiple clients simultaneously
1. Deploying as a cloud service
1. Integration with web applications
1. Need for load balancing or scaling

### Server-Sent Events (SSE) Transport

**Best for**: Real-time updates, push notifications, streaming data

**Characteristics**:

1. One-way server-to-client streaming over HTTP
1. Enables real-time updates without polling
1. Long-lived connections for continuous data flow
1. Built on standard HTTP infrastructure

**Use when**:

1. Clients need real-time data updates
1. Implementing push notifications
1. Streaming logs or monitoring data
1. Progressive result delivery for long operations

### Transport Selection Criteria

| Criterion | Stdio | HTTP | SSE |
|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-----|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::----|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---|:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-----|
| **Deployment** | Local | Remote | Remote |
| **Clients** | Single | Multiple | Multiple |
| **Communication** | Bidirectional | Request-Response | Server-Push |
| **Complexity** | Low | Medium | Medium-High |
| **Real-time** | No | No | Yes |

---

## 7. Tool Development Best Practices

### General Guidelines

1. Tool names should be descriptive and action-oriented
1. Use parameter validation with detailed JSON schemas
1. Include examples in tool descriptions
1. Implement proper error handling and validation
1. Use progress reporting for long operations
1. Keep tool operations focused and atomic
1. Document expected return value structures
1. Implement proper timeouts
1. Consider rate limiting for resource-intensive operations
1. Log tool usage for debugging and monitoring

### Security Considerations for Tools

#### Input Validation

1. Validate all parameters against schema
1. Sanitize file paths and system commands
1. Validate URLs and external identifiers
1. Check parameter sizes and ranges
1. Prevent command injection

#### Access Control

1. Implement authentication where needed
1. Use appropriate authorization checks
1. Audit tool usage
1. Rate limit requests
1. Monitor for abuse

#### Error Handling

1. Don't expose internal errors to clients
1. Log security-relevant errors
1. Handle timeouts appropriately
1. Clean up resources after errors
1. Validate return values

### Tool Annotations

1. Provide readOnlyHint and destructiveHint annotations
1. Remember annotations are hints, not security guarantees
1. Clients should not make security-critical decisions based solely on annotations

---

## 8. Transport Best Practices

### General Transport Guidelines

1. Handle connection lifecycle properly
1. Implement proper error handling
1. Use appropriate timeout values
1. Implement connection state management
1. Clean up resources on disconnection

### Security Best Practices for Transport

1. Follow security considerations for DNS rebinding attacks
1. Implement proper authentication mechanisms
1. Validate message formats
1. Handle malformed messages gracefully

### Stdio Transport Specific

1. Local MCP servers should NOT log to stdout (interferes with protocol)
1. Use stderr for logging messages
1. Handle standard I/O streams properly

---

## 9. Testing Requirements

A comprehensive testing strategy should cover:

### Functional Testing

1. Verify correct execution with valid/invalid inputs

### Integration Testing

1. Test interaction with external systems

### Security Testing

1. Validate auth, input sanitization, rate limiting

### Performance Testing

1. Check behavior under load, timeouts

### Error Handling (2)

1. Ensure proper error reporting and cleanup

---

## 10. OAuth and Security Best Practices

### Authentication and Authorization

MCP servers that connect to external services should implement proper authentication:

#### OAuth 2.1 Implementation

1. Use secure OAuth 2.1 with certificates from recognized authorities
1. Validate access tokens before processing requests
1. Only accept tokens specifically intended for your server
1. Reject tokens without proper audience claims
1. Never pass through tokens received from MCP clients

#### API Key Management

1. Store API keys in environment variables, never in code
1. Validate keys on server startup
1. Provide clear error messages when authentication fails
1. Use secure transmission for sensitive credentials

### Input Validation and Security

#### Always validate inputs

1. Sanitize file paths to prevent directory traversal
1. Validate URLs and external identifiers
1. Check parameter sizes and ranges
1. Prevent command injection in system calls
1. Use schema validation (Pydantic/Zod) for all inputs

#### Error handling security

1. Don't expose internal errors to clients
1. Log security-relevant errors server-side
1. Provide helpful but not revealing error messages
1. Clean up resources after errors

### Privacy and Data Protection

#### Data collection principles

1. Only collect data strictly necessary for functionality
1. Don't collect extraneous conversation data
1. Don't collect PII unless explicitly required for the tool's purpose
1. Provide clear information about what data is accessed

#### Data transmission

1. Don't send data to servers outside your organization without disclosure
1. Use secure transmission (HTTPS) for all network communication
1. Validate certificates for external services

---

## 11. Resource Management Best Practices

1. Only suggest necessary resources
1. Use clear, descriptive names for roots
1. Handle resource boundaries properly
1. Respect client control over resources
1. Use model-controlled primitives (tools) for automatic data exposure

---

## 12. Prompt Management Best Practices

1. Clients should show users proposed prompts
1. Users should be able to modify or reject prompts
1. Clients should show users completions
1. Users should be able to modify or reject completions
1. Consider costs when using sampling

---

## 13. Error Handling Standards

1. Use standard JSON-RPC error codes
1. Report tool errors within result objects (not protocol-level)
1. Provide helpful, specific error messages
1. Don't expose internal implementation details
1. Clean up resources properly on errors

---

## 14. Documentation Requirements

1. Provide clear documentation of all tools and capabilities
1. Include working examples (at least 3 per major feature)
1. Document security considerations
1. Specify required permissions and access levels
1. Document rate limits and performance characteristics

---

## 15. Compliance and Monitoring

1. Implement logging for debugging and monitoring
1. Track tool usage patterns
1. Monitor for potential abuse
1. Maintain audit trails for security-relevant operations
1. Be prepared for ongoing compliance reviews

---

## Summary

These best practices represent the comprehensive guidelines for building secure, efficient, and compliant MCP servers that work well within the ecosystem. Developers should follow these guidelines to ensure their MCP servers meet the standards for inclusion in the MCP directory and provide a safe, reliable experience for users.

----------

## Tools

> Enable LLMs to perform actions through your server

Tools are a powerful primitive in the Model Context Protocol (MCP) that enable servers to expose executable functionality to clients. Through tools, LLMs can interact with external systems, perform computations, and take actions in the real world.

`<Note>`
  Tools are designed to be **model-controlled**, meaning that tools are exposed from servers to clients with the intention of the AI model being able to automatically invoke them (with a human in the loop to grant approval).
</Note>

## Overview (2)

Tools in MCP allow servers to expose executable functions that can be invoked by clients and used by LLMs to perform actions. Key aspects of tools include:

1. **Discovery**: Clients can obtain a list of available tools by sending a `tools/list` request
1. **Invocation**: Tools are called using the `tools/call` request, where servers perform the requested operation and return results
1. **Flexibility**: Tools can range from simple calculations to complex API interactions

Like [resources](/docs/concepts/resources), tools are identified by unique names and can include descriptions to guide their usage. However, unlike resources, tools represent dynamic operations that can modify state or interact with external systems.

## Tool definition structure

Each tool is defined with the following structure:

```typescript
{
  name: string;          // Unique identifier for the tool
  description?: string;  // Human-readable description
  inputSchema: {         // JSON Schema for the tool's parameters
    type: "object",
    properties: { ... }  // Tool-specific parameters
  },
  annotations?: {        // Optional hints about tool behavior
    title?: string;      // Human-readable title for the tool
    readOnlyHint?: boolean;    // If true, the tool does not modify its environment
    destructiveHint?: boolean; // If true, the tool may perform destructive updates
    idempotentHint?: boolean;  // If true, repeated calls with same args have no additional effect
    openWorldHint?: boolean;   // If true, tool interacts with external entities
  }
}
```

## Implementing tools

Here's an example of implementing a basic tool in an MCP server:

`<Tabs>`
  <Tab title="TypeScript">

```typescript
    const server = new Server({
      name: "example-server",
      version: "1.0.0"
    }, {
      capabilities: {
        tools: {}
      }
    });

    // Define available tools
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [{
          name: "calculate_sum",
          description: "Add two numbers together",
          inputSchema: {
            type: "object",
            properties: {
              a: { type: "number" },
              b: { type: "number" }
            },
            required: ["a", "b"]
          }
        }]
      };
    });

    // Handle tool execution
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === "calculate_sum") {
        const { a, b } = request.params.arguments;
        return {
          content: [
            {
              type: "text",
              text: String(a + b)
            }
          ]
        };
      }
      throw new Error("Tool not found");
    });
```

  </Tab>

  <Tab title="Python">

```python
    app = Server("example-server")

    @app.list_tools()
    async def list_tools() -> list[types.Tool]:
        return [
            types.Tool(
                name="calculate_sum",
                description="Add two numbers together",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "a": {"type": "number"},
                        "b": {"type": "number"}
                    },
                    "required": ["a", "b"]
                }
            )
        ]

    @app.call_tool()
    async def call_tool(
        name: str,
        arguments: dict
    ) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
        if name == "calculate_sum":
            a = arguments["a"]
            b = arguments["b"]
            result = a + b
            return [types.TextContent(type="text", text=str(result))]
        raise ValueError(f"Tool not found: {name}")
```

  </Tab>
</Tabs>

## Example tool patterns

Here are some examples of types of tools that a server could provide:

### System operations

Tools that interact with the local system:

```typescript
{
  name: "execute_command",
  description: "Run a shell command",
  inputSchema: {
    type: "object",
    properties: {
      command: { type: "string" },
      args: { type: "array", items: { type: "string" } }
    }
  }
}
```

### API integrations

Tools that wrap external APIs:

```typescript
{
  name: "github_create_issue",
  description: "Create a GitHub issue",
  inputSchema: {
    type: "object",
    properties: {
      title: { type: "string" },
      body: { type: "string" },
      labels: { type: "array", items: { type: "string" } }
    }
  }
}
```

### Data processing

Tools that transform or analyze data:

```typescript
{
  name: "analyze_csv",
  description: "Analyze a CSV file",
  inputSchema: {
    type: "object",
    properties: {
      filepath: { type: "string" },
      operations: {
        type: "array",
        items: {
          enum: ["sum", "average", "count"]
        }
      }
    }
  }
}
```

## Best practices

When implementing tools:

1. Provide clear, descriptive names and descriptions
1. Use detailed JSON Schema definitions for parameters
1. Include examples in tool descriptions to demonstrate how the model should use them
1. Implement proper error handling and validation
1. Use progress reporting for long operations
1. Keep tool operations focused and atomic
1. Document expected return value structures
1. Implement proper timeouts
1. Consider rate limiting for resource-intensive operations
1. Log tool usage for debugging and monitoring

### Tool name conflicts

MCP client applications and MCP server proxies may encounter tool name conflicts when building their own tool lists. For example, two connected MCP servers `web1` and `web2` may both expose a tool named `search_web`.

Applications may disambiguiate tools with one of the following strategies (among others; not an exhaustive list):

1. Concatenating a unique, user-defined server name with the tool name, e.g. `web1___search_web` and `web2___search_web`. This strategy may be preferable when unique server names are already provided by the user in a configuration file.
1. Generating a random prefix for the tool name, e.g. `jrwxs___search_web` and `6cq52___search_web`. This strategy may be preferable in server proxies where user-defined unique names are not available.
1. Using the server URI as a prefix for the tool name, e.g. `web1.example.com:search_web` and `web2.example.com:search_web`. This strategy may be suitable when working with remote MCP servers.

Note that the server-provided name from the initialization flow is not guaranteed to be unique and is not generally suitable for disambiguation purposes.

## Security considerations

When exposing tools:

### Input validation

1. Validate all parameters against the schema
1. Sanitize file paths and system commands
1. Validate URLs and external identifiers
1. Check parameter sizes and ranges
1. Prevent command injection

### Access control

1. Implement authentication where needed
1. Use appropriate authorization checks
1. Audit tool usage
1. Rate limit requests
1. Monitor for abuse

### Error handling

1. Don't expose internal errors to clients
1. Log security-relevant errors
1. Handle timeouts appropriately
1. Clean up resources after errors
1. Validate return values

## Tool discovery and updates

MCP supports dynamic tool discovery:

1. Clients can list available tools at any time
1. Servers can notify clients when tools change using `notifications/tools/list_changed`
1. Tools can be added or removed during runtime
1. Tool definitions can be updated (though this should be done carefully)

## Error handling (2)

Tool errors should be reported within the result object, not as MCP protocol-level errors. This allows the LLM to see and potentially handle the error. When a tool encounters an error:

1. Set `isError` to `true` in the result
1. Include error details in the `content` array

Here's an example of proper error handling for tools:

`<Tabs>`
  <Tab title="TypeScript">

```typescript
    try {
      // Tool operation
      const result = performOperation();
      return {
        content: [
          {
            type: "text",
            text: `Operation successful: ${result}`
          }
        ]
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error: ${error.message}`
          }
        ]
      };
    }
```

  </Tab>

  <Tab title="Python">

```python
    try:
## Tool operation
        result = perform_operation()
        return types.CallToolResult(
            content=[
                types.TextContent(
                    type="text",
                    text=f"Operation successful: {result}"
                )
            ]
        )
    except Exception as error:
        return types.CallToolResult(
            isError=True,
            content=[
                types.TextContent(
                    type="text",
                    text=f"Error: {str(error)}"
                )
            ]
        )
```

  </Tab>
</Tabs>

This approach allows the LLM to see that an error occurred and potentially take corrective action or request human intervention.

## Tool annotations

Tool annotations provide additional metadata about a tool's behavior, helping clients understand how to present and manage tools. These annotations are hints that describe the nature and impact of a tool, but should not be relied upon for security decisions.

### Purpose of tool annotations

Tool annotations serve several key purposes:

1. Provide UX-specific information without affecting model context
1. Help clients categorize and present tools appropriately
1. Convey information about a tool's potential side effects
1. Assist in developing intuitive interfaces for tool approval

### Available tool annotations

The MCP specification defines the following annotations for tools:

| Annotation        | Type    | Default | Description                                                                                                                          |
| :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::----- | :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---- | :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---- | :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::--- |
| `title`           | string  | -       | A human-readable title for the tool, useful for UI display                                                                           |
| `readOnlyHint`    | boolean | false   | If true, indicates the tool does not modify its environment                                                                          |
| `destructiveHint` | boolean | true    | If true, the tool may perform destructive updates (only meaningful when `readOnlyHint` is false)                                     |
| `idempotentHint`  | boolean | false   | If true, calling the tool repeatedly with the same arguments has no additional effect (only meaningful when `readOnlyHint` is false) |
| `openWorldHint`   | boolean | true    | If true, the tool may interact with an "open world" of external entities                                                             |

### Example usage

Here's how to define tools with annotations for different scenarios:

```typescript
// A read-only search tool
{
  name: "web_search",
  description: "Search the web for information",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string" }
    },
    required: ["query"]
  },
  annotations: {
    title: "Web Search",
    readOnlyHint: true,
    openWorldHint: true
  }
}

// A destructive file deletion tool
{
  name: "delete_file",
  description: "Delete a file from the filesystem",
  inputSchema: {
    type: "object",
    properties: {
      path: { type: "string" }
    },
    required: ["path"]
  },
  annotations: {
    title: "Delete File",
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: false
  }
}

// A non-destructive database record creation tool
{
  name: "create_record",
  description: "Create a new record in the database",
  inputSchema: {
    type: "object",
    properties: {
      table: { type: "string" },
      data: { type: "object" }
    },
    required: ["table", "data"]
  },
  annotations: {
    title: "Create Database Record",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: false
  }
}
```

### Integrating annotations in server implementation

`<Tabs>`
  <Tab title="TypeScript">

```typescript
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [{
          name: "calculate_sum",
          description: "Add two numbers together",
          inputSchema: {
            type: "object",
            properties: {
              a: { type: "number" },
              b: { type: "number" }
            },
            required: ["a", "b"]
          },
          annotations: {
            title: "Calculate Sum",
            readOnlyHint: true,
            openWorldHint: false
          }
        }]
      };
    });
```

  </Tab>

  <Tab title="Python">

```python
    from mcp.server.fastmcp import FastMCP

    mcp = FastMCP("example-server")

    @mcp.tool(
        annotations={
            "title": "Calculate Sum",
            "readOnlyHint": True,
            "openWorldHint": False
        }
    )
    async def calculate_sum(a: float, b: float) -> str:
        """Add two numbers together.

        Args:
            a: First number to add
            b: Second number to add
        """
        result = a + b
        return str(result)
```

  </Tab>
</Tabs>

### Best practices for tool annotations

1. **Be accurate about side effects**: Clearly indicate whether a tool modifies its environment and whether those modifications are destructive.

1. **Use descriptive titles**: Provide human-friendly titles that clearly describe the tool's purpose.

1. **Indicate idempotency properly**: Mark tools as idempotent only if repeated calls with the same arguments truly have no additional effect.

1. **Set appropriate open/closed world hints**: Indicate whether a tool interacts with a closed system (like a database) or an open system (like the web).

1. **Remember annotations are hints**: All properties in ToolAnnotations are hints and not guaranteed to provide a faithful description of tool behavior. Clients should never make security-critical decisions based solely on annotations.

## Testing tools

A comprehensive testing strategy for MCP tool