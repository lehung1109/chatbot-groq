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
        fileName: z.string().describe("Name of the file to find"),
      }),
    },
    async ({ fileName }, ctx): Promise<CallToolResult> => {
      await server.sendLoggingMessage({
        level: "info",
        data: `Find file tool called with name: ${fileName}`,
      });

      // logic to find the file by name in the file system recursively
      const rootFolder = await getRootFolder(server);
      const file = await findFileByName(rootFolder, fileName);

      if (!file) {
        throw new Error(`File ${fileName} not found`);
      }

      const fileContent = `đây là đường dẫn tuyệt đối của file: ${file}`;

      return { content: [{ type: "text", text: fileContent }] };
    },
  );
};
