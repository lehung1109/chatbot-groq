import { CallToolResult, McpServer } from "@modelcontextprotocol/server";

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

      console.log(elicitationResult);

      return { content: [{ type: "text", text: "OK" }] };
    },
  );
};
