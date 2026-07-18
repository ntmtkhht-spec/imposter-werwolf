import { useRef, useState } from 'react';
import { useI18n } from '../../../i18n';
import Avatar from '../../../components/Avatar';
import type { Round } from '../logic';

type Props = {
  round: Round;
  onDone: () => void;
};

// Swipe-up distance (px) that counts as an intentional reveal gesture.
const SWIPE_THRESHOLD = 40;
// Cap how far the card visually follows the drag.
const MAX_DRAG = 120;

export default function RevealScreen({ round, onDone }: Props) {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartY = useRef<number | null>(null);
  // Mirrors dragY for the pointer-up threshold check. Pointer events can fire
  // back-to-back in the same tick, and React batches their state updates, so
  // reading the `dragY` state itself in handlePointerUp can see a stale
  // pre-drag value; a ref is updated synchronously and never stale.
  const dragYRef = useRef(0);
  // Set when a swipe already toggled the reveal, so the click that follows
  // the pointer-up doesn't toggle it a second time.
  const suppressClick = useRef(false);

  const isLast = current >= round.roles.length - 1;
  const role = round.roles[Math.min(current, round.roles.length - 1)];
  const r = t.imposter.reveal;

  // The card only ever flips the role; advancing to the next player is the
  // sole job of the "Next player" button below.
  const toggleRevealed = () => setRevealed((prev) => !prev);

  const advance = () => {
    if (isLast) {
      onDone();
      return;
    }
    // Plain value (not a functional updater) so rapid double-taps stay
    // idempotent and can never advance past the last player.
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
    toggleRevealed();
  };

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
      <p className="mb-4 text-center text-sm font-medium text-slate-400">
        {r.player} {current + 1} / {round.roles.length}
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
            WebkitTransform: `translateY(${dragY}px) rotateY(${revealed ? 180 : 0}deg)`,
            transition: dragging ? 'none' : 'transform 500ms cubic-bezier(0.4,0.1,0.2,1)',
            touchAction: 'none',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
          className="absolute inset-0 block h-full w-full text-center"
        >
          {/* Front face: avatar + name, hidden once flipped past 90deg */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-brand p-6 text-white [-webkit-backface-visibility:hidden] [backface-visibility:hidden]"
          >
            <Avatar src={role.avatar} seed={role.index} size={280} className="mx-auto mb-6 max-w-full" />
            <div className="text-3xl font-extrabold">{role.name}</div>
            <div className="mt-2 text-white/80">{r.tapToReveal}</div>
          </div>

          {/* Back face: role/word, pre-rotated so it faces forward once flipped */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-white p-6 ring-2 ring-brand [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [-webkit-transform:rotateY(180deg)] [transform:rotateY(180deg)]"
          >
            <span
              className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white ${
                role.isImposter ? 'bg-brand' : 'bg-blue-600'
              }`}
              aria-hidden
            >
              {role.isImposter ? '✕' : '✓'}
            </span>
            <Avatar src={role.avatar} seed={role.index} size={140} className="mx-auto mb-4 max-w-full" />
            {role.isImposter ? (
              <>
                <div className="text-4xl font-black text-brand">{r.imposter}</div>
                {role.hint && (
                  <div className="mt-3 text-slate-500">
                    {r.hintLabel}: <span className="font-semibold text-ink">{role.hint}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-4xl font-black text-ink">{role.word}</div>
            )}
            <div className="mt-6 text-sm text-slate-400">{r.tapToHide}</div>
          </div>
        </button>
      </div>

      <div className="mt-5 shrink-0 text-center">
        <button onClick={advance} className="btn-primary w-full">
          {isLast ? r.toTimer : r.nextPlayer}
        </button>
        <p className="mt-3 text-sm text-slate-400">{r.pass}</p>
      </div>
    </div>
  );
}
