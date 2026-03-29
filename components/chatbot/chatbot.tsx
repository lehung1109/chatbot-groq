"use client";

import {
  chatbotMockResponses,
  chatbotSuggestions,
  chefs,
  models,
} from "@/data/chatbot";
import ChatbotConversation from "./chatbot-conversation";
import ChatbotInput from "./chatbot-input";
import { useChatbot } from "@/providers/chatbot-provider";

const Chatbot = () => {
  const { state } = useChatbot();
  const messages = state?.messages;

  return (
    <div className="relative flex size-full flex-col divide-y overflow-hidden">
      <ChatbotConversation messages={messages} />

      <ChatbotInput
        suggestions={chatbotSuggestions}
        chatbotMockResponses={chatbotMockResponses}
        chefs={chefs}
        models={models}
      />
    </div>
  );
};

export default Chatbot;
