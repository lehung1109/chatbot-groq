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

export interface ChatbotContextType {
  state?: ChatbotState;
  dispatch?: Dispatch<ChatbotAction>;
}

export interface ChatbotState {
  messages?: Map<string, MessageType>;
  status?: ChatStatus;
  text?: string;
  webSearch?: boolean;
  selectedModel?: ModelProps;
}

export const ChatbotContext = createContext<ChatbotContextType>({});

export enum ChatbotActionType {
  SET_MESSAGES = "SET_MESSAGES",
  SET_STATUS = "SET_STATUS",
  SET_TEXT = "SET_TEXT",
  SET_WEB_SEARCH = "SET_WEB_SEARCH",
  SET_SELECTED_MODEL = "SET_SELECTED_MODEL",
  SET_ASSISTANT_MESSAGE_STREAMING = "SET_ASSISTANT_MESSAGE_STREAMING",
}

export type ChatbotMessagesAction = {
  type: ChatbotActionType.SET_MESSAGES;
  payload: Map<string, MessageType>;
};

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

export type ChatbotAssistantMessageStreamingAction = {
  type: ChatbotActionType.SET_ASSISTANT_MESSAGE_STREAMING;
  payload: {
    messageId: string;
    content: string;
  };
};

export type ChatbotAction =
  | ChatbotMessagesAction
  | ChatbotStatusAction
  | ChatbotTextAction
  | ChatbotWebSearchAction
  | ChatbotSelectedModelAction
  | ChatbotAssistantMessageStreamingAction;

export const chatbotReducer = (state: ChatbotState, action: ChatbotAction) => {
  switch (action.type) {
    case ChatbotActionType.SET_MESSAGES:
      return { ...state, messages: action.payload };
    case ChatbotActionType.SET_STATUS:
      return { ...state, status: action.payload };
    case ChatbotActionType.SET_TEXT:
      return { ...state, text: action.payload };
    case ChatbotActionType.SET_WEB_SEARCH:
      return { ...state, webSearch: action.payload };
    case ChatbotActionType.SET_SELECTED_MODEL:
      return { ...state, selectedModel: action.payload };
    case ChatbotActionType.SET_ASSISTANT_MESSAGE_STREAMING: {
      const { messageId, content } = action.payload;
      const messages = state.messages || new Map<string, MessageType>();
      const message = messages.get(messageId);
      if (message) {
        messages.set(messageId, {
          ...message,
          versions: message.versions.map((v) =>
            v.id === messageId ? { ...v, content } : v,
          ),
        });
      }
      return { ...state, assistantMessageStreaming: action.payload };
    }
  }
};

export const ChatbotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(chatbotReducer, {});

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
