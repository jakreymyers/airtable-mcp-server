export interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
  createdTime: string | null;
}

export interface AirtableRecordInput {
  recordId: string;
  baseId: string;
  tableName: string;
}

export interface MCPToolResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
  isError?: boolean;
}