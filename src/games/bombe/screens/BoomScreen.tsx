import { useI18n } from '../../../i18n';

type Props = {
  onAgain: () => void;
  onNewGame: () => void;
  onExit: () => void;
};

export default function BoomScreen({ onAgain, onNewGame, onExit }: Props) {
  const { t } = useI18n();
  const b = t.bombe.boom;

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-brand px-6 pb-8 text-center text-white">
      <div className="animate-bounce text-7xl font-black tracking-tight">{b.title}</div>
      <p className="mt-4 max-w-xs text-lg font-semibold text-white/90">{b.loser}</p>

      <div className="mt-12 flex w-full max-w-xs flex-col gap-3">
        <button onClick={onAgain} className="w-full rounded-2xl bg-white py-4 font-bold text-brand active:scale-[0.98]">
          {b.again}
        </button>
        <button onClick={onNewGame} className="w-full rounded-2xl bg-white/15 py-4 font-bold text-white active:scale-[0.98]">
          {b.newGame}
        </button>
        <button onClick={onExit} className="w-full py-2 font-semibold text-white/70">
          {b.toHub}
        </button>
      </div>
    </div>
  );
}
