const elicitationMap = new Map<
  string,
  { resolve: (value: unknown) => void; reject: (reason?: unknown) => void }
>();

export function addElicitation(
  toolCallId: string,
  resolve: (value: unknown) => void,
  reject: (reason?: unknown) => void,
) {
  elicitationMap.set(toolCallId, { resolve, reject });
}

export function resolveElicitation(toolCallId: string, value: unknown) {
  const entry = elicitationMap.get(toolCallId);
  entry?.resolve(value);
  elicitationMap.delete(toolCallId);
}

export function rejectElicitation(toolCallId: string, reason?: unknown) {
  const entry = elicitationMap.get(toolCallId);
  entry?.reject(reason);
  elicitationMap.delete(toolCallId);
}

export function getElicitation(toolCallId: string) {
  return elicitationMap.get(toolCallId);
}
