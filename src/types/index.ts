// Airtable-specific types
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

// MCP-specific types
export interface MCPToolResponse {
  [x: string]: unknown;
  content: Array<{
    type: "text";
    text: string;
  }>;
  isError?: boolean;
}

export interface MCPToolSchema {
  type: "object";
  properties: Record<string, {
    type: string;
    description: string;
  }>;
  required: string[];
}

export interface MCPTool {
  schema: MCPToolSchema;
  handler: (request: any) => Promise<MCPToolResponse>;
}