import { useChatbot } from "@/providers/chatbot-provider";
import { Suggestions } from "../ai-elements/suggestion";
import SuggestionItem from "./suggestion-item";
import { useAIActions } from "@/providers/ai-provider";

export interface ChatbotSuggestionProps {
  suggestions: string[];
}

const ChatbotSuggestion = ({ suggestions }: ChatbotSuggestionProps) => {
  const { state } = useChatbot();
  const { selectedModel, webSearch } = state || {};
  const { sendMessage } = useAIActions();

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage?.(
      {
        text: suggestion,
      },
      {
        body: {
          model: selectedModel,
          webSearch: webSearch,
        },
      },
    );
  };

  return (
    <Suggestions className="px-4">
      {suggestions.map((suggestion) => (
        <SuggestionItem
          key={suggestion}
          onClick={handleSuggestionClick}
          suggestion={suggestion}
        />
      ))}
    </Suggestions>
  );
};

export default ChatbotSuggestion;
