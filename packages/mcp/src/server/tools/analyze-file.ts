import { GroqChatModelId } from "@heroitvn/chatbot-toggle";
import { CallToolResult, McpServer } from "@modelcontextprotocol/server";
import z from "zod";

export const registerAnalyzeFileTool = (server: McpServer) => {
  server.registerTool(
    "analyze-file",
    {
      title: "Analyze File Tool",
      description: "analyze a file and return the analysis",
      inputSchema: z.object({
        fileContent: z.string().describe("Content of the file to analyze"),
      }),
    },
    async ({ fileContent }, ctx): Promise<CallToolResult> => {
      await server.sendLoggingMessage({
        level: "info",
        data: `Analyze file tool called`,
      });

      const samplingResult = await ctx.mcpReq.requestSampling({
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Analyze the following file content: ${fileContent}`,
            },
          },
        ],
        systemPrompt: "You are a helpful assistant that can analyze files",
        maxTokens: 1000,
        modelPreferences: {
          hints: [
            {
              name: GroqChatModelId.GPT_OSS_20B,
            },
          ],
        },
      });

      if (Array.isArray(samplingResult.content)) {
        throw new TypeError(
          "Analysis of the file failed because the content is an array",
        );
      }

      if (samplingResult.content.type !== "text") {
        throw new Error(
          "Analysis of the file failed because the content is not a text",
        );
      }

      return { content: [samplingResult.content] };
    },
  );
};
