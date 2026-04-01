"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import Chatbot from "./chatbot";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-15 right-5 z-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:scale-105 active:scale-95 dark:bg-white dark:text-black"
        aria-label={open ? "Close chatbot" : "Open chatbot"}
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {open && (
        <div className="absolute bottom-15 right-0 border-2 border-gray-600 rounded-lg">
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
