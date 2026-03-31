import { useChatbot } from "@/providers/chatbot-provider";
import { PromptInputSubmit } from "../ai-elements/prompt-input";

const ChatbotSubmitButton = () => {
  const { state, chat } = useChatbot();
  const { status } = chat ?? {};
  const { text } = state || {};

  const isSubmitDisabled = !(text?.trim() || status) || status === "streaming";

  return <PromptInputSubmit disabled={isSubmitDisabled} status={status} />;
};

export default ChatbotSubmitButton;
