"use client";

import { chatbotSuggestions, chefs, models } from "@/data/chatbot";
import ChatbotConversation from "./chatbot-conversation";
import ChatbotMessagePanel from "./chatbot-message-panel";

const Chatbot = () => {
  return (
    <div className="relative flex size-full flex-col divide-y overflow-hidden">
      <ChatbotConversation />

      <ChatbotMessagePanel
        suggestions={chatbotSuggestions}
        chefs={chefs}
        models={models}
      />
    </div>
  );
};

export default Chatbot;
