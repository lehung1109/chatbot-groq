import { postHandler } from "@/mcp/server/handlers/post-handler";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await postHandler(req);
}
