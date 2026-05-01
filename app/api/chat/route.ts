import { MCPHost } from "@heroitvn/mcp";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const mcpHost = new MCPHost();

  return await mcpHost.handleRequest(req, supabase);
}
