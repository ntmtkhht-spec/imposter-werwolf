import Avatar from '../../../components/Avatar';
import type { WerwolfPlayer } from '../logic';

type Props = {
  players: WerwolfPlayer[];
  selected?: number | null;
  onPick: (index: number) => void;
};

/** Grid of selectable living players (avatar + name). */
export default function PlayerPicker({ players, selected, onPick }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {players.map((p) => {
        const active = selected === p.index;
        return (
          <button
            key={p.index}
            onClick={() => onPick(p.index)}
            className={`flex items-center gap-3 rounded-2xl p-3 text-left transition active:scale-[0.98] ${
              active ? 'bg-ink text-white' : 'bg-slate-100 text-slate-700'
            }`}
            aria-pressed={active}
          >
            <Avatar src={p.avatar} seed={p.index} size={44} className="shrink-0" />
            <span className="min-w-0 flex-1 truncate font-semibold">{p.name}</span>
          </button>
        );
      })}
    </div>
  );
}
