import { ToolUIPart } from "ai";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../ai-elements/conversation";
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
} from "../ai-elements/message";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "../ai-elements/sources";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "../ai-elements/reasoning";

export interface ChatbotConversationProps {
  messages: MessageType[];
}

export interface MessageType {
  key: string;
  from: "user" | "assistant";
  sources?: { href: string; title: string }[];
  versions: {
    id: string;
    content: string;
  }[];
  reasoning?: {
    content: string;
    duration: number;
  };
  tools?: {
    name: string;
    description: string;
    status: ToolUIPart["state"];
    parameters: Record<string, unknown>;
    result: string | undefined;
    error: string | undefined;
  }[];
}

const ChatbotConversation = ({ messages }: ChatbotConversationProps) => {
  return (
    <Conversation>
      <ConversationContent>
        {messages.map(({ versions, ...message }) => (
          <MessageBranch defaultBranch={0} key={message.key}>
            <MessageBranchContent>
              {versions.map((version) => (
                <Message
                  from={message.from}
                  key={`${message.key}-${version.id}`}
                >
                  <div>
                    {!!message.sources?.length && (
                      <Sources>
                        <SourcesTrigger count={message.sources.length} />

                        <SourcesContent>
                          {message.sources.map((source) => (
                            <Source
                              href={source.href}
                              key={source.href}
                              title={source.title}
                            />
                          ))}
                        </SourcesContent>
                      </Sources>
                    )}
                    {message.reasoning && (
                      <Reasoning duration={message.reasoning.duration}>
                        <ReasoningTrigger />

                        <ReasoningContent>
                          {message.reasoning.content}
                        </ReasoningContent>
                      </Reasoning>
                    )}

                    <MessageContent>
                      <MessageResponse>{version.content}</MessageResponse>
                    </MessageContent>
                  </div>
                </Message>
              ))}
            </MessageBranchContent>

            {versions.length > 1 && (
              <MessageBranchSelector>
                <MessageBranchPrevious />

                <MessageBranchPage />

                <MessageBranchNext />
              </MessageBranchSelector>
            )}
          </MessageBranch>
        ))}
      </ConversationContent>

      <ConversationScrollButton />
    </Conversation>
  );
};

export default ChatbotConversation;
