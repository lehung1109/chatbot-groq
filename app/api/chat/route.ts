import MCPHost from "@/mcp/host/host";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const mcpHost = new MCPHost();

  return await mcpHost.handleRequest(req);
}
