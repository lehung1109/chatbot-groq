"use client";

import {
  chatbotMockResponses,
  chatbotSuggestions,
  chefs,
  models,
} from "@/data/chatbot";
import ChatbotConversation, { MessageType } from "./chatbot-conversation";
import ChatbotMessagePanel from "./chatbot-message-panel";
import { ChatbotActionType, useChatbot } from "@/providers/chatbot-provider";
import { useEffect } from "react";
import { delay } from "@/lib/utils";

const Chatbot = () => {
  const { state, dispatch } = useChatbot();
  const messages = state?.messages;

  useEffect(() => {
    if (!messages) return;

    // make sure last message is from user
    const lastMessage = Array.from(messages.values() || []).at(-1);

    if (lastMessage?.from !== "user") {
      return;
    }

    // mock assistant response for use message
    const timestamp = Date.now();
    const assistantMessageId = `assistant-${timestamp}`;

    // empty assistant message
    const assistantMessage: MessageType = {
      from: "assistant",
      key: `assistant-${timestamp}`,
      versions: [
        {
          content: "",
          id: assistantMessageId,
        },
      ],
    };

    dispatch?.({
      type: ChatbotActionType.SET_MESSAGES,
      payload: new Map(messages).set(assistantMessage.key, assistantMessage),
    });

    // stream response for full content
  }, [messages, dispatch]);

  // stream response for assistant message
  useEffect(() => {
    /**
     * Stream response for assistant message
     * @param messageId - The id of the assistant message
     * @param content - The content of the assistant message
     */
    const streamResponse = async (messageId: string, content: string) => {
      dispatch?.({
        type: ChatbotActionType.SET_STATUS,
        payload: "streaming",
      });

      const words = content.split(" ");
      let currentContent = "";

      for (const [i, word] of words.entries()) {
        currentContent += (i > 0 ? " " : "") + word;

        updateMessageContent(messageId, currentContent);

        await delay(2000);
      }

      dispatch?.({
        type: ChatbotActionType.SET_STATUS,
        payload: "ready",
      });
    };

    /**
     * Update the content of a message
     * @param messageId - The id of the message to update
     * @param newContent - The new content of the message
     */
    const updateMessageContent = (messageId: string, newContent: string) => {
      dispatch?.({
        type: ChatbotActionType.SET_MESSAGES,
        payload: messages
          ? new Map(messages).set(messageId, {
              ...messages.get(messageId)!,
              versions: messages
                .get(messageId)!
                .versions.map((v) =>
                  v.id === messageId ? { ...v, content: newContent } : v,
                ),
            })
          : new Map(),
      });
    };

    if (!messages) return;

    // make sure last message is from assistant
    const lastMessage = Array.from(messages.values() || []).at(-1);

    if (lastMessage?.from !== "assistant") {
      return;
    }

    // mock assistant response for use message
    const assistantMessageId = lastMessage.key;
    const randomResponse =
      chatbotMockResponses[
        Math.floor(Math.random() * chatbotMockResponses.length)
      ];

    setTimeout(() => {
      streamResponse(assistantMessageId, randomResponse);
    }, 500);
  }, [messages, dispatch]);

  return (
    <div className="relative flex size-full flex-col divide-y overflow-hidden">
      <ChatbotConversation messages={messages} />

      <ChatbotMessagePanel
        suggestions={chatbotSuggestions}
        chefs={chefs}
        models={models}
      />
    </div>
  );
};

export default Chatbot;
