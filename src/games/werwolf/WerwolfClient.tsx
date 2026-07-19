import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useI18n } from '../../i18n';
import TopBar from '../../components/TopBar';
import {
  ClientManager,
  type Candidate,
  type ClientState,
  type HostMessage,
  type NightStepKind,
  type WitchContext,
} from './multiplayer';
import { ROLE_IMAGES } from './roles';
import RoleIcon from './RoleIcon';
import type { RoleId } from './roles';
import cardBack from '../../assets/werwolf/card-back.png';
import nightScene from '../../assets/werwolf/night-scene.png';
import dayScene from '../../assets/werwolf/day-scene.png';
import heiltrankImg from '../../assets/werwolf/heiltrank.png';
import giftImg from '../../assets/werwolf/gift.png';

type Turn = { step: NightStepKind; candidates: Candidate[]; witch?: WitchContext };
type GamePhase = { phase: 'lobby' | 'night' | 'day' | 'result'; night: number; winner: 'village' | 'werewolves' | null };

export default function WerwolfClient() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const w = t.werwolf;
  const c = w.client;

  const [name, setName] = useState('');
  const [state, setState] = useState<ClientState | 'name_input'>('name_input');
  const [role, setRole] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [game, setGame] = useState<GamePhase>({ phase: 'lobby', night: 1, winner: null });
  const [dead, setDead] = useState(false);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [sent, setSent] = useState(false);
  const [seerResult, setSeerResult] = useState<{ name: string; role: string } | null>(null);
  const [viewRole, setViewRole] = useState(false);
  // Local pick state for the active turn.
  const [pick, setPick] = useState<number | null>(null);
  const [witchHeal, setWitchHeal] = useState(false);
  const [witchPoisonPick, setWitchPoisonPick] = useState(false);
  const [witchPoison, setWitchPoison] = useState<number | null>(null);
  const managerRef = useRef<ClientManager | null>(null);

  const resetTurnLocals = () => {
    setPick(null);
    setSent(false);
    setWitchHeal(false);
    setWitchPoisonPick(false);
    setWitchPoison(null);
  };

  const handleMessage = (msg: HostMessage) => {
    switch (msg.type) {
      case 'ROLE':
        setRole(msg.role);
        setState('role');
        setDead(false);
        setTurn(null);
        setSeerResult(null);
        setRevealed(false);
        resetTurnLocals();
        break;
      case 'PHASE':
        setGame({ phase: msg.phase, night: msg.night ?? 1, winner: msg.winner ?? null });
        if (msg.phase !== 'night') {
          setTurn(null);
          setSeerResult(null);
          resetTurnLocals();
        }
        break;
      case 'YOUR_TURN':
        setTurn({ step: msg.step, candidates: msg.candidates, witch: msg.witch });
        resetTurnLocals();
        break;
      case 'TURN_ENDED':
        setTurn(null);
        setSeerResult(null);
        resetTurnLocals();
        break;
      case 'SEER_RESULT':
        setSeerResult({ name: msg.name, role: msg.role });
        break;
      case 'YOU_DIED':
        setDead(true);
        setTurn(null);
        resetTurnLocals();
        break;
      case 'GAME_OVER':
        managerRef.current?.destroy();
        navigate('/');
        break;
    }
  };

  const handleJoin = () => {
    if (!name.trim() || !roomId) return;
    setState('connecting');
    const manager = new ClientManager(
      roomId,
      name.trim(),
      (newState) => setState(newState),
      (msg) => handleMessage(msg),
    );
    managerRef.current = manager;
  };

  useEffect(() => {
    return () => {
      managerRef.current?.destroy();
    };
  }, []);

  const sendAction = () => {
    if (!turn || sent) return;
    if (turn.step === 'witch') {
      managerRef.current?.send({
        type: 'ACTION',
        step: 'witch',
        witch: { heal: witchHeal, poisonTarget: witchPoison },
      });
    } else {
      if (pick === null) return;
      managerRef.current?.send({ type: 'ACTION', step: turn.step, target: pick });
    }
    setSent(true);
  };

  if (state === 'name_input') {
    return (
      <div className="flex h-full flex-col bg-slate-100">
        <TopBar title="Beitreten" />
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Werwolf</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dein Name"
              className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            />
            <button
              onClick={handleJoin}
              disabled={!name.trim()}
              className="btn-brand w-full disabled:opacity-50"
            >
              Beitreten
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'connecting' || (state === 'waiting' && !role)) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
          <h2 className="text-xl font-bold">
            {state === 'connecting' ? 'Verbinde...' : 'Warte auf den Host...'}
          </h2>
          <p className="mt-2 text-white/70">Das Spiel beginnt in Kürze.</p>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-slate-100 px-6">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-sm">
          <div className="mb-4 text-4xl">⚠️</div>
          <h2 className="mb-2 text-xl font-bold text-red-500">Verbindung getrennt</h2>
          <p className="mb-6 text-slate-500">Die Verbindung zum Host wurde unterbrochen.</p>
          <button onClick={() => navigate('/')} className="btn-brand w-full">
            Zurück zur Startseite
          </button>
        </div>
      </div>
    );
  }

  if (!role) return null;

  // --- Active ability turn (your phone controls it) ---
  if (turn && !viewRole) {
    const heading =
      turn.step === 'werewolf'
        ? c.wolfChoose
        : turn.step === 'seer'
          ? c.seerChoose
          : turn.step === 'hunter'
            ? c.hunterShoot
            : w.night.witchWake;

    return (
      <div className="relative flex h-full flex-col overflow-hidden bg-[#0b1026] px-5 pb-6 pt-6 text-slate-100">
        <img src={nightScene} aria-hidden alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b1026]/80 via-[#0b1026]/65 to-[#0b1026]/90" />

        <div className="relative z-10 flex flex-1 flex-col overflow-y-auto">
          <button
            onClick={() => setViewRole(true)}
            className="mb-2 self-center rounded-full bg-white/10 px-3 py-1 text-xs text-white/70"
          >
            {c.showRole}
          </button>
          <p className="mb-1 text-center text-sm font-semibold text-amber-300">{c.yourTurn}</p>
          <h2 className="mb-4 text-center text-xl font-bold [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
            {heading}
          </h2>

          {seerResult ? (
            <div className="mx-auto flex w-full max-w-xs flex-col items-center rounded-3xl bg-slate-100 p-6 text-center text-slate-800">
              <RoleIcon role={seerResult.role as RoleId} size={90} className="mb-3" />
              <div className="font-bold">{seerResult.name}</div>
              <div className="text-sm text-slate-500">
                {c.seerResultIs} {w.roles[seerResult.role as RoleId].name}
              </div>
            </div>
          ) : sent ? (
            <div className="m-auto rounded-2xl bg-white/10 px-6 py-4 text-center font-semibold backdrop-blur-sm">
              {c.sent}
            </div>
          ) : turn.step === 'witch' && !witchPoisonPick ? (
            <>
              <div className="mb-4 rounded-2xl bg-slate-100 p-4 text-center text-slate-800">
                {turn.witch?.victimName ? (
                  <p>
                    {w.night.victimIs} <span className="font-bold">{turn.witch.victimName}</span>
                  </p>
                ) : (
                  <p className="text-slate-500">{w.night.noVictim}</p>
                )}
              </div>
              <div className="flex gap-3">
                {turn.witch?.canHeal && (
                  <button
                    onClick={() => setWitchHeal((h) => !h)}
                    className={`flex flex-1 flex-col items-center gap-2 rounded-2xl p-4 font-bold transition active:scale-[0.98] ${
                      witchHeal ? 'bg-green-600 text-white ring-2 ring-green-300' : 'bg-slate-100 text-ink'
                    }`}
                  >
                    <img src={heiltrankImg} alt="" className="h-20 w-20 object-contain" />
                    <span>{witchHeal ? w.night.healed : w.night.heal}</span>
                  </button>
                )}
                {turn.witch?.canPoison && (
                  <button
                    onClick={() => setWitchPoisonPick(true)}
                    className={`flex flex-1 flex-col items-center gap-2 rounded-2xl p-4 font-bold transition active:scale-[0.98] ${
                      witchPoison !== null ? 'bg-brand text-white ring-2 ring-red-300' : 'bg-slate-100 text-ink'
                    }`}
                  >
                    <img src={giftImg} alt="" className="h-20 w-20 object-contain" />
                    <span>{w.night.poison}</span>
                    {witchPoison !== null && (
                      <span className="text-xs font-medium opacity-90">
                        {turn.candidates.find((p) => p.index === witchPoison)?.name}
                      </span>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            <ul className="grid grid-cols-2 gap-3">
              {turn.candidates.map((p) => {
                const active = (turn.step === 'witch' ? witchPoison : pick) === p.index;
                return (
                  <li key={p.index}>
                    <button
                      onClick={() =>
                        turn.step === 'witch' ? setWitchPoison(p.index) : setPick(p.index)
                      }
                      className={`w-full rounded-2xl p-4 text-left font-semibold transition active:scale-[0.98] ${
                        active ? 'bg-brand text-white' : 'bg-slate-100 text-slate-800'
                      }`}
                      aria-pressed={active}
                    >
                      {p.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="relative z-10 shrink-0 pt-3">
          {sent || seerResult ? (
            <button onClick={() => setViewRole(false)} className="btn-ghost w-full" disabled>
              {c.waitNight}
            </button>
          ) : turn.step === 'witch' && witchPoisonPick ? (
            <button onClick={() => setWitchPoisonPick(false)} className="btn-brand w-full shadow-lg shadow-black/40">
              {t.common.done}
            </button>
          ) : (
            <button
              onClick={sendAction}
              disabled={turn.step !== 'witch' && pick === null}
              className="btn-brand w-full shadow-lg shadow-black/40 disabled:opacity-50"
            >
              {c.confirm}
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- Default: role card + phase banner (and dead / result states) ---
  const phaseBanner =
    game.phase === 'result'
      ? game.winner === 'village'
        ? c.villageWins
        : c.werewolvesWin
      : dead
        ? c.youDied
        : game.phase === 'day'
          ? c.waitDay
          : `${w.night.title} ${game.night} — ${c.waitNight}`;

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-slate-900 px-6 py-10 text-white">
      {game.phase === 'day' && (
        <img src={dayScene} aria-hidden alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30" />
      )}
      <div className="relative z-10 mb-4 rounded-2xl bg-black/40 px-4 py-3 text-center backdrop-blur-sm">
        <p className={`font-semibold ${dead && game.phase !== 'result' ? 'text-red-400' : ''}`}>
          {dead && game.phase !== 'result' ? '💀 ' : ''}
          {phaseBanner}
        </p>
        {dead && game.phase !== 'result' && (
          <p className="mt-1 text-xs text-white/60">{c.spectate}</p>
        )}
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <button
          onClick={() => setRevealed(!revealed)}
          style={{
            transform: `rotateY(${revealed ? 180 : 0}deg)`,
            WebkitTransform: `rotateY(${revealed ? 180 : 0}deg)`,
            transition: 'transform 400ms ease-out',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          className="relative block w-full aspect-square text-center"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
            <img src={cardBack} alt="Back" className="absolute inset-0 h-full w-full object-contain" />
            {!revealed && (
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="text-4xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">{name}</div>
              </div>
            )}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [-webkit-transform:rotateY(180deg)] [transform:rotateY(180deg)]">
            <img src={ROLE_IMAGES[role as keyof typeof ROLE_IMAGES]} alt={role} className="absolute inset-0 h-full w-full object-contain" />
          </div>
        </button>
        <p className="mt-4 text-center text-xs font-medium text-white/40">
          {revealed ? w.reveal.tapToHide : w.reveal.tapToReveal}
        </p>
      </div>

      {turn && (
        <div className="relative z-10 mt-4 shrink-0">
          <button onClick={() => setViewRole(false)} className="btn-brand w-full shadow-lg shadow-black/40">
            {c.yourTurn}
          </button>
        </div>
      )}
    </div>
  );
}
