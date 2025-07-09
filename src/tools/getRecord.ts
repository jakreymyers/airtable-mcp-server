import { z } from "zod";
import Airtable from "airtable";
import { AirtableConfig } from "../config.js";
import { handleAirtableError } from "../utils/error.js";
import { validateRecordId, validateBaseId } from "../utils/validation.js";

export const getRecordSchema = z.object({
  recordId: z.string()
    .min(1, "Record ID is required")
    .refine(validateRecordId, "Invalid Airtable record ID format"),
  baseId: z.string()
    .min(1, "Base ID is required")
    .refine(validateBaseId, "Invalid Airtable base ID format"),
  tableName: z.string()
    .min(1, "Table name is required")
    .max(100, "Table name too long")
});

export const getRecordHandler = async (request: any) => {
  const { recordId, baseId, tableName } = request.params.arguments;
  
  // Validate input using Zod schema
  try {
    getRecordSchema.parse({ recordId, baseId, tableName });
  } catch (error: any) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Validation error: ${error.errors?.[0]?.message || error.message}`
        }
      ],
      isError: true
    };
  }
  
  try {
    const airtable = new Airtable({ 
      apiKey: AirtableConfig.personalAccessToken,
      requestTimeout: AirtableConfig.requestTimeout
    });
    
    const base = airtable.base(baseId);
    const table = base(tableName);
    
    // Retrieve the record
    const record = await table.find(recordId);
    
    // Format response
    const recordData = {
      id: record.getId(),
      fields: record.fields,
      createdTime: record.get('Created Time') || null
    };
    
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(recordData, null, 2)
        }
      ]
    };
  } catch (error) {
    console.error("Error retrieving record:", error);
    return handleAirtableError(error as any);
  }
};

export const getRecordTool = {
  schema: {
    type: "object",
    properties: {
      recordId: {
        type: "string",
        description: "Airtable record ID (format: recXXXXXXXXXXXXXX)"
      },
      baseId: {
        type: "string", 
        description: "Airtable base ID (format: appXXXXXXXXXXXXXX)"
      },
      tableName: {
        type: "string",
        description: "Name or ID of the table containing the record"
      }
    },
    required: ["recordId", "baseId", "tableName"]
  },
  handler: getRecordHandler
};