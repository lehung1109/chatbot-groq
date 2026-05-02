import { updateElicitation } from "@/packages/mcp/src";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  return updateElicitation(req);
}
