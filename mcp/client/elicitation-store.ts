import { ElicitResult } from "@modelcontextprotocol/server";

const elicitationMap = new Map<
  string,
  {
    resolve: (value: ElicitResult) => void;
    reject: (reason?: unknown) => void;
  }
>();

export function addElicitation(
  id: string,
  resolve: (value: ElicitResult) => void,
  reject: (reason?: unknown) => void,
) {
  elicitationMap.set(id, { resolve, reject });
}

export function resolveElicitation(id: string, value: ElicitResult) {
  const entry = elicitationMap.get(id);
  entry?.resolve(value);
  elicitationMap.delete(id);
}

export function rejectElicitation(id: string, reason?: unknown) {
  const entry = elicitationMap.get(id);
  entry?.reject(reason);
  elicitationMap.delete(id);
}
