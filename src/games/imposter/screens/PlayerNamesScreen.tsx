import { useI18n } from '../../../i18n';
import TopBar from '../../../components/TopBar';

interface PlayerNamesScreenProps {
  playerCount: number;
  names: string[];
  onChange: (names: string[]) => void;
  onBack: () => void;
}

/** Full-page editor for custom player names. Blank = default "Player N". */
export default function PlayerNamesScreen({
  playerCount,
  names,
  onChange,
  onBack,
}: PlayerNamesScreenProps) {
  const { t } = useI18n();

  const setName = (i: number, value: string) => {
    const next = [...names];
    next[i] = value;
    onChange(next);
  };

  return (
    <>
      <TopBar
        title={t.imposter.setup.playerNames}
        left={
          <button onClick={onBack} className="text-2xl leading-none" aria-label={t.common.back}>
            ←
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-5 pb-2">
        <ul className="flex flex-col gap-3">
          {Array.from({ length: playerCount }, (_, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                {i + 1}
              </span>
              <input
                type="text"
                value={names[i] ?? ''}
                onChange={(e) => setName(i, e.target.value)}
                placeholder={`${t.imposter.reveal.player} ${i + 1}`}
                maxLength={20}
                className="min-h-[52px] flex-1 rounded-2xl bg-slate-100 px-4 text-base font-medium outline-none focus:ring-2 focus:ring-brand"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="shrink-0 px-5 pb-5 pt-2">
        <button onClick={onBack} className="btn-brand w-full">
          {t.common.done}
        </button>
      </div>
    </>
  );
}
