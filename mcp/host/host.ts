import { GroqChatModelId } from "@/types/groq";
import { UIMessage } from "ai";
import { initConnectClientToServer } from "../client/init-connect";

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

    const mcpClientInstance = await initConnectClientToServer(sessionId);

    const toolResult = await mcpClientInstance.callTool({
      name: "great",
      arguments: {
        name: "John",
      },
    });

    console.log("call server tool", toolResult);

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
    return Response.json({
      message: "test data",
    });
  }
}

export default MCPHost;
