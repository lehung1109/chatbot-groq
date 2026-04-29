import { useChatbotStore } from "@/providers/chatbot-provider";
import { useEffect } from "react";

const ChatbotConversationId = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { setConversationId } = useChatbotStore((state) => ({
    setConversationId: state.setConversationId,
  }));

  useEffect(() => {
    setConversationId(conversationId);
  }, [conversationId]);

  return <></>;
};

export default ChatbotConversationId;
