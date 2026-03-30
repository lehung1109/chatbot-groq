import { useChatbot } from "@/providers/chatbot-provider";
import { PromptInputSubmit } from "../ai-elements/prompt-input";

const ChatbotSubmitButton = () => {
  const { state } = useChatbot();
  const { status, text } = state || {};

  const isSubmitDisabled = !(text?.trim() || status) || status === "streaming";

  return <PromptInputSubmit disabled={isSubmitDisabled} status={status} />;
};

export default ChatbotSubmitButton;
