export type BombeSettings = {
  /** One or more selected task categories; prompts are drawn from these. */
  categoryIds: string[];
  /** New prompt every time the bomb is passed (off = one prompt per round). */
  newTaskPerPass: boolean;
};

/**
 * Fuse timing is deliberately NOT a setting: if players know the numbers they
 * can count along and the tension is gone. The bomb never goes off before
 * FUSE_MIN_SECONDS, then explodes at a random point inside the window.
 */
export const FUSE_MIN_SECONDS = 20;
export const FUSE_RANDOM_SECONDS = 25;

export const DEFAULT_SETTINGS: BombeSettings = {
  categoryIds: ['klassik'],
  newTaskPerPass: true,
};

/** Clamp settings so they stay internally consistent after any change. */
export function normalizeSettings(s: BombeSettings): BombeSettings {
  let categoryIds = Array.isArray(s.categoryIds) ? s.categoryIds.filter(Boolean) : [];
  if (categoryIds.length === 0) categoryIds = ['klassik'];
  // Rebuilt explicitly so settings stored under an older schema (fuse
  // steppers, sound toggle) don't linger in localStorage.
  return {
    categoryIds,
    newTaskPerPass: s.newTaskPerPass !== false,
  };
}
