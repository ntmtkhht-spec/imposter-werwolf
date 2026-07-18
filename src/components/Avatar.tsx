// Emoji fallback used until real avatar images are added to assets/avatars.
const FALLBACK = ['🐔', '🐮', '🐵', '🐱', '🦍', '🦁', '🐴', '🐰', '🐺', '🐷', '🐸', '🐹'];

type Props = {
  src?: string;
  seed?: number;
  size?: number;
  className?: string;
};

export default function Avatar({ src, seed = 0, size = 128, className = '' }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className={`rounded-2xl object-cover ${className}`}
      />
    );
  }
  const emoji = FALLBACK[seed % FALLBACK.length];
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-white/20 ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.55 }}
      aria-hidden
    >
      {emoji}
    </div>
  );
}
