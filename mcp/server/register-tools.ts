import { McpServer } from "@modelcontextprotocol/server";
import { registerGreatTool } from "./tools/great";
import { registerFindFileTool } from "./tools/find-file";
import { registerReadTextFileTool } from "./tools/read-text-file";

export const registerTools = (server: McpServer) => {
  registerGreatTool(server);
  registerFindFileTool(server);
  // registerReadTextFileTool(server);
};
