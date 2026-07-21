import { describe, it, expect } from 'vitest';
import { categoriesDe } from './de';

// Data-quality guard: the imposter hint must stay useful. A hint that equals
// the category, repeats endlessly, or spans several words caused real-game
// frustration — keep these rules intact when adding words.
describe.each(categoriesDe.map((c) => [c.name, c] as const))('category %s', (_name, cat) => {
  it('has enough words for variety', () => {
    expect(cat.words.length).toBeGreaterThanOrEqual(50);
  });

  it('has no duplicate words', () => {
    const words = cat.words.map((w) => w.word.toLowerCase());
    expect(new Set(words).size).toBe(words.length);
  });

  it('uses single-word hints only', () => {
    for (const { hint } of cat.words) {
      expect(hint, `hint "${hint}"`).not.toMatch(/\s/);
      expect(hint.length).toBeGreaterThan(0);
    }
  });

  it('never leaks the word or the category through the hint', () => {
    for (const { word, hint } of cat.words) {
      const h = hint.toLowerCase();
      expect(h, `hint for "${word}"`).not.toBe(word.toLowerCase());
      expect(h).not.toBe(cat.name.toLowerCase());
      if (cat.hint) expect(h, `hint for "${word}"`).not.toBe(cat.hint.toLowerCase());
    }
  });

  it('repeats a hint at most twice', () => {
    const counts = new Map<string, number>();
    for (const { hint } of cat.words) {
      const h = hint.toLowerCase();
      counts.set(h, (counts.get(h) ?? 0) + 1);
    }
    for (const [hint, n] of counts) {
      expect(n, `hint "${hint}" used ${n}x`).toBeLessThanOrEqual(2);
    }
  });
});
