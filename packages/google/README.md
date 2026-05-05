# `@heroitvn/google`

Google Sign-In and [Google One Tap](https://developers.google.com/identity/gsi/web) UI for Next.js, integrated with Supabase session flows via `@heroitvn/supabase`.

## Environment variables

- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` — OAuth 2.0 Web client ID (used by One Tap and button flows).

## Exports

### `@heroitvn/google/google-sign-in-button`

Button-oriented Google sign-in UI (see `src/google-sign-in-button.tsx`).

### `@heroitvn/google/one-tap-google-sign-in`

One Tap prompt component (see `src/one-tap-google-sign-in.tsx`).

### `@heroitvn/google/nonce`

Nonce helpers for secure OAuth / CSP integration (`generateNonce` is also re-exported from `@heroitvn/utils` for convenience in the app).

## Peer dependencies

- `next` >= 14
- `react` >= 18

## Dependencies

- `@heroitvn/supabase`
- `google-one-tap`
- `sonner` (toasts)

## Scripts

| Command             | Description    |
| ------------------- | -------------- |
| `npm run typecheck` | `tsc --noEmit` |

## License

MIT
