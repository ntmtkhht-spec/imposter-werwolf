import { useState } from 'react';
import { useI18n } from '../../../i18n';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import TopBar from '../../../components/TopBar';
import LangToggle from '../../../components/LangToggle';
import Stepper from '../../../components/Stepper';
import Toggle from '../../../components/Toggle';
import CategoryIcon from '../../../components/CategoryIcon';
import CategoryPicker from './CategoryPicker';
import { setupHero } from '../assets';
import { getTaskCategories, getTaskCategoriesByIds } from '../tasks';
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
  const [view, setView] = useState<'setup' | 'categories'>('setup');
  const categories = getTaskCategories();
  // Merge over defaults so settings saved by an older schema still get any
  // newly-added keys.
  const s = normalizeSettings({ ...DEFAULT_SETTINGS, ...settings });
  const patch = (p: Partial<BombeSettings>) =>
    setSettings(normalizeSettings({ ...s, ...p }));

  const selectedCats = getTaskCategoriesByIds(s.categoryIds);
  const catLabel =
    selectedCats.length === 1
      ? selectedCats[0].name
      : `${selectedCats.length} ${t.bombe.setup.categoriesWord}`;
  const single = selectedCats.length === 1 ? selectedCats[0] : null;

  if (view === 'categories') {
    return (
      <CategoryPicker
        categories={categories}
        selectedIds={s.categoryIds}
        onChange={(ids) => patch({ categoryIds: ids })}
        onBack={() => setView('setup')}
      />
    );
  }

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

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <img src={setupHero} alt="" className="mx-auto mb-4 w-full rounded-2xl" />
        <p className="mb-4 text-sm text-slate-500">{t.bombe.tagline}</p>

        <section className="divide-y divide-slate-200 rounded-2xl bg-slate-50 px-4">
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

        <h2 className="mb-2 mt-6 px-1 text-sm font-semibold text-slate-500">
          {t.bombe.setup.categories}
        </h2>
        <button
          onClick={() => setView('categories')}
          className="flex w-full items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-left transition active:scale-[0.99]"
        >
          <CategoryIcon
            imageKey={single ? (single.image ?? single.id) : ''}
            fallbackEmoji={single ? single.icon : '🎯'}
            size={36}
          />
          <span className="min-w-0 flex-1 truncate font-semibold">{catLabel}</span>
          <span className="shrink-0 text-slate-300">›</span>
        </button>
      </div>

      <div className="shrink-0 px-5 pb-5 pt-2">
        <button onClick={() => onStart(s)} className="btn-brand w-full">
          {t.bombe.setup.start}
        </button>
      </div>
    </>
  );
}
