import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../ai-elements/conversation";
import ChatbotConversationMessages from "./ChatbotConversationMessages";

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
