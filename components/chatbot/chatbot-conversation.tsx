import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../ai-elements/conversation";
import {
  Message,
  MessageBranch,
  MessageBranchContent,
} from "../ai-elements/message";
import { useChatbot } from "@/providers/chatbot-provider";
import ChatbotSource from "./chatbot-source";
import ChatbotReasoning from "./chatbot-reasoning";
import ChatbotText from "./chatbot-text";

const ChatbotConversation = () => {
  const { chat } = useChatbot();
  const { messages } = chat ?? {};

  return (
    <Conversation>
      <ConversationContent>
        {messages?.map(({ id, role, parts }) => (
          <MessageBranch defaultBranch={0} key={id}>
            <MessageBranchContent>
              {parts.map((part, partIndex) => {
                return (
                  <Message from={role} key={`${id}-${partIndex}`}>
                    <div>
                      {part.type === "source-url" && (
                        <ChatbotSource sources={[part]} />
                      )}

                      {part.type === "reasoning" && (
                        <ChatbotReasoning reasoning={part} />
                      )}

                      {part.type === "text" && <ChatbotText text={part} />}
                    </div>
                  </Message>
                );
              })}
            </MessageBranchContent>
          </MessageBranch>
        ))}
      </ConversationContent>

      <ConversationScrollButton />
    </Conversation>
  );
};

export default ChatbotConversation;
