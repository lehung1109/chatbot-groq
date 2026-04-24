# chatbot-groq

A Next.js chat application that talks to [Groq](https://groq.com/) through the [Vercel AI SDK](https://sdk.vercel.ai/). The UI uses streaming responses, model selection, and custom chat components (ai-elements–style patterns).

## Features

- **Streaming replies** via `POST /api/chat` using `streamText` and `toUIMessageStreamResponse` (sources and reasoning channels enabled where supported).
- **Multiple Groq models** selectable in the UI (Llama, Mixtral, Qwen, DeepSeek, Kimi, and others defined in `types/groq.ts`).
- **Modern stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Radix UI, and Streamdown for rich message rendering.

## Prerequisites

- Node.js 20+ (recommended)
- A [Groq API key](https://console.groq.com/)

## Setup

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root (or add to your environment):

   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   ```

   The `@ai-sdk/groq` provider reads `GROQ_API_KEY` automatically.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description           |
| --------------- | --------------------- |
| `npm run dev`   | Start dev server      |
| `npm run build` | Production build      |
| `npm run start` | Run production server |
| `npm run lint`  | Run ESLint            |

## Project layout

- `app/api/chat/route.ts` — Groq-backed streaming chat API.
- `components/chatbot/` — Chat UI (conversation, input, model selector).
- `types/groq.ts` — Allowed Groq model IDs for the app.

## Mermaid: end-to-end flow

```mermaid
sequenceDiagram
    participant User as User UI(Browser)
    participant Application as AI Application(Nextjs)

    User->>Application:/api/chat/send
    Application->>LLM:Forward message
    alt LLM doesn't call tools
        LLM->>Application:Response message
        Application->>User:Forward message
    else LLM call tools
        LLM->>Application:Need call tools
        Application->>MCP Client:call tools
        MCP Client->>MCP Server: call tools
        alt MCP Server doesn't need User Action
            MCP Server->>MCP Client:MCP Server tools response
            MCP Client->>Application:Forward tools response
            Application->>LLM:Forward tools response
            LLM->>Application:LLM response
            Application->>User:Forward LLM response
        else MCP Server needs User Action
            MCP Server->>DB:Save current context
            MCP Server->>MCP Client:Needs User Action
            MCP Client->>Application:Forward request Action
            Application->>User:Display UI for User
            Note right of Application:Disconnect MCP Server
        end
    end
    Note over User,DB: Request - Response circle for /api/chat/send
    alt user action timeout 1h or 1day
        User->>Application:timeout
        Application->>MCP Client:timeout
        MCP Client->>MCP Server:timeout
        MCP Server->>DB:Update context for timeout
        Application->>User:Show message timeout
        Note right of Application:Disconnect MCP Server
    else user reject
        User->>Application:Reject
        Application->>MCP Client:reject
        MCP Client->>MCP Server:reject
        MCP Server->>DB:Update context for reject
        Application->>User:Show message reject
        Note right of Application:Disconnect MCP Server
    else user action is valid
        User->>Application:/api/chat/approve
        Application->>MCP Client:User action data
        MCP Client->>MCP Server:Forward data
        MCP Server->>DB:Read context for the action
        MCP Server->>MCP Server:MCP Server continue processing context
        MCP Server->>MCP Client:MCP Server tools response
        MCP Client->>Application:Forward tools response
        Application->>LLM:Forward tools response
        LLM->>Application:LLM response
        Application->>User:Forward LLM response
    end
    Note over User,DB: Request - Response circle for /api/chat/approve
```

## Deployment

You can deploy on [Vercel](https://vercel.com/) or any host that supports Next.js. Set `GROQ_API_KEY` in the hosting provider’s environment variables; do not commit real keys to the repository.
