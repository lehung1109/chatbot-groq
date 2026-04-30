import { useEffect, useRef, useState } from 'react';

export type StreamingTypewriterRAFProps = {
  text: string;
  status: 'streaming' | 'done';
  speed?: number;
  className?: string;
  showCursor?: boolean;
};

export function StreamingTypewriterRAF({
  text,
  status,
  speed = 20,
  className,
  showCursor = true,
}: StreamingTypewriterRAFProps) {
  const [displayedText, setDisplayedText] = useState('');

  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const visibleLengthRef = useRef(0);
  const textRef = useRef(text);
  const statusRef = useRef(status);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    const loop = (time: number) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      const targetText = textRef.current;

      if (visibleLengthRef.current < targetText.length && delta >= speed) {
        const charsToAdd = Math.max(1, Math.floor(delta / speed));
        visibleLengthRef.current = Math.min(
          visibleLengthRef.current + charsToAdd,
          targetText.length
        );

        setDisplayedText(targetText.slice(0, visibleLengthRef.current));
        lastTimeRef.current = time;
      }

      const shouldKeepRunning =
        visibleLengthRef.current < textRef.current.length ||
        statusRef.current !== 'done';

      if (shouldKeepRunning) {
        frameRef.current = requestAnimationFrame(loop);
      }
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, [speed]);

  const isDone = status === 'done' && displayedText.length >= text.length;

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isDone && <BlinkCursor />}
    </span>
  );
}

function BlinkCursor() {
  return (
    <span aria-hidden="true" className="ml-0.5 inline-block animate-pulse">
      |
    </span>
  );
}
