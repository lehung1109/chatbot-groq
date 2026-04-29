import { useChatbotStore } from "@/providers/chatbot-provider";
import { useEffect } from "react";

const ChatbotConversationId = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const setConversationId = useChatbotStore((state) => state.setConversationId);

  useEffect(() => {
    setConversationId(conversationId);
  }, [conversationId, setConversationId]);

  return <></>;
};

export default ChatbotConversationId;
