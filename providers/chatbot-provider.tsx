import { MessageType } from "@/components/chatbot/chatbot-conversation";
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
}

export const ChatbotContext = createContext<ChatbotContextType>({});

export enum ChatbotActionType {
  SET_MESSAGES = "SET_MESSAGES",
  SET_STATUS = "SET_STATUS",
}

export type chatbotMessagesAction = {
  type: ChatbotActionType.SET_MESSAGES;
  payload: Map<string, MessageType>;
};

export type chatbotStatusAction = {
  type: ChatbotActionType.SET_STATUS;
  payload: ChatStatus;
};

export type ChatbotAction = chatbotMessagesAction | chatbotStatusAction;

export const chatbotReducer = (state: ChatbotState, action: ChatbotAction) => {
  switch (action.type) {
    case ChatbotActionType.SET_MESSAGES:
      return { ...state, messages: action.payload };
    case ChatbotActionType.SET_STATUS:
      return { ...state, status: action.payload };
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
