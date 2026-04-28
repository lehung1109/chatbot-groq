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
import { registerClientRootsHandlers } from "../client/roots";
import { convertToZodSchema } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { registerClientElicitationHandlers } from "../client/elicitation";

class MCPHost {
  async handleRequest(req: Request) {
    const {
      messages,
      model,
      webSearch,
      sessionId,
      conversationId: cId,
    }: {
      messages: UIMessage[];
      model: GroqChatModelId;
      webSearch: boolean;
      sessionId: string;
      conversationId?: string;
    } = await req.json();

    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();

    let conversationId = cId;

    // save conversation to database if It is a new conversation
    if (!cId) {
      const { data, error } = await supabase
        .from("conversations")
        .insert({
          user_id: user.user?.id,
          title: messages[0].parts
            .find((part) => part.type === "text")
            ?.text.slice(0, 100),
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      conversationId = data.id;
    }

    return createUIMessageStreamResponse({
      stream: createUIMessageStream({
        async execute({ writer }) {
          // send conversation id to client if it is a new conversation
          if (!cId) {
            writer.write({
              type: "data-conversation-id",
              data: { content: conversationId },
            });
          }

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
