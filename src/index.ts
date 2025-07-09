import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./tools/index.js";
import { validateConfig } from "./config/index.js";

async function main() {
  try {
    // Validate environment configuration
    validateConfig();

    const server = new McpServer({
      name: "airtable-mcp-server",
      version: "1.0.0"
    });

    // Register tools from registry
    server.registerTool(
      "getAirtableRecord",
      {
        title: "Get Airtable Record",
        description: "Retrieve a complete Airtable record by ID",
        inputSchema: tools.getAirtableRecord.schema as any
      },
      tools.getAirtableRecord.handler
    );

    // Connect transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    console.error("Airtable MCP Server is running...");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main().catch(console.error);