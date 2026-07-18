import { useI18n } from '../../../i18n';
import Avatar from '../../../components/Avatar';
import type { Round } from '../logic';

type Props = {
  round: Round;
  onReplay: () => void;
  onNewGame: () => void;
  onExit: () => void;
};

export default function ResultScreen({ round, onReplay, onNewGame, onExit }: Props) {
  const { t } = useI18n();
  const rr = t.imposter.result;
  const imposters = round.roles.filter((r) => r.isImposter);
  const multi = imposters.length > 1;

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-6">
      <h1 className="text-center text-2xl font-extrabold">{rr.title}</h1>

      <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-center">
        <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          {multi ? rr.wereImposters : rr.wasImposter}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {imposters.map((r) => (
            <div key={r.index} className="flex flex-col items-center">
              <Avatar src={r.avatar} seed={r.index} size={140} />
              <span className="mt-2 font-bold">{r.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4">
          <div className="text-sm text-slate-400">{rr.secretWord}</div>
          <div className="text-2xl font-black text-brand">{round.secretWord}</div>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-8">
        <button onClick={onReplay} className="btn-brand w-full">
          {rr.again}
        </button>
        <button onClick={onNewGame} className="btn-ghost w-full">
          {rr.newGame}
        </button>
        <button onClick={onExit} className="btn w-full text-slate-400">
          {rr.toHub}
        </button>
      </div>
    </div>
  );
}
