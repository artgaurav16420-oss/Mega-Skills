# brainstorm-server-html

## Overview

Community of 32 nodes

- **Size**: 32 nodes
- **Cohesion**: 0.2008
- **Dominant Language**: javascript

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| cleanup | Function | tests\brainstorm-server\server.test.js | 24-28 |
| sleep | Function | tests\brainstorm-server\server.test.js | 30-32 |
| resolve | Function | tests\brainstorm-server\server.test.js | 339-339 |
| fetch | Function | tests\brainstorm-server\server.test.js | 34-46 |
| startServer | Function | tests\brainstorm-server\server.test.js | 48-52 |
| waitForServer | Function | tests\brainstorm-server\server.test.js | 54-70 |
| runTests | Function | tests\brainstorm-server\server.test.js | 72-422 |
| test:outputs server-started JSON on startup@L98 | Test | tests\brainstorm-server\server.test.js | 98-105 |
| test:writes server-info to state/@L107 | Test | tests\brainstorm-server\server.test.js | 107-116 |
| test:serves waiting page when no screens exist@L121 | Test | tests\brainstorm-server\server.test.js | 121-125 |
| test:injects helper.js into waiting page@L127 | Test | tests\brainstorm-server\server.test.js | 127-132 |
| test:returns Content-Type text/html@L134 | Test | tests\brainstorm-server\server.test.js | 134-137 |
| test:serves full HTML documents as-is (not wrapped)@L139 | Test | tests\brainstorm-server\server.test.js | 139-148 |
| test:wraps content fragments in frame template@L150 | Test | tests\brainstorm-server\server.test.js | 150-160 |
| test:serves newest file by mtime@L162 | Test | tests\brainstorm-server\server.test.js | 162-170 |
| test:ignores non-html files for serving@L172 | Test | tests\brainstorm-server\server.test.js | 172-180 |
| test:returns 404 for non-root paths@L182 | Test | tests\brainstorm-server\server.test.js | 182-185 |
| test:accepts WebSocket upgrade on /@L190 | Test | tests\brainstorm-server\server.test.js | 190-197 |
| test:relays user events to stdout with source field@L199 | Test | tests\brainstorm-server\server.test.js | 199-210 |
| test:writes choice events to state/events@L212 | Test | tests\brainstorm-server\server.test.js | 212-229 |
| test:does NOT write non-choice events to state/events@L231 | Test | tests\brainstorm-server\server.test.js | 231-244 |
| test:handles multiple concurrent WebSocket clients@L246 | Test | tests\brainstorm-server\server.test.js | 246-270 |
| test:cleans up closed clients from broadcast list@L272 | Test | tests\brainstorm-server\server.test.js | 272-282 |
| test:handles malformed JSON from client gracefully@L284 | Test | tests\brainstorm-server\server.test.js | 284-296 |
| test:sends reload on new .html file@L301 | Test | tests\brainstorm-server\server.test.js | 301-315 |
| test:sends reload on .html file change@L317 | Test | tests\brainstorm-server\server.test.js | 317-335 |
| test:does NOT send reload for non-.html files@L337 | Test | tests\brainstorm-server\server.test.js | 337-351 |
| test:clears state/events on new screen@L353 | Test | tests\brainstorm-server\server.test.js | 353-363 |
| test:logs screen-added on new file@L365 | Test | tests\brainstorm-server\server.test.js | 365-371 |
| test:logs screen-updated on file change@L373 | Test | tests\brainstorm-server\server.test.js | 373-383 |
| test:helper.js defines required APIs@L388 | Test | tests\brainstorm-server\server.test.js | 388-397 |
| test:frame template has required structure@L402 | Test | tests\brainstorm-server\server.test.js | 402-411 |

## Execution Flows

No execution flows pass through this community.

## Dependencies

### Outgoing

- `assert` (39 edge(s))
- `includes` (28 edge(s))
- `on` (24 edge(s))
- `join` (19 edge(s))
- `writeFileSync` (16 edge(s))
- `close` (11 edge(s))
- `strictEqual` (11 edge(s))
- `existsSync` (8 edge(s))
- `toString` (8 edge(s))
- `parse` (8 edge(s))
- `log` (7 edge(s))
- `send` (4 edge(s))
- `readFileSync` (4 edge(s))
- `stringify` (3 edge(s))
- `trim` (3 edge(s))

### Incoming

- `assert` (39 edge(s))
- `includes` (27 edge(s))
- `join` (19 edge(s))
- `tests\brainstorm-server\server.test.js` (17 edge(s))
- `writeFileSync` (16 edge(s))
- `close` (11 edge(s))
- `strictEqual` (11 edge(s))
- `parse` (8 edge(s))
- `on` (7 edge(s))
- `existsSync` (7 edge(s))
- `toString` (5 edge(s))
- `send` (4 edge(s))
- `readFileSync` (4 edge(s))
- `stringify` (3 edge(s))
- `trim` (3 edge(s))
