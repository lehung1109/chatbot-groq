import { CallToolResult, McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

export const registerGreatTool = (server: McpServer) => {
  server.registerTool(
    "great",
    {
      title: "Greeting Tool", // Display name for UI
      description: "A simple greeting tool",
      inputSchema: z.object({
        name: z.string().describe("Name to greet"),
      }),
    },
    async ({ name }): Promise<CallToolResult> => {
      await server.sendLoggingMessage({
        level: "info",
        data: `Greeting tool called with name: ${name}`,
      });

      return {
        content: [
          {
            type: "text",
            text: `Hello, ${name}!`,
          },
        ],
      };
    },
  );
};
