import { useState } from 'react';
import { useI18n } from '../../../i18n';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import TopBar from '../../../components/TopBar';
import LangToggle from '../../../components/LangToggle';
import Stepper from '../../../components/Stepper';
import Toggle from '../../../components/Toggle';
import CategoryPicker from './CategoryPicker';
import PlayerNamesScreen from './PlayerNamesScreen';
import CategoryIcon from '../CategoryIcon';
import setupHero from '../../../assets/hero/setup-hero.webp';
import { getCategories, getCategoriesByIds } from '../words';
import {
  DEFAULT_SETTINGS,
  LIMITS,
  maxImposters,
  normalizeSettings,
  type ImposterSettings,
} from '../config';

type Props = {
  onStart: (s: ImposterSettings) => void;
  onExit: () => void;
};

export default function SetupScreen({ onStart, onExit }: Props) {
  const { t, lang } = useI18n();
  const [settings, setSettings] = useLocalStorage<ImposterSettings>(
    'imposter.settings',
    DEFAULT_SETTINGS,
  );
  const [view, setView] = useState<'setup' | 'categories' | 'names'>('setup');
  const categories = getCategories(lang);
  // Merge over defaults so settings saved by an older schema still get any
  // newly-added keys (e.g. randomImposters).
  const s = normalizeSettings({ ...DEFAULT_SETTINGS, ...settings });
  const patch = (p: Partial<ImposterSettings>) =>
    setSettings(normalizeSettings({ ...s, ...p }));

  const selectedCats = getCategoriesByIds(lang, s.categoryIds);
  const catLabel =
    selectedCats.length === 1
      ? selectedCats[0].name
      : `${selectedCats.length} ${t.imposter.setup.categoriesWord}`;
  const catId = selectedCats.length === 1 ? selectedCats[0].id : '';
  const catEmoji = selectedCats.length === 1 ? selectedCats[0].icon : '🎯';
  const customNameCount = s.playerNames.filter((n) => n.trim().length > 0).length;

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

  if (view === 'names') {
    return (
      <PlayerNamesScreen
        playerCount={s.playerCount}
        names={s.playerNames}
        onChange={(names) => patch({ playerNames: names })}
        onBack={() => setView('setup')}
      />
    );
  }

  return (
    <>
      <TopBar
        title={t.imposter.name}
        left={
          <button onClick={onExit} className="text-2xl leading-none" aria-label={t.common.back}>
            ←
          </button>
        }
        right={<LangToggle />}
      />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <img
          src={setupHero}
          alt=""
          className="mx-auto mb-4 w-full max-w-xs rounded-2xl"
        />
        <p className="mb-4 text-sm text-slate-500">{t.imposter.tagline}</p>

        <section className="rounded-2xl bg-slate-50 px-4 divide-y divide-slate-200">
          <Stepper
            label={t.imposter.setup.players}
            value={s.playerCount}
            min={LIMITS.players.min}
            max={LIMITS.players.max}
            onChange={(v) => patch({ playerCount: v })}
          />
          <Stepper
            label={
              s.randomImposters
                ? t.imposter.setup.maxImposters
                : t.imposter.setup.imposters
            }
            value={s.imposterCount}
            min={1}
            max={maxImposters(s.playerCount)}
            onChange={(v) => patch({ imposterCount: v })}
          />
          <Toggle
            label={t.imposter.setup.randomImposters}
            checked={s.randomImposters}
            onChange={(v) => patch({ randomImposters: v })}
          />
          <Toggle
            label={t.imposter.setup.hints}
            checked={s.hintsEnabled}
            onChange={(v) => patch({ hintsEnabled: v })}
          />
          <Toggle
            label={t.imposter.setup.timer}
            checked={s.timerEnabled}
            onChange={(v) => patch({ timerEnabled: v })}
          />
          {s.timerEnabled && (
            <Stepper
              label={t.imposter.setup.duration}
              value={s.durationMin}
              min={LIMITS.duration.min}
              max={LIMITS.duration.max}
              suffix={t.imposter.setup.minutes}
              onChange={(v) => patch({ durationMin: v })}
            />
          )}
        </section>

        <h2 className="mb-2 mt-6 px-1 text-sm font-semibold text-slate-500">
          {t.imposter.setup.category}
        </h2>
        <button
          onClick={() => setView('categories')}
          className="flex w-full items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-left transition active:scale-[0.99]"
        >
          <CategoryIcon categoryId={catId} fallbackEmoji={catEmoji} size={36} />
          <span className="min-w-0 flex-1 truncate font-semibold">{catLabel}</span>
          <span className="shrink-0 text-slate-300">›</span>
        </button>

        <h2 className="mb-2 mt-6 px-1 text-sm font-semibold text-slate-500">
          {t.imposter.setup.playerNames}
        </h2>
        <button
          onClick={() => setView('names')}
          className="flex w-full items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-left transition active:scale-[0.99]"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-lg">
            ✏️
          </span>
          <span className="min-w-0 flex-1 truncate font-semibold">
            {customNameCount > 0
              ? `${customNameCount} ${t.imposter.setup.playerNamesCustom}`
              : t.imposter.setup.playerNamesDefault}
          </span>
          <span className="shrink-0 text-slate-300">›</span>
        </button>
      </div>

      <div className="shrink-0 px-5 pb-5 pt-2">
        <button onClick={() => onStart(s)} className="btn-brand w-full">
          {t.common.start}
        </button>
      </div>
    </>
  );
}
