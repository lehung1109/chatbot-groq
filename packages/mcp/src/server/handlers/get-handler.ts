import { MCP_SESSION_ID_HEADER } from "../../constants";
import { JSONRPCErrorResponse } from "@modelcontextprotocol/server";
import { transports } from "../transports";

export const getHandler = async (req: Request) => {
  const sessionId = req.headers.get(MCP_SESSION_ID_HEADER);

  if (!sessionId) {
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
  if (!transports[sessionId]) {
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
        status: 404,
      },
    );
  }

  // Check for Last-Event-ID header for resumability
  const lastEventId = req.headers.get("last-event-id");

  if (lastEventId) {
    console.log(`Client reconnecting with Last-Event-ID: ${lastEventId}`);
  } else {
    console.log(`Establishing new SSE stream for session ${sessionId}`);
  }

  const transport = transports[sessionId];

  return await transport.handleRequest(req);
};
