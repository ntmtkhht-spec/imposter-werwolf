import { categoriesDe } from './de';
import type { Category } from './types';

export type { Category };

// The game ships German-only word lists; UI translations live in src/i18n.
export function getCategories(): Category[] {
  return categoriesDe;
}

export function getCategory(id: string): Category {
  const list = getCategories();
  return list.find((c) => c.id === id) ?? list[0];
}

/** Resolve selected ids to categories, preserving list order; never empty. */
export function getCategoriesByIds(ids: string[]): Category[] {
  const list = getCategories();
  const set = new Set(ids);
  const picked = list.filter((c) => set.has(c.id));
  return picked.length > 0 ? picked : [list[0]];
}
