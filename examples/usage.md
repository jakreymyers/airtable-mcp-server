# Usage Examples

## Basic Tool Call

```json
{
  "recordId": "recGgl5DHRYLssH7Z",
  "baseId": "appIqZltrzTQYLWhW",
  "tableName": "tbllXxQcFRUcpmzbr"
}
```

## Expected Response

```json
{
  "content": [
    {
      "type": "text",
      "text": "{\"id\":\"recGgl5DHRYLssH7Z\",\"fields\":{\"Task ID\":1209766018267410,\"Task Name\":\"[Meetings] Setup Crons for individual meetings to automate sanity updates and algolia indices\",\"Task Status\":\"In Progress\",\"Assignee\":\"Mat Miehle\"},\"createdTime\":null}"
    }
  ]
}
```

## Error Handling Examples

### Invalid Record ID
```json
{
  "recordId": "invalidID",
  "baseId": "appIqZltrzTQYLWhW",
  "tableName": "tbllXxQcFRUcpmzbr"
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "Validation error: Invalid Airtable record ID format"
    }
  ],
  "isError": true
}
```

### Missing Parameters
```json
{
  "recordId": "recGgl5DHRYLssH7Z",
  "baseId": "appIqZltrzTQYLWhW"
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "Validation error: Table name is required"
    }
  ],
  "isError": true
}
```

## Performance Expectations

- **Response Time**: < 3 seconds for record retrieval
- **Memory Usage**: < 50MB baseline
- **Concurrent Requests**: Up to 5 requests/second (Airtable API limit)

## Testing Commands

```bash
# Run unit tests
npm test

# Test with real Airtable data (requires .env setup)
npm run test:integration

# Manual testing
echo '{"recordId":"recGgl5DHRYLssH7Z","baseId":"appIqZltrzTQYLWhW","tableName":"tbllXxQcFRUcpmzbr"}' | node dist/index.js
```