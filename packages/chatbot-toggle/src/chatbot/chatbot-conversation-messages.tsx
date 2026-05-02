"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../shacnui/src/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import ChatbotConversationMessage from "./chatbot-conversation-message";
import { getErrorMessage } from "../../../../lib/utils";
import {
  useChatMessagesContext,
  useChatStatusContext,
} from "../providers/ai-provider";

const ChatbotConversationMessages = () => {
  const { messages } = useChatMessagesContext();
  const { error, status } = useChatStatusContext();
  const errorMessage = getErrorMessage(error);

  console.log("messages re-render");

  return (
    <>
      {messages?.map((message) => (
        <ChatbotConversationMessage key={`${message.id}`} {...message} />
      ))}

      {status === "submitted" && messages?.at(-1)?.role === "user" && (
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      )}

      {errorMessage ? (
        <Alert className="mb-4" variant="destructive">
          <AlertTriangleIcon />
          <AlertTitle>Server error</AlertTitle>
          <AlertDescription className="whitespace-pre-wrap wrap-break-word">
            {errorMessage}
          </AlertDescription>
        </Alert>
      ) : null}
    </>
  );
};

export default ChatbotConversationMessages;
