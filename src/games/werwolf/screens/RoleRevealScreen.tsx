import { useRef, useState } from 'react';
import { useI18n } from '../../../i18n';
import Avatar from '../../../components/Avatar';
import RoleIcon from '../RoleIcon';
import type { WerwolfPlayer } from '../logic';

type Props = {
  players: WerwolfPlayer[];
  onDone: () => void;
};

const SWIPE_THRESHOLD = 40;
const MAX_DRAG = 120;

export default function RoleRevealScreen({ players, onDone }: Props) {
  const { t } = useI18n();
  const w = t.werwolf.reveal;
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const dragYRef = useRef(0);
  const suppressClick = useRef(false);

  const isLast = current >= players.length - 1;
  const player = players[Math.min(current, players.length - 1)];
  const roleMeta = t.werwolf.roles[player.role];

  const advance = () => {
    if (isLast) {
      onDone();
      return;
    }
    setRevealed(false);
    setCurrent(current + 1);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragStartY.current = e.clientY;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (dragStartY.current === null) return;
    const delta = e.clientY - dragStartY.current;
    if (delta < 0) {
      const clamped = Math.max(delta, -MAX_DRAG);
      dragYRef.current = clamped;
      setDragY(clamped);
    }
  };
  const handlePointerUp = () => {
    if (dragStartY.current === null) return;
    dragStartY.current = null;
    setDragging(false);
    if (dragYRef.current <= -SWIPE_THRESHOLD && !revealed) {
      setRevealed(true);
      suppressClick.current = true;
    }
    dragYRef.current = 0;
    setDragY(0);
  };
  const handleClick = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    setRevealed((p) => !p);
  };

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
      <p className="mb-4 text-center text-sm font-medium text-slate-400">
        {w.player} {current + 1} / {players.length}
      </p>

      <div className="relative min-h-[420px] flex-1 [perspective:1200px]">
        <button
          onClick={handleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            transform: `translateY(${dragY}px) rotateY(${revealed ? 180 : 0}deg)`,
            transition: dragging ? 'none' : 'transform 500ms cubic-bezier(0.4,0.1,0.2,1)',
            touchAction: 'none',
            transformStyle: 'preserve-3d',
          }}
          className="absolute inset-0 block h-full w-full text-center"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-ink p-6 text-white [backface-visibility:hidden]">
            <Avatar src={player.avatar} seed={player.index} size={260} className="mx-auto mb-6 max-w-full" />
            <div className="text-3xl font-extrabold">{player.name}</div>
            <div className="mt-2 text-white/70">{w.tapToReveal}</div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-white p-6 ring-2 ring-brand [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <RoleIcon role={player.role} size={130} className="mb-4 max-w-full" />
            <div className="text-3xl font-black text-ink">{roleMeta.name}</div>
            <div className="mt-3 max-w-xs text-sm text-slate-500">{roleMeta.desc}</div>
            <div className="mt-5 text-sm text-slate-400">{w.tapToHide}</div>
          </div>
        </button>
      </div>

      <div className="mt-5 shrink-0 text-center">
        <button onClick={advance} className="btn-primary w-full">
          {isLast ? w.toNight : w.nextPlayer}
        </button>
        <p className="mt-3 text-sm text-slate-400">{w.pass}</p>
      </div>
    </div>
  );
}
