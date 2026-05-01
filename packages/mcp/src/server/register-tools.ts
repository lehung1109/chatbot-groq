import { McpServer } from "@modelcontextprotocol/server";
import { registerGetUsersTool } from "./tools/get-users";
import { registerFindFileTool } from "./tools/find-file";
import { registerReadTextFileTool } from "./tools/read-text-file";

export const registerTools = (server: McpServer) => {
  registerGetUsersTool(server);
  registerFindFileTool(server);
  registerReadTextFileTool(server);
};
