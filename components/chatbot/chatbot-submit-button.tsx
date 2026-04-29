import { useChatbotStore } from "@/providers/chatbot-provider";
import { PromptInputSubmit } from "../ai-elements/prompt-input";
import { useChat } from "@ai-sdk/react";

const ChatbotSubmitButton = () => {
  const { text } = useChatbotStore((state) => ({
    text: state.text,
  }));
  const { status } = useChat();

  const isSubmitDisabled = !(text?.trim() || status) || status === "streaming";

  return <PromptInputSubmit disabled={isSubmitDisabled} status={status} />;
};

export default ChatbotSubmitButton;
