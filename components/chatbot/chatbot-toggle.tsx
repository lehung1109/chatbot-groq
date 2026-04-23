"use client";

import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";
import FloatingChatbot from "./floating-chatbot";
import Chatbot from "./chatbot";

interface ChatbotToggleProps {
  isFloat?: boolean;
}

const ChatbotToggle = ({ isFloat = false }: ChatbotToggleProps) => {
  const [showFloatingChatbot, setShowFloatingChatbot] = useState(isFloat);

  return (
    <>
      <div className="flex items-center gap-2 mb-8">
        <Switch
          id="chatbot-toggle"
          checked={showFloatingChatbot}
          onCheckedChange={setShowFloatingChatbot}
        />
        <Label htmlFor="chatbot-toggle">Toggle Floating Chatbot</Label>
      </div>

      {showFloatingChatbot ? <FloatingChatbot /> : <Chatbot />}
    </>
  );
};

export default ChatbotToggle;
