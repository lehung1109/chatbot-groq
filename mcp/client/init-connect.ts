import { StreamableHTTPClientTransport } from "@modelcontextprotocol/client";
import { createClientInstance } from "./create-client-instance";

export const initConnectClientToServer = async () => {
  const transport = new StreamableHTTPClientTransport(
    new URL(process.env.MCP_SERVER_URL!),
  );
  const client = createClientInstance();

  await client.connect(transport);

  if (!transport.sessionId) {
    throw new Error("Transport session ID is missing");
  }

  return client;
};
