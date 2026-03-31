"use client";

import { chatbotSuggestions } from "@/data/chatbot";
import ChatbotConversation from "./chatbot-conversation";
import ChatbotMessagePanel from "./chatbot-message-panel";
import { GroqChatModelId } from "@/types/groq";

const Chatbot = () => {
  return (
    <div className="relative flex size-full flex-col divide-y overflow-hidden">
      <ChatbotConversation />

      <ChatbotMessagePanel
        suggestions={chatbotSuggestions}
        models={Object.values(GroqChatModelId)}
      />
    </div>
  );
};

export default Chatbot;
