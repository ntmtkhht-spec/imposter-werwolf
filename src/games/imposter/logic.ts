import { assignAvatars, shuffle } from '../../assets/avatars';
import type { ImposterSettings } from './config';
import { RULE_IDS } from './rules';
import type { Category } from './words';

export type PlayerRole = {
  index: number; // 0-based
  name: string; // display name, custom or default "Player N"
  isImposter: boolean;
  word: string; // secret word, or the imposter label
  hint?: string;
  avatar: string;
};

export type Round = {
  secretWord: string;
  roles: PlayerRole[];
  /** Index of the player who describes first; re-rolled every round. */
  starterIndex: number;
  /** Player indices in the order they get handed the phone; shuffled per round. */
  revealOrder: number[];
  /** Special rule drawn for this round, or null when the option is off. */
  ruleId: string | null;
};

export type BuildDeps = {
  imposterLabel: string; // localized "Imposter"
  /** Resolved display name per player index (custom name or default "Player N"). */
  playerNames: string[];
  /** Secret words of recent rounds; avoided when the category has other words left. */
  recentWords?: string[];
  rng?: () => number; // injectable for tests
  assign?: (n: number) => string[]; // injectable avatar assigner for tests
};

/** Build a fresh round: pick word, choose imposters, assign avatars. */
export function buildRound(
  settings: ImposterSettings,
  categories: Category[],
  deps: BuildDeps,
): Round {
  const rng = deps.rng ?? Math.random;
  const assign = deps.assign ?? assignAvatars;

  // Pick one of the selected categories, then a word from it. The chosen
  // category also drives the imposter hint.
  const category = categories[Math.floor(rng() * categories.length)] ?? categories[0];

  // Skip recently played words so rounds don't repeat; if the whole category
  // was played recently, fall back to the full list rather than failing.
  const recent = new Set(deps.recentWords ?? []);
  const fresh = category.words.filter((w) => !recent.has(w.word));
  const pool = fresh.length > 0 ? fresh : category.words;
  const secretWordObj = pool[Math.floor(rng() * pool.length)];
  const secretWord = secretWordObj.word;

  // Actual imposter count: fixed, or random 1..max when enabled. Always ≥1,
  // and never all players (config already clamps max to players - 1).
  const maxImposters = Math.min(settings.imposterCount, settings.playerCount - 1);
  const imposterCount = settings.randomImposters
    ? 1 + Math.floor(rng() * maxImposters)
    : maxImposters;

  // Pick which player indices are imposters.
  const indices = shuffle(Array.from({ length: settings.playerCount }, (_, i) => i));
  const imposterSet = new Set(indices.slice(0, imposterCount));

  const avatars = assign(settings.playerCount);

  const roles: PlayerRole[] = Array.from({ length: settings.playerCount }, (_, i) => {
    const isImposter = imposterSet.has(i);
    return {
      index: i,
      name: deps.playerNames[i] ?? `Player ${i + 1}`,
      isImposter,
      word: isImposter ? deps.imposterLabel : secretWord,
      hint: isImposter && settings.hintsEnabled ? secretWordObj.hint : undefined,
      avatar: avatars[i] ?? '',
    };
  });

  // Anyone can start — picked fresh each round so it rotates naturally.
  const starterIndex = Math.floor(rng() * settings.playerCount);

  // Hand the phone around in a different order every round, so the same
  // person isn't always first to look at their card.
  const revealOrder = shuffle(
    Array.from({ length: settings.playerCount }, (_, i) => i),
    rng,
  );

  // Optional twist for the round, announced to everyone before play starts.
  const ruleId = settings.specialRule
    ? RULE_IDS[Math.floor(rng() * RULE_IDS.length)]
    : null;

  return { secretWord, roles, starterIndex, revealOrder, ruleId };
}
