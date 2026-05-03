import { createClient } from "@heroitvn/supabase/server";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@heroitvn/shacnui/ui/card";
import type { Metadata } from "next";
import {
  HistoryConversations,
  type HistoryConversationRow,
  type HistoryMessageRow,
} from "./history-conversations";

export const metadata: Metadata = {
  title: "Chat History - Incident Copilot",
  description: "History chatbot conversations",
};

const HistoryPage = async () => {
  const supabase = await createClient();
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

  const conversationRows = (conversations ?? []) as HistoryConversationRow[];
  const conversationIds = conversationRows.map(
    (conversation) => conversation.id,
  );

  const messagesByConversationId: Record<string, HistoryMessageRow[]> = {};

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

    for (const message of (messages ?? []) as HistoryMessageRow[]) {
      const list = messagesByConversationId[message.conversation_id] ?? [];
      list.push(message);
      messagesByConversationId[message.conversation_id] = list;
    }
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          History Chatbot
        </h2>
        <p className="text-sm text-muted-foreground">
          {conversationRows.length} recent conversation
          {conversationRows.length === 1 ? "" : "s"}
        </p>
      </div>

      {conversationRows.length === 0 ? (
        <Card className="border-border/70 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle>No chat conversations yet</CardTitle>
            <CardDescription>Start a new chat conversation.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <HistoryConversations
          conversations={conversationRows}
          messagesByConversationId={messagesByConversationId}
        />
      )}
    </section>
  );
};

export default HistoryPage;
