import { useEffect } from 'react';
import { useI18n } from '../../../i18n';
import Avatar from '../../../components/Avatar';
import RoleIcon from '../RoleIcon';
import { narrate } from '../narrator';
import werwolfLogo from '../../../assets/werwolf/logo.png';
import type { Winner, WerwolfPlayer } from '../logic';

type Props = {
  players: WerwolfPlayer[];
  winner: Winner;
  onReplay: () => void;
  onNewGame: () => void;
  onExit: () => void;
  narrator?: boolean;
};

export default function ResultScreen({
  players,
  winner,
  onReplay,
  onNewGame,
  onExit,
  narrator: narratorOn = false,
}: Props) {
  const { t } = useI18n();
  const r = t.werwolf.result;

  useEffect(() => {
    narrate(winner === 'village' ? 'village-wins' : 'werewolves-win', narratorOn);
  }, [winner, narratorOn]);

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-6">
      <div
        className={`rounded-3xl p-6 text-center text-white ${
          winner === 'village' ? 'bg-green-600' : 'bg-ink'
        }`}
      >
        {winner === 'village' ? (
          <div className="mb-2 text-5xl">🎉</div>
        ) : (
          <img src={werwolfLogo} alt="" className="mx-auto mb-2 h-20 w-20 object-contain" />
        )}
        <h1 className="text-2xl font-black">
          {winner === 'village' ? r.villageWins : r.werewolvesWin}
        </h1>
      </div>

      <h2 className="mb-2 mt-6 px-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
        {r.rolesTitle}
      </h2>
      <div className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {players.map((p) => (
            <li
              key={p.index}
              className={`flex items-center gap-3 rounded-2xl p-3 ${
                p.alive ? 'bg-slate-50' : 'bg-slate-100 opacity-70'
              }`}
            >
              <Avatar
                src={p.avatar}
                seed={p.index}
                size={40}
                className={p.alive ? '' : 'grayscale'}
              />
              <span className="min-w-0 flex-1 truncate font-semibold">{p.name}</span>
              <span className="flex items-center gap-1 text-sm text-slate-500">
                <RoleIcon role={p.role} size={20} />
                {t.werwolf.roles[p.role].name}
              </span>
              <span className="text-lg">{p.alive ? '🙂' : '💀'}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <button onClick={onReplay} className="btn-brand w-full">
          {r.again}
        </button>
        <button onClick={onNewGame} className="btn-ghost w-full">
          {r.newGame}
        </button>
        <button onClick={onExit} className="btn w-full text-slate-400">
          {r.toHub}
        </button>
      </div>
    </div>
  );
}
