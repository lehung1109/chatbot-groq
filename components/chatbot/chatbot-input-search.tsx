import { GlobeIcon } from "lucide-react";
import { PromptInputButton } from "../ai-elements/prompt-input";
import { ChatbotActionType, useChatbot } from "@/providers/chatbot-provider";

const ChatbotInputSearch = () => {
  const { dispatch, state } = useChatbot();
  const { webSearch } = state || {};

  const toggleWebSearch = () => {
    dispatch?.({
      type: ChatbotActionType.SET_WEB_SEARCH,
      payload: !webSearch,
    });
  };

  return (
    <PromptInputButton
      onClick={toggleWebSearch}
      variant={webSearch ? "default" : "ghost"}
    >
      <GlobeIcon size={16} />

      <span>Search</span>
    </PromptInputButton>
  );
};

export default ChatbotInputSearch;
