import { Client } from "@modelcontextprotocol/client";
import type { UIMessageStreamWriter } from "ai";

export type ClientRoot = { uri: string; name: string };

export const registerClientRootsHandlers = (
  client: Client,
  writer: UIMessageStreamWriter,
  roots: ClientRoot[],
) => {
  client.setRequestHandler("roots/list", async () => {
    return { roots };
  });
};
