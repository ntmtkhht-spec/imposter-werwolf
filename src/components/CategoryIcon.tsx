import { categoryIcons } from '../assets/categories';

type Props = {
  /** Key in src/assets/categories (filename without extension). */
  imageKey: string;
  fallbackEmoji: string;
  size?: number;
  className?: string;
};

/** Renders a generated category icon image, or the emoji fallback if missing. */
export default function CategoryIcon({
  imageKey,
  fallbackEmoji,
  size = 40,
  className = '',
}: Props) {
  const src = categoryIcons[imageKey];
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className={`shrink-0 rounded-xl object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span className="shrink-0 leading-none" style={{ fontSize: size * 0.85 }} aria-hidden>
      {fallbackEmoji}
    </span>
  );
}
