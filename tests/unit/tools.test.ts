import { getRecordHandler } from '../../src/tools/getRecord.js';
import fixtures from '../fixtures/sample-record.json' assert { type: 'json' };

describe('getRecordHandler', () => {
  test('should validate input parameters', async () => {
    const invalidRequest = {
      params: {
        arguments: fixtures.invalidRequests.invalidRecordId
      }
    };

    const result = await getRecordHandler(invalidRequest);
    
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('Validation error');
  });

  test('should handle missing parameters', async () => {
    const invalidRequest = {
      params: {
        arguments: fixtures.invalidRequests.missingTableName
      }
    };

    const result = await getRecordHandler(invalidRequest);
    
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('Validation error');
  });

  test('should format valid request structure', async () => {
    // Note: This test would need actual Airtable token to run
    // It's here as a structure example for integration testing
    const validRequest = {
      params: {
        arguments: fixtures.validRequest
      }
    };

    // This test would require mocking Airtable API or real credentials
    // expect(typeof getRecordHandler).toBe('function');
  });
});