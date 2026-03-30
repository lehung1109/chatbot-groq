"use client";

import { MessageType } from "@/components/chatbot/chatbot-conversation";
import { ModelProps } from "@/components/chatbot/chatbot-model-selector";
import { ChatStatus } from "ai";
import {
  Dispatch,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { useChat } from "@ai-sdk/react";

export interface ChatbotContextType {
  state?: ChatbotState;
  dispatch?: Dispatch<ChatbotAction>;
  chat?: ReturnType<typeof useChat>;
}

export interface ChatbotState {
  status?: ChatStatus;
  text?: string;
  webSearch?: boolean;
  selectedModel?: ModelProps;
}

export const ChatbotContext = createContext<ChatbotContextType>({});

export enum ChatbotActionType {
  SET_STATUS = "SET_STATUS",
  SET_TEXT = "SET_TEXT",
  SET_WEB_SEARCH = "SET_WEB_SEARCH",
  SET_SELECTED_MODEL = "SET_SELECTED_MODEL",
}

export type ChatbotStatusAction = {
  type: ChatbotActionType.SET_STATUS;
  payload: ChatStatus;
};

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
  payload: ModelProps;
};

export type ChatbotAction =
  | ChatbotStatusAction
  | ChatbotTextAction
  | ChatbotWebSearchAction
  | ChatbotSelectedModelAction;

export const chatbotReducer = (state: ChatbotState, action: ChatbotAction) => {
  switch (action.type) {
    case ChatbotActionType.SET_STATUS:
      return { ...state, status: action.payload };
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
  const chat = useChat();
  const [state, dispatch] = useReducer(chatbotReducer, {});

  const value = useMemo(
    () => ({ state, dispatch, chat }),
    [state, dispatch, chat],
  );

  return <ChatbotContext value={value}>{children}</ChatbotContext>;
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);

  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }

  return context;
};
