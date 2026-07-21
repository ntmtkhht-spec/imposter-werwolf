export type BombeSettings = {
  /** One or more selected task categories; prompts are drawn from these. */
  categoryIds: string[];
  /** The bomb never explodes before this many seconds. */
  minSeconds: number;
  /** Random extra window: explosion happens within minSeconds..minSeconds+extraSeconds. */
  extraSeconds: number;
  /** New prompt every time the bomb is passed (off = one prompt per round). */
  newTaskPerPass: boolean;
  /** Ticking + explosion sounds. */
  soundEnabled: boolean;
};

export const LIMITS = {
  minSeconds: { min: 5, max: 60 },
  extraSeconds: { min: 5, max: 60 },
} as const;

export const DEFAULT_SETTINGS: BombeSettings = {
  categoryIds: ['klassik'],
  minSeconds: 20,
  extraSeconds: 25,
  newTaskPerPass: true,
  soundEnabled: true,
};

/** Clamp settings so they stay internally consistent after any change. */
export function normalizeSettings(s: BombeSettings): BombeSettings {
  const minSeconds = Math.min(
    LIMITS.minSeconds.max,
    Math.max(LIMITS.minSeconds.min, s.minSeconds),
  );
  const extraSeconds = Math.min(
    LIMITS.extraSeconds.max,
    Math.max(LIMITS.extraSeconds.min, s.extraSeconds),
  );
  let categoryIds = Array.isArray(s.categoryIds) ? s.categoryIds.filter(Boolean) : [];
  if (categoryIds.length === 0) categoryIds = ['klassik'];
  return { ...s, minSeconds, extraSeconds, categoryIds };
}
