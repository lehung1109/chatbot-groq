import { CallToolResult, McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

export const registerGreatTool = (server: McpServer) => {
  server.registerTool(
    "great",
    {
      title: "Greeting Tool", // Display name for UI
      description:
        "a tool to get information from the user when user say hello",
      inputSchema: z.object({
        name: z.string().describe("Name to greet"),
      }),
    },
    async ({ name }, ctx): Promise<CallToolResult> => {
      await server.sendLoggingMessage({
        level: "info",
        data: `Greeting tool called with name: ${name}`,
      });

      const result = await ctx.mcpReq.elicitInput({
        mode: "form",
        message: "Server need some information from you(test for elicitation):",
        requestedSchema: {
          type: "object",
          properties: {
            comment: { type: "string", title: "Comment" },
          },
          required: ["comment"],
        },
      });

      if (result.action === "accept") {
        return {
          content: [
            {
              type: "text",
              text: `${result.content?.comment}`,
            },
          ],
        };
      }
      return { content: [{ type: "text", text: "Feedback declined." }] };
    },
  );
};
