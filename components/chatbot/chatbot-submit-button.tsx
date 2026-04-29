import { useChatbot } from "@/providers/chatbot-provider";
import { PromptInputSubmit } from "../ai-elements/prompt-input";
import { useChat } from "@ai-sdk/react";

const ChatbotSubmitButton = () => {
  const { state } = useChatbot();
  const { status } = useChat();
  const { text } = state || {};

  const isSubmitDisabled = !(text?.trim() || status) || status === "streaming";

  return <PromptInputSubmit disabled={isSubmitDisabled} status={status} />;
};

export default ChatbotSubmitButton;
