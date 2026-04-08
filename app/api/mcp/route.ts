import { deleteHandler } from "@/mcp/server/handlers/delete-handler";
import { getHandler } from "@/mcp/server/handlers/get-handler";
import { postHandler } from "@/mcp/server/handlers/post-handler";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await postHandler(req);
}

export async function GET(req: NextRequest) {
  return await getHandler(req);
}

export async function DELETE(req: NextRequest) {
  return await deleteHandler(req);
}
