import { bomb } from './assets';

type Props = {
  /** 0..1 — how long the round has been running; drives the pulse speed. */
  intensity: number;
};

export default function BombGraphic({ intensity }: Props) {
  const duration = Math.max(0.35, 1 - intensity * 0.6); // pulse speeds up
  return (
    <img
      src={bomb}
      alt=""
      draggable={false}
      className="mx-auto h-56 w-auto select-none object-contain drop-shadow-2xl"
      style={{ animation: `bomb-pulse ${duration}s ease-in-out infinite` }}
    />
  );
}
