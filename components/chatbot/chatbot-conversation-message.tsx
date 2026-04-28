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
import ChatbotElicitation from "./chatbot-elicitation";
import { UIDataTypes } from "ai";
import ChatbotConversationId from "./chatbot-conversation-id";
import { ElicitRequestFormParams } from "@modelcontextprotocol/client";

interface DataTypes extends UIDataTypes {
  elicitation: {
    elicitationId: string;
    requestParams?: ElicitRequestFormParams;
  };
  conversationId: {
    content: string;
  };
}

const ChatbotConversationMessage = memo(function ChatbotConversationMessage({
  id,
  role,
  parts,
}: UIMessage<unknown, DataTypes>) {
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

                  {part.type === "data-elicitation" &&
                    partIndex === parts.length - 1 && (
                      <ChatbotElicitation
                        {...(part.data as DataTypes["elicitation"])}
                      />
                    )}

                  {part.type === "data-conversation-id" &&
                    partIndex === parts.length - 1 && (
                      <ChatbotConversationId
                        conversationId={
                          (part.data as DataTypes["conversationId"]).content
                        }
                      />
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
