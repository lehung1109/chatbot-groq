import { createStore } from "zustand/vanilla";
import { GroqChatModelId } from "@/types/groq";

export type ChatbotState = {
  text?: string;
  webSearch?: boolean;
  selectedModel?: GroqChatModelId;
  conversationId?: string;
};

export type ChatbotActions = {
  setText: (text: string) => void;
  setWebSearch: (webSearch: boolean) => void;
  setSelectedModel: (selectedModel: GroqChatModelId) => void;
  setConversationId: (conversationId: string) => void;
};

export type ChatbotStore = ChatbotState & ChatbotActions;

export const defaultInitState: ChatbotState = {
  selectedModel: GroqChatModelId.GPT_OSS_120B,
};

export const createChatbotStore = (
  initState: ChatbotState = defaultInitState,
) => {
  return createStore<ChatbotStore>()((set) => ({
    ...initState,
    setText: (text: string) => set({ text }),
    setWebSearch: (webSearch: boolean) => set({ webSearch }),
    setSelectedModel: (selectedModel: GroqChatModelId) =>
      set({ selectedModel }),
    setConversationId: (conversationId: string) => set({ conversationId }),
  }));
};
