"use client";

import { useAIState } from "@/providers/ai-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import ChatbotConversationMessage from "./ChatbotConversationMessage";
import { getErrorMessage } from "@/lib/utils";

const ChatbotConversationMessages = () => {
  const { messages, error } = useAIState();
  const errorMessage = getErrorMessage(error);

  return (
    <>
      {messages?.map((message) => (
        <ChatbotConversationMessage key={`${message.id}`} {...message} />
      ))}

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
