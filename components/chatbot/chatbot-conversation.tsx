import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../ai-elements/conversation";
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageContent,
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
          <Message from={role} key={`${id}`}>
            <MessageBranch defaultBranch={0} key={id}>
              <MessageBranchContent>
                <MessageContent>
                  {parts.map((part, partIndex) => {
                    return (
                      <div key={`${id}-${partIndex}`}>
                        {part.type === "source-url" && (
                          <ChatbotSource sources={[part]} />
                        )}

                        {part.type === "reasoning" && (
                          <ChatbotReasoning reasoning={part} />
                        )}

                        {part.type === "text" && <ChatbotText text={part} />}
                      </div>
                    );
                  })}
                </MessageContent>
              </MessageBranchContent>
            </MessageBranch>
          </Message>
        ))}
      </ConversationContent>

      <ConversationScrollButton />
    </Conversation>
  );
};

export default ChatbotConversation;
