import { McpServer } from "@modelcontextprotocol/server";
import { registerGreatTool } from "./tools/great";

export const registerTools = (server: McpServer) => {
  registerGreatTool(server);
};
