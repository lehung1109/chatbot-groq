import { Client } from "@modelcontextprotocol/client";

export const createClientInstance = () => {
  const client = new Client(
    {
      name: "chatbot-groq-mcp-client",
      version: "1.0.0",
    },
    {
      capabilities: {
        elicitation: {
          form: {},
        },
        roots: {
          listChanged: true,
        },
        sampling: {},
      },
    },
  );

  client.onerror = (error) => {
    console.error("\u001B[31mClient error:", error, "\u001B[0m");
  };

  return client;
};
