import { createClient } from "@heroitvn/supabase/client";
import { Badge } from "@heroitvn/shacnui/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@heroitvn/shacnui/ui/card";
import type { Metadata } from "next";

type ConversationRow = {
  id: string;
  title: string | null;
  model: string | null;
  created_at: string;
  updated_at: string;
};

type MessageRow = {
  id: string;
  conversation_id: string;
  role: string;
  content: unknown;
  created_at: string;
};

export const metadata: Metadata = {
  title: "Chat History - Incident Copilot",
  description: "History chatbot conversations",
};

const dateTimeFormatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatMessageContent(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }

  if (content && typeof content === "object") {
    const maybeRecord = content as Record<string, unknown>;
    const text = maybeRecord.content;
    if (typeof text === "string") {
      return text;
    }

    const parts = maybeRecord.parts;
    if (Array.isArray(parts)) {
      const joinedText = parts
        .map((part) =>
          typeof part === "object" &&
          part != null &&
          "text" in part &&
          typeof part.text === "string"
            ? part.text
            : "",
        )
        .filter(Boolean)
        .join(" ");
      if (joinedText) {
        return joinedText;
      }
    }
  }

  try {
    return JSON.stringify(content);
  } catch {
    return "";
  }
}

const HistoryPage = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    return (
      <Card className="border-border/70 bg-card/90 shadow-sm">
        <CardHeader>
          <CardTitle>History Chatbot</CardTitle>
          <CardDescription>
            You need to sign in to view the chat history.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { data: conversations, error: conversationsError } = await supabase
    .from("conversations")
    .select("id,title,model,created_at,updated_at")
    .eq("user_id", claims.sub)
    .order("updated_at", { ascending: false })
    .limit(50);

  if (conversationsError) {
    return (
      <Card className="border-destructive/30 bg-destructive/10">
        <CardHeader>
          <CardTitle>Cannot fetch chat history</CardTitle>
          <CardDescription>{conversationsError.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const conversationRows = (conversations ?? []) as ConversationRow[];
  const conversationIds = conversationRows.map(
    (conversation) => conversation.id,
  );

  const messagesByConversation = new Map<string, MessageRow[]>();

  if (conversationIds.length > 0) {
    const { data: messages, error: messagesError } = await supabase
      .from("messages")
      .select("id,conversation_id,role,content,created_at")
      .in("conversation_id", conversationIds)
      .order("created_at", { ascending: true });

    if (messagesError) {
      return (
        <Card className="border-destructive/30 bg-destructive/10">
          <CardHeader>
            <CardTitle>Cannot fetch chat messages</CardTitle>
            <CardDescription>{messagesError.message}</CardDescription>
          </CardHeader>
        </Card>
      );
    }

    for (const message of (messages ?? []) as MessageRow[]) {
      const currentMessages =
        messagesByConversation.get(message.conversation_id) ?? [];
      currentMessages.push(message);
      messagesByConversation.set(message.conversation_id, currentMessages);
    }
  }

  return (
    <section className="space-y-4">
      <Card className="border-border/70 bg-card/90 shadow-sm">
        <CardHeader>
          <CardTitle>History Chatbot</CardTitle>
          <CardDescription>
            List of recent chat conversations ({conversationRows.length})
          </CardDescription>
        </CardHeader>
      </Card>

      {conversationRows.length === 0 ? (
        <Card className="border-border/70 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle>No chat conversations yet</CardTitle>
            <CardDescription>Start a new chat conversation.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-3">
          {conversationRows.map((conversation) => {
            const messages = messagesByConversation.get(conversation.id) ?? [];
            const firstUserMessage = messages.find(
              (message) => message.role === "user",
            );
            const latestMessage = messages.at(-1);

            return (
              <Card
                key={conversation.id}
                className="border-border/70 bg-card/90 shadow-sm"
              >
                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base">
                      {conversation.title?.trim() ||
                        "Chat conversation without title"}
                    </CardTitle>
                    {conversation.model ? (
                      <Badge>{conversation.model}</Badge>
                    ) : null}
                  </div>

                  <CardDescription>
                    Updated at{" "}
                    {dateTimeFormatter.format(
                      new Date(conversation.updated_at),
                    )}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">
                      First message:{" "}
                    </span>
                    {formatMessageContent(firstUserMessage?.content).slice(
                      0,
                      180,
                    ) || "No content."}
                  </p>

                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Last message:{" "}
                    </span>
                    {formatMessageContent(latestMessage?.content).slice(
                      0,
                      180,
                    ) || "No content."}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {messages.length} messages · Created at{" "}
                    {dateTimeFormatter.format(
                      new Date(conversation.created_at),
                    )}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default HistoryPage;
