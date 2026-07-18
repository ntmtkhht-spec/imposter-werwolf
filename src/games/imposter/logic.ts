import { assignAvatars, shuffle } from '../../assets/avatars';
import type { ImposterSettings } from './config';
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
};

export type BuildDeps = {
  imposterLabel: string; // localized "Imposter"
  /** Resolved display name per player index (custom name or default "Player N"). */
  playerNames: string[];
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
  const secretWordObj = category.words[Math.floor(rng() * category.words.length)];
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

  return { secretWord, roles };
}
