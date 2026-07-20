export type ImposterSettings = {
  playerCount: number;
  /** Fixed imposter count, or the MAX when randomImposters is on. */
  imposterCount: number;
  /** When on, actual imposters per round = random 1..imposterCount. */
  randomImposters: boolean;
  hintsEnabled: boolean;
  /** One or more selected categories; the round word is drawn from these. */
  categoryIds: string[];
  /** Custom player names, indexed by player slot. Empty string = use default "Player N". */
  playerNames: string[];
  timerEnabled: boolean;
  durationMin: number;
  /** When on, each round draws one random special rule announced to everyone. */
  specialRule: boolean;
};

export const LIMITS = {
  players: { min: 3, max: 20 },
  duration: { min: 1, max: 10 },
} as const;

export const DEFAULT_SETTINGS: ImposterSettings = {
  playerCount: 4,
  imposterCount: 1,
  randomImposters: false,
  hintsEnabled: true,
  categoryIds: ['easy'],
  playerNames: [],
  timerEnabled: true,
  durationMin: 3,
  specialRule: false,
};

/** Max imposters = players - 1 (at least one non-imposter must exist). */
export function maxImposters(playerCount: number): number {
  return Math.max(1, playerCount - 1);
}

/** Clamp settings so they stay internally consistent after any change. */
export function normalizeSettings(s: ImposterSettings): ImposterSettings {
  const playerCount = Math.min(
    LIMITS.players.max,
    Math.max(LIMITS.players.min, s.playerCount),
  );
  const imposterCount = Math.min(maxImposters(playerCount), Math.max(1, s.imposterCount));
  const durationMin = Math.min(
    LIMITS.duration.max,
    Math.max(LIMITS.duration.min, s.durationMin),
  );
  // Ensure at least one category. Migrate a legacy single `categoryId` if the
  // stored settings predate multi-select.
  const legacy = (s as { categoryId?: string }).categoryId;
  let categoryIds = Array.isArray(s.categoryIds) ? s.categoryIds.filter(Boolean) : [];
  if (categoryIds.length === 0) categoryIds = legacy ? [legacy] : ['easy'];
  // Resize to playerCount, preserving existing entries by index.
  const rawNames = Array.isArray(s.playerNames) ? s.playerNames : [];
  const playerNames = Array.from({ length: playerCount }, (_, i) => (rawNames[i] ?? '').trim());
  return { ...s, playerCount, imposterCount, durationMin, categoryIds, playerNames };
}
