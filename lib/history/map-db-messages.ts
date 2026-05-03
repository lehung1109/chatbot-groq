import type { UIMessage } from "ai";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Maps a Supabase `messages.content` JSON value to a `UIMessage` for the chat UI.
 */
export function messageRowToUiMessage(row: {
  id: string;
  role: string;
  content: unknown;
}): UIMessage | null {
  const { id, role, content } = row;

  if (typeof content === "string") {
    if (role !== "user" && role !== "assistant" && role !== "system") {
      return null;
    }
    return {
      id,
      role,
      parts: [{ type: "text", text: content, state: "done" }],
    };
  }

  if (!isRecord(content)) {
    return null;
  }

  const parts = content.parts;
  const contentId = typeof content.id === "string" ? content.id : id;
  const contentRole = content.role;
  const resolvedRole =
    typeof contentRole === "string" ? contentRole : role;

  if (
    resolvedRole !== "user" &&
    resolvedRole !== "assistant" &&
    resolvedRole !== "system"
  ) {
    return null;
  }

  if (Array.isArray(parts)) {
    return {
      id: contentId,
      role: resolvedRole,
      parts: parts as UIMessage["parts"],
    };
  }

  return null;
}

export function mapMessageRowsToUiMessages(
  rows: Array<{ id: string; role: string; content: unknown }>,
): UIMessage[] {
  const out: UIMessage[] = [];
  for (const row of rows) {
    const msg = messageRowToUiMessage(row);
    if (msg) {
      out.push(msg);
    }
  }
  return out;
}
