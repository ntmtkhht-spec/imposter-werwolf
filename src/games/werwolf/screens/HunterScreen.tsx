import { useEffect, useState } from 'react';
import { useI18n } from '../../../i18n';
import PlayerPicker from './PlayerPicker';
import { livingPlayers, type WerwolfPlayer } from '../logic';
import type { HostManager } from '../multiplayer';
import { narrate } from '../narrator';

type Props = {
  players: WerwolfPlayer[];
  onComplete: (targetIndex: number) => void;
  /** Multiplayer: the dying hunter picks on their own phone too. */
  hunterIndex?: number | null;
  hostManager?: HostManager | null;
  peerByIndex?: Record<number, string>;
  narrator?: boolean;
};

export default function HunterScreen({
  players,
  onComplete,
  hunterIndex = null,
  hostManager = null,
  peerByIndex = {},
  narrator: narratorOn = false,
}: Props) {
  const { t } = useI18n();
  const h = t.werwolf.hunter;
  const [target, setTarget] = useState<number | null>(null);
  const living = livingPlayers(players);

  const hunterPeer = hunterIndex !== null ? peerByIndex[hunterIndex] : undefined;

  useEffect(() => {
    narrate('hunter', narratorOn);
  }, [narratorOn]);

  // Multiplayer: hand the shot to the hunter's phone (host keeps control too).
  useEffect(() => {
    if (!hostManager || !hunterPeer) return;
    hostManager.sendTo(hunterPeer, {
      type: 'YOUR_TURN',
      step: 'hunter',
      candidates: living.map((p) => ({ index: p.index, name: p.name })),
    });
    hostManager.onAction = (_peerId, msg) => {
      if (msg.step !== 'hunter' || typeof msg.target !== 'number') return;
      if (living.some((p) => p.index === msg.target)) {
        hostManager.sendTo(hunterPeer, { type: 'TURN_ENDED', step: 'hunter' });
        onComplete(msg.target);
      }
    };
    return () => {
      hostManager.onAction = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostManager, hunterPeer]);

  const shoot = () => {
    if (target === null) return;
    if (hostManager && hunterPeer) {
      hostManager.sendTo(hunterPeer, { type: 'TURN_ENDED', step: 'hunter' });
    }
    onComplete(target);
  };

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
      <div className="mb-4 text-center">
        <div className="mb-3 text-6xl">🏹</div>
        <h2 className="text-xl font-extrabold">{h.title}</h2>
        <p className="mt-1 text-sm text-slate-500">{h.desc}</p>
      </div>

      <h3 className="mb-2 px-1 text-sm font-semibold text-slate-500">{h.chooseTarget}</h3>
      <div className="flex-1 overflow-y-auto">
        <PlayerPicker players={living} selected={target} onPick={setTarget} />
      </div>

      <button onClick={shoot} disabled={target === null} className="btn-brand mt-3 w-full">
        {h.shoot}
      </button>
    </div>
  );
}
