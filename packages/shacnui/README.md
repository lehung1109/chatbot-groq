# `@heroitvn/shacnui`

Shared [shadcn/ui](https://ui.shadcn.com/)-style components for the monorepo, exposed as deep imports under `ui/*`.

## Usage

Import components by path:

```tsx
import { Button } from "@heroitvn/shacnui/ui/button";
// Other entries live under packages/shacnui/src/ui/
```

The export map uses `@heroitvn/shacnui/ui/*` → `./src/ui/*` (see `package.json` `"exports"`).

## Dependencies

- `@heroitvn/utils` — includes `cn()` for class merging

## Peer dependencies

- `react` and `react-dom` (aligned with the app)

## Scripts

| Command             | Description    |
| ------------------- | -------------- |
| `npm run typecheck` | `tsc --noEmit` |

## License

MIT
