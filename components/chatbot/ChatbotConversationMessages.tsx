import { useAIState } from "@/providers/ai-provider";
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageContent,
} from "../ai-elements/message";
import ChatbotSource from "./chatbot-source";
import ChatbotReasoning from "./chatbot-reasoning";
import ChatbotText from "./chatbot-text";

const ChatbotConversationMessages = () => {
  const { messages } = useAIState();

  return (
    <>
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
    </>
  );
};

export default ChatbotConversationMessages;
