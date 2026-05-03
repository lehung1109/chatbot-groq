import { McpServer } from "@modelcontextprotocol/server";
import fs from "node:fs/promises";

const RESOURCE_URI = "db:///users/example-1";
const RESOURCE_NAME = "example-1";

type JsonRecord = { id: string };

export const registerExampleResource = (server: McpServer) => {
  server.registerResource(
    RESOURCE_NAME,
    RESOURCE_URI,
    {
      title: "AGENTS.md",
      description: "AGENTS.md file for ResourceLink demonstration",
      mimeType: "text/plain",
    },
    async (uri) => {
      const fileContent = await fs.readFile("AGENTS.md", "utf8");

      // send logging message
      await server.sendLoggingMessage({
        level: "info",
        data: `Example resource called with name: AGENTS.md`,
      });

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/plain",
            text: fileContent,
          },
        ],
      };
    },
  );
};
