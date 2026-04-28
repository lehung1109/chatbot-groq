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
  userMessageId: string,
): Promise<ElicitResult> => {
  // save elicitation state to database
  const { data: elicitationData, error: saveElicitationError } = await supabase
    .from("elicitation_state")
    .insert({
      state: "waiting_approval",
      message_id: userMessageId,
    })
    .select()
    .single();

  if (saveElicitationError) {
    throw new Error(saveElicitationError.message);
  }

  const elicitationId = elicitationData.id;

  writer.write({
    type: "data-elicitation",
    data: {
      requestParams,
      elicitationId,
    },
  });

  let action: "accept" | "decline";
  let channel: RealtimeChannel | undefined;
  let error: Error | undefined;

  try {
    const data = await elicitationStore.waitElicitation(
      elicitationId,
      supabase,
    );

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
