import {
  deleteHandler,
  getHandler,
  postHandler,
} from "@heroitvn/mcp";
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
