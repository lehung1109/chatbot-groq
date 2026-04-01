import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../ai-elements/conversation";
import ChatbotConversationMessages from "./ChatbotConversationMessages";

const ChatbotConversation = () => {
  return (
    <Conversation>
      <ConversationContent>
        <ChatbotConversationMessages />
      </ConversationContent>

      <ConversationScrollButton />
    </Conversation>
  );
};

export default ChatbotConversation;
