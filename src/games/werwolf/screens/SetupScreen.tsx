import { useState } from 'react';
import { useI18n } from '../../../i18n';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import TopBar from '../../../components/TopBar';
import LangToggle from '../../../components/LangToggle';
import Stepper from '../../../components/Stepper';
import Toggle from '../../../components/Toggle';
import PlayerNamesScreen from './PlayerNamesScreen';
import setupHero from '../../../assets/hero/werwolfgrafik.png';
import shareDeviceImg from '../../../assets/werwolf/share-device.png';
import qrJoinImg from '../../../assets/werwolf/qr-join.png';
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
  const [view, setView] = useState<'mode' | 'setup' | 'names'>('mode');
  const s = normalizeSettings({ ...DEFAULT_SETTINGS, ...settings });
  const patch = (p: Partial<WerwolfSettings>) =>
    setSettings(normalizeSettings({ ...s, ...p }));

  const customNameCount = s.playerNames.filter((n) => n.trim().length > 0).length;

  if (view === 'mode') {
    return (
      <>
        <TopBar
          title={w.name}
          left={
            <button onClick={onExit} className="text-2xl leading-none" aria-label={t.common.back}>
              ←
            </button>
          }
        />
        <div className="flex-1 flex flex-col justify-center px-5">
          <div className="w-full max-w-md mx-auto">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-800">
              Wie möchtet ihr spielen?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  patch({ multiplayer: false });
                  setView('setup');
                }}
                className="flex flex-col items-center justify-start gap-3 rounded-3xl bg-white p-4 shadow-sm transition active:scale-[0.98] ring-1 ring-slate-200 text-center"
              >
                <img src={shareDeviceImg} alt="" className="aspect-square w-full rounded-2xl object-cover" />
                <div>
                  <span className="block font-bold text-slate-800 leading-tight">Ein Gerät<br/>teilen</span>
                  <span className="mt-2 block text-xs text-slate-500 leading-tight">
                    Das Handy wird weitergegeben
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  patch({ multiplayer: true });
                  setView('setup');
                }}
                className="flex flex-col items-center justify-start gap-3 rounded-3xl bg-white p-4 shadow-sm transition active:scale-[0.98] ring-1 ring-slate-200 text-center"
              >
                <img src={qrJoinImg} alt="" className="aspect-square w-full rounded-2xl object-cover" />
                <div>
                  <span className="block font-bold text-slate-800 leading-tight">Jeder sein<br/>Gerät</span>
                  <span className="mt-2 block text-xs text-slate-500 leading-tight">
                    Über QR-Code beitreten
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
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
        title={w.name}
        left={
          <button onClick={() => setView('mode')} className="text-2xl leading-none" aria-label={t.common.back}>
            ←
          </button>
        }
        right={<LangToggle />}
      />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <img
          src={setupHero}
          alt=""
          className="mx-auto mb-4 w-full max-w-sm rounded-2xl"
        />
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
