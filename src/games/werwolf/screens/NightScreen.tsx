import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../../../i18n';
import RoleIcon from '../RoleIcon';
import PlayerPicker from './PlayerPicker';
import { livingPlayers, type WerwolfPlayer } from '../logic';
import { isWerewolf } from '../roles';
import type { HostManager, NightStepKind } from '../multiplayer';
import { narrate } from '../narrator';
import werwolfLogo from '../../../assets/werwolf/logo.png';
import nightScene from '../../../assets/werwolf/night-scene.png';
import heiltrankImg from '../../../assets/werwolf/heiltrank.png';
import giftImg from '../../../assets/werwolf/gift.png';

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
  /** Multiplayer: send turns to role players' phones; host keeps parity control. */
  hostManager?: HostManager | null;
  peerByIndex?: Record<number, string>;
  narrator?: boolean;
};

type Step = 'intro' | 'werewolf' | 'seer' | 'witch';

export default function NightScreen({
  players,
  dayNumber,
  witchHealUsed,
  witchPoisonUsed,
  onComplete,
  hostManager = null,
  peerByIndex = {},
  narrator = false,
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
  const [healNow, setHealNow] = useState(false);
  const [poisonPicking, setPoisonPicking] = useState(false);
  const [poisonTarget, setPoisonTarget] = useState<number | null>(null);

  /** Peers that play the given step's role and are still alive. */
  const peersForStep = (s: Step): string[] => {
    if (s === 'werewolf')
      return living.filter((p) => isWerewolf(p.role)).map((p) => peerByIndex[p.index]).filter(Boolean);
    if (s === 'seer')
      return living.filter((p) => p.role === 'seer').map((p) => peerByIndex[p.index]).filter(Boolean);
    if (s === 'witch')
      return living.filter((p) => p.role === 'witch').map((p) => peerByIndex[p.index]).filter(Boolean);
    return [];
  };

  const remoteActive = hostManager !== null && peersForStep(step).length > 0;

  // Narrator: announce each step as it begins.
  useEffect(() => {
    if (step === 'intro') narrate('night-falls', narrator);
    else if (step === 'werewolf') narrate('werewolves-wake', narrator);
    else if (step === 'seer') narrate('seer-wake', narrator);
    else if (step === 'witch') narrate('witch-wake', narrator);
  }, [step, narrator]);

  // Multiplayer: hand the current step to the role player's phone.
  useEffect(() => {
    if (!hostManager) return;
    const peers = peersForStep(step);
    if (peers.length === 0) return;
    if (step === 'werewolf') {
      const candidates = victimCandidates.map((p) => ({ index: p.index, name: p.name }));
      peers.forEach((id) => hostManager.sendTo(id, { type: 'YOUR_TURN', step: 'werewolf', candidates }));
    } else if (step === 'seer') {
      const candidates = living
        .filter((p) => p.role !== 'seer')
        .map((p) => ({ index: p.index, name: p.name }));
      peers.forEach((id) => hostManager.sendTo(id, { type: 'YOUR_TURN', step: 'seer', candidates }));
    } else if (step === 'witch') {
      const candidates = living.map((p) => ({ index: p.index, name: p.name }));
      const victimName =
        victim !== null ? players.find((p) => p.index === victim)?.name ?? null : null;
      peers.forEach((id) =>
        hostManager.sendTo(id, {
          type: 'YOUR_TURN',
          step: 'witch',
          candidates,
          witch: {
            victimName,
            canHeal: victim !== null && !witchHealUsed,
            canPoison: !witchPoisonUsed,
          },
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, hostManager]);

  // Multiplayer: accept actions from role players (first valid input wins).
  useEffect(() => {
    if (!hostManager) return;
    hostManager.onAction = (_peerId, msg) => {
      if (msg.step !== step) return; // stale or out-of-turn action
      if (msg.step === 'werewolf' && victim === null && typeof msg.target === 'number') {
        if (victimCandidates.some((p) => p.index === msg.target)) {
          setVictim(msg.target);
          endTurn('werewolf');
        }
      } else if (msg.step === 'seer' && seerTarget === null && typeof msg.target === 'number') {
        const target = living.find((p) => p.index === msg.target && p.role !== 'seer');
        if (target) {
          setSeerTarget(target.index);
          peersForStep('seer').forEach((id) =>
            hostManager.sendTo(id, { type: 'SEER_RESULT', name: target.name, role: target.role }),
          );
        }
      } else if (msg.step === 'witch' && !healNow && poisonTarget === null && msg.witch) {
        if (msg.witch.heal && victim !== null && !witchHealUsed) setHealNow(true);
        if (
          msg.witch.poisonTarget !== null &&
          !witchPoisonUsed &&
          living.some((p) => p.index === msg.witch!.poisonTarget)
        ) {
          setPoisonTarget(msg.witch.poisonTarget);
        }
        endTurn('witch');
      }
    };
    return () => {
      hostManager.onAction = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostManager, step, victim, seerTarget, healNow, poisonTarget, living]);

  /** Tell the step's role phones that their turn is over. */
  const endTurn = (s: Step) => {
    if (!hostManager || s === 'intro') return;
    peersForStep(s).forEach((id) =>
      hostManager.sendTo(id, { type: 'TURN_ENDED', step: s as NightStepKind }),
    );
  };

  const finish = () => {
    endTurn(step);
    const deaths: number[] = [];
    if (victim !== null && !healNow) deaths.push(victim);
    if (poisonTarget !== null) deaths.push(poisonTarget);
    onComplete({ deaths, healUsed: healNow, poisonUsed: poisonTarget !== null });
  };

  const next = () => {
    if (stepIdx >= steps.length - 1) finish();
    else {
      endTurn(step);
      setStepIdx(stepIdx + 1);
    }
  };

  const seerTargetPlayer =
    seerTarget !== null ? players.find((p) => p.index === seerTarget) : null;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#0b1026] px-5 pb-6 pt-4 text-slate-100">
      <img
        src={nightScene}
        aria-hidden
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b1026]/75 via-[#0b1026]/60 to-[#0b1026]/90"
      />

      <p className="relative z-10 mb-1 text-center text-sm font-medium text-indigo-100/80">
        {w.title} {dayNumber + 1}
      </p>
      {remoteActive && step !== 'intro' && (
        <p className="relative z-10 mb-1 text-center text-xs font-medium text-amber-200/90">
          📱 {w.remoteHint}
        </p>
      )}

      <div className="relative z-10 flex flex-1 flex-col overflow-y-auto py-4">
        {step === 'intro' && (
          <div className="night-fade m-auto text-center">
            <p className="mx-auto max-w-xs text-2xl font-bold tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
              {w.allClose}
            </p>
          </div>
        )}

        {step === 'werewolf' && (
          <div>
            <div className="mb-4 text-center">
              <img src={werwolfLogo} alt="" className="mx-auto mb-3 h-24 w-24 object-contain" />
              <p className="mx-auto max-w-xs font-semibold">{w.werewolfWake}</p>
            </div>
            <h3 className="mb-2 px-1 text-sm font-semibold text-slate-300">{w.chooseVictim}</h3>
            <PlayerPicker players={victimCandidates} selected={victim} onPick={setVictim} />
          </div>
        )}

        {step === 'seer' && (
          <div>
            <div className="mb-4 text-center">
              <RoleIcon role="seer" size={88} className="mx-auto mb-3" />
              <p className="mx-auto max-w-xs font-semibold">{w.seerWake}</p>
            </div>
            {seerTargetPlayer ? (
              <div className="mx-auto flex w-full max-w-xs flex-col items-center rounded-3xl bg-slate-100 p-6 text-center text-slate-800">
                <RoleIcon role={seerTargetPlayer.role} size={90} className="mb-3" />
                <div className="font-bold">{seerTargetPlayer.name}</div>
                <div className="text-sm text-slate-500">
                  {w.seerResultIs} {t.werwolf.roles[seerTargetPlayer.role].name}
                </div>
              </div>
            ) : (
              <>
                <h3 className="mb-2 px-1 text-sm font-semibold text-slate-300">
                  {w.chooseInspect}
                </h3>
                <PlayerPicker
                  players={living.filter((p) => p.role !== 'seer')}
                  selected={seerTarget}
                  onPick={(i) => setSeerTarget(i)}
                />
              </>
            )}
          </div>
        )}

        {step === 'witch' && (
          <div>
            <div className="mb-4 text-center">
              <RoleIcon role="witch" size={88} className="mx-auto mb-3" />
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
              <div className="flex gap-3">
                {victim !== null && !witchHealUsed && (
                  <button
                    onClick={() => setHealNow((h) => !h)}
                    className={`flex flex-1 flex-col items-center gap-2 rounded-2xl p-4 font-bold transition active:scale-[0.98] ${
                      healNow ? 'bg-green-600 text-white ring-2 ring-green-300' : 'bg-slate-100 text-ink'
                    }`}
                  >
                    <img src={heiltrankImg} alt="" className="h-20 w-20 object-contain" />
                    <span>{healNow ? w.healed : w.heal}</span>
                  </button>
                )}
                {!witchPoisonUsed && (
                  <button
                    onClick={() => setPoisonPicking(true)}
                    className={`flex flex-1 flex-col items-center gap-2 rounded-2xl p-4 font-bold transition active:scale-[0.98] ${
                      poisonTarget !== null ? 'bg-brand text-white ring-2 ring-red-300' : 'bg-slate-100 text-ink'
                    }`}
                  >
                    <img src={giftImg} alt="" className="h-20 w-20 object-contain" />
                    <span>{w.poison}</span>
                    {poisonTarget !== null && (
                      <span className="text-xs font-medium opacity-90">
                        {players.find((p) => p.index === poisonTarget)?.name}
                      </span>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative z-10 shrink-0 pt-2">
        {step === 'witch' && poisonPicking ? (
          <button
            onClick={() => setPoisonPicking(false)}
            className="btn-brand w-full text-lg shadow-lg shadow-black/40"
          >
            {t.common.done}
          </button>
        ) : (
          <button
            onClick={next}
            disabled={step === 'werewolf' && victim === null}
            className="btn-brand w-full text-lg shadow-lg shadow-black/40"
          >
            {stepIdx >= steps.length - 1 ? w.allSleep : w.next}
          </button>
        )}
      </div>
    </div>
  );
}
