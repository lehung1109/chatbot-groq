export { MCP_SESSION_ID_HEADER } from "./constants";
export { convertToZodSchema } from "./schema-utils";

export { postHandler } from "./server/handlers/post-handler";
export { getHandler } from "./server/handlers/get-handler";
export { deleteHandler } from "./server/handlers/delete-handler";

export {
  createServerInstance,
  mcpServerInstance,
} from "./server/create-server-instance";

export { createClientInstance } from "./client/create-client-instance";
export { initConnectClientToServer } from "./client/init-connect";

export {
  registerClientRootsHandlers,
  type ClientRoot,
} from "./client/roots";

export {
  registerClientElicitationHandlers,
  type FormElicitationHandler,
} from "./client/elicitation";

export { registerClientSamplingHandlers } from "./client/sampling";

export { InMemoryEventStore } from "./event-stores/in-memory-event-store";

/** Advanced: compose your own MCP server */
export { registerTools } from "./server/register-tools";
export { registerResources } from "./server/register-resources";
export { registerPrompts } from "./server/register-prompts";
