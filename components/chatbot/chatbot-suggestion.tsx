import { ChatbotActionType, useChatbot } from "@/providers/chatbot-provider";
import { Suggestions } from "../ai-elements/suggestion";
import SuggestionItem from "./suggestion-item";
import { MessageType } from "./chatbot-conversation";

export interface ChatbotSuggestionProps {
  suggestions: string[];
}

const ChatbotSuggestion = ({ suggestions }: ChatbotSuggestionProps) => {
  const { state, dispatch } = useChatbot();
  const { messages } = state || {};

  const handleSuggestionClick = (suggestion: string) => {
    dispatch?.({
      type: ChatbotActionType.SET_STATUS,
      payload: "submitted",
    });

    // add user message
    const timestamp = Date.now();

    const userMessage: MessageType = {
      from: "user",
      key: `user-${timestamp}`,
      versions: [
        {
          content: suggestion,
          id: `user-${timestamp}`,
        },
      ],
    };

    dispatch?.({
      type: ChatbotActionType.SET_MESSAGES,
      payload: new Map(messages).set(userMessage.key, userMessage),
    });
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
