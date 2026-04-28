import { GroqChatModelId } from "@/types/groq";
import { groq } from "@ai-sdk/groq";
import { Client } from "@modelcontextprotocol/client";
import {
  stepCountIs,
  generateText,
  UIMessageStreamWriter,
  ModelMessage,
} from "ai";

export const registerClientSamplingHandlers = (
  client: Client,
  writer: UIMessageStreamWriter,
) => {
  client.setRequestHandler("sampling/createMessage", async (request) => {
    const messageFromServer = request.params.messages.at(-1);

    if (!messageFromServer) {
      throw new Error("No message from server");
    }

    let content: string = "";

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
      model: groq(GroqChatModelId.GPT_OSS_120B),
      messages: [message],
      stopWhen: stepCountIs(5),
      system: "You are a helpful assistant that can answer questions",
    });

    return {
      model: GroqChatModelId.GPT_OSS_120B,
      role: "assistant",
      content: {
        type: "text",
        text: result.text,
      },
    };
  });
};
