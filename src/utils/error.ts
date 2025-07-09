interface AirtableError extends Error {
  statusCode?: number;
  error?: string;
}

export function handleAirtableError(error: AirtableError) {
  let errorMessage = "Unknown error occurred";
  
  if (error.statusCode === 404) {
    errorMessage = "Record not found. Please verify the record ID, base ID, and table name are correct.";
  } else if (error.statusCode === 401) {
    errorMessage = "Authentication failed. Please check your Personal Access Token and permissions.";
  } else if (error.statusCode === 403) {
    errorMessage = "Access forbidden. Your token may not have permission to access this base or table.";
  } else if (error.statusCode === 429) {
    errorMessage = "Rate limit exceeded. Please wait 30 seconds and try again.";
  } else if (error.statusCode === 422) {
    errorMessage = "Invalid request parameters. Please check your input values.";
  } else if (error.statusCode && error.statusCode >= 500) {
    errorMessage = "Airtable server error. Please try again later.";
  } else if (error.message) {
    errorMessage = error.message;
  }
  
  return {
    content: [
      {
        type: "text" as const,
        text: `Error: ${errorMessage}`
      }
    ],
    isError: true
  };
}