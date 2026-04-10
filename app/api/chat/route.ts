import MCPHost from "@/mcp/host/host";

export async function POST(req: Request) {
  const mcpHost = new MCPHost();

  return await mcpHost.handleRequest(req);
}
