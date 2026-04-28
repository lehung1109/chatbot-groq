import { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";

class ElicitationStore {
  async waitElicitation(elicitationId: string, supabase: SupabaseClient) {
    return new Promise<{
      action: "accept" | "decline";
      channel: RealtimeChannel;
    }>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Elicitation timed out after 60 seconds"));
      }, 60000);

      const channel = supabase.channel(`elicitation:${elicitationId}`).on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "elicitation_state",
          filter: `id = ${elicitationId}`,
        },
        (payload) => {
          if (payload.new.state === "approved") {
            resolve({
              action: "accept",
              channel,
            });
          } else if (payload.new.state === "rejected") {
            resolve({
              action: "decline",
              channel,
            });
          } else {
            reject(new Error("Elicitation state unknown"));
          }

          channel.unsubscribe();

          clearTimeout(timeout);
        },
      );
    });
  }
}

const elicitationStore = new ElicitationStore();

export default elicitationStore;
