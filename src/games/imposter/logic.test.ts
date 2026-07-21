import { describe, it, expect } from 'vitest';
import { buildRound } from './logic';
import { normalizeSettings, maxImposters, DEFAULT_SETTINGS } from './config';
import { RULE_IDS } from './rules';
import type { Category } from './words';

const cat: Category = {
  id: 'test',
  name: 'Test',
  icon: '🧪',
  hint: 'HintWord',
  words: [
    { word: 'Alpha', hint: 'HintWord' },
    { word: 'Beta', hint: 'HintWord' },
    { word: 'Gamma', hint: 'HintWord' },
  ],
};

const deps = {
  imposterLabel: 'IMPOSTER',
  playerNames: Array.from({ length: 20 }, (_, i) => `Player ${i + 1}`),
  assign: (n: number) => Array.from({ length: n }, (_, i) => `avatar-${i}`),
};

describe('buildRound', () => {
  it('creates one role per player', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 6, imposterCount: 2 });
    const round = buildRound(s, [cat],deps);
    expect(round.roles).toHaveLength(6);
  });

  it('assigns the resolved display name per player', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 3 });
    const round = buildRound(
      s,
      [cat],
      { ...deps, playerNames: ['Anna', '', 'Charlie'] },
    );
    expect(round.roles.map((r) => r.name)).toEqual(['Anna', '', 'Charlie']);
  });

  it('marks exactly imposterCount imposters', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 8, imposterCount: 3 });
    const round = buildRound(s, [cat],deps);
    expect(round.roles.filter((r) => r.isImposter)).toHaveLength(3);
  });

  it('gives non-imposters the secret word and imposters the label', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 5, imposterCount: 1 });
    const round = buildRound(s, [cat],deps);
    for (const r of round.roles) {
      if (r.isImposter) expect(r.word).toBe('IMPOSTER');
      else expect(r.word).toBe(round.secretWord);
    }
  });

  it('shows hint to imposters only when enabled', () => {
    const on = buildRound(
      normalizeSettings({ ...DEFAULT_SETTINGS, hintsEnabled: true }),
      [cat],
      deps,
    );
    expect(on.roles.find((r) => r.isImposter)?.hint).toBe('HintWord');

    const off = buildRound(
      normalizeSettings({ ...DEFAULT_SETTINGS, hintsEnabled: false }),
      [cat],
      deps,
    );
    expect(off.roles.find((r) => r.isImposter)?.hint).toBeUndefined();
  });

  it('imposter hint matches the specific secret word drawn', () => {
    const c: Category = {
      id: 'c',
      name: 'C',
      icon: '🧪',
      words: [
        { word: 'Alpha', hint: 'aHint' },
        { word: 'Beta', hint: 'bHint' },
      ],
    };
    // rng=0 → category 0, word index 0 → Alpha, so its own hint must be used.
    const round = buildRound(
      normalizeSettings({ ...DEFAULT_SETTINGS, hintsEnabled: true }),
      [c],
      { ...deps, rng: () => 0 },
    );
    expect(round.secretWord).toBe('Alpha');
    expect(round.roles.find((r) => r.isImposter)?.hint).toBe('aHint');
  });

  it('random mode picks between 1 and max imposters', () => {
    const s = normalizeSettings({
      ...DEFAULT_SETTINGS,
      playerCount: 10,
      imposterCount: 4,
      randomImposters: true,
    });
    const low = buildRound(s, [cat],{ ...deps, rng: () => 0 });
    expect(low.roles.filter((r) => r.isImposter)).toHaveLength(1);

    const high = buildRound(s, [cat],{ ...deps, rng: () => 0.999 });
    expect(high.roles.filter((r) => r.isImposter)).toHaveLength(4);
  });

  it('always has at least one imposter and one non-imposter', () => {
    const s = normalizeSettings({
      ...DEFAULT_SETTINGS,
      playerCount: 5,
      imposterCount: 4,
      randomImposters: true,
    });
    for (let i = 0; i < 50; i++) {
      const round = buildRound(s, [cat],deps);
      const imp = round.roles.filter((r) => r.isImposter).length;
      expect(imp).toBeGreaterThanOrEqual(1);
      expect(imp).toBeLessThan(5);
    }
  });

  it('picks a word from the category', () => {
    const round = buildRound(normalizeSettings(DEFAULT_SETTINGS), [cat], deps);
    expect(cat.words.map((w) => w.word)).toContain(round.secretWord);
  });

  it('draws words from any of the selected categories', () => {
    const catB: Category = {
      id: 'b',
      name: 'B',
      icon: '🅱️',
      words: [
        { word: 'Delta', hint: 'HintWord2' },
        { word: 'Epsilon', hint: 'HintWord2' },
      ],
    };
    const s = normalizeSettings(DEFAULT_SETTINGS);
    const seen = new Set<string>();
    for (let i = 0; i < 60; i++) {
      seen.add(buildRound(s, [cat, catB], deps).secretWord);
    }
    const fromA = ['Alpha', 'Beta', 'Gamma'].some((w) => seen.has(w));
    const fromB = ['Delta', 'Epsilon'].some((w) => seen.has(w));
    expect(fromA).toBe(true);
    expect(fromB).toBe(true);
  });

  it('avoids recently played words', () => {
    const s = normalizeSettings(DEFAULT_SETTINGS);
    for (let i = 0; i < 50; i++) {
      const round = buildRound(s, [cat], { ...deps, recentWords: ['Alpha', 'Beta'] });
      expect(round.secretWord).toBe('Gamma');
    }
  });

  it('falls back to the full category when every word is recent', () => {
    const s = normalizeSettings(DEFAULT_SETTINGS);
    const round = buildRound(s, [cat], {
      ...deps,
      recentWords: ['Alpha', 'Beta', 'Gamma'],
    });
    expect(cat.words.map((w) => w.word)).toContain(round.secretWord);
  });
});

describe('starterIndex', () => {
  it('always points at a real player', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 5 });
    for (let i = 0; i < 50; i++) {
      const round = buildRound(s, [cat], deps);
      expect(round.starterIndex).toBeGreaterThanOrEqual(0);
      expect(round.starterIndex).toBeLessThan(5);
      expect(round.roles[round.starterIndex]).toBeDefined();
    }
  });

  it('can pick every player over many rounds', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 4 });
    const seen = new Set<number>();
    for (let i = 0; i < 300; i++) {
      seen.add(buildRound(s, [cat], deps).starterIndex);
    }
    expect(seen.size).toBe(4);
  });
});

describe('revealOrder', () => {
  it('is a permutation of every player exactly once', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 6 });
    for (let i = 0; i < 50; i++) {
      const { revealOrder } = buildRound(s, [cat], deps);
      expect(revealOrder).toHaveLength(6);
      expect([...revealOrder].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5]);
    }
  });

  it('varies between rounds', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 5 });
    const seen = new Set<string>();
    for (let i = 0; i < 100; i++) {
      seen.add(buildRound(s, [cat], deps).revealOrder.join(','));
    }
    expect(seen.size).toBeGreaterThan(1);
  });

  it('lets anyone go first', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 4 });
    const first = new Set<number>();
    for (let i = 0; i < 300; i++) {
      first.add(buildRound(s, [cat], deps).revealOrder[0]);
    }
    expect(first.size).toBe(4);
  });
});

describe('special rule', () => {
  it('draws no rule when the option is off', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, specialRule: false });
    for (let i = 0; i < 20; i++) {
      expect(buildRound(s, [cat], deps).ruleId).toBeNull();
    }
  });

  it('always draws a known rule when the option is on', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, specialRule: true });
    for (let i = 0; i < 50; i++) {
      const { ruleId } = buildRound(s, [cat], deps);
      expect(ruleId).not.toBeNull();
      expect(RULE_IDS).toContain(ruleId as (typeof RULE_IDS)[number]);
    }
  });

  it('can draw every rule in the pool', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, specialRule: true });
    const seen = new Set<string>();
    for (let i = 0; i < 500; i++) {
      const id = buildRound(s, [cat], deps).ruleId;
      if (id) seen.add(id);
    }
    expect(seen.size).toBe(RULE_IDS.length);
  });
});

describe('normalizeSettings', () => {
  it('clamps imposters to players - 1', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 4, imposterCount: 10 });
    expect(s.imposterCount).toBe(maxImposters(4));
    expect(s.imposterCount).toBe(3);
  });

  it('clamps player count into range', () => {
    expect(normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 1 }).playerCount).toBe(3);
    expect(normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 99 }).playerCount).toBe(20);
  });
});
