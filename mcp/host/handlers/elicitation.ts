import elicitationStore from "@/mcp/event-stores/elicitation-store";
import {
  ElicitRequestFormParams,
  ElicitResult,
} from "@modelcontextprotocol/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { UIMessageStreamWriter } from "ai";

export const processFormElicitation = async (
  requestParams: ElicitRequestFormParams,
  writer: UIMessageStreamWriter,
  supabase: SupabaseClient,
): Promise<ElicitResult> => {
  const id = crypto.randomUUID();
  writer.write({
    type: "data-elicitation",
    data: {
      ...requestParams,
      id,
    },
  });

  const { action, channel } = await elicitationStore.waitElicitation(
    id,
    supabase,
  );

  channel.unsubscribe();
  supabase.removeChannel(channel);

  return {
    action,
  };
};
