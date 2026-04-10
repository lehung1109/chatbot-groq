import { resolveElicitation } from "@/mcp/client/elicitation-store";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { requestId, value } = await req.json();

  console.log("received elicitation request", requestId, value);

  resolveElicitation(requestId, {
    action: "accept",
    content: {
      comment: value,
    },
  });

  return Response.json({
    message: "Elicitation received",
    requestId,
    value,
  });
}
