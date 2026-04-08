import { McpServer } from "@modelcontextprotocol/server";
import { registerTools } from "./register-tools";
import { registerResources } from "./register-resources";
import { registerPrompts } from "./register-prompts";

export const createServerInstance = () => {
  const server = new McpServer(
    {
      name: "chatbot-groq-mcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {
          listChanged: true,
        },
        resources: {
          subscribe: true,
          listChanged: true,
        },
        prompts: {
          listChanged: true,
        },
        logging: {},
      },
    },
  );

  registerTools(server);
  registerResources(server);
  registerPrompts(server);

  return server;
};

export const mcpServerInstance = createServerInstance();
