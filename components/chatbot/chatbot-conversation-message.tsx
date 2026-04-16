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
import ChatbotElicitation, {
  ChatbotElicitationProps,
} from "./chatbot-elicitation";
import { UIDataTypes } from "ai";

interface DataTypes extends UIDataTypes {
  elicitation: {
    id: string;
    error?: string;
  };
}

const ChatbotConversationMessage = memo(function ChatbotConversationMessage({
  id,
  role,
  parts,
}: UIMessage<unknown, DataTypes>) {
  const elicitationErrorData = new Map<string, string>();

  parts.forEach((part) => {
    if (part.type === "data-elicitation") {
      const data = part.data as DataTypes["elicitation"];
      elicitationErrorData.set(data.id, data.error ?? "");
    }
  });

  return (
    <Message from={role} key={`${id}`}>
      <MessageBranch defaultBranch={0} key={id}>
        <MessageBranchContent>
          <MessageContent>
            {parts.map((part, partIndex) => {
              console.log("part", part);
              return (
                <div key={`${id}-${partIndex}`}>
                  {part.type === "source-url" && (
                    <ChatbotSource sources={[part]} />
                  )}

                  {part.type === "reasoning" && (
                    <ChatbotReasoning reasoning={part} />
                  )}

                  {part.type === "data-elicitation" && (
                    <ChatbotElicitation
                      data={part.data as ChatbotElicitationProps["data"]}
                      error={
                        (part.data as DataTypes["elicitation"]).id &&
                        elicitationErrorData.get(
                          (part.data as DataTypes["elicitation"]).id,
                        )
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
