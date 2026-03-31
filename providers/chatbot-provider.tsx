"use client";

import {
  Dispatch,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { GroqChatModelId } from "@/types/groq";

export interface ChatbotContextType {
  state?: ChatbotState;
  dispatch?: Dispatch<ChatbotAction>;
}

export interface ChatbotState {
  text?: string;
  webSearch?: boolean;
  selectedModel?: GroqChatModelId;
}

export const ChatbotContext = createContext<ChatbotContextType>({});

export enum ChatbotActionType {
  SET_TEXT = "SET_TEXT",
  SET_WEB_SEARCH = "SET_WEB_SEARCH",
  SET_SELECTED_MODEL = "SET_SELECTED_MODEL",
}

export type ChatbotTextAction = {
  type: ChatbotActionType.SET_TEXT;
  payload: string;
};

export type ChatbotWebSearchAction = {
  type: ChatbotActionType.SET_WEB_SEARCH;
  payload: boolean;
};

export type ChatbotSelectedModelAction = {
  type: ChatbotActionType.SET_SELECTED_MODEL;
  payload: GroqChatModelId;
};

export type ChatbotAction =
  | ChatbotTextAction
  | ChatbotWebSearchAction
  | ChatbotSelectedModelAction;

export const chatbotReducer = (state: ChatbotState, action: ChatbotAction) => {
  switch (action.type) {
    case ChatbotActionType.SET_TEXT:
      return { ...state, text: action.payload };
    case ChatbotActionType.SET_WEB_SEARCH:
      return { ...state, webSearch: action.payload };
    case ChatbotActionType.SET_SELECTED_MODEL:
      return { ...state, selectedModel: action.payload };
  }
};

export const ChatbotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(chatbotReducer, {
    selectedModel: GroqChatModelId.GPT_OSS_20B,
  });

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <ChatbotContext value={value}>{children}</ChatbotContext>;
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);

  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }

  return context;
};
