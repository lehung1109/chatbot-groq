import { processFormElicitation } from "@/mcp/ai-application/handlers/elicitation";
import { Client } from "@modelcontextprotocol/client";

export const elicitationHandler = (client: Client) => {
  client.setRequestHandler("elicitation/create", async (request, extra) => {
    const mode = request.params.mode;

    if (mode !== "form") {
      throw new Error(`Unsupported elicitation mode: ${mode}`);
    }

    const result = await processFormElicitation(request.params);

    return result;
  });
};
