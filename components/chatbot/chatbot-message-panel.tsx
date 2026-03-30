import ChatbotSuggestion from "./chatbot-suggestion";
import ChatbotInput from "./chatbot-input";
import { ModelProps } from "./chatbot-model-selector";

export interface ChatbotMessagePanelProps {
  suggestions: string[];
  chefs: string[];
  models: ModelProps[];
}

const ChatbotMessagePanel = ({
  suggestions,
  chefs,
  models,
}: ChatbotMessagePanelProps) => {
  return (
    <div className="grid shrink-0 gap-4 pt-4">
      <ChatbotSuggestion suggestions={suggestions} />

      <div className="w-full px-4 pb-4">
        <ChatbotInput chefs={chefs} models={models} />
      </div>
    </div>
  );
};

export default ChatbotMessagePanel;
