import elicitationStore from "@/mcp/event-stores/elicitation-store";
import {
  ElicitRequestFormParams,
  ElicitResult,
} from "@modelcontextprotocol/client";
import { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";
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

  let action: "accept" | "decline";
  let channel: RealtimeChannel | undefined;
  let error: Error | undefined;

  try {
    const data = await elicitationStore.waitElicitation(id, supabase);

    action = data.action;
    channel = data.channel;
  } catch (error) {
    error = error as Error;
    action = "decline";
  }

  if (channel) {
    channel.unsubscribe();
    supabase.removeChannel(channel);
  }

  return {
    action,
    error: error?.message,
  };
};
