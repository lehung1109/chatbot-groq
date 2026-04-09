import { streamText, UIMessage, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";
import { GroqChatModelId } from "@/types/groq";
import { initConnectClientToServer } from "@/mcp/client/init-connect";
import z from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
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

  const mcpClientInstance = await initConnectClientToServer(sessionId);

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
            inputSchema: z.string(),
          },
        ];
      }),
    ),
    system:
      "You are a helpful assistant that can answer questions and help with tasks",
  });

  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
