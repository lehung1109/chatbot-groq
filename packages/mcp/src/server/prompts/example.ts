import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

export const registerExamplePrompt = (server: McpServer) => {
  server.registerPrompt(
    "great",
    {
      title: "Great Prompt",
      description: "Great prompt for ResourceLink demonstration",
      argsSchema: z.object({
        name: z.string().describe("Name to greet"),
      }),
    },
    async ({ name }) => {
      // send logging message
      await server.sendLoggingMessage({
        level: "info",
        data: `Great prompt called with name: ${name}`,
      });

      return {
        description: "Great prompt for ResourceLink demonstration",
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please greet ${name} in a friendly manner.`,
            },
          },
        ],
      };
    },
  );
};
