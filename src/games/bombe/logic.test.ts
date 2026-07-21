import { describe, it, expect } from 'vitest';
import { buildBombRound } from './logic';
import { DEFAULT_SETTINGS, normalizeSettings } from './config';
import type { TaskCategory } from './tasks';

const catA: TaskCategory = {
  id: 'a',
  name: 'A',
  icon: '🧪',
  tasks: ['Frage A1', 'Frage A2', 'Frage A3'],
};
const catB: TaskCategory = {
  id: 'b',
  name: 'B',
  icon: '🧪',
  tasks: ['Frage B1', 'Frage B2'],
};

const s = normalizeSettings({ ...DEFAULT_SETTINGS, minSeconds: 20, extraSeconds: 25 });

describe('buildBombRound', () => {
  it('queues every task from the selected categories', () => {
    const round = buildBombRound(s, [catA, catB]);
    expect([...round.tasks].sort()).toEqual(
      ['Frage A1', 'Frage A2', 'Frage A3', 'Frage B1', 'Frage B2'].sort(),
    );
  });

  it('never explodes before the guaranteed minimum', () => {
    const low = buildBombRound(s, [catA], { rng: () => 0 });
    expect(low.explodeAfterMs).toBe(20_000);
    const high = buildBombRound(s, [catA], { rng: () => 0.999 });
    expect(high.explodeAfterMs).toBeGreaterThan(20_000);
    expect(high.explodeAfterMs).toBeLessThanOrEqual(45_000);
  });

  it('randomizes the delay across rounds', () => {
    const seen = new Set<number>();
    for (let i = 0; i < 30; i++) {
      seen.add(buildBombRound(s, [catA]).explodeAfterMs);
    }
    expect(seen.size).toBeGreaterThan(1);
  });

  it('avoids recently played tasks', () => {
    const round = buildBombRound(s, [catA], {
      recentTasks: ['Frage A1', 'Frage A3'],
    });
    expect(round.tasks).toEqual(['Frage A2']);
  });

  it('falls back to the full pool when everything is recent', () => {
    const round = buildBombRound(s, [catA], {
      recentTasks: ['Frage A1', 'Frage A2', 'Frage A3'],
    });
    expect(round.tasks).toHaveLength(3);
  });

  it('shuffles the queue', () => {
    const many: TaskCategory = {
      id: 'm',
      name: 'M',
      icon: '🧪',
      tasks: Array.from({ length: 12 }, (_, i) => `Frage ${i}`),
    };
    const orders = new Set<string>();
    for (let i = 0; i < 20; i++) {
      orders.add(buildBombRound(s, [many]).tasks.join('|'));
    }
    expect(orders.size).toBeGreaterThan(1);
  });
});
