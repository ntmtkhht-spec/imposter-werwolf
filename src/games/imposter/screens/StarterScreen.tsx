import { useI18n } from '../../../i18n';
import Avatar from '../../../components/Avatar';
import type { Round } from '../logic';

type Props = {
  round: Round;
  onStart: () => void;
};

/** Announces the randomly picked player who describes the word first. */
export default function StarterScreen({ round, onStart }: Props) {
  const { t } = useI18n();
  const r = t.imposter.reveal;

  const starter = round.roles[round.starterIndex] ?? round.roles[0];

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-slate-400">
          {r.starterTitle}
        </p>

        <Avatar src={starter.avatar} seed={starter.index} size={160} className="mb-6" />

        <div className="text-4xl font-black text-brand">{starter.name}</div>
        <p className="mt-3 max-w-xs text-slate-500">{r.starterSub}</p>
      </div>

      <button onClick={onStart} className="btn-brand w-full text-lg">
        {r.starterGo}
      </button>
    </div>
  );
}
