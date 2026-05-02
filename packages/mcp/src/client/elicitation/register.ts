import type {
  ElicitRequestFormParams,
  ElicitResult,
} from "@modelcontextprotocol/client";
import { Client } from "@modelcontextprotocol/client";
import type { UIMessageStreamWriter } from "ai";

/** App-specific handler that persists elicitation state and resolves user approval */
export type FormElicitationHandler = (
  params: ElicitRequestFormParams,
  writer: UIMessageStreamWriter,
) => Promise<ElicitResult>;

export const registerClientElicitationHandlers = (
  client: Client,
  writer: UIMessageStreamWriter,
  onFormElicitation: FormElicitationHandler,
) => {
  client.setRequestHandler("elicitation/create", async (request) => {
    const mode = request.params.mode;

    if (mode !== "form") {
      throw new Error(`Unsupported elicitation mode: ${mode}`);
    }

    const result = await onFormElicitation(request.params, writer);

    return result;
  });
};
