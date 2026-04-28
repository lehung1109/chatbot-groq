import { clientInstances } from "./client-instances";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/client";
import { createClientInstance } from "./create-client-instance";

export const initConnectClientToServer = async (sessionId?: string) => {
  let client = sessionId ? clientInstances[sessionId] : undefined;

  if (client) {
    console.log(`Client for session ${sessionId} already exists`);

    return client;
  }

  const transport = new StreamableHTTPClientTransport(
    new URL(process.env.MCP_SERVER_URL!),
    {
      sessionId: sessionId,
    },
  );
  client = createClientInstance();

  await client.connect(transport);

  if (!transport.sessionId) {
    throw new Error("Transport session ID is missing");
  }

  clientInstances[transport.sessionId] = client;

  return client;
};
