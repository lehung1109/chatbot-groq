import { CallToolResult, McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { findFileByName, getRootFolder } from "../helpers";
import fs from "node:fs/promises";

export const registerFindFileTool = (server: McpServer) => {
  server.registerTool(
    "find-file",
    {
      title: "Find File Tool",
      description: "a tool to find a file in the file system",
      inputSchema: z.object({
        name: z.string().describe("Name of the file to find"),
      }),
    },
    async ({ name }, ctx): Promise<CallToolResult> => {
      console.log("Find file tool called with name: ", name);
      await server.sendLoggingMessage({
        level: "info",
        data: `Find file tool called with name: ${name}`,
      });

      // logic to find the file by name in the file system recursively
      console.log("Getting root folder");
      const rootFolder = await getRootFolder(server);
      console.log("Root folder: ", rootFolder);
      const file = await findFileByName(rootFolder, name);

      if (!file) {
        throw new Error(`File ${name} not found`);
      }

      console.log("Reading file content: ", file);
      const fileContent = await fs.readFile(file, "utf8");

      return { content: [{ type: "text", text: fileContent }] };
    },
  );
};
