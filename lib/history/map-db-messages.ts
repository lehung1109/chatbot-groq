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
  content: string;
}): UIMessage | null {
  const { id, role, content } = row;

  return JSON.parse(content) as UIMessage;
}

export function mapMessageRowsToUiMessages(
  rows: Array<{ id: string; role: string; content: string }>,
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
