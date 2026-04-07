import { User } from "@/types/db";
import { McpServer } from "@modelcontextprotocol/server";
import fs from "fs/promises";

const RESOURCE_URI = "db:///users/example-1";
const RESOURCE_NAME = "example-1";

export const registerExampleResource = (server: McpServer) => {
  server.registerResource(
    RESOURCE_NAME,
    RESOURCE_URI,
    {
      title: "Example 1",
      description: "First example file for ResourceLink demonstration",
      mimeType: "application/json",
    },
    async (uri) => {
      // reading local file
      const file = await fs.readFile("db/users.json", "utf8");
      const users = JSON.parse(file);

      // get user by id example-1
      const user = users.find((user: User) => user.id === RESOURCE_NAME);

      // send logging message
      await server.sendLoggingMessage({
        level: "info",
        data: `Example resource called with name: ${RESOURCE_NAME}`,
      });

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(user),
          },
        ],
      };
    },
  );
};
