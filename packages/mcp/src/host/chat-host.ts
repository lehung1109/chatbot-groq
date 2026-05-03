import { groq } from "@ai-sdk/groq";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  smoothStream,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { pathToFileURL } from "node:url";
import {
  convertToZodSchema,
  initConnectClientToServer,
  registerClientRootsHandlers,
  registerClientSamplingHandlers,
} from "@heroitvn/mcp";
import type { GroqChatModelId } from "@heroitvn/chatbot-toggle";
import { registerAppElicitationHandlers } from "./register-app-elicitation";
import { SupabaseClient } from "@supabase/supabase-js";

const systemPrompt = `You are a helpful assistant that can answer questions and help with tasks, call tools when you need to get information from the user`;

class MCPHost {
  async handleRequest(req: Request, supabase: SupabaseClient) {
    const {
      messages,
      model,
      webSearch,
      conversationId: cId,
    }: {
      messages: UIMessage[];
      model: GroqChatModelId;
      webSearch: boolean;
      sessionId: string;
      conversationId?: string;
    } = await req.json();

    const { data: user } = await supabase.auth.getUser();

    let conversationId = cId;

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

    const { error: userMessageError, data: userMessageData } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        role: "user",
        content: messages.at(-1),
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
          if (!cId) {
            writer.write({
              type: "data-conversation-id",
              data: { content: conversationId },
            });
          }

          const mcpClientInstance = await initConnectClientToServer();

          registerAppElicitationHandlers(
            mcpClientInstance,
            writer,
            supabase,
            userMessageId,
          );
          registerClientRootsHandlers(mcpClientInstance, writer, [
            { uri: pathToFileURL(process.cwd()).href, name: "Workspace" },
          ]);
          registerClientSamplingHandlers(mcpClientInstance, writer);

          const resources = await mcpClientInstance.listResources();

          console.dir("resources");
          console.dir(resources);

          const tools = await mcpClientInstance.listTools();

          console.dir("tools");

          const segmenter = new Intl.Segmenter("vi", { granularity: "word" });

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
                      const toolResult = await mcpClientInstance.callTool({
                        name: tool.name,
                        arguments: input,
                      });

                      return toolResult.content;
                    },
                  },
                ];
              }),
            ),
            system: systemPrompt,
            experimental_transform: smoothStream({
              delayInMs: 10,
              chunking: segmenter,
            }),
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

export { MCPHost };
