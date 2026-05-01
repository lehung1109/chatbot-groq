import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../../../../components/ai-elements/conversation";
import ChatbotConversationMessages from "./chatbot-conversation-messages";

const ChatbotConversation = ({ className }: { className?: string }) => {
  return (
    <Conversation className={className}>
      <ConversationContent>
        <ChatbotConversationMessages />
      </ConversationContent>

      <ConversationScrollButton />
    </Conversation>
  );
};

export default ChatbotConversation;
