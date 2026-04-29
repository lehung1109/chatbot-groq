import { useChatbotStore } from "@/providers/chatbot-provider";
import { PromptInputSubmit } from "../ai-elements/prompt-input";
import { useChatStatusContext } from "@/providers/ai-provider";

const ChatbotSubmitButton = () => {
  const text = useChatbotStore((state) => state.text);
  const { status } = useChatStatusContext();

  const isSubmitDisabled = !(text?.trim() || status) || status === "streaming";

  return <PromptInputSubmit disabled={isSubmitDisabled} status={status} />;
};

export default ChatbotSubmitButton;
