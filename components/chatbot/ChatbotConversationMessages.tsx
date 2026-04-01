import { useAIState } from "@/providers/ai-provider";
import ChatbotConversationMessage from "./ChatbotConversationMessage";

const ChatbotConversationMessages = () => {
  const { messages } = useAIState();

  return (
    <>
      {messages?.map((message) => (
        <ChatbotConversationMessage key={`${message.id}`} {...message} />
      ))}
    </>
  );
};

export default ChatbotConversationMessages;
