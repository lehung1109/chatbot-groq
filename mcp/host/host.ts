import { GroqChatModelId } from "@/types/groq";
import { groq } from "@ai-sdk/groq";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  UIMessage,
} from "ai";
import { initConnectClientToServer } from "../client/init-connect";
import { registerClientElicitationHandlers } from "../client/elicitation";
import { z } from "zod";
import { registerClientRootsHandlers } from "../client/roots";
import { convertToZodSchema } from "@/lib/utils";

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
          registerClientRootsHandlers(mcpClientInstance, writer);

          const tools = await mcpClientInstance.listTools();

          console.log("Tools: ", tools);

          const result = streamText({
            model: groq(model),
            messages: await convertToModelMessages(messages),
            stopWhen: stepCountIs(5),
            tools: Object.fromEntries(
              tools.tools.map((tool) => {
                console.log("Tool: ", tool.inputSchema);
                return [
                  tool.name,
                  {
                    description: tool.description,
                    title: tool.title,
                    inputSchema: convertToZodSchema(tool.inputSchema),
                    execute: async (input: Record<string, unknown>) => {
                      console.log(
                        "Executing tool: ",
                        tool.name,
                        " with input: ",
                        input,
                      );

                      const result = await mcpClientInstance.callTool({
                        name: tool.name,
                        arguments: input,
                      });

                      console.log(result);

                      return result.content;
                    },
                  },
                ];
              }),
            ),
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
