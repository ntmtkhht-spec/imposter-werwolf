import { useMemo, useState } from 'react';
import { useI18n } from '../../../i18n';
import RoleIcon from '../RoleIcon';
import PlayerPicker from './PlayerPicker';
import { livingPlayers, type WerwolfPlayer } from '../logic';
import { isWerewolf } from '../roles';

export type NightResult = {
  deaths: number[];
  healUsed: boolean;
  poisonUsed: boolean;
};

type Props = {
  players: WerwolfPlayer[];
  dayNumber: number;
  witchHealUsed: boolean;
  witchPoisonUsed: boolean;
  onComplete: (result: NightResult) => void;
};

type Step = 'intro' | 'werewolf' | 'seer' | 'witch';

export default function NightScreen({
  players,
  dayNumber,
  witchHealUsed,
  witchPoisonUsed,
  onComplete,
}: Props) {
  const { t } = useI18n();
  const w = t.werwolf.night;

  const living = useMemo(() => livingPlayers(players), [players]);
  const victimCandidates = living.filter((p) => !isWerewolf(p.role));
  const seerAlive = living.some((p) => p.role === 'seer');
  const witchAlive =
    living.some((p) => p.role === 'witch') && (!witchHealUsed || !witchPoisonUsed);

  const steps = useMemo<Step[]>(() => {
    const s: Step[] = ['intro', 'werewolf'];
    if (seerAlive) s.push('seer');
    if (witchAlive) s.push('witch');
    return s;
  }, [seerAlive, witchAlive]);

  const [stepIdx, setStepIdx] = useState(0);
  const step = steps[stepIdx];

  const [victim, setVictim] = useState<number | null>(null);
  const [seerTarget, setSeerTarget] = useState<number | null>(null);
  const [seerRevealed, setSeerRevealed] = useState(false);
  const [healNow, setHealNow] = useState(false);
  const [poisonPicking, setPoisonPicking] = useState(false);
  const [poisonTarget, setPoisonTarget] = useState<number | null>(null);

  const finish = () => {
    const deaths: number[] = [];
    if (victim !== null && !healNow) deaths.push(victim);
    if (poisonTarget !== null) deaths.push(poisonTarget);
    onComplete({ deaths, healUsed: healNow, poisonUsed: poisonTarget !== null });
  };

  const next = () => {
    if (stepIdx >= steps.length - 1) finish();
    else setStepIdx(stepIdx + 1);
  };

  const seerTargetPlayer =
    seerTarget !== null ? players.find((p) => p.index === seerTarget) : null;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-[#0b1026] via-[#141b3d] to-[#0b1026] px-5 pb-6 pt-4 text-slate-100">
      <div aria-hidden className="night-stars pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-10 h-52 w-52 rounded-full bg-amber-200/10 blur-3xl"
      />

      <p className="relative z-10 mb-1 text-center text-sm font-medium text-indigo-200/70">
        {w.title} {dayNumber + 1}
      </p>

      <div className="relative z-10 flex flex-1 flex-col overflow-y-auto py-4">
        {step === 'intro' && (
          <div className="night-fade m-auto text-center">
            <div className="night-moon mx-auto mb-8" />
            <p className="mx-auto max-w-xs text-2xl font-bold tracking-tight text-white">
              {w.allClose}
            </p>
          </div>
        )}

        {step === 'werewolf' && (
          <div>
            <div className="mb-4 text-center">
              <div className="mb-3 text-6xl">🐺</div>
              <p className="mx-auto max-w-xs font-semibold">{w.werewolfWake}</p>
            </div>
            <h3 className="mb-2 px-1 text-sm font-semibold text-slate-300">{w.chooseVictim}</h3>
            <PlayerPicker players={victimCandidates} selected={victim} onPick={setVictim} />
          </div>
        )}

        {step === 'seer' && (
          <div>
            <div className="mb-4 text-center">
              <div className="mb-3 text-6xl">🔮</div>
              <p className="mx-auto max-w-xs font-semibold">{w.seerWake}</p>
            </div>
            {seerTargetPlayer ? (
              <button
                onClick={() => setSeerRevealed((r) => !r)}
                className="mx-auto flex w-full max-w-xs flex-col items-center rounded-3xl bg-slate-100 p-6 text-center text-slate-800"
              >
                {seerRevealed ? (
                  <>
                    <RoleIcon role={seerTargetPlayer.role} size={90} className="mb-3" />
                    <div className="font-bold">{seerTargetPlayer.name}</div>
                    <div className="text-sm text-slate-500">
                      {w.seerResultIs} {t.werwolf.roles[seerTargetPlayer.role].name}
                    </div>
                    <div className="mt-3 text-xs text-slate-400">{w.seerHide}</div>
                  </>
                ) : (
                  <>
                    <div className="mb-2 text-5xl">👁️</div>
                    <div className="font-bold">{seerTargetPlayer.name}</div>
                    <div className="mt-2 text-xs text-slate-400">{w.seerReveal}</div>
                  </>
                )}
              </button>
            ) : (
              <>
                <h3 className="mb-2 px-1 text-sm font-semibold text-slate-300">
                  {w.chooseInspect}
                </h3>
                <PlayerPicker
                  players={living.filter((p) => p.role !== 'seer')}
                  selected={seerTarget}
                  onPick={(i) => {
                    setSeerTarget(i);
                    setSeerRevealed(false);
                  }}
                />
              </>
            )}
          </div>
        )}

        {step === 'witch' && (
          <div>
            <div className="mb-4 text-center">
              <div className="mb-3 text-6xl">🧪</div>
              <p className="mx-auto max-w-xs font-semibold">{w.witchWake}</p>
            </div>

            <div className="mb-4 rounded-2xl bg-slate-100 p-4 text-center text-slate-800">
              {victim !== null ? (
                <p>
                  {w.victimIs}{' '}
                  <span className="font-bold">
                    {players.find((p) => p.index === victim)?.name}
                  </span>
                </p>
              ) : (
                <p className="text-slate-500">{w.noVictim}</p>
              )}
            </div>

            {poisonPicking ? (
              <>
                <h3 className="mb-2 px-1 text-sm font-semibold text-slate-300">
                  {w.choosePoison}
                </h3>
                <PlayerPicker players={living} selected={poisonTarget} onPick={setPoisonTarget} />
              </>
            ) : (
              <div className="flex flex-col gap-3">
                {victim !== null && !witchHealUsed && (
                  <button
                    onClick={() => setHealNow((h) => !h)}
                    className={`btn w-full ${healNow ? 'bg-green-600 text-white' : 'bg-slate-100 text-ink'}`}
                  >
                    {healNow ? w.healed : w.heal}
                  </button>
                )}
                {!witchPoisonUsed && (
                  <button
                    onClick={() => setPoisonPicking(true)}
                    className={`btn w-full ${poisonTarget !== null ? 'bg-brand text-white' : 'bg-slate-100 text-ink'}`}
                  >
                    {w.poison}
                    {poisonTarget !== null
                      ? `: ${players.find((p) => p.index === poisonTarget)?.name}`
                      : ''}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="shrink-0 pt-2">
        {step === 'witch' && poisonPicking ? (
          <button onClick={() => setPoisonPicking(false)} className="btn-primary w-full">
            {t.common.done}
          </button>
        ) : (
          <button
            onClick={next}
            disabled={step === 'werewolf' && victim === null}
            className="btn-primary w-full"
          >
            {stepIdx >= steps.length - 1 ? w.allSleep : w.next}
          </button>
        )}
      </div>
    </div>
  );
}
