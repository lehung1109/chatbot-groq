import { ChatbotActionType, useChatbot } from "@/providers/chatbot-provider";
import { useEffect } from "react";

const ChatbotConversationId = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { dispatch } = useChatbot();

  useEffect(() => {
    dispatch?.({
      type: ChatbotActionType.SET_CONVERSATION_ID,
      payload: conversationId,
    });
  }, [conversationId]);

  return <></>;
};

export default ChatbotConversationId;
