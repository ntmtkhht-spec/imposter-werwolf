import { taskCategoriesDe } from './de';
import type { TaskCategory } from './types';

export type { TaskCategory };

// The game ships German-only task lists; UI translations live in src/i18n.
export function getTaskCategories(): TaskCategory[] {
  return taskCategoriesDe;
}

/** Resolve selected ids to categories, preserving list order; never empty. */
export function getTaskCategoriesByIds(ids: string[]): TaskCategory[] {
  const list = getTaskCategories();
  const set = new Set(ids);
  const picked = list.filter((c) => set.has(c.id));
  return picked.length > 0 ? picked : [list[0]];
}
