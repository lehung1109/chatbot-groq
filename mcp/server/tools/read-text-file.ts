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
      console.log("Read text file tool called with file: ", filePath);
      await server.sendLoggingMessage({
        level: "info",
        data: `Read text file tool called with file: ${filePath}`,
      });

      console.log("Asserting path in roots: ", filePath);
      await assertPathInRoots(filePath, server);

      console.log("Reading file content: ", filePath);
      const fileContent = await fs.readFile(filePath, "utf8");

      return { content: [{ type: "text", text: fileContent }] };
    },
  );
};
