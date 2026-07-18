import { useCallback, useEffect, useRef, useState } from 'react';

type State = 'idle' | 'running' | 'paused' | 'done';

/** Countdown timer in whole seconds. */
export function useTimer(durationSec: number) {
  const [remaining, setRemaining] = useState(durationSec);
  const [state, setState] = useState<State>('idle');
  const ref = useRef<number | null>(null);

  const clear = () => {
    if (ref.current !== null) {
      window.clearInterval(ref.current);
      ref.current = null;
    }
  };

  const start = useCallback(() => {
    if (state === 'running') return;
    setState('running');
  }, [state]);

  const pause = useCallback(() => setState('paused'), []);

  const reset = useCallback(() => {
    clear();
    setRemaining(durationSec);
    setState('idle');
  }, [durationSec]);

  useEffect(() => {
    if (state !== 'running') {
      clear();
      return;
    }
    ref.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clear();
          setState('done');
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return clear;
  }, [state]);

  return { remaining, state, start, pause, reset };
}

export function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
