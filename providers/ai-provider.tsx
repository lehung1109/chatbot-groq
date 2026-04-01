"use client";

import { useChat } from "@ai-sdk/react";
import { createContext, useContext, useMemo } from "react";

type Chat = ReturnType<typeof useChat>;

type AIState = Pick<Chat, "messages" | "status" | "error">;
type AIActions = Pick<Chat, "sendMessage" | "stop" | "setMessages">;

const AIStateContext = createContext<AIState | null>(null);
const AIActionsContext = createContext<AIActions | null>(null);

export const AIProvider = ({ children }: { children: React.ReactNode }) => {
  const chat = useChat();

  const state = useMemo<AIState>(
    () => ({
      messages: chat.messages,
      status: chat.status,
      error: chat.error,
    }),
    [chat.messages, chat.status, chat.error],
  );

  const actions = useMemo<AIActions>(
    () => ({
      sendMessage: chat.sendMessage,
      stop: chat.stop,
      setMessages: chat.setMessages,
    }),
    [chat.sendMessage, chat.stop, chat.setMessages],
  );

  return (
    <AIActionsContext.Provider value={actions}>
      <AIStateContext.Provider value={state}>
        {children}
      </AIStateContext.Provider>
    </AIActionsContext.Provider>
  );
};

export const useAIState = () => {
  const context = useContext(AIStateContext);

  if (!context) {
    throw new Error("useAIState must be used within an AIProvider");
  }

  return context;
};

export const useAIActions = () => {
  const context = useContext(AIActionsContext);

  if (!context) {
    throw new Error("useAIActions must be used within an AIProvider");
  }

  return context;
};
