"use client";

import { AIProvider, Chatbot, useChatbotStore } from "@heroitvn/chatbot-toggle";
import { Button } from "@heroitvn/shacnui/ui/button";
import { cn } from "@heroitvn/utils";
import { MessageSquare, Plus, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { mapMessageRowsToUiMessages } from "@/lib/history/map-db-messages";
import { UIMessage } from "ai";

export type HistoryConversationRow = {
  id: string;
  title: string | null;
  model: string | null;
  created_at: string;
  updated_at: string;
};

export type HistoryMessageRow = {
  id: string;
  conversation_id: string;
  role: UIMessage["role"];
  content: string;
  created_at: string;
};

const dateTimeFormatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "short",
  timeStyle: "short",
});

function previewText(messages: HistoryMessageRow[]): string {
  const firstUser = messages.find((m) => m.role === "assistant");
  if (!firstUser) {
    return "No preview";
  }
  const content = JSON.parse(firstUser.content) as UIMessage;

  const parts = content.parts;

  const text = parts
    .map((p) =>
      typeof p === "object" &&
      p != null &&
      "text" in p &&
      typeof (p as { text?: unknown }).text === "string"
        ? (p as { text: string }).text
        : "",
    )
    .join(" ")
    .trim();
  return text.slice(0, 80) || "No preview";
}

function HistoryEmbeddedChatPanel({
  onClose,
}: Readonly<{ onClose: () => void }>) {
  const chatSessionKey = useChatbotStore((s) => s.chatSessionKey);
  const resumeMessages = useChatbotStore((s) => s.resumeMessages);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-l border-border bg-background">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2">
        <p className="text-sm font-medium text-foreground">New chat</p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={onClose}
          aria-label="Close chat panel"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <AIProvider
          key={chatSessionKey}
          chatId={chatSessionKey}
          initialMessages={resumeMessages}
        >
          <Chatbot embedded />
        </AIProvider>
      </div>
    </div>
  );
}

export interface HistoryConversationsProps {
  conversations: HistoryConversationRow[];
  messagesByConversationId: Record<string, HistoryMessageRow[]>;
}

export function HistoryConversations({
  conversations,
  messagesByConversationId,
}: Readonly<HistoryConversationsProps>) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [embeddedNewChatOpen, setEmbeddedNewChatOpen] = useState(false);

  const startNewChatSession = useChatbotStore((s) => s.startNewChatSession);
  const openConversationFromHistory = useChatbotStore(
    (s) => s.openConversationFromHistory,
  );

  const sorted = useMemo(
    () =>
      [...conversations].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      ),
    [conversations],
  );

  const handleNewChat = useCallback(() => {
    setActiveId(null);
    setEmbeddedNewChatOpen(true);
    startNewChatSession({ openFloating: false });
  }, [startNewChatSession]);

  const handleSelect = useCallback(
    (conversationId: string) => {
      const rows = messagesByConversationId[conversationId] ?? [];
      const messages = mapMessageRowsToUiMessages(rows);
      setActiveId(conversationId);
      setEmbeddedNewChatOpen(false);
      openConversationFromHistory({ conversationId, messages });
    },
    [messagesByConversationId, openConversationFromHistory],
  );

  const handleCloseEmbeddedChat = useCallback(() => {
    setEmbeddedNewChatOpen(false);
  }, []);

  return (
    <div
      className={cn(
        "flex gap-0 overflow-auto rounded-xl border border-border bg-card/40 shadow-sm h-[calc(100dvh-12rem)] min-h-0",
      )}
    >
      <aside
        className={cn(
          "flex w-[260px] shrink-0 flex-col border-r border-border bg-muted/30",
          embeddedNewChatOpen && "min-h-0",
        )}
      >
        <div className="border-b border-border p-3">
          <p className="px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Chats
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2 w-full justify-start gap-2"
            onClick={handleNewChat}
          >
            <Plus className="h-4 w-4" />
            New chat
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-0.5">
            {sorted.map((c) => {
              const messages = messagesByConversationId[c.id] ?? [];
              const title = c.title?.trim() || "Untitled conversation";
              const isActive = activeId === c.id;

              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(c.id)}
                    className={cn(
                      "flex w-full flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-muted/80",
                    )}
                  >
                    <span className="line-clamp-1 font-medium">{title}</span>
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {previewText(messages)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {dateTimeFormatter.format(new Date(c.updated_at))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {embeddedNewChatOpen ? (
        <HistoryEmbeddedChatPanel onClose={handleCloseEmbeddedChat} />
      ) : (
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
          <MessageSquare className="h-10 w-10 text-muted-foreground" />
          <div className="max-w-sm space-y-1">
            <p className="text-sm font-medium text-foreground">
              Incident Copilot chat history
            </p>
            <p className="text-sm text-muted-foreground">
              Select a conversation on the left to review it, or start a new
              chat beside the list.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleNewChat}
          >
            New chat
          </Button>
        </div>
      )}
    </div>
  );
}
