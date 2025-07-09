export function validateConfig() {
  const token = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  const timeout = parseInt(process.env.AIRTABLE_TIMEOUT || '30000');
  
  if (!token) {
    throw new Error(
      "AIRTABLE_PERSONAL_ACCESS_TOKEN environment variable is required. " +
      "Please set this to your Airtable Personal Access Token."
    );
  }
  
  if (timeout < 1000) {
    console.warn("Request timeout is very low. Consider increasing to at least 10 seconds.");
  }
  
  console.error("Configuration validated successfully");
}