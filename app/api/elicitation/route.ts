// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { requestId, value } = await req.json();

  return Response.json({
    message: "Elicitation received",
    requestId,
    value,
  });
}
