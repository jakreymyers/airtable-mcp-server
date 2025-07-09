import { getRecordHandler } from '../src/tools/getRecord.js';
import fixtures from './fixtures/sample-record.json' assert { type: 'json' };

describe('Airtable MCP Server Integration', () => {
  test('should handle complete record retrieval flow', async () => {
    // Skip if no real token available
    if (!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN) {
      console.log('Skipping integration test - no AIRTABLE_PERSONAL_ACCESS_TOKEN');
      return;
    }

    const request = {
      params: {
        arguments: fixtures.validRequest
      }
    };

    const result = await getRecordHandler(request);
    
    expect(result.isError).toBeFalsy();
    expect(result.content).toBeDefined();
    expect(result.content[0].type).toBe('text');
    
    const recordData = JSON.parse(result.content[0].text);
    expect(recordData.id).toBe(fixtures.validRequest.recordId);
    expect(recordData.fields).toBeDefined();
  });

  test('should handle error scenarios gracefully', async () => {
    const invalidRequest = {
      params: {
        arguments: fixtures.invalidRequests.invalidRecordId
      }
    };

    const result = await getRecordHandler(invalidRequest);
    
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('Validation error');
  });
});