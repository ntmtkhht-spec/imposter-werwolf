import { describe, it, expect } from 'vitest';
import { taskCategoriesDe } from './de';

// Data-quality guard for the bomb prompts: short, answerable by anyone,
// and enough of them that rounds don't repeat.
describe.each(taskCategoriesDe.map((c) => [c.name, c] as const))('category %s', (_name, cat) => {
  it('has enough tasks for variety', () => {
    expect(cat.tasks.length).toBeGreaterThanOrEqual(30);
  });

  it('has no duplicate tasks', () => {
    const tasks = cat.tasks.map((x) => x.toLowerCase());
    expect(new Set(tasks).size).toBe(tasks.length);
  });

  it('keeps tasks short enough to grasp instantly', () => {
    for (const task of cat.tasks) {
      expect(task.length, `"${task}"`).toBeLessThanOrEqual(70);
      expect(task.trim().length).toBeGreaterThan(0);
    }
  });
});

describe('category list', () => {
  it('has unique ids', () => {
    const ids = taskCategoriesDe.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
