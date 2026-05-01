import type {
  ElicitRequestFormParams,
  ElicitResult,
} from "@modelcontextprotocol/client";
import type {
  RealtimeChannel,
  SupabaseClient,
} from "@supabase/supabase-js";
import type { UIMessageStreamWriter } from "ai";
import elicitationStore from "./elicitation-store";

export const processFormElicitation = async (
  requestParams: ElicitRequestFormParams,
  writer: UIMessageStreamWriter,
  supabase: SupabaseClient,
  userMessageId: string,
): Promise<ElicitResult> => {
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
  } catch (err) {
    error = err as Error;
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
