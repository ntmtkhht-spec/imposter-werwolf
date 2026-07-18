import { useState } from 'react';
import { useI18n } from '../../../i18n';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import TopBar from '../../../components/TopBar';
import LangToggle from '../../../components/LangToggle';
import Stepper from '../../../components/Stepper';
import Toggle from '../../../components/Toggle';
import PlayerNamesScreen from './PlayerNamesScreen';
import {
  DEFAULT_SETTINGS,
  LIMITS,
  maxWerewolves,
  normalizeSettings,
  type WerwolfSettings,
} from '../config';

type Props = {
  onStart: (s: WerwolfSettings) => void;
  onExit: () => void;
};

export default function SetupScreen({ onStart, onExit }: Props) {
  const { t } = useI18n();
  const w = t.werwolf;
  const [settings, setSettings] = useLocalStorage<WerwolfSettings>(
    'werwolf.settings',
    DEFAULT_SETTINGS,
  );
  const [view, setView] = useState<'setup' | 'names'>('setup');
  const s = normalizeSettings({ ...DEFAULT_SETTINGS, ...settings });
  const patch = (p: Partial<WerwolfSettings>) =>
    setSettings(normalizeSettings({ ...s, ...p }));

  const customNameCount = s.playerNames.filter((n) => n.trim().length > 0).length;

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
        title={w.name}
        left={
          <button onClick={onExit} className="text-2xl leading-none" aria-label={t.common.back}>
            ←
          </button>
        }
        right={<LangToggle />}
      />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <p className="mb-4 text-sm text-slate-500">{w.tagline}</p>

        <section className="rounded-2xl bg-slate-50 px-4 divide-y divide-slate-200">
          <Stepper
            label={w.setup.players}
            value={s.playerCount}
            min={LIMITS.players.min}
            max={LIMITS.players.max}
            onChange={(v) => patch({ playerCount: v })}
          />
          <Stepper
            label={w.setup.werewolves}
            value={s.werewolfCount}
            min={1}
            max={maxWerewolves(s.playerCount)}
            onChange={(v) => patch({ werewolfCount: v })}
          />
          <Toggle label={w.setup.seer} checked={s.seer} onChange={(v) => patch({ seer: v })} />
          <Toggle label={w.setup.witch} checked={s.witch} onChange={(v) => patch({ witch: v })} />
          <Toggle
            label={w.setup.hunter}
            checked={s.hunter}
            onChange={(v) => patch({ hunter: v })}
          />
          <Toggle
            label={w.setup.timer}
            checked={s.timerEnabled}
            onChange={(v) => patch({ timerEnabled: v })}
          />
          {s.timerEnabled && (
            <Stepper
              label={w.setup.duration}
              value={s.discussionMin}
              min={LIMITS.discussion.min}
              max={LIMITS.discussion.max}
              suffix={w.setup.minutes}
              onChange={(v) => patch({ discussionMin: v })}
            />
          )}
        </section>

        <h2 className="mb-2 mt-6 px-1 text-sm font-semibold text-slate-500">
          {w.setup.playerNames}
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
              ? `${customNameCount} ${w.setup.playerNamesCustom}`
              : w.setup.playerNamesDefault}
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
