# `@heroitvn/mcp`

Model Context Protocol helpers: **Streamable HTTP** server handlers for Next.js / Node, client bootstrap over HTTP, **`MCPHost`** for orchestrating chat requests with tools and elicitation, plus registration helpers for tools, resources, and prompts.

## Install

```bash
npm install @heroitvn/mcp
```

Peer-style runtime dependencies include `@modelcontextprotocol/server`, `@modelcontextprotocol/client`, `ai`, `@ai-sdk/groq`, `zod`, and (for some flows) `@supabase/supabase-js`. The package also depends on `@heroitvn/chatbot-toggle` for integrated UI flows.

## Next.js (App Router)

Wire `POST`, `GET`, and `DELETE` on your MCP route:

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

## Chat host (`MCPHost`)

The main app wires `POST /api/chat` with `MCPHost` from this package: it connects Groq streaming, MCP tools, Supabase, and elicitation handling. Import `MCPHost` from `@heroitvn/mcp` and call `handleRequest` with the incoming `Request` and your Supabase server client when applicable.

## Client

Connect to a deployed MCP HTTP endpoint:

```ts
import { initConnectClientToServer } from "@heroitvn/mcp";

const client = await initConnectClientToServer("https://your-app.example/api/mcp");
// or set MCP_SERVER_URL and call initConnectClientToServer()
```

Use `createClientInstance`, `registerClientRootsHandlers`, `registerClientElicitationHandlers`, and `registerClientSamplingHandlers` for finer control over client capabilities.

## Elicitation

- **`registerClientElicitationHandlers`** — register form elicitation handlers on the client.
- **`updateElicitation`** — used by HTTP routes (e.g. `POST /api/elicitation`) to resume or update elicitation state.

## Server customization

- **`createServerInstance`** / **`mcpServerInstance`** — default server with tools, resources, and prompts.
- **`registerTools`**, **`registerResources`**, **`registerPrompts`** — compose your own `McpServer` instance.

## Utilities

- **`convertToZodSchema`** — map a simple MCP-style JSON Schema object to a Zod object schema (tool arguments).
- **`InMemoryEventStore`** — in-memory store used by HTTP transport wiring.

## Scripts (package repo)

```bash
npm run build   # tsup
npm run typecheck
```

## License

MIT
