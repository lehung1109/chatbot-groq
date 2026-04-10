import { GroqChatModelId } from "@/types/groq";
import { groq } from "@ai-sdk/groq";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  UIMessage,
} from "ai";
import { initConnectClientToServer } from "../client/init-connect";
import { registerClientElicitationHandlers } from "../client/elicitation";
import { z } from "zod";

class MCPHost {
  async handleRequest(req: Request) {
    const {
      messages,
      model,
      webSearch,
      sessionId,
    }: {
      messages: UIMessage[];
      model: GroqChatModelId;
      webSearch: boolean;
      sessionId: string;
    } = await req.json();

    return createUIMessageStreamResponse({
      stream: createUIMessageStream({
        async execute({ writer }) {
          console.log("executing in ui message stream");

          writer.write({
            type: "data-message",
            data: { content: "Hello" },
          });

          const mcpClientInstance = await initConnectClientToServer(sessionId);

          registerClientElicitationHandlers(mcpClientInstance, writer);

          const tools = await mcpClientInstance.listTools();

          const result = streamText({
            model: groq(model),
            messages: await convertToModelMessages(messages),
            tools: Object.fromEntries(
              tools.tools.map((tool) => {
                return [
                  tool.name,
                  {
                    description: tool.description,
                    title: tool.title,
                    inputSchema: z.object({
                      name: z.string().describe("Name to greet"),
                    }),
                  },
                ];
              }),
            ),
            onChunk: async ({ chunk }) => {
              if (chunk.type === "tool-call") {
                await mcpClientInstance.callTool({
                  name: chunk.toolName,
                  arguments: {
                    name: "Test Name",
                  },
                });
              }
            },
            system:
              "You are a helpful assistant that can answer questions and help with tasks, call tools when you need to get information from the user",
          });

          const messageStream = result.toUIMessageStream({
            sendSources: true,
            sendReasoning: true,
          });

          writer.merge(messageStream);
        },
      }),
    });
  }
}

export default MCPHost;
