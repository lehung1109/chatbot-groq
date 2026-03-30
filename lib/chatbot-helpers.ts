import { ChatbotAction, ChatbotActionType } from "@/providers/chatbot-provider";
import { Dispatch } from "react";
import { delay } from "./utils";

/**
 * Stream response for assistant message
 * @param messageId - The id of the assistant message
 * @param content - The content of the assistant message
 */
export const streamResponse = async (
  messageId: string,
  content: string,
  dispatch?: Dispatch<ChatbotAction>,
) => {
  if (!dispatch) return;

  dispatch?.({
    type: ChatbotActionType.SET_STATUS,
    payload: "streaming",
  });

  const words = content.split(" ");
  let currentContent = "";

  for (const [i, word] of words.entries()) {
    currentContent += (i > 0 ? " " : "") + word;

    dispatch?.({
      type: ChatbotActionType.SET_ASSISTANT_MESSAGE_STREAMING,
      payload: {
        messageId,
        content: currentContent,
      },
    });

    await delay(100);
  }

  dispatch?.({
    type: ChatbotActionType.SET_STATUS,
    payload: "ready",
  });
};
