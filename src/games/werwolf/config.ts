export type WerwolfSettings = {
  playerCount: number;
  werewolfCount: number;
  seer: boolean;
  witch: boolean;
  hunter: boolean;
  timerEnabled: boolean;
  discussionMin: number;
  multiplayer: boolean;
  /** Custom player names by slot; empty = default "Player N". */
  playerNames: string[];
};

export const LIMITS = {
  players: { min: 5, max: 20 },
  discussion: { min: 1, max: 10 },
} as const;

export const DEFAULT_SETTINGS: WerwolfSettings = {
  playerCount: 6,
  werewolfCount: 2,
  seer: true,
  witch: true,
  hunter: false,
  timerEnabled: true,
  discussionMin: 3,
  multiplayer: false,
  playerNames: [],
};

export function specialsCount(s: WerwolfSettings): number {
  return (s.seer ? 1 : 0) + (s.witch ? 1 : 0) + (s.hunter ? 1 : 0);
}

/** Werewolves must stay a minority: at most floor((players-1)/2). */
export function maxWerewolves(playerCount: number): number {
  return Math.max(1, Math.floor((playerCount - 1) / 2));
}

/** Clamp settings so the role composition always fits the player count. */
export function normalizeSettings(s: WerwolfSettings): WerwolfSettings {
  const playerCount = Math.min(
    LIMITS.players.max,
    Math.max(LIMITS.players.min, s.playerCount),
  );
  let werewolfCount = Math.min(maxWerewolves(playerCount), Math.max(1, s.werewolfCount));
  // Ensure werewolves + special roles never exceed the player count.
  const specials = (s.seer ? 1 : 0) + (s.witch ? 1 : 0) + (s.hunter ? 1 : 0);
  if (werewolfCount + specials > playerCount) {
    werewolfCount = Math.max(1, playerCount - specials);
  }
  const discussionMin = Math.min(
    LIMITS.discussion.max,
    Math.max(LIMITS.discussion.min, s.discussionMin),
  );
  const rawNames = Array.isArray(s.playerNames) ? s.playerNames : [];
  const playerNames = Array.from({ length: playerCount }, (_, i) => (rawNames[i] ?? '').trim());
  return { ...s, playerCount, werewolfCount, discussionMin, playerNames };
}
