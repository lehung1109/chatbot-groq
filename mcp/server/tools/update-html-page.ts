import { CallToolResult, McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

export const registerReadHtmlPageTool = (server: McpServer) => {
  server.registerTool(
    "read-html-page",
    {
      title: "Read HTML Page Tool",
      description: "a tool to read a html page",
    },
    async (ctx): Promise<CallToolResult> => {
      await server.sendLoggingMessage({
        level: "info",
        data: `Read HTML Page Tool called`,
      });

      const result = await ctx.mcpReq.elicitInput({
        mode: "form",
        message: "Server need some information from you(test for elicitation):",
        requestedSchema: {
          type: "object",
          properties: {
            htmlPage: { type: "string", title: "Data to update the html page" },
          },
          required: ["htmlPage"],
        },
      });

      if (result.action === "accept") {
        return {
          content: [
            {
              type: "text",
              text: `${result.content?.htmlPage}`,
            },
          ],
        };
      }
      return { content: [{ type: "text", text: "Feedback declined." }] };
    },
  );
};
