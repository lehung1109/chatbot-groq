import { Client } from "@modelcontextprotocol/client";
import { UIMessageStreamWriter } from "ai";

export const registerClientRootsHandlers = (
  client: Client,
  writer: UIMessageStreamWriter,
) => {
  console.log("Registering client roots handlers...");
  client.setRequestHandler("roots/list", async (request, extra) => {
    return {
      roots: [
        {
          uri: "file:///Users/HuLK/projects/chatbot-groq/mcp",
          name: "My Application",
        },
      ],
    };
  });
  console.log("Client roots handlers registered");
};
