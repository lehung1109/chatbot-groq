import { processFormElicitation } from "@/mcp/host/handlers/elicitation";
import { Client } from "@modelcontextprotocol/client";

export const registerClientElicitationHandlers = (
  client: Client,
  transformStream: TransformStream,
) => {
  console.log("Registering client elicitation handlers...");
  client.setRequestHandler("elicitation/create", async (request, extra) => {
    const mode = request.params.mode;

    if (mode !== "form") {
      throw new Error(`Unsupported elicitation mode: ${mode}`);
    }

    const result = await processFormElicitation(
      request.params,
      transformStream,
    );

    return result;
  });
  console.log("Client elicitation handlers registered");
};
