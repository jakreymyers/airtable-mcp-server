# Airtable MCP Server

A Model Context Protocol (MCP) server for Airtable integration that allows AI assistants to retrieve records from Airtable bases.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Airtable Personal Access Token
- Airtable base with accessible tables

### Installation

1. **Clone and setup the project:**
   ```bash
   git clone <repository-url>
   cd airtable-mcp-server
   npm install
   ```

2. **Get your Airtable Personal Access Token:**
   - Visit https://airtable.com/create/tokens
   - Create a new token with read permissions for your target bases
   - Copy the token (format: `patXXXXXXXXXXXXXX.xxxxxxxxxx...`)

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env and set your AIRTABLE_PERSONAL_ACCESS_TOKEN
   ```

4. **Build and test:**
   ```bash
   npm run build
   npm start
   ```

## 🔧 Usage

The server provides one tool: `getAirtableRecord`

### Tool Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recordId` | string | Yes | Airtable record ID (format: `recXXXXXXXXXXXXXX`) |
| `baseId` | string | Yes | Airtable base ID (format: `appXXXXXXXXXXXXXX`) |
| `tableName` | string | Yes | Name of the table containing the record |

### Example Usage

**Input:**
```json
{
  "recordId": "recABC123DEF456",
  "baseId": "appXYZ789ABC123",
  "tableName": "Artists"
}
```

**Output:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "{\"id\":\"recABC123DEF456\",\"fields\":{\"Name\":\"Vincent van Gogh\",\"Bio\":\"Dutch painter...\",\"Genre\":[\"Post-Impressionism\"]},\"createdTime\":\"2024-01-15T10:30:00.000Z\"}"
    }
  ]
}
```

## 🔗 MCP Client Integration

### Claude Desktop

Add to your `~/.claude/mcp.json` (see `examples/claude-desktop.json`):

```json
{
  "mcpServers": {
    "airtable": {
      "command": "node",
      "args": ["/path/to/airtable-mcp-server/dist/index.js"],
      "env": {
        "AIRTABLE_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

### Cursor IDE

Add to your `.cursor/mcp.json` (see `examples/cursor-ide.json`):

```json
{
  "mcpServers": {
    "airtable": {
      "command": "node",
      "args": ["./dist/index.js"],
      "env": {
        "AIRTABLE_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

### VS Code

Add to your MCP configuration (see `examples/vscode.json`):

```json
{
  "mcpServers": {
    "airtable": {
      "command": "node",
      "args": ["./dist/index.js"],
      "env": {
        "AIRTABLE_PERSONAL_ACCESS_TOKEN": "your_token_here"
      },
      "transport": "stdio"
    }
  }
}
```

### Global Installation (NPM)

```bash
npm install -g airtable-mcp-server

# Then in your MCP client config:
{
  "command": "npx",
  "args": ["-y", "airtable-mcp-server@latest"]
}
```

## 🛠️ Development

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development mode with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled server |
| `npm run clean` | Remove build artifacts |
| `npm test` | Run unit tests |
| `npm run test:integration` | Run integration tests |
| `npm run test:all` | Run all tests |

### Project Structure

```
airtable-mcp-server/
├── src/
│   ├── index.ts              # Server entry point
│   ├── config/
│   │   ├── index.ts          # Configuration management
│   │   └── validation.ts     # Config validation
│   ├── tools/
│   │   ├── index.ts          # Tool registry
│   │   └── getRecord.ts      # Record retrieval tool
│   ├── types/
│   │   └── index.ts          # Type definitions
│   └── utils/
│       ├── error.ts          # Error handling
│       └── validation.ts     # Input validation
├── tests/
│   ├── integration.test.ts   # Integration tests
│   ├── unit/
│   │   └── tools.test.ts     # Unit tests
│   └── fixtures/
│       └── sample-record.json # Test data
├── examples/
│   ├── claude-desktop.json   # Claude Desktop config
│   ├── cursor-ide.json       # Cursor IDE config
│   ├── vscode.json           # VS Code config
│   └── usage.md              # Usage examples
├── docs/
│   └── DEPLOYMENT.md         # Deployment guide
├── dist/                     # Compiled JavaScript (generated)
├── PRD.md                    # Product requirements
├── CLAUDE.md                 # Claude Code guidance
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 🔒 Security

### Token Management
- **Environment Only**: Never commit tokens to version control
- **Minimal Scope**: Use read-only permissions for target bases only
- **Token Rotation**: Support for refreshing tokens when needed

### Input Validation
- Record IDs must match pattern: `rec[A-Za-z0-9]{14}`
- Base IDs must match pattern: `app[A-Za-z0-9]{14}`
- Table names are sanitized for safe usage

### Rate Limiting
- Respects Airtable's 5 requests/second per base limit
- Implements exponential backoff for rate limit errors
- Configurable retry attempts and delays

## ⚙️ Configuration

Environment variables:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `AIRTABLE_PERSONAL_ACCESS_TOKEN` | Yes | - | Your Airtable PAT |
| `AIRTABLE_TIMEOUT` | No | 30000 | Request timeout (ms) |
| `AIRTABLE_RETRY_ATTEMPTS` | No | 3 | Number of retry attempts |
| `AIRTABLE_RETRY_DELAY` | No | 1000 | Retry delay (ms) |

## 🚨 Error Handling

The server handles various error scenarios:

| Error Type | HTTP Status | Description |
|------------|-------------|-------------|
| Invalid Record ID | 404 | Record not found or invalid format |
| Authentication Failure | 401 | Invalid or expired token |
| Access Forbidden | 403 | Token lacks permissions |
| Rate Limit Exceeded | 429 | Too many requests |
| Invalid Parameters | 422 | Malformed request data |
| Server Error | 500+ | Airtable service issues |

All errors return structured responses with helpful messages.

## 📊 Performance

### Requirements Met
- ✅ **Response Time**: <2 seconds for record retrieval
- ✅ **Memory Usage**: <50MB baseline footprint  
- ✅ **Concurrent Requests**: Handles up to Airtable's rate limits
- ✅ **Error Recovery**: Graceful handling with exponential backoff

### Monitoring
- Request/response logging to stderr
- Configuration validation on startup
- Structured error messages for debugging

## 🧪 Testing

### Manual Testing

1. **Valid Record Retrieval:**
   ```bash
   # Replace with your actual IDs
   echo '{"recordId":"recYourRecordId","baseId":"appYourBaseId","tableName":"YourTable"}' | node dist/index.js
   ```

2. **Error Scenarios:**
   - Invalid record ID format
   - Non-existent record
   - Invalid base ID
   - Missing permissions
   - Rate limiting

### Test Cases

The implementation includes comprehensive error handling for:
- ✅ Successful record retrieval
- ✅ Validation errors (invalid ID formats)
- ✅ Authentication failures (401/403)
- ✅ Not found errors (404)
- ✅ Rate limiting (429)
- ✅ Server errors (500+)

## 🔄 Future Enhancements

### Planned Features
- **Additional Tools**: Create, update, delete operations
- **Batch Operations**: Multi-record processing
- **Advanced Queries**: Formula-based filtering
- **Field Selection**: Granular field retrieval
- **HTTP Transport**: REST API support
- **Caching**: Redis-based response caching

### Production Features
- OAuth integration
- Multi-base support
- Audit logging
- High availability deployment

## 🆘 Troubleshooting

### Common Issues

**Server won't start:**
- Check that `AIRTABLE_PERSONAL_ACCESS_TOKEN` is set
- Verify token has read permissions for target bases
- Ensure Node.js 18+ is installed

**Authentication errors:**
- Verify token is valid and not expired
- Check token has access to specified base
- Confirm base ID format: `appXXXXXXXXXXXXXX`

**Record not found:**
- Verify record ID format: `recXXXXXXXXXXXXXX`
- Check record exists in specified table
- Confirm table name is exactly correct (case-sensitive)

**Rate limiting:**
- Reduce request frequency
- Implement delays between requests
- Monitor Airtable usage limits

### Debug Mode

Enable verbose logging:
```bash
DEBUG=* npm run dev
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📚 Resources

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Airtable API Documentation](https://airtable.com/developers/web)
- [Personal Access Token Setup](https://airtable.com/create/tokens)
- [TypeScript MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk)

---

**Version**: 1.0.0  
**Compatible with**: Claude Desktop, Cursor IDE, VS Code MCP extensions  
**Node.js**: 18+ required  
**Airtable API**: Personal Access Token authentication