import { groq } from "@ai-sdk/groq";
import { Client } from "@modelcontextprotocol/client";
import {
  generateText,
  type ModelMessage,
  stepCountIs,
  type UIMessageStreamWriter,
} from "ai";

const DEFAULT_SAMPLING_MODEL = "openai/gpt-oss-120b";

export const registerClientSamplingHandlers = (
  client: Client,
  _writer: UIMessageStreamWriter,
  options?: { samplingModel?: string },
) => {
  const samplingModel = options?.samplingModel ?? DEFAULT_SAMPLING_MODEL;

  client.setRequestHandler("sampling/createMessage", async (request) => {
    const messageFromServer = request.params.messages.at(-1);

    if (!messageFromServer) {
      throw new Error("No message from server");
    }

    let content = "";

    if (Array.isArray(messageFromServer.content)) {
      messageFromServer.content.forEach((part) => {
        if (part.type === "text") {
          content += part.text;
        }
      });
    } else if (messageFromServer.content.type === "text") {
      content = messageFromServer.content.text;
    }

    if (!content) {
      throw new Error("No content in message from server");
    }

    const message: ModelMessage = {
      role: messageFromServer?.role || "user",
      content,
    };

    const result = await generateText({
      model: groq(samplingModel),
      messages: [message],
      stopWhen: stepCountIs(5),
      system: "You are a helpful assistant that can answer questions",
    });

    return {
      model: samplingModel,
      role: "assistant" as const,
      content: {
        type: "text" as const,
        text: result.text,
      },
    };
  });
};
