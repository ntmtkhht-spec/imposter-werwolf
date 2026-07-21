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

        <h2 className="mb-2 px-1 text-sm font-semibold text-slate-500">
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
