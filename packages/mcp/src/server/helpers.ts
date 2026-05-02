import { McpServer } from "@modelcontextprotocol/server";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globby } from "globby";

export async function getAllowedFileRoots(serverInstance: McpServer) {
  const { roots } = await serverInstance.server.listRoots();

  return roots
    .filter((root) => root.uri.startsWith("file://"))
    .map((root) => ({
      name: root.name,
      dir: fileURLToPath(root.uri),
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
  const filePaths = await globby(["**/*"], {
    cwd: dir,
    gitignore: true,
    onlyFiles: true,
  });

  for (const filePath of filePaths) {
    const fileName = path.basename(filePath);

    if (fileName === targetFileName) {
      return path.join(dir, filePath);
    }
  }

  return null;
}
