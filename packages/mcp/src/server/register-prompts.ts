import { McpServer } from "@modelcontextprotocol/server";
import { registerExamplePrompt } from "./prompts/example";

export const registerPrompts = (server: McpServer) => {
  registerExamplePrompt(server);
};
