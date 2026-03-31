import { useChatbot } from "@/providers/chatbot-provider";
import { PromptInputSubmit } from "../ai-elements/prompt-input";
import { useAI } from "@/providers/ai-provider";

const ChatbotSubmitButton = () => {
  const { state } = useChatbot();
  const { status } = useAI();
  const { text } = state || {};

  const isSubmitDisabled = !(text?.trim() || status) || status === "streaming";

  return <PromptInputSubmit disabled={isSubmitDisabled} status={status} />;
};

export default ChatbotSubmitButton;
