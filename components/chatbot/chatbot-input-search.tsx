import { GlobeIcon } from "lucide-react";
import { PromptInputButton } from "../ai-elements/prompt-input";
import { useChatbotStore } from "@/providers/chatbot-provider";

const ChatbotInputSearch = () => {
  const { setWebSearch, webSearch } = useChatbotStore((state) => ({
    setWebSearch: state.setWebSearch,
    webSearch: state.webSearch,
  }));

  const toggleWebSearch = () => {
    setWebSearch(!webSearch);
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
