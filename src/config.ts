import { config } from "dotenv";

// Load environment variables first
config();

export const AirtableConfig = {
  personalAccessToken: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || '',
  requestTimeout: parseInt(process.env.AIRTABLE_TIMEOUT || '30000'),
  retryAttempts: parseInt(process.env.AIRTABLE_RETRY_ATTEMPTS || '3'),
  retryDelay: parseInt(process.env.AIRTABLE_RETRY_DELAY || '1000')
};

export function validateConfig() {
  if (!AirtableConfig.personalAccessToken) {
    throw new Error(
      "AIRTABLE_PERSONAL_ACCESS_TOKEN environment variable is required. " +
      "Please set this to your Airtable Personal Access Token."
    );
  }
  
  if (AirtableConfig.requestTimeout < 1000) {
    console.warn("Request timeout is very low. Consider increasing to at least 10 seconds.");
  }
  
  console.error("Configuration validated successfully");
}