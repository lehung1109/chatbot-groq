import { useChatbot } from "@/providers/chatbot-provider";
import { Suggestions } from "../ai-elements/suggestion";
import SuggestionItem from "./suggestion-item";

export interface ChatbotSuggestionProps {
  suggestions: string[];
}

const ChatbotSuggestion = ({ suggestions }: ChatbotSuggestionProps) => {
  const { state, chat } = useChatbot();
  const { selectedModel, webSearch } = state || {};
  const { sendMessage } = chat ?? {};

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
