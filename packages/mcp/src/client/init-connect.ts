import { StreamableHTTPClientTransport } from "@modelcontextprotocol/client";
import { createClientInstance } from "./create-client-instance";

function resolveServerUrl(url?: string | URL): URL {
  const raw =
    url ??
    (typeof process !== "undefined" && process.env?.MCP_SERVER_URL
      ? process.env.MCP_SERVER_URL
      : undefined);

  if (!raw) {
    throw new Error(
      "MCP server URL is required (pass a URL or set MCP_SERVER_URL)",
    );
  }

  return typeof raw === "string" ? new URL(raw) : raw;
}

export const initConnectClientToServer = async (serverUrl?: string | URL) => {
  const transport = new StreamableHTTPClientTransport(
    resolveServerUrl(serverUrl),
  );
  const client = createClientInstance();

  await client.connect(transport);

  if (!transport.sessionId) {
    throw new Error("Transport session ID is missing");
  }

  return client;
};
