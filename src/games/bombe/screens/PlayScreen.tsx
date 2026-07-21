import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../../i18n';
import type { BombRound } from '../logic';
import { audioBlocked, playExplosion, playTick } from '../sound';
import { background } from '../assets';
import BombGraphic from '../BombGraphic';

type Props = {
  round: BombRound;
  /** Called once when the bomb goes off, with every prompt that was shown. */
  onBoom: (shownTasks: string[]) => void;
};

export default function PlayScreen({ round, onBoom }: Props) {
  const { t } = useI18n();
  const [taskIndex, setTaskIndex] = useState(0);
  const [intensity, setIntensity] = useState(0);
  const [muted, setMuted] = useState(false);
  const shownRef = useRef<Set<string>>(new Set([round.tasks[0]]));
  const boomFired = useRef(false);

  // Explosion — a single timeout with the pre-randomized delay.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (boomFired.current) return;
      boomFired.current = true;
      playExplosion();
      navigator.vibrate?.([180, 80, 400]);
      onBoom([...shownRef.current]);
    }, round.explodeAfterMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  // Ticking that slowly speeds up with ELAPSED time (not remaining time,
  // so the pace never gives the fuse away). Also drives the pulse.
  useEffect(() => {
    const started = Date.now();
    let cancelled = false;
    let tickTimer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      const elapsed = (Date.now() - started) / 1000;
      const heat = Math.min(1, elapsed / 45); // full speed after 45s
      setIntensity(heat);
      playTick();
      tickTimer = setTimeout(tick, 750 - heat * 480); // 750ms -> 270ms
    };
    tick();

    // Give the context a moment to come up, then tell the player if the
    // phone is still silencing us — that is a hardware switch, not a bug.
    const audioCheck = setTimeout(() => setMuted(audioBlocked()), 1200);

    return () => {
      cancelled = true;
      clearTimeout(tickTimer);
      clearTimeout(audioCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const task = round.tasks[taskIndex % round.tasks.length];

  const pass = () => {
    const next = (taskIndex + 1) % round.tasks.length;
    setTaskIndex(next);
    shownRef.current.add(round.tasks[next % round.tasks.length]);
  };

  // The entire screen is the pass button — impossible to miss mid-panic.
  return (
    <button
      onClick={pass}
      style={{ backgroundImage: `url(${background})` }}
      className="flex flex-1 select-none flex-col items-center justify-between bg-ink bg-cover bg-center px-4 pb-10 pt-10 text-center text-white"
    >
      {/* High-contrast card: the prompt has to be readable at a glance
          while the phone is already moving toward the next player. */}
      <div className="w-full rounded-3xl bg-white px-5 py-7 shadow-2xl">
        <div className="text-3xl font-black leading-tight text-ink">{task}</div>
      </div>

      <BombGraphic intensity={intensity} />

      <div>
        <div className="text-lg font-bold">{t.bombe.play.pass}</div>
        <div className="mt-1 text-sm text-white/60">{t.bombe.play.tapHint}</div>
        {muted && (
          <div className="mt-2 text-xs text-white/40">{t.bombe.play.muted}</div>
        )}
      </div>
    </button>
  );
}
