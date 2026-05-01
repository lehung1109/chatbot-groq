import MCPHost from "@/lib/mcp/chat-host";

export async function POST(req: Request) {
  const mcpHost = new MCPHost();

  return await mcpHost.handleRequest(req);
}
