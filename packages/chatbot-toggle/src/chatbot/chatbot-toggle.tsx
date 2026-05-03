"use client";

import AIProvider from "../providers/ai-provider";
import { Switch } from "@heroitvn/shacnui/ui/switch";
import { Label } from "@heroitvn/shacnui/ui/label";
import { useState } from "react";
import FloatingChatbot from "./floating-chatbot";
import Chatbot from "./chatbot";
import { useChatbotStore } from "../providers/chatbot-provider";

export interface ChatbotToggleProps {
  isFloat?: boolean;
  /** When false, hides the floating vs embedded dev switch (e.g. dashboard). */
  showDevToggle?: boolean;
}

const ChatbotToggle = ({
  isFloat = false,
  showDevToggle = true,
}: ChatbotToggleProps) => {
  const [showFloatingChatbot, setShowFloatingChatbot] = useState(isFloat);

  const chatSessionKey = useChatbotStore((s) => s.chatSessionKey);
  const resumeMessages = useChatbotStore((s) => s.resumeMessages);
  const floatingOpen = useChatbotStore((s) => s.floatingOpen);
  const setFloatingOpen = useChatbotStore((s) => s.setFloatingOpen);

  return (
    <AIProvider
      key={chatSessionKey}
      chatId={chatSessionKey}
      initialMessages={resumeMessages}
    >
      <>
        {showDevToggle ? (
          <div className="mb-8 flex items-center gap-2">
            <Switch
              id="chatbot-toggle"
              checked={showFloatingChatbot}
              onCheckedChange={setShowFloatingChatbot}
            />
            <Label htmlFor="chatbot-toggle">Toggle Floating Chatbot</Label>
          </div>
        ) : null}

        {showFloatingChatbot ? (
          <FloatingChatbot
            open={isFloat ? floatingOpen : undefined}
            onOpenChange={isFloat ? setFloatingOpen : undefined}
          />
        ) : (
          <Chatbot />
        )}
      </>
    </AIProvider>
  );
};

export default ChatbotToggle;
