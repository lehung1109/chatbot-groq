import { groq } from "@ai-sdk/groq";
import {
  type AssistantContent,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type FilePart,
  type ImagePart,
  ModelMessage,
  smoothStream,
  stepCountIs,
  streamText,
  type TextPart,
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
import type { ContentBlock, PromptMessage } from "@modelcontextprotocol/client";

const systemPrompt = `You are a helpful assistant that can answer questions and help with tasks, call tools when you need to get information from the user`;

type AssistantContentArrayElement = Exclude<AssistantContent, string>[number];
type AssistantPromptPart = Extract<
  AssistantContentArrayElement,
  TextPart | FilePart
>;
type UserPromptPart = TextPart | ImagePart | FilePart;

/** FilePart / ảnh dạng file cho vai trò assistant (AssistantContent không có ImagePart). */
function mcpContentBlockToAssistantPart(
  block: Exclude<ContentBlock, { type: "text" }>,
): AssistantPromptPart {
  switch (block.type) {
    case "image":
    case "audio":
      return {
        type: "file" as const,
        data: block.data,
        mediaType: block.mimeType,
      };
    case "resource_link": {
      const label = [block.name, block.title].filter(Boolean).join(" — ");
      return {
        type: "text" as const,
        text: `[Resource: ${label}]\n${block.uri}`,
      };
    }
    case "resource": {
      const { resource } = block;
      if ("text" in resource && resource.text != null) {
        return { type: "text" as const, text: resource.text };
      }
      const data = "blob" in resource ? resource.blob : "";
      return {
        type: "file" as const,
        data,
        mediaType: resource.mimeType ?? "application/octet-stream",
      };
    }
    default: {
      const _exhaustive: never = block;
      return { type: "text" as const, text: JSON.stringify(_exhaustive) };
    }
  }
}

function mcpContentBlockToUserPart(
  block: Exclude<ContentBlock, { type: "text" }>,
): UserPromptPart {
  switch (block.type) {
    case "image":
      return {
        type: "image" as const,
        image: block.data,
        mediaType: block.mimeType,
      };
    case "audio":
      return {
        type: "file" as const,
        data: block.data,
        mediaType: block.mimeType,
      };
    case "resource_link": {
      const label = [block.name, block.title].filter(Boolean).join(" — ");
      return {
        type: "text" as const,
        text: `[Resource: ${label}]\n${block.uri}`,
      };
    }
    case "resource": {
      const { resource } = block;
      if ("text" in resource && resource.text != null) {
        return { type: "text" as const, text: resource.text };
      }
      const data = "blob" in resource ? resource.blob : "";
      return {
        type: "file" as const,
        data,
        mediaType: resource.mimeType ?? "application/octet-stream",
      };
    }
    default: {
      const _exhaustive: never = block;
      return { type: "text" as const, text: JSON.stringify(_exhaustive) };
    }
  }
}

/**
 * Chuyển danh sách {@link PromptMessage} từ `prompts/get` sang {@link ModelMessage} cho `streamText` / `generateText`.
 */
export function mcpPromptMessagesToModelMessages(
  messages: PromptMessage[] | undefined,
): ModelMessage[] {
  if (!messages?.length) {
    return [];
  }

  return messages.map((m) => {
    const content = m.content;
    if (m.role === "user") {
      if (content.type === "text") {
        return { role: "user" as const, content: content.text };
      }
      return {
        role: "user" as const,
        content: [mcpContentBlockToUserPart(content)],
      };
    }

    if (content.type === "text") {
      return { role: "assistant" as const, content: content.text };
    }
    return {
      role: "assistant" as const,
      content: [mcpContentBlockToAssistantPart(content)],
    };
  });
}

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

          // get prompts
          const prompts = await mcpClientInstance.listPrompts();

          // get last user messages in messages array
          const lastUserMessage = messages.findLast((m) => m.role === "user");
          const lastPathUserMessage = lastUserMessage?.parts.at(-1);

          // check last user message is similar to any prompt
          const promptNameUser = prompts.prompts.filter((p) => {
            if (lastPathUserMessage?.type === "text") {
              return lastPathUserMessage.text.includes(`/${p.name}`);
            }

            return false;
          });

          console.dir("promptNameUser");
          console.dir(promptNameUser);

          // get prompt messages
          const { messages: promptMessages } = promptNameUser.length
            ? await mcpClientInstance.getPrompt({
                name: promptNameUser[0].name,
                arguments: {
                  name:
                    lastPathUserMessage?.type === "text"
                      ? lastPathUserMessage.text.slice(
                          promptNameUser[0].name.length + 1,
                        )
                      : "",
                },
              })
            : {};

          const segmenter = new Intl.Segmenter("vi", { granularity: "word" });

          const promptModelMessages =
            mcpPromptMessagesToModelMessages(promptMessages);

          const result = streamText({
            model: groq(model),
            messages:
              promptModelMessages.length > 0
                ? promptModelMessages
                : await convertToModelMessages(messages),
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
