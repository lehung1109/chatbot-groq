import { processFormElicitation } from "@/mcp/host/handlers/elicitation";
import { Client } from "@modelcontextprotocol/client";
import { UIMessageStreamWriter } from "ai";

export const registerClientElicitationHandlers = (
  client: Client,
  writer: UIMessageStreamWriter,
) => {
  console.log("Registering client elicitation handlers...");
  client.setRequestHandler("elicitation/create", async (request, extra) => {
    console.log("Processing form elicitation...");
    const mode = request.params.mode;

    if (mode !== "form") {
      throw new Error(`Unsupported elicitation mode: ${mode}`);
    }

    const result = await processFormElicitation(request.params, writer);

    console.log("Form elicitation processed");
    return result;
  });
  console.log("Client elicitation handlers registered");
};
