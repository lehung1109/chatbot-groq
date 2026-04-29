"use client";

import { type ReactNode, createContext, useState, useContext } from "react";
import { useStore } from "zustand";

import { type ChatbotStore, createChatbotStore } from "@/stores/chatbot-store";

export type ChatbotStoreApi = ReturnType<typeof createChatbotStore>;

export const ChatbotStoreContext = createContext<ChatbotStoreApi | undefined>(
  undefined,
);

export interface ChatbotStoreProviderProps {
  children: ReactNode;
}

export const ChatbotStoreProvider = ({
  children,
}: ChatbotStoreProviderProps) => {
  const [store] = useState(() => createChatbotStore());

  return (
    <ChatbotStoreContext.Provider value={store}>
      {children}
    </ChatbotStoreContext.Provider>
  );
};

export const useChatbotStore = <T,>(
  selector: (store: ChatbotStore) => T,
): T => {
  const chatbotStoreContext = useContext(ChatbotStoreContext);

  if (!chatbotStoreContext) {
    throw new Error(`useChatbotStore must be used within ChatbotStoreProvider`);
  }

  return useStore(chatbotStoreContext, selector);
};
