import { useChat } from "@ai-sdk/react";
import { createContext, useContext } from "react";

const AIContext = createContext<ReturnType<typeof useChat> | null>(null);

export const AIProvider = ({ children }: { children: React.ReactNode }) => {
  const chat = useChat();

  return <AIContext value={chat}>{children}</AIContext>;
};

export const useAI = () => {
  const context = useContext(AIContext);

  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }

  return context;
};
