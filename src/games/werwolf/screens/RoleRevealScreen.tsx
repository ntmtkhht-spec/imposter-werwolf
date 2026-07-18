import { useRef, useState } from 'react';
import { useI18n } from '../../../i18n';
import type { WerwolfPlayer } from '../logic';
import { ROLE_IMAGES } from '../roles';

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
  const [isSwipingOut, setIsSwipingOut] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const dragYRef = useRef(0);
  const suppressClick = useRef(false);

  const isLast = current >= players.length - 1;
  const player = players[Math.min(current, players.length - 1)];

  const advance = () => {
    setIsSwipingOut(true);
    setTimeout(() => {
      if (isLast) {
        onDone();
      } else {
        setIsSwipingOut(false);
        setRevealed(false);
        setCurrent(current + 1);
      }
    }, 250);
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
    <div className="flex flex-1 flex-col px-5 pb-6 pt-4 overflow-hidden">
      <p className="mb-4 text-center text-sm font-medium text-slate-400">
        {w.player} {current + 1} / {players.length}
      </p>

      <div className="flex flex-1 items-center justify-center [perspective:1200px]">
        <div
          key={current}
          className={`w-full max-w-sm ${isSwipingOut ? 'animate-swipe-out' : 'animate-swipe-in'}`}
        >
          <button
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              transform: `translateY(${dragY}px) rotateY(${revealed ? 180 : 0}deg)`,
              transition: dragging ? 'none' : 'transform 400ms ease-out',
              touchAction: 'none',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
            className="relative block w-full aspect-square text-center"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl [backface-visibility:hidden]">
              <img src="/werwolfBilder/rückseite.png" alt="Back" className="absolute inset-0 h-full w-full object-contain" />
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="text-4xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">{player.name}</div>
                <div className="mt-4 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm">{w.tapToReveal}</div>
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <img src={ROLE_IMAGES[player.role]} alt={player.role} className="absolute inset-0 h-full w-full object-contain" />
              <div className="relative z-10 mb-auto mt-6 flex flex-col items-center">
                <div className="rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm">{w.tapToHide}</div>
              </div>
            </div>
          </button>
        </div>
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
