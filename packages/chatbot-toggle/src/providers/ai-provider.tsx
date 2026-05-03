"use client";

import { createContext, type ReactNode, useContext, useMemo } from "react";
import { useChat, type UseChatHelpers } from "@ai-sdk/react";
import { type UIMessage } from "ai";

type ChatMessage = UIMessage;

type ChatStatusContextValue = {
  status: UseChatHelpers<ChatMessage>["status"];
  error: UseChatHelpers<ChatMessage>["error"];
};

type ChatMessagesContextValue = {
  messages: UseChatHelpers<ChatMessage>["messages"];
};

type ChatActionsContextValue = Pick<
  UseChatHelpers<ChatMessage>,
  | "sendMessage"
  | "regenerate"
  | "stop"
  | "resumeStream"
  | "addToolOutput"
  | "addToolApprovalResponse"
  | "setMessages"
>;

const ChatStatusContext = createContext<ChatStatusContextValue | undefined>(
  undefined,
);

const ChatMessagesContext = createContext<ChatMessagesContextValue | undefined>(
  undefined,
);

const ChatActionsContext = createContext<ChatActionsContextValue | undefined>(
  undefined,
);

export interface AIProviderProps {
  children: ReactNode;
  /** Passed to useChat as `id` (chat session identity) */
  chatId?: string;
  initialMessages?: UIMessage[];
}

export const useChatStatusContext = () => {
  const context = useContext(ChatStatusContext);

  if (!context) {
    throw new Error("useChatStatusContext must be used within AIProvider");
  }

  return context;
};

export const useChatMessagesContext = () => {
  const context = useContext(ChatMessagesContext);

  if (!context) {
    throw new Error("useChatMessagesContext must be used within AIProvider");
  }

  return context;
};

export const useChatActionsContext = () => {
  const context = useContext(ChatActionsContext);

  if (!context) {
    throw new Error("useChatActionsContext must be used within AIProvider");
  }

  return context;
};

export const AIProvider = ({
  children,
  chatId,
  initialMessages = [],
}: AIProviderProps) => {
  const chat = useChat({
    id: chatId,
    messages: initialMessages,
  });

  const actions = useMemo(
    () => ({
      sendMessage: chat.sendMessage,
      regenerate: chat.regenerate,
      stop: chat.stop,
      resumeStream: chat.resumeStream,
      addToolOutput: chat.addToolOutput,
      addToolApprovalResponse: chat.addToolApprovalResponse,
      setMessages: chat.setMessages,
    }),
    [
      chat.sendMessage,
      chat.regenerate,
      chat.stop,
      chat.resumeStream,
      chat.addToolOutput,
      chat.addToolApprovalResponse,
      chat.setMessages,
    ],
  );

  const status = useMemo(
    () => ({
      status: chat.status,
      error: chat.error,
    }),
    [chat.status, chat.error],
  );

  const messages = useMemo(
    () => ({
      messages: chat.messages,
    }),
    [chat.messages],
  );

  return (
    <ChatActionsContext.Provider value={actions}>
      <ChatStatusContext.Provider value={status}>
        <ChatMessagesContext.Provider value={messages}>
          {children}
        </ChatMessagesContext.Provider>
      </ChatStatusContext.Provider>
    </ChatActionsContext.Provider>
  );
};

export default AIProvider;
