import { useState } from 'react';
import { useI18n } from '../../../i18n';
import PlayerPicker from './PlayerPicker';
import { livingPlayers, type WerwolfPlayer } from '../logic';

type Props = {
  players: WerwolfPlayer[];
  onComplete: (targetIndex: number) => void;
};

export default function HunterScreen({ players, onComplete }: Props) {
  const { t } = useI18n();
  const h = t.werwolf.hunter;
  const [target, setTarget] = useState<number | null>(null);
  const living = livingPlayers(players);

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
      <div className="mb-4 text-center">
        <div className="mb-3 text-6xl">🏹</div>
        <h2 className="text-xl font-extrabold">{h.title}</h2>
        <p className="mt-1 text-sm text-slate-500">{h.desc}</p>
      </div>

      <h3 className="mb-2 px-1 text-sm font-semibold text-slate-500">{h.chooseTarget}</h3>
      <div className="flex-1 overflow-y-auto">
        <PlayerPicker players={living} selected={target} onPick={setTarget} />
      </div>

      <button
        onClick={() => target !== null && onComplete(target)}
        disabled={target === null}
        className="btn-brand mt-3 w-full"
      >
        {h.shoot}
      </button>
    </div>
  );
}
