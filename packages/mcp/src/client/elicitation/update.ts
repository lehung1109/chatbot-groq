import { createClient } from "@heroitvn/supabase/server";

export const updateElicitation = async (req: Request) => {
  const { elicitationId, action } = await req.json();
  const supabase = await createClient();

  // update elicitation state
  const { error: updateElicitationError } = await supabase
    .from("elicitation_state")
    .update({
      state: action === "accept" ? "approved" : "rejected",
    })
    .eq("id", elicitationId);

  if (updateElicitationError) {
    return Response.json(
      {
        message: "Failed to update elicitation",
        error: updateElicitationError.message,
      },
      { status: 500 },
    );
  }

  return Response.json({
    message: "Elicitation updated",
    elicitationId,
    action,
  });
};
