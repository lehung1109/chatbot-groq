import { McpServer } from "@modelcontextprotocol/server";
import path from "node:path";
import fs from "node:fs/promises";

export async function getAllowedFileRoots(serverInstance: McpServer) {
  const { roots } = await serverInstance.server.listRoots();

  return roots
    .filter((root) => root.uri.startsWith("file://"))
    .map((root) => ({
      name: root.name,
      dir: path.resolve(root.uri.replace("file://", "/")),
    }));
}

export async function assertPathInRoots(
  targetPath: string,
  serverInstance: McpServer,
) {
  const resolvedTarget = path.resolve(targetPath);
  const allowedRoots = await getAllowedFileRoots(serverInstance);

  const allowed = allowedRoots.some((root) => {
    const relative = path.relative(root.dir, resolvedTarget);
    return (
      relative === "" ||
      (!relative.startsWith("..") && !path.isAbsolute(relative))
    );
  });

  if (!allowed) {
    throw new Error(`Access denied: ${targetPath} is outside client roots`);
  }
}

export const getRootFolder = async (serverInstance: McpServer) => {
  const allowedRoots = await getAllowedFileRoots(serverInstance);
  const rootFolder = allowedRoots[0];

  if (!rootFolder) {
    throw new Error("No file roots registered on the MCP client");
  }

  return rootFolder.dir;
};

export async function findFileByName(
  dir: string,
  targetFileName: string,
): Promise<string | null> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isFile() && entry.name === targetFileName) {
      return fullPath;
    }

    if (entry.isDirectory()) {
      const result = await findFileByName(fullPath, targetFileName);

      if (result) return result;
    }
  }

  return null;
}
