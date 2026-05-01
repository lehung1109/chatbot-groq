import type { Client } from "@modelcontextprotocol/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { UIMessageStreamWriter } from "ai";
import { registerClientElicitationHandlers } from "@heroitvn/mcp";
import { processFormElicitation } from "./process-form-elicitation";

export function registerAppElicitationHandlers(
  client: Client,
  writer: UIMessageStreamWriter,
  supabase: SupabaseClient,
  userMessageId: string,
) {
  registerClientElicitationHandlers(client, writer, (params, w) =>
    processFormElicitation(params, w, supabase, userMessageId),
  );
}
