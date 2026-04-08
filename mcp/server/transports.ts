import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/server";

// Map to store transports by session ID
export const transports: {
  [sessionId: string]: WebStandardStreamableHTTPServerTransport;
} = {};
