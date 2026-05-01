import { CallToolResult, McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { assertPathInRoots } from "../helpers";
import fs from "node:fs/promises";

export const registerReadTextFileTool = (server: McpServer) => {
  server.registerTool(
    "read-text-file",
    {
      title: "Read Text File Tool when know absolutely the file path",
      description: "a tool to read a text file from the file system",
      inputSchema: z.object({
        filePath: z.string().describe("Path to the file to read"),
      }),
    },
    async ({ filePath }, ctx): Promise<CallToolResult> => {
      await server.sendLoggingMessage({
        level: "info",
        data: `Read text file tool called with file: ${filePath}`,
      });

      await assertPathInRoots(filePath, server);

      const fileContent = await fs.readFile(filePath, "utf8");

      return { content: [{ type: "text", text: fileContent }] };
    },
  );
};
