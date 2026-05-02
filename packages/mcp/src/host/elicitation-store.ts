import type { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";

class ElicitationStore {
  async waitElicitation(elicitationId: string, supabase: SupabaseClient) {
    return new Promise<{
      action: "accept" | "decline";
      channel: RealtimeChannel;
    }>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Elicitation timed out after 60 seconds"));
      }, 600000);

      console.log("elicitationId waiting for approval", elicitationId);

      const channel = supabase
        .channel(`elicitation:${elicitationId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "elicitation_state",
            filter: `id=eq.${elicitationId}`,
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
        )
        .subscribe((status) => {
          console.log("realtime status", status);
        });
    });
  }
}

const elicitationStore = new ElicitationStore();

export default elicitationStore;
