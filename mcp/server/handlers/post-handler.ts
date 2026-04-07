import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { MCP_SESSION_ID_HEADER } from "@/lib/utils";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/server";
import { randomUUID } from "node:crypto";

// Map to store transports by session ID
const transports: {
  [sessionId: string]: WebStandardStreamableHTTPServerTransport;
} = {};

export const postHandler = async (req: NextRequest) => {
  const headersList = await headers();
  const sessionId = headersList.get(MCP_SESSION_ID_HEADER);

  if (sessionId) {
    console.log(`Received MCP request for session: ${sessionId}`);
  } else {
    console.log("Request body:", req.body);
  }

  try {
    let transport: WebStandardStreamableHTTPServerTransport;

    if (sessionId && transports[sessionId]) {
      // Reuse existing transport
      transport = transports[sessionId];
    } else {
      transport = new WebStandardStreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (sessionId) => {
          transports[sessionId] = transport;
        },
        onsessionclosed: (sessionId) => {
          delete transports[sessionId];
        },
      });
    }
  } catch (error) {
    console.error("Error handling MCP request:", error);
    return Response.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32_603,
          message: "Internal server error",
        },
        id: null,
      },
      {
        status: 500,
      },
    );
  }
};
