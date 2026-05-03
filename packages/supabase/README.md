# `@heroitvn/supabase`

Thin wrappers around [`@supabase/ssr`](https://supabase.com/docs/guides/auth/server-side/nextjs) for Next.js: browser client, server client (cookies), and a proxy-oriented helper.

This package is **`private: true`** in the monorepo; it is consumed via workspace references rather than published standalone.

## Environment variables

All clients expect:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Configure these in `.env.local` (see the repository root `README.md`).

## Exports

### `@heroitvn/supabase/client`

Browser Supabase client (`createBrowserClient`). Use in Client Components.

```ts
import { createClient } from "@heroitvn/supabase/client";

const supabase = createClient();
```

### `@heroitvn/supabase/server`

Server Supabase client with cookie handling for App Router. Use in Server Components, Route Handlers, and Server Actions.

```ts
import { createClient } from "@heroitvn/supabase/server";

const supabase = await createClient();
```

### `@heroitvn/supabase/proxy`

`updateSession(request)` — server client with cookie handling, `getClaims()` for session continuity, and optional redirects between `/dashboard` and `/sign-in`. Intended for Next.js middleware or similar request boundaries (see `src/proxy.ts`).

## Peer dependencies

- `next` >= 14

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run typecheck` | `tsc --noEmit` |

## License

MIT
