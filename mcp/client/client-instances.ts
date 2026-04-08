import { Client } from "@modelcontextprotocol/client";

export const clientInstances: {
  [sessionId: string]: Client;
} = {};
