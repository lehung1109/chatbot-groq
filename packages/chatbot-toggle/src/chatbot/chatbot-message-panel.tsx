import ChatbotSuggestion from "./chatbot-suggestion";
import ChatbotInput from "./chatbot-input";
import { GroqChatModelId } from "../types/groq";

export interface ChatbotMessagePanelProps {
  suggestions: string[];
  models: GroqChatModelId[];
}

const ChatbotMessagePanel = ({
  suggestions,
  models,
}: ChatbotMessagePanelProps) => {
  return (
    <div className="grid shrink-0 gap-4 pt-4">
      <ChatbotSuggestion suggestions={suggestions} />

      <div className="w-full px-4 pb-4">
        <ChatbotInput models={models} />
      </div>
    </div>
  );
};

export default ChatbotMessagePanel;
