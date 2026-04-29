import { useChatbotStore } from "@/providers/chatbot-provider";
import { Suggestions } from "../ai-elements/suggestion";
import SuggestionItem from "./suggestion-item";
import { useChat } from "@ai-sdk/react";

export interface ChatbotSuggestionProps {
  suggestions: string[];
}

const ChatbotSuggestion = ({ suggestions }: ChatbotSuggestionProps) => {
  const selectedModel = useChatbotStore((state) => state.selectedModel);
  const webSearch = useChatbotStore((state) => state.webSearch);
  const { sendMessage } = useChat();

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
