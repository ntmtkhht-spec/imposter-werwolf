import { useState } from 'react';
import { useI18n } from '../../../i18n';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import TopBar from '../../../components/TopBar';
import LangToggle from '../../../components/LangToggle';
import CategoryIcon from '../../../components/CategoryIcon';
import CategoryPicker from './CategoryPicker';
import { setupHero } from '../assets';
import { getTaskCategories, getTaskCategoriesByIds } from '../tasks';
import { DEFAULT_SETTINGS, normalizeSettings, type BombeSettings } from '../config';

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
  const steps = [t.bombe.setup.step1, t.bombe.setup.step2, t.bombe.setup.step3];

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

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Full-bleed artwork that fades into the page, so the screen opens
            with the scene instead of a floating thumbnail. */}
        <div className="relative">
          <img src={setupHero} alt="" className="h-52 w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="-mt-4 px-5">
          <h2 className="text-[26px] font-black leading-tight tracking-tight">
            {t.bombe.setup.headline}
          </h2>
        </div>

        <div className="mt-7 px-5">
          <h3 className="mb-2 px-1 text-sm font-semibold text-slate-500">
            {t.bombe.setup.categories}
          </h3>
          <button
            onClick={() => setView('categories')}
            className="flex w-full items-center gap-3.5 rounded-2xl bg-slate-50 p-3.5 text-left ring-1 ring-slate-100 transition active:scale-[0.99]"
          >
            <CategoryIcon
              imageKey={single ? (single.image ?? single.id) : ''}
              fallbackEmoji={single ? single.icon : '🎯'}
              size={52}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[17px] font-bold leading-tight">
                {catLabel}
              </span>
              <span className="mt-0.5 block truncate text-sm text-slate-500">
                {t.bombe.setup.categoriesHint}
              </span>
            </span>
            <span className="shrink-0 text-xl text-slate-300">›</span>
          </button>
        </div>

        <div className="mt-7 px-5">
          <h3 className="mb-2 px-1 text-sm font-semibold text-slate-500">
            {t.bombe.setup.howTo}
          </h3>
          <ol className="divide-y divide-slate-100 rounded-2xl bg-slate-50 px-4">
            {steps.map((step, i) => (
              <li key={i} className="flex items-center gap-3 py-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[15px] font-medium leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="shrink-0 px-5 pb-5 pt-3">
        <button onClick={() => onStart(s)} className="btn-brand w-full text-lg">
          {t.bombe.setup.start}
        </button>
      </div>
    </>
  );
}
