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

const systemPrompt = `You are a helpful assistant that can answer questions and help with tasks, call tools when you need to get information from the user`;

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
    let status = "completed";

    // save conversation to database if It is a new conversation
    if (!cId) {
      const { data, error } = await supabase
        .from("conversations")
        .insert({
          user_id: user.user?.id,
          title: messages[0].parts
            .find((part) => part.type === "text")
            ?.text.slice(0, 100),
          model,
          system_prompt: systemPrompt,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      conversationId = data.id;
    }

    // save message user
    const { error: userMessageError, data: userMessageData } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        role: "user",
        content: messages[messages.length - 1],
        status,
      })
      .select()
      .single();

    if (userMessageError) {
      throw new Error(userMessageError.message);
    }

    const userMessageId = userMessageData.id;

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

          const result = streamText({
            model: groq(model),
            messages: await convertToModelMessages(messages),
            stopWhen: stepCountIs(5),
            tools: Object.fromEntries(
              tools.tools.map((tool) => {
                return [
                  tool.name,
                  {
                    description: tool.description,
                    title: tool.title,
                    inputSchema: convertToZodSchema(tool.inputSchema),
                    execute: async (input: Record<string, unknown>) => {
                      const result = await mcpClientInstance.callTool({
                        name: tool.name,
                        arguments: input,
                      });

                      return result.content;
                    },
                  },
                ];
              }),
            ),
            system: systemPrompt,
          });

          const messageStream = result.toUIMessageStream({
            sendSources: true,
            sendReasoning: true,
          });

          writer.merge(messageStream);
        },
        onFinish: async ({ responseMessage }) => {
          const { error } = await supabase.from("messages").insert({
            conversation_id: conversationId,
            role: "assistant",
            content: responseMessage,
            status,
            response_to: userMessageId,
          });

          if (error) {
            throw new Error(error.message);
          }
        },
      }),
    });
  }
}

export default MCPHost;
