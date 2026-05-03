import { createStore } from "zustand/vanilla";
import type { UIMessage } from "ai";
import { GroqChatModelId } from "../types/groq";

export type ChatbotState = {
  text?: string;
  webSearch?: boolean;
  selectedModel?: GroqChatModelId;
  conversationId?: string;
  /** Remount key for AIProvider / useChat when switching sessions */
  chatSessionKey: string;
  resumeMessages: UIMessage[];
  floatingOpen: boolean;
};

export type ChatbotActions = {
  setText: (text: string) => void;
  setWebSearch: (webSearch: boolean) => void;
  setSelectedModel: (selectedModel: GroqChatModelId) => void;
  setConversationId: (conversationId: string | undefined) => void;
  setFloatingOpen: (open: boolean) => void;
  startNewChatSession: (options?: { openFloating?: boolean }) => void;
  openConversationFromHistory: (payload: {
    conversationId: string;
    messages: UIMessage[];
    /** When false, only updates session/messages (e.g. embedded history panel). Default true. */
    openFloating?: boolean;
  }) => void;
};

export type ChatbotStore = ChatbotState & ChatbotActions;

export const defaultInitState: ChatbotState = {
  selectedModel: GroqChatModelId.GPT_OSS_120B,
  chatSessionKey: "default",
  resumeMessages: [],
  floatingOpen: false,
};

export const createChatbotStore = (
  initState: Partial<ChatbotState> = {},
) => {
  const initial: ChatbotState = { ...defaultInitState, ...initState };

  return createStore<ChatbotStore>()((set) => ({
    ...initial,
    setText: (text: string) => set({ text }),
    setWebSearch: (webSearch: boolean) => set({ webSearch }),
    setSelectedModel: (selectedModel: GroqChatModelId) =>
      set({ selectedModel }),
    setConversationId: (conversationId: string | undefined) =>
      set({ conversationId }),
    setFloatingOpen: (floatingOpen: boolean) => set({ floatingOpen }),
    startNewChatSession: (options) =>
      set({
        chatSessionKey: `new-${Date.now()}`,
        resumeMessages: [],
        conversationId: undefined,
        floatingOpen: options?.openFloating ?? true,
      }),
    openConversationFromHistory: ({
      conversationId,
      messages,
      openFloating = true,
    }) =>
      set({
        chatSessionKey: conversationId,
        resumeMessages: messages,
        conversationId,
        floatingOpen: openFloating,
      }),
  }));
};
