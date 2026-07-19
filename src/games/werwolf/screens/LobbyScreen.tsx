import { useEffect, useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useI18n } from '../../../i18n';
import TopBar from '../../../components/TopBar';
import { HostManager } from '../multiplayer';
import { unlockNarrator } from '../narrator';
import type { WerwolfSettings } from '../config';

type Props = {
  settings: WerwolfSettings;
  onStart: (hostManager: HostManager) => void;
  onExit: () => void;
};

export default function LobbyScreen({ settings, onStart, onExit }: Props) {
  const { t } = useI18n();
  const [hostId, setHostId] = useState<string | null>(null);
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const managerRef = useRef<HostManager | null>(null);

  useEffect(() => {
    // Guard against React StrictMode double-mount: a second HostManager would
    // own a different peer id than the QR code shows, so joins would land on
    // the wrong instance and the game would start with zero players.
    if (managerRef.current) return;
    const manager = new HostManager(
      (id) => setHostId(id),
      (joinedPlayers) => setPlayers(joinedPlayers)
    );
    managerRef.current = manager;

    return () => {
      // Don't destroy if we are starting the game
    };
  }, []);

  const handleStart = () => {
    if (managerRef.current) {
      unlockNarrator(); // user gesture unlocks mobile audio playback
      onStart(managerRef.current);
    }
  };

  const handleExit = () => {
    managerRef.current?.destroy();
    onExit();
  };

  const joinUrl = hostId ? `${window.location.origin}/spiel/werwolf/join/${hostId}` : '';
  const readyToStart = players.length >= settings.playerCount;

  return (
    <div className="flex h-full flex-col bg-slate-100">
      <TopBar
        title="Lobby"
        left={
          <button onClick={handleExit} className="text-2xl leading-none" aria-label={t.common.back}>
            ←
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        <div className="mt-4 flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-center text-lg font-bold text-slate-800">
            QR Code scannen zum Beitreten
          </h2>
          {hostId ? (
            <div className="rounded-xl border border-slate-100 bg-white p-2">
              <QRCodeSVG value={joinUrl} size={200} />
            </div>
          ) : (
            <div className="flex h-[200px] w-[200px] items-center justify-center text-slate-400">
              Lade...
            </div>
          )}
          <p className="mt-4 text-center text-sm text-slate-500">
            {players.length} von {settings.playerCount} Spielern verbunden
          </p>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 px-1 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Verbundene Spieler
          </h3>
          <ul className="flex flex-col gap-2">
            {players.map((p, i) => (
              <li key={p.id} className="rounded-xl bg-white p-3 font-medium shadow-sm">
                {i + 1}. {p.name}
              </li>
            ))}
            {players.length === 0 && (
              <li className="text-center text-sm text-slate-400 py-4">Noch niemand da</li>
            )}
          </ul>
        </div>
      </div>
      <div className="shrink-0 bg-white p-5 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleStart}
          disabled={!readyToStart}
          className="btn-brand w-full disabled:opacity-50"
        >
          {readyToStart ? t.common.start : 'Warte auf Spieler...'}
        </button>
      </div>
    </div>
  );
}
