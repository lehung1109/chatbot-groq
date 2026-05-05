# `@heroitvn/utils`

Small shared utilities used across workspace packages: Tailwind class merging, error messaging, a JSON-schema-to-Zod helper, and re-exports used by the chat/MCP stack.

## Export

The package exposes a single entry point:

```ts
import {
  cn,
  delay,
  getErrorMessage,
  convertToZodSchema,
  MCP_SESSION_ID_HEADER,
  generateNonce,
} from "@heroitvn/utils";
```

| Symbol                  | Purpose                                                               |
| ----------------------- | --------------------------------------------------------------------- |
| `cn`                    | `clsx` + `tailwind-merge` for component classes                       |
| `delay`                 | Promise-based sleep                                                   |
| `getErrorMessage`       | Normalize `unknown` errors to a string                                |
| `convertToZodSchema`    | Build a Zod object schema from a constrained JSON-schema-like shape   |
| `MCP_SESSION_ID_HEADER` | Constant `"mcp-session-id"` (same semantic header as `@heroitvn/mcp`) |
| `generateNonce`         | Re-exported from `@heroitvn/google/nonce` for OAuth flows             |

## Dependencies

- `clsx`, `tailwind-merge`, `zod`, `ai` (types for JSON schema conversion)
- `@heroitvn/google` (for `generateNonce` re-export)

## Scripts

| Command             | Description    |
| ------------------- | -------------- |
| `npm run typecheck` | `tsc --noEmit` |

## License

MIT
