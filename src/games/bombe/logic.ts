import { FUSE_MIN_SECONDS, FUSE_RANDOM_SECONDS } from './config';
import type { TaskCategory } from './tasks';

export type BombRound = {
  /** Prompts in play order; index 0 shows first, each pass advances by one. */
  tasks: string[];
  /** Explosion delay for this round, already randomized. */
  explodeAfterMs: number;
};

export type BuildDeps = {
  /** Prompts of recent rounds; avoided while other prompts are left. */
  recentTasks?: string[];
  rng?: () => number; // injectable for tests
};

/** Fisher–Yates on a copy, driven by the injected rng. */
function shuffleWith(rng: () => number, items: string[]): string[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build a fresh bomb round: shuffled prompt queue from the selected
 * categories plus the randomized explosion delay. The delay is always at
 * least FUSE_MIN_SECONDS; only the window after that is random.
 */
export function buildBombRound(
  categories: TaskCategory[],
  deps: BuildDeps = {},
): BombRound {
  const rng = deps.rng ?? Math.random;

  const all = categories.flatMap((c) => c.tasks);
  // Skip recently played prompts so game nights don't repeat; fall back to
  // the full pool rather than running dry.
  const recent = new Set(deps.recentTasks ?? []);
  const fresh = all.filter((task) => !recent.has(task));
  const pool = fresh.length > 0 ? fresh : all;

  const tasks = shuffleWith(rng, pool);
  const explodeAfterMs = (FUSE_MIN_SECONDS + rng() * FUSE_RANDOM_SECONDS) * 1000;

  return { tasks, explodeAfterMs };
}
