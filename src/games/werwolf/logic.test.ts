import { describe, it, expect } from 'vitest';
import { assignRoles, applyDeaths, resolveWinner, livingPlayers } from './logic';
import { normalizeSettings, maxWerewolves, DEFAULT_SETTINGS } from './config';
import { isWerewolf, type RoleId } from './roles';

const deps = {
  playerNames: Array.from({ length: 20 }, (_, i) => `P${i + 1}`),
  assign: (n: number) => Array.from({ length: n }, (_, i) => `avatar-${i}`),
};

function makePlayers(roles: RoleId[]) {
  return roles.map((role, index) => ({
    index,
    name: `P${index + 1}`,
    role,
    avatar: '',
    alive: true,
  }));
}

describe('assignRoles', () => {
  it('creates one role per player', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 8 });
    expect(assignRoles(s, deps)).toHaveLength(8);
  });

  it('includes exactly the configured werewolves and enabled specials', () => {
    const s = normalizeSettings({
      ...DEFAULT_SETTINGS,
      playerCount: 8,
      werewolfCount: 2,
      seer: true,
      witch: true,
      hunter: true,
    });
    const players = assignRoles(s, deps);
    const count = (r: RoleId) => players.filter((p) => p.role === r).length;
    expect(count('werewolf')).toBe(2);
    expect(count('seer')).toBe(1);
    expect(count('witch')).toBe(1);
    expect(count('hunter')).toBe(1);
    expect(count('villager')).toBe(8 - 2 - 3);
  });

  it('assigns resolved names and avatars', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 5 });
    const players = assignRoles(s, { ...deps, playerNames: ['A', '', 'C', 'D', 'E'] });
    expect(players.map((p) => p.name)).toEqual(['A', '', 'C', 'D', 'E']);
    expect(players.every((p) => p.avatar.startsWith('avatar-'))).toBe(true);
  });
});

describe('resolveWinner', () => {
  it('village wins when no werewolves remain', () => {
    const players = makePlayers(['villager', 'seer', 'werewolf']);
    const after = applyDeaths(players, [2]);
    expect(resolveWinner(after)).toBe('village');
  });

  it('werewolves win when they reach parity', () => {
    const players = makePlayers(['werewolf', 'werewolf', 'villager', 'seer']);
    const after = applyDeaths(players, [3]); // 2 wolves vs 1 villager
    expect(resolveWinner(after)).toBe('werewolves');
  });

  it('game continues while village outnumbers wolves', () => {
    const players = makePlayers(['werewolf', 'villager', 'villager', 'seer']);
    expect(resolveWinner(players)).toBeNull();
  });
});

describe('applyDeaths', () => {
  it('marks players dead immutably', () => {
    const players = makePlayers(['werewolf', 'villager']);
    const after = applyDeaths(players, [0]);
    expect(after[0].alive).toBe(false);
    expect(players[0].alive).toBe(true); // original untouched
    expect(livingPlayers(after)).toHaveLength(1);
  });

  it('ignores negative / sentinel indices', () => {
    const players = makePlayers(['werewolf', 'villager']);
    expect(livingPlayers(applyDeaths(players, [-1]))).toHaveLength(2);
  });
});

describe('normalizeSettings', () => {
  it('keeps werewolves a minority', () => {
    const s = normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 7, werewolfCount: 99 });
    expect(s.werewolfCount).toBe(maxWerewolves(7));
    expect(s.werewolfCount).toBeLessThan(7 - s.werewolfCount + 1);
  });

  it('clamps player count into range', () => {
    expect(normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 2 }).playerCount).toBe(5);
    expect(normalizeSettings({ ...DEFAULT_SETTINGS, playerCount: 99 }).playerCount).toBe(20);
  });

  it('shrinks werewolves so specials still fit', () => {
    const s = normalizeSettings({
      ...DEFAULT_SETTINGS,
      playerCount: 5,
      werewolfCount: 2,
      seer: true,
      witch: true,
      hunter: true,
    });
    expect(s.werewolfCount + 3).toBeLessThanOrEqual(5);
  });
});

describe('isWerewolf', () => {
  it('classifies teams', () => {
    expect(isWerewolf('werewolf')).toBe(true);
    expect(isWerewolf('seer')).toBe(false);
    expect(isWerewolf('villager')).toBe(false);
  });
});
