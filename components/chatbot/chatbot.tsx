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
import { streamResponse } from "@/lib/chatbot-helpers";

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
    const randomResponse =
      chatbotMockResponses[
        Math.floor(Math.random() * chatbotMockResponses.length)
      ];

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
    setTimeout(() => {
      streamResponse(assistantMessageId, randomResponse, dispatch);
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
