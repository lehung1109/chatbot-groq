import { McpServer } from "@modelcontextprotocol/server";
import { registerExampleResource } from "./resources/example";

export const registerResources = (server: McpServer) => {
  registerExampleResource(server);
};
