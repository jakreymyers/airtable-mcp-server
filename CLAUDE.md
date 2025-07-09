# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development mode with hot reload using tsx |
| `npm run build` | Compile TypeScript to JavaScript in `dist/` |
| `npm start` | Run compiled server from `dist/index.js` |
| `npm run clean` | Remove build artifacts |
| `cp .env.example .env` | Setup environment configuration |

## MCP Server Architecture

This is a **Model Context Protocol (MCP) server** that exposes Airtable data to AI assistants through a single tool: `getAirtableRecord`.

### Core Architecture Flow
1. **Server Bootstrap** (`src/index.ts`): Initializes MCP server with STDIO transport
2. **Configuration** (`src/config.ts`): Loads environment variables using dotenv at module level
3. **Tool Registration**: Single tool `getAirtableRecord` with JSON schema validation
4. **Request Flow**: MCP request → Zod validation → Airtable API → JSON response

### Key Architectural Decisions

**Environment Loading**: `dotenv.config()` is called in `config.ts` at import time, ensuring environment variables are available before any other imports that depend on them.

**Dual Schema System**: 
- **MCP Registration**: Plain JSON schema for MCP protocol compatibility
- **Runtime Validation**: Zod schema with custom refinements for Airtable ID formats

**Error Handling Strategy**: HTTP status codes from Airtable API are mapped to user-friendly messages in `utils/error.ts` with structured MCP responses.

**Transport Protocol**: Uses STDIO transport for local MCP client integration (Claude Desktop, Cursor, VS Code).

## Tool Implementation Pattern

The `getAirtableRecord` tool follows this structure:
- **Input**: `{ recordId, baseId, tableName }` where tableName accepts both names and table IDs
- **Validation**: Regex patterns for Airtable IDs (`rec[A-Za-z0-9]{14}`, `app[A-Za-z0-9]{14}`)
- **Output**: MCP-compliant response with `content[].type: "text"` and JSON-formatted record data
- **Error Response**: `isError: true` flag with descriptive error messages

## Environment Requirements

**Required**: `AIRTABLE_PERSONAL_ACCESS_TOKEN` - Must be set or server startup fails
**Optional**: `AIRTABLE_TIMEOUT`, `AIRTABLE_RETRY_ATTEMPTS`, `AIRTABLE_RETRY_DELAY`

Token format: `pat[A-Za-z0-9]{13}.[a-f0-9]{64}` (Personal Access Token from airtable.com/create/tokens)

## Development & Testing

**Local Testing**: Create JavaScript test files that import from `./dist/tools/getRecord.js` and call the handler directly with mock MCP request objects.

**MCP Client Integration**: Use `claude-desktop-config.json` as template for MCP client configuration. Server logs to stderr, responses to stdout.

**Build Requirement**: TypeScript compilation is required before running since the project uses ES modules with `.js` extensions in imports.