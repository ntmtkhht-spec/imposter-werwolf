import bombImg from './assets/bomb';

type Props = {
  /** 0..1 — how long the round has been running; drives the pulse speed. */
  intensity: number;
};

/**
 * The bomb visual. Uses the generated artwork when present under
 * ./assets, otherwise falls back to a simple inline SVG so the game
 * works before the images exist.
 */
export default function BombGraphic({ intensity }: Props) {
  const duration = Math.max(0.35, 1 - intensity * 0.6); // pulse speeds up
  return (
    <div
      className="mx-auto w-48 select-none"
      style={{ animation: `bomb-pulse ${duration}s ease-in-out infinite` }}
    >
      {bombImg ? (
        <img src={bombImg} alt="" className="h-48 w-48 object-contain" draggable={false} />
      ) : (
        <svg viewBox="0 0 200 200" className="h-48 w-48">
          <line x1="128" y1="52" x2="150" y2="26" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />
          <circle cx="156" cy="20" r="9" fill="#f59e0b" />
          <circle cx="156" cy="20" r="4" fill="#fde68a" />
          <circle cx="96" cy="116" r="70" fill="#1e293b" />
          <circle cx="74" cy="94" r="18" fill="#334155" />
          <rect x="112" y="42" width="30" height="22" rx="6" fill="#475569" transform="rotate(20 127 53)" />
        </svg>
      )}
    </div>
  );
}
