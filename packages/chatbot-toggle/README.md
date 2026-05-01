# @heroitvn/chatbot-toggle

Workspace package that exposes `ChatbotToggle` and its chatbot module surface.

## Usage

```tsx
import { ChatbotToggle } from "@heroitvn/chatbot-toggle";

export function Example() {
  return <ChatbotToggle isFloat={true} />;
}
```

## Exports

- `ChatbotToggle`
- `Chatbot`
- `FloatingChatbot`
- `AIProvider`
- `ChatbotStoreProvider`, `useChatbotStore`
- `GroqChatModelId`
- `chatbotSuggestions`, `chatbotMockResponses`
- chatbot store types and factory

## Migration

- Legacy path was removed from the codebase.
- New import: `@heroitvn/chatbot-toggle`
