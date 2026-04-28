import { Client } from "@modelcontextprotocol/client";
import { UIMessageStreamWriter } from "ai";

export const registerClientRootsHandlers = (
  client: Client,
  writer: UIMessageStreamWriter,
) => {
  client.setRequestHandler("roots/list", async (request, extra) => {
    return {
      roots: [
        {
          uri: "file://Users/HuLK/projects/chatbot-groq",
          name: "My Application",
        },
      ],
    };
  });
};
