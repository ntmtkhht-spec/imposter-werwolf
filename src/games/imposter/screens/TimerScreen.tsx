import { useI18n } from '../../../i18n';
import { useTimer, formatTime } from '../../../hooks/useTimer';
import type { ImposterSettings } from '../config';

type Props = {
  settings: ImposterSettings;
  onReveal: () => void;
};

export default function TimerScreen({ settings, onReveal }: Props) {
  const { t } = useI18n();
  const tt = t.imposter.timer;
  const { remaining, state, start, pause } = useTimer(settings.durationMin * 60);
  const showTimer = settings.timerEnabled;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 pb-8 text-center">
      <h1 className="text-2xl font-extrabold">{tt.title}</h1>
      <p className="mt-3 max-w-xs text-slate-500">{tt.hint}</p>

      {showTimer && (
        <div className="my-10">
          <div
            className={`text-7xl font-black tabular-nums ${
              state === 'done' ? 'text-brand' : 'text-ink'
            }`}
          >
            {formatTime(remaining)}
          </div>
          {state === 'done' && (
            <div className="mt-2 font-semibold text-brand">{tt.timeUp}</div>
          )}
        </div>
      )}

      <div className="mt-6 flex w-full max-w-xs flex-col gap-3">
        {showTimer && state !== 'done' && (
          <button
            onClick={() => (state === 'running' ? pause() : start())}
            className="btn-ghost w-full"
          >
            {state === 'running'
              ? tt.pause
              : state === 'paused'
                ? tt.resume
                : tt.start}
          </button>
        )}
        <button onClick={onReveal} className="btn-brand w-full">
          {tt.reveal}
        </button>
      </div>
    </div>
  );
}
