# brainstorm-server-frame

## Overview

Community of 33 nodes

- **Size**: 33 nodes
- **Cohesion**: 0.1372
- **Dominant Language**: javascript

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| runTests | Function | tests\brainstorm-server\ws-protocol.test.js | 31-390 |
| test:computeAcceptKey produces correct RFC 6455 accept value@L50 | Test | tests\brainstorm-server\ws-protocol.test.js | 50-56 |
| test:computeAcceptKey produces valid base64 for random keys@L58 | Test | tests\brainstorm-server\ws-protocol.test.js | 58-67 |
| test:encodes small text frame (< 126 bytes)@L72 | Test | tests\brainstorm-server\ws-protocol.test.js | 72-80 |
| test:encodes empty text frame@L82 | Test | tests\brainstorm-server\ws-protocol.test.js | 82-87 |
| test:encodes medium text frame (126-65535 bytes)@L89 | Test | tests\brainstorm-server\ws-protocol.test.js | 89-97 |
| test:encodes frame at exactly 126 bytes (boundary)@L99 | Test | tests\brainstorm-server\ws-protocol.test.js | 99-105 |
| test:encodes frame at exactly 125 bytes (max small)@L107 | Test | tests\brainstorm-server\ws-protocol.test.js | 107-112 |
| test:encodes large frame (> 65535 bytes)@L114 | Test | tests\brainstorm-server\ws-protocol.test.js | 114-123 |
| test:encodes close frame@L125 | Test | tests\brainstorm-server\ws-protocol.test.js | 125-129 |
| test:encodes pong frame with payload@L131 | Test | tests\brainstorm-server\ws-protocol.test.js | 131-137 |
| test:server frames are never masked (per RFC 6455)@L139 | Test | tests\brainstorm-server\ws-protocol.test.js | 139-143 |
| makeClientFrame | Function | tests\brainstorm-server\ws-protocol.test.js | 149-179 |
| test:decodes small masked text frame@L181 | Test | tests\brainstorm-server\ws-protocol.test.js | 181-188 |
| test:decodes empty masked text frame@L190 | Test | tests\brainstorm-server\ws-protocol.test.js | 190-196 |
| test:decodes medium masked text frame (126-65535 bytes)@L198 | Test | tests\brainstorm-server\ws-protocol.test.js | 198-204 |
| test:decodes large masked text frame (> 65535 bytes)@L206 | Test | tests\brainstorm-server\ws-protocol.test.js | 206-213 |
| test:decodes masked close frame@L215 | Test | tests\brainstorm-server\ws-protocol.test.js | 215-220 |
| test:decodes masked ping frame@L222 | Test | tests\brainstorm-server\ws-protocol.test.js | 222-228 |
| test:returns null for incomplete frame (not enough header bytes)@L230 | Test | tests\brainstorm-server\ws-protocol.test.js | 230-233 |
| test:returns null for incomplete frame (header ok, payload truncated)@L235 | Test | tests\brainstorm-server\ws-protocol.test.js | 235-241 |
| test:returns null for incomplete extended-length header@L243 | Test | tests\brainstorm-server\ws-protocol.test.js | 243-251 |
| test:rejects unmasked client frame@L253 | Test | tests\brainstorm-server\ws-protocol.test.js | 253-260 |
| test:handles multiple frames in a single buffer@L262 | Test | tests\brainstorm-server\ws-protocol.test.js | 262-275 |
| test:correctly unmasks with all mask byte values@L277 | Test | tests\brainstorm-server\ws-protocol.test.js | 277-295 |
| test:encodes frame at exactly 65535 bytes (max 16-bit)@L300 | Test | tests\brainstorm-server\ws-protocol.test.js | 300-306 |
| test:encodes frame at exactly 65536 bytes (min 64-bit)@L308 | Test | tests\brainstorm-server\ws-protocol.test.js | 308-314 |
| test:decodes frame at 65535 bytes boundary@L316 | Test | tests\brainstorm-server\ws-protocol.test.js | 316-322 |
| test:decodes frame at 65536 bytes boundary@L324 | Test | tests\brainstorm-server\ws-protocol.test.js | 324-330 |
| test:decodes close frame with status code@L335 | Test | tests\brainstorm-server\ws-protocol.test.js | 335-343 |
| test:decodes close frame with status code and reason@L345 | Test | tests\brainstorm-server\ws-protocol.test.js | 345-354 |
| test:roundtrip encode/decode of JSON message@L359 | Test | tests\brainstorm-server\ws-protocol.test.js | 359-377 |
| test:roundtrip masked client JSON message@L379 | Test | tests\brainstorm-server\ws-protocol.test.js | 379-385 |

## Execution Flows

No execution flows pass through this community.

## Dependencies

### Outgoing

- `strictEqual` (60 edge(s))
- `alloc` (18 edge(s))
- `decodeFrame` (18 edge(s))
- `toString` (15 edge(s))
- `encodeFrame` (12 edge(s))
- `from` (10 edge(s))
- `assert` (10 edge(s))
- `log` (7 edge(s))
- `slice` (7 edge(s))
- `copy` (5 edge(s))
- `readUInt16BE` (4 edge(s))
- `repeat` (4 edge(s))
- `writeUInt16BE` (3 edge(s))
- `concat` (3 edge(s))
- `randomBytes` (2 edge(s))

### Incoming

- `strictEqual` (60 edge(s))
- `decodeFrame` (18 edge(s))
- `toString` (15 edge(s))
- `alloc` (14 edge(s))
- `encodeFrame` (12 edge(s))
- `assert` (10 edge(s))
- `from` (9 edge(s))
- `slice` (7 edge(s))
- `readUInt16BE` (4 edge(s))
- `repeat` (4 edge(s))
- `tests\brainstorm-server\ws-protocol.test.js` (2 edge(s))
- `computeAcceptKey` (2 edge(s))
- `copy` (2 edge(s))
- `concat` (2 edge(s))
- `writeUInt16BE` (2 edge(s))
