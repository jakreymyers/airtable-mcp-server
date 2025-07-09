# Deployment Guide

## Local Development

1. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your AIRTABLE_PERSONAL_ACCESS_TOKEN
   ```

2. **Development Server**
   ```bash
   npm run dev
   ```

3. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## MCP Client Integration

### Claude Desktop

1. **Locate config file**: `~/.claude/mcp.json`
2. **Add server configuration**:
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

1. **Create `.cursor/mcp.json`**
2. **Use relative paths**:
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

## NPM Package Deployment

1. **Update package.json**
   ```bash
   npm version patch
   ```

2. **Build and publish**
   ```bash
   npm run build
   npm publish
   ```

3. **Global installation**
   ```bash
   npm install -g airtable-mcp-server
   ```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `AIRTABLE_PERSONAL_ACCESS_TOKEN` | Yes | - | Your Airtable PAT |
| `AIRTABLE_TIMEOUT` | No | 30000 | Request timeout (ms) |
| `AIRTABLE_RETRY_ATTEMPTS` | No | 3 | Number of retry attempts |
| `AIRTABLE_RETRY_DELAY` | No | 1000 | Retry delay (ms) |

## Troubleshooting

### Common Issues

1. **Server won't start**
   - Check `AIRTABLE_PERSONAL_ACCESS_TOKEN` is set
   - Verify token has read permissions
   - Ensure Node.js 18+ is installed

2. **Authentication errors**
   - Verify token is valid and not expired
   - Check token has access to specified base
   - Confirm base ID format: `appXXXXXXXXXXXXXX`

3. **Record not found**
   - Verify record ID format: `recXXXXXXXXXXXXXX`
   - Check record exists in specified table
   - Confirm table name is case-sensitive

### Debug Mode

```bash
DEBUG=* npm run dev
```

## Security Considerations

1. **Token Management**
   - Never commit `.env` files
   - Use environment-specific tokens
   - Rotate tokens regularly

2. **Network Security**
   - HTTPS only for production
   - Implement rate limiting
   - Monitor API usage

3. **Access Control**
   - Minimum required permissions
   - Base-specific token scoping
   - Regular access reviews