"use client";

import { chatbotSuggestions } from "../data/chatbot";
import ChatbotConversation from "./chatbot-conversation";
import ChatbotMessagePanel from "./chatbot-message-panel";
import { GroqChatModelId } from "../types/groq";

export interface ChatbotProps {
  /** Fills parent flex column instead of a fixed viewport slice (e.g. history page). */
  embedded?: boolean;
}

const Chatbot = ({ embedded = false }: ChatbotProps) => {
  return (
    <div className="relative flex size-full min-h-0 flex-col divide-y overflow-hidden">
      <ChatbotConversation
        className={
          embedded ? "min-h-0 flex-1 basis-0" : "h-[50vh] flex-auto"
        }
      />

      <ChatbotMessagePanel
        suggestions={chatbotSuggestions}
        models={Object.values(GroqChatModelId)}
      />
    </div>
  );
};

export default Chatbot;
