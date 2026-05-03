"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import Chatbot from "./chatbot";

export interface FloatingChatbotProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const FloatingChatbot = ({
  open: openProp,
  onOpenChange,
  defaultOpen = false,
}: FloatingChatbotProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (isControlled) {
      onOpenChange?.(next);
    } else {
      setUncontrolledOpen(next);
    }
  };

  return (
    <div className="fixed bottom-15 right-5 z-50">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 active:scale-95"
        aria-label={open ? "Close chatbot" : "Open chatbot"}
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {open ? (
        <div className="absolute bottom-15 right-0 w-[min(100vw-1.5rem,24rem)] overflow-hidden rounded-xl border border-border bg-card shadow-lg sm:max-w-lg sm:w-md">
          <Chatbot />
        </div>
      ) : null}
    </div>
  );
};

export default FloatingChatbot;
