import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { MCP_SESSION_ID_HEADER } from "@/lib/utils";
import {
  isInitializeRequest,
  JSONRPCErrorResponse,
  WebStandardStreamableHTTPServerTransport,
} from "@modelcontextprotocol/server";
import { randomUUID } from "node:crypto";
import { mcpServerInstance } from "../create-server-instance";
import { InMemoryEventStore } from "../../event-stores/in-memory-event-store";
import { transports } from "../transports";

export const postHandler = async (req: NextRequest) => {
  const headersList = await headers();
  const sessionId = headersList.get(MCP_SESSION_ID_HEADER);
  let transport: WebStandardStreamableHTTPServerTransport | undefined =
    sessionId ? transports[sessionId] : undefined;
  const json = await req.json();

  if (sessionId) {
    console.log(`Received MCP request for session: ${sessionId}`);
  } else {
    console.log("Request body:", json);
  }

  if (sessionId && !transports[sessionId]) {
    console.log(`Session ${sessionId} not found`);

    return Response.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32_001,
          message: "Session not found",
        },
        id: undefined,
      } satisfies JSONRPCErrorResponse,
      {
        status: 400,
      },
    );
  }

  if (!isInitializeRequest(json) && !sessionId) {
    console.log("Received non-initialize request and missing session ID");

    return Response.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32_000,
          message: "Bad Request: Session ID required",
        },
        id: undefined,
      } satisfies JSONRPCErrorResponse,
      {
        status: 400,
      },
    );
  }

  try {
    if (transport) {
      console.log("Transport server already exists");

      return await transport.handleRequest(req, { parsedBody: json });
    }

    console.log("Initializing new transport server");

    transport ??= new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        console.log(`Server Session initialized: ${sessionId}`);

        if (transport) {
          transports[sessionId] = transport;
        }
      },
      onsessionclosed: (sessionId) => {
        console.log(`Session closed: ${sessionId}`);
        delete transports[sessionId];
      },
      eventStore: new InMemoryEventStore(),
    });

    console.log("Transport Server initialized");

    console.log("Connecting transport server to mcp server instance");

    await mcpServerInstance.connect(transport);
    console.log("Connected transport server to mcp server instance");

    return await transport.handleRequest(req, { parsedBody: json });
  } catch (error) {
    console.error("Error handling MCP request:", error);
    return Response.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32_603,
          message: "Internal server error",
        },
        id: undefined,
      } satisfies JSONRPCErrorResponse,
      {
        status: 500,
      },
    );
  }
};
