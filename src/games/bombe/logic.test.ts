import { describe, it, expect } from 'vitest';
import { buildBombRound } from './logic';
import { FUSE_MIN_SECONDS, FUSE_RANDOM_SECONDS } from './config';
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

describe('buildBombRound', () => {
  it('queues every task from the selected categories', () => {
    const round = buildBombRound([catA, catB]);
    expect([...round.tasks].sort()).toEqual(
      ['Frage A1', 'Frage A2', 'Frage A3', 'Frage B1', 'Frage B2'].sort(),
    );
  });

  it('never explodes before the guaranteed minimum', () => {
    const low = buildBombRound([catA], { rng: () => 0 });
    expect(low.explodeAfterMs).toBe(FUSE_MIN_SECONDS * 1000);
    for (let i = 0; i < 200; i++) {
      expect(buildBombRound([catA]).explodeAfterMs).toBeGreaterThanOrEqual(
        FUSE_MIN_SECONDS * 1000,
      );
    }
  });

  it('stays inside the random window', () => {
    const high = buildBombRound([catA], { rng: () => 0.999 });
    expect(high.explodeAfterMs).toBeLessThanOrEqual(
      (FUSE_MIN_SECONDS + FUSE_RANDOM_SECONDS) * 1000,
    );
  });

  it('randomizes the delay across rounds', () => {
    const seen = new Set<number>();
    for (let i = 0; i < 30; i++) {
      seen.add(buildBombRound([catA]).explodeAfterMs);
    }
    expect(seen.size).toBeGreaterThan(1);
  });

  it('avoids recently played tasks', () => {
    const round = buildBombRound([catA], {
      recentTasks: ['Frage A1', 'Frage A3'],
    });
    expect(round.tasks).toEqual(['Frage A2']);
  });

  it('falls back to the full pool when everything is recent', () => {
    const round = buildBombRound([catA], {
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
      orders.add(buildBombRound([many]).tasks.join('|'));
    }
    expect(orders.size).toBeGreaterThan(1);
  });
});
