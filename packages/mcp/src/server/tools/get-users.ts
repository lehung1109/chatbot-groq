import { CallToolResult, McpServer } from "@modelcontextprotocol/server";
import { createClient } from "@supabase/supabase-js";

export const registerGetUsersTool = (server: McpServer) => {
  server.registerTool(
    "get-users",
    {
      title: "Get Users Tool",
      description: "get all information of users from the database",
    },
    async (ctx): Promise<CallToolResult> => {
      await server.sendLoggingMessage({
        level: "info",
        data: `Get users tool called`,
      });

      const elicitationId = crypto.randomUUID();

      const elicitationResult = await ctx.mcpReq.elicitInput({
        mode: "form",
        message: "MCP Server need connect to database to get users information",
        requestedSchema: {
          type: "object",
          properties: {
            approve: { type: "boolean", title: "Approve" },
          },
        },
        _meta: {
          elicitationId,
        },
      });

      if (elicitationResult.action === "decline") {
        return {
          content: [
            { type: "text", text: "User denied access to the database" },
          ],
        };
      }

      // connect to database
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_ADMIN_KEY!,
      );

      // get users from database
      const {
        data: { users },
        error,
      } = await supabase.auth.admin.listUsers();

      if (error) {
        return {
          content: [
            { type: "text", text: "Error getting users from database" },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `All users information in datase in json format ${JSON.stringify(users)}`,
          },
        ],
      };
    },
  );
};
