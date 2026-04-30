# streaming-typewriter-raf

React typewriter component optimized for streaming text with `requestAnimationFrame`.

## Install

```bash
npm i @heroitvn/streaming-typewriter-raf
```

## Requirements

- `react` `>=18`
- No `react-dom` peer dependency is required by this package

## Usage

```tsx
import { StreamingTypewriterRAF } from "@heroitvn/streaming-typewriter-raf";

export function Demo() {
  return (
    <StreamingTypewriterRAF
      text="Streaming content from AI..."
      status="streaming"
      speed={20}
      showCursor
    />
  );
}
```

## Props

- `text`: full streamed text
- `status`: `'streaming' | 'done'`
- `speed`: milliseconds per animation step, default `20`
- `showCursor`: show the blinking cursor while typing, default `true`

## Notes

- The cursor uses Tailwind utility classes for styling.
- The package build output is `dist/`, and only that folder is published.
