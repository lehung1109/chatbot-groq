"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { useChat, type UseChatHelpers } from "@ai-sdk/react";
import { type UIMessage } from "ai";
import { convertProcessSignalToExitCode } from "node:util";

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

export const AIProvider = ({ children }: AIProviderProps) => {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const chat = useChat({
    onFinish: ({ messages }) => {
      setMessages(messages);
    },
  });

  const actions = useMemo(
    () => ({
      sendMessage: chat.sendMessage,
      regenerate: chat.regenerate,
      stop: chat.stop,
      resumeStream: chat.resumeStream,
      addToolOutput: chat.addToolOutput,
      addToolApprovalResponse: chat.addToolApprovalResponse,
    }),
    [
      chat.sendMessage,
      chat.regenerate,
      chat.stop,
      chat.resumeStream,
      chat.addToolOutput,
      chat.addToolApprovalResponse,
    ],
  );

  const status = useMemo(
    () => ({
      status: chat.status,
      error: chat.error,
    }),
    [chat.status, chat.error],
  );

  return (
    <ChatActionsContext.Provider value={actions}>
      <ChatStatusContext.Provider value={status}>
        <ChatMessagesContext.Provider value={{ messages }}>
          {children}
        </ChatMessagesContext.Provider>
      </ChatStatusContext.Provider>
    </ChatActionsContext.Provider>
  );
};

export default AIProvider;
