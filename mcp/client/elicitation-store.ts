import type { WritableStreamDefaultWriter } from "node:stream/web";

const elicitationMap = new Map<
  string,
  {
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
    writableStream: WritableStreamDefaultWriter;
  }
>();

export function addElicitation(
  id: string,
  resolve: (value: unknown) => void,
  reject: (reason?: unknown) => void,
  writableStream: WritableStreamDefaultWriter,
) {
  elicitationMap.set(id, { resolve, reject, writableStream });
}

export function resolveElicitation(id: string, value: unknown) {
  const entry = elicitationMap.get(id);
  entry?.resolve(value);
  elicitationMap.delete(id);
  entry?.writableStream.close();
}

export function rejectElicitation(id: string, reason?: unknown) {
  const entry = elicitationMap.get(id);
  entry?.reject(reason);
  elicitationMap.delete(id);
  entry?.writableStream.close();
}
