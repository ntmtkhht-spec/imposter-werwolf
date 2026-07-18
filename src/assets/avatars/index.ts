// Auto-imports every image dropped into this folder.
// Add / remove PNG/JPG/WebP/SVG files here — no code change needed.
const modules = import.meta.glob('./*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const avatars: string[] = Object.keys(modules)
  .sort()
  .map((k) => modules[k] as string);

export const hasAvatars = avatars.length > 0;

/** Fisher–Yates shuffle (returns a new array). */
export function shuffle<T>(input: readonly T[]): T[] {
  const a = [...input];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Assign one avatar per player. Shuffled so avatars don't repeat until the
 * pool is exhausted; wraps around for very large groups.
 */
export function assignAvatars(count: number): string[] {
  if (!hasAvatars) return Array(count).fill('');
  const pool = shuffle(avatars);
  return Array.from({ length: count }, (_, i) => pool[i % pool.length]);
}
