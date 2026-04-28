import { processFormElicitation } from "@/mcp/host/handlers/elicitation";
import { Client } from "@modelcontextprotocol/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { UIMessageStreamWriter } from "ai";

export const registerClientElicitationHandlers = (
  client: Client,
  writer: UIMessageStreamWriter,
  supabase: SupabaseClient,
  userMessageId: string,
) => {
  client.setRequestHandler("elicitation/create", async (request, extra) => {
    const mode = request.params.mode;

    if (mode !== "form") {
      throw new Error(`Unsupported elicitation mode: ${mode}`);
    }

    const result = await processFormElicitation(
      request.params,
      writer,
      supabase,
      userMessageId,
    );

    return result;
  });
  console.log("Client elicitation handlers registered");
};
