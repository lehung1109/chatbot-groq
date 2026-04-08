import { MCP_SESSION_ID_HEADER } from "@/lib/utils";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { transports } from "../transports";
import { JSONRPCErrorResponse } from "@modelcontextprotocol/server";

export const deleteHandler = async (req: NextRequest) => {
  const headersList = await headers();
  const sessionId = headersList.get(MCP_SESSION_ID_HEADER);

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

  console.log(`Received session termination request for session ${sessionId}`);

  try {
    const transport = transports[sessionId];

    return await transport.handleRequest(req);
  } catch (error) {
    console.error("Error handling session termination:", error);

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
