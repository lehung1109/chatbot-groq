import { UIMessage } from "@ai-sdk/react";
import { memo } from "react";
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageContent,
} from "../ai-elements/message";
import ChatbotSource from "./chatbot-source";
import ChatbotReasoning from "./chatbot-reasoning";
import ChatbotText from "./chatbot-text";

const ChatbotConversationMessage = memo(function ChatbotConversationMessage({
  id,
  role,
  parts,
}: UIMessage) {
  return (
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
  );
});

export default ChatbotConversationMessage;
