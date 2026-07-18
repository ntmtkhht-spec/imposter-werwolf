import type { Lang } from '../../../i18n';
import { categoriesDe } from './de';
import { categoriesEn } from './en';
import type { Category } from './types';

export type { Category };

export function getCategories(lang: Lang): Category[] {
  return lang === 'de' ? categoriesDe : categoriesEn;
}

export function getCategory(lang: Lang, id: string): Category {
  const list = getCategories(lang);
  return list.find((c) => c.id === id) ?? list[0];
}

/** Resolve selected ids to categories, preserving list order; never empty. */
export function getCategoriesByIds(lang: Lang, ids: string[]): Category[] {
  const list = getCategories(lang);
  const set = new Set(ids);
  const picked = list.filter((c) => set.has(c.id));
  return picked.length > 0 ? picked : [list[0]];
}
