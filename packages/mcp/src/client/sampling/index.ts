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
    const systemPrompt = request.params.systemPrompt;
    const modelPreferences =
      request.params.modelPreferences?.hints?.at(0)?.name || samplingModel;

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
      model: groq(modelPreferences),
      messages: [message],
      stopWhen: stepCountIs(5),
      system: systemPrompt,
    });

    return {
      model: modelPreferences,
      role: "assistant",
      content: {
        type: "text",
        text: result.text,
      },
    };
  });
};
