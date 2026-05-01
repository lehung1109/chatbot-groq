# `@heroitvn/mcp`

Helpers for running an [MCP](https://modelcontextprotocol.io/) server over **Streamable HTTP** in Next.js / Node, plus a small client bootstrap for connecting over HTTP.

## Install

```bash
npm install @heroitvn/mcp
```

Peer-style runtime deps are declared on the package (`@modelcontextprotocol/server`, `@modelcontextprotocol/client`, `ai`, `@ai-sdk/groq`, `zod`).

## Next.js (App Router)

Wire `POST`, `GET`, and `DELETE` on your MCP route to the package handlers:

```ts
import {
  deleteHandler,
  getHandler,
  postHandler,
} from "@heroitvn/mcp";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await postHandler(req);
}

export async function GET(req: NextRequest) {
  return await getHandler(req);
}

export async function DELETE(req: NextRequest) {
  return await deleteHandler(req);
}
```

Sessions use the **`mcp-session-id`** header (`MCP_SESSION_ID_HEADER`). After `initialize`, clients should send this header on subsequent requests (the official Streamable HTTP client transport does this).

## Client

Connect to your deployed MCP HTTP endpoint:

```ts
import { initConnectClientToServer } from "@heroitvn/mcp";

const client = await initConnectClientToServer("https://your-app.example/api/mcp");
// or set MCP_SERVER_URL and call initConnectClientToServer()
```

Use `createClientInstance`, `registerClientRootsHandlers`, `registerClientElicitationHandlers`, and `registerClientSamplingHandlers` when you need finer control over client capabilities.

## Server customization

- **`createServerInstance`** / **`mcpServerInstance`** — default server with tools, resources, and prompts registered.
- **`registerTools`**, **`registerResources`**, **`registerPrompts`** — compose your own `McpServer` instance.

## Utilities

- **`convertToZodSchema`** — map a simple MCP-style JSON Schema object to a Zod object schema (useful for tool args).
- **`InMemoryEventStore`** — in-memory store used by the HTTP transport wiring.

## Scripts (package repo)

```bash
npm run build   # tsup → dist/
npm run clean   # remove dist/
```

`prepublishOnly` runs `build` before publish.

## License

MIT
