import { GroqChatModelId } from "@/types/groq";
import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  UIMessage,
} from "ai";
import { initConnectClientToServer } from "../client/init-connect";
import { registerClientElicitationHandlers } from "../client/elicitation";

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
      status: 200,
      statusText: "OK",
      stream: createUIMessageStream({
        async execute({ writer }) {
          console.log("executing in ui message stream");

          writer.write({
            type: "data-message",
            data: { content: "Hello" },
          });

          const mcpClientInstance = await initConnectClientToServer(sessionId);

          registerClientElicitationHandlers(mcpClientInstance, writer);

          console.log("calling server tool");

          const toolResult = await mcpClientInstance.callTool({
            name: "great",
            arguments: {
              name: "John",
            },
          });

          console.log("server tool called", toolResult);
        },
      }),
    });

    // const tools = await mcpClientInstance.listTools();

    // const result = streamText({
    //   model: groq(model),
    //   messages: await convertToModelMessages(messages),
    //   tools: Object.fromEntries(
    //     tools.tools.map((tool) => {
    //       return [
    //         tool.name,
    //         {
    //           description: tool.description,
    //           title: tool.title,
    //           inputSchema: z.string(),
    //         },
    //       ];
    //     }),
    //   ),
    //   system:
    //     "You are a helpful assistant that can answer questions and help with tasks",
    // });

    // send sources and reasoning back to the client
    // return result.toUIMessageStreamResponse({
    //   sendSources: true,
    //   sendReasoning: true,
    // });
  }
}

export default MCPHost;
