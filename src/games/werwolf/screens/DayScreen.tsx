import { useEffect, useState } from 'react';
import { useI18n } from '../../../i18n';
import Avatar from '../../../components/Avatar';
import RoleIcon from '../RoleIcon';
import PlayerPicker from './PlayerPicker';
import { useTimer, formatTime } from '../../../hooks/useTimer';
import { livingPlayers, type WerwolfPlayer } from '../logic';
import { narrate } from '../narrator';
import dayScene from '../../../assets/werwolf/day-scene.png';

type Props = {
  players: WerwolfPlayer[];
  lastDeaths: number[];
  dayNumber: number;
  timerEnabled: boolean;
  discussionMin: number;
  onComplete: (lynchIndex: number | null) => void;
  narrator?: boolean;
};

type Phase = 'announce' | 'discuss' | 'vote';

export default function DayScreen({
  players,
  lastDeaths,
  dayNumber,
  timerEnabled,
  discussionMin,
  onComplete,
  narrator: narratorOn = false,
}: Props) {
  const { t } = useI18n();
  const w = t.werwolf.day;
  const [phase, setPhase] = useState<Phase>('announce');
  const [lynch, setLynch] = useState<number | null>(null);
  const { remaining, state, start, pause } = useTimer(discussionMin * 60);

  const deadPlayers = lastDeaths
    .map((i) => players.find((p) => p.index === i))
    .filter((p): p is WerwolfPlayer => Boolean(p));
  const living = livingPlayers(players);

  // Narrator: day breaks, then announce whether someone died / voting begins.
  useEffect(() => {
    if (phase === 'announce') {
      narrate(deadPlayers.length > 0 ? 'someone-died' : 'nobody-died', narratorOn);
    } else if (phase === 'discuss') {
      narrate('vote', narratorOn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, narratorOn]);

  return (
    <div className="bleed-safe relative flex flex-1 flex-col overflow-hidden bg-amber-50 px-5 text-slate-800">
      <img
        src={dayScene}
        aria-hidden
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-50/80 via-amber-50/70 to-amber-50/90"
      />

      <div className="relative z-10 flex flex-1 flex-col">
      <p className="mb-3 text-center text-sm font-semibold text-amber-900/80">
        ☀️ {w.day} {dayNumber}
      </p>

      {phase === 'announce' && (
        <>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            {deadPlayers.length > 0 ? (
              <>
                <p className="mb-6 font-semibold text-slate-500">{w.died}</p>
                <div className="flex flex-wrap justify-center gap-5">
                  {deadPlayers.map((p) => (
                    <div key={p.index} className="flex flex-col items-center">
                      <div className="relative">
                        <Avatar src={p.avatar} seed={p.index} size={110} className="opacity-60 grayscale" />
                        <span className="absolute inset-0 flex items-center justify-center text-5xl">
                          💀
                        </span>
                      </div>
                      <span className="mt-2 font-bold">{p.name}</span>
                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <RoleIcon role={p.role} size={20} /> {w.roleWas}{' '}
                        {t.werwolf.roles[p.role].name}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-lg font-semibold">{w.nobodyDied}</p>
            )}
          </div>
          <button onClick={() => setPhase('discuss')} className="btn-primary w-full">
            {w.startVote}
          </button>
        </>
      )}

      {phase === 'discuss' && (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="mb-6 max-w-xs font-semibold text-slate-600">{w.discuss}</p>
          {timerEnabled && (
            <div className="mb-8">
              <div
                className={`text-6xl font-black tabular-nums ${state === 'done' ? 'text-brand' : 'text-ink'}`}
              >
                {formatTime(remaining)}
              </div>
            </div>
          )}
          <div className="flex w-full max-w-xs flex-col gap-3">
            {timerEnabled && state !== 'done' && (
              <button
                onClick={() => (state === 'running' ? pause() : start())}
                className="btn-ghost w-full"
              >
                {state === 'running' ? t.werwolf.night.next : t.common.start}
              </button>
            )}
            <button onClick={() => setPhase('vote')} className="btn-brand w-full">
              {w.chooseLynch}
            </button>
          </div>
        </div>
      )}

      {phase === 'vote' && (
        <>
          <h3 className="mb-3 px-1 text-sm font-semibold text-slate-500">{w.chooseLynch}</h3>
          <div className="flex-1 overflow-y-auto">
            <PlayerPicker players={living} selected={lynch} onPick={setLynch} />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <button
              onClick={() => onComplete(lynch)}
              disabled={lynch === null}
              className="btn-brand w-full"
            >
              {w.lynch}
            </button>
            <button onClick={() => onComplete(null)} className="btn w-full text-slate-400">
              {w.skipVote}
            </button>
          </div>
        </>
      )}
      </div>
    </div>
  );
}
