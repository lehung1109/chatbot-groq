import { SupabaseClient } from "@supabase/supabase-js";

class ElicitationStore {
  async waitElicitation(elicitationId: string, supabase: SupabaseClient) {
    return new Promise((resolve, reject) => {
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
            resolve(payload.new);
          } else if (payload.new.state === "rejected") {
            reject("Elicitation rejected");
          } else {
            reject("Elicitation state unknown");
          }

          channel.unsubscribe();

          clearTimeout(timeout);
        },
      );
    });
  }
}

export default new ElicitationStore();
