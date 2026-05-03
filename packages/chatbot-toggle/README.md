# `@heroitvn/chatbot-toggle`

Workspace package that provides the floating chat entry point (`ChatbotToggle`), full chat surface (`Chatbot` / `FloatingChatbot`), AI context (`AIProvider`), and a Zustand-backed chat store for the Incident Copilot UI.

## Install

Used as a workspace dependency from the monorepo root (`"@heroitvn/chatbot-toggle": "^0.1.0"`). For a standalone install from npm (if published):

```bash
npm install @heroitvn/chatbot-toggle
```

## Peer dependencies

- `react` and `react-dom` (aligned with the app, currently React 19)

Runtime dependencies include `@ai-sdk/react`, `ai`, `@modelcontextprotocol/client`, `@heroitvn/shacnui`, `@heroitvn/utils`, `zustand`, `lucide-react`, and `sonner`.

## Usage

```tsx
import { ChatbotToggle } from "@heroitvn/chatbot-toggle";

export function Example() {
  return <ChatbotToggle isFloat={true} />;
}
```

Wrap the app (or subtree) with `AIProvider` and `ChatbotStoreProvider` as in the main Next.js app when using streaming and shared chat state.

## Exports

| Export | Description |
| ------ | ----------- |
| `ChatbotToggle`, `ChatbotToggleProps` | Primary toggle / launcher |
| `Chatbot`, `ChatbotProps` | Inline chat panel |
| `FloatingChatbot`, `FloatingChatbotProps` | Floating window variant |
| `AIProvider`, `AIProviderProps` | AI SDK / chat context |
| `ChatbotStoreProvider`, `useChatbotStore` | Zustand store provider and hook |
| `createChatbotStore`, `defaultInitState` | Store factory and initial state |
| `ChatbotActions`, `ChatbotState`, `ChatbotStore` | Store types |
| `GroqChatModelId` | Union of allowed Groq model IDs |
| `chatbotSuggestions`, `chatbotMockResponses` | Static suggestion / mock data |

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run build` | Typecheck (`tsc --noEmit`) |
| `npm run typecheck` | Same as build |

## Migration

- Legacy import paths were removed; use the package name `@heroitvn/chatbot-toggle`.

## License

MIT
