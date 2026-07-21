import { useI18n } from '../../../i18n';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import TopBar from '../../../components/TopBar';
import LangToggle from '../../../components/LangToggle';
import Stepper from '../../../components/Stepper';
import Toggle from '../../../components/Toggle';
import { setupHero } from '../assets';
import { getTaskCategories } from '../tasks';
import { DEFAULT_SETTINGS, LIMITS, normalizeSettings, type BombeSettings } from '../config';

type Props = {
  onStart: (s: BombeSettings) => void;
  onExit: () => void;
};

export default function SetupScreen({ onStart, onExit }: Props) {
  const { t } = useI18n();
  const [settings, setSettings] = useLocalStorage<BombeSettings>(
    'bombe.settings',
    DEFAULT_SETTINGS,
  );
  const categories = getTaskCategories();
  // Merge over defaults so settings saved by an older schema still get any
  // newly-added keys.
  const s = normalizeSettings({ ...DEFAULT_SETTINGS, ...settings });
  const patch = (p: Partial<BombeSettings>) =>
    setSettings(normalizeSettings({ ...s, ...p }));

  const toggleCategory = (id: string) => {
    const set = new Set(s.categoryIds);
    if (set.has(id)) {
      if (set.size <= 1) return; // keep at least one selected
      set.delete(id);
    } else {
      set.add(id);
    }
    patch({ categoryIds: categories.filter((c) => set.has(c.id)).map((c) => c.id) });
  };

  return (
    <>
      <TopBar
        title={t.bombe.name}
        left={
          <button onClick={onExit} className="text-2xl leading-none" aria-label={t.common.back}>
            ←
          </button>
        }
        right={<LangToggle />}
      />

      <div className="flex-1 overflow-y-auto px-5 pb-2">
        <img
          src={setupHero}
          alt=""
          className="mb-3 h-32 w-full rounded-3xl object-cover"
        />
        <p className="mb-4 text-sm text-slate-500">{t.bombe.tagline}</p>

        <section className="rounded-3xl bg-slate-50 px-4 py-1">
          <Stepper
            label={t.bombe.setup.fuseMin}
            value={s.minSeconds}
            min={LIMITS.minSeconds.min}
            max={LIMITS.minSeconds.max}
            suffix={t.bombe.setup.seconds}
            onChange={(v) => patch({ minSeconds: v })}
          />
          <Stepper
            label={t.bombe.setup.fuseExtra}
            value={s.extraSeconds}
            min={LIMITS.extraSeconds.min}
            max={LIMITS.extraSeconds.max}
            suffix={t.bombe.setup.seconds}
            onChange={(v) => patch({ extraSeconds: v })}
          />
          <Toggle
            label={t.bombe.setup.newTask}
            checked={s.newTaskPerPass}
            onChange={(v) => patch({ newTaskPerPass: v })}
          />
          <Toggle
            label={t.bombe.setup.sound}
            checked={s.soundEnabled}
            onChange={(v) => patch({ soundEnabled: v })}
          />
        </section>

        <h2 className="mb-2 mt-6 px-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
          {t.bombe.setup.categories}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => {
            const active = s.categoryIds.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleCategory(c.id)}
                aria-pressed={active}
                className={`relative flex flex-col items-center justify-center gap-1 rounded-3xl px-3 py-4 text-center transition active:scale-[0.97] ${
                  active ? 'bg-ink text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <span
                  className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                    active ? 'bg-brand text-white' : 'bg-white text-transparent'
                  }`}
                >
                  ✓
                </span>
                <span className="text-3xl">{c.icon}</span>
                <span className="line-clamp-2 text-sm font-semibold leading-tight">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 px-5 pb-5 pt-3">
        <button onClick={() => onStart(s)} className="btn-brand w-full">
          {t.bombe.setup.start}
        </button>
      </div>
    </>
  );
}
