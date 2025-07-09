/**
 * Validates Airtable record ID format: rec[A-Za-z0-9]{14}
 */
export function validateRecordId(recordId: string): boolean {
  const recordPattern = /^rec[A-Za-z0-9]{14}$/;
  return recordPattern.test(recordId);
}

/**
 * Validates Airtable base ID format: app[A-Za-z0-9]{14}
 */
export function validateBaseId(baseId: string): boolean {
  const basePattern = /^app[A-Za-z0-9]{14}$/;
  return basePattern.test(baseId);
}

/**
 * Sanitizes table name for safe usage
 */
export function sanitizeTableName(tableName: string): string {
  return tableName.trim().replace(/[^\w\s-]/g, '');
}