import { CallToolResult, McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { assertPathInRoots } from "../helpers";
import fs from "node:fs/promises";

export const registerReadTextFileTool = (server: McpServer) => {
  server.registerTool(
    "read-text-file",
    {
      title: "Read Text File Tool",
      description: "a tool to read a text file from the file system",
      inputSchema: z.object({
        file: z.string().describe("Path to the file to read"),
      }),
    },
    async ({ file }, ctx): Promise<CallToolResult> => {
      console.log("Read text file tool called with file: ", file);
      await server.sendLoggingMessage({
        level: "info",
        data: `Read text file tool called with file: ${file}`,
      });

      console.log("Asserting path in roots: ", file);
      await assertPathInRoots(file, server);

      console.log("Reading file content: ", file);
      const fileContent = await fs.readFile(file, "utf8");

      return { content: [{ type: "text", text: fileContent }] };
    },
  );
};
