import { config } from "dotenv";

// Load environment variables first
config();

export const AirtableConfig = {
  personalAccessToken: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || '',
  requestTimeout: parseInt(process.env.AIRTABLE_TIMEOUT || '30000'),
  retryAttempts: parseInt(process.env.AIRTABLE_RETRY_ATTEMPTS || '3'),
  retryDelay: parseInt(process.env.AIRTABLE_RETRY_DELAY || '1000')
};

export { validateConfig } from './validation.js';