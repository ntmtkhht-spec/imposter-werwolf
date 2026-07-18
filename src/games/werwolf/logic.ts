import { assignAvatars, shuffle } from '../../assets/avatars';
import type { WerwolfSettings } from './config';
import { isWerewolf, type RoleId } from './roles';

export type WerwolfPlayer = {
  index: number;
  name: string;
  role: RoleId;
  avatar: string;
  alive: boolean;
};

export type Winner = 'village' | 'werewolves' | null;

export type BuildDeps = {
  playerNames: string[]; // resolved display names per index
  rng?: () => number;
  assign?: (n: number) => string[];
};

/** Build the role pool from settings, then shuffle it onto players. */
export function assignRoles(settings: WerwolfSettings, deps: BuildDeps): WerwolfPlayer[] {
  const rng = deps.rng ?? Math.random;
  const assign = deps.assign ?? assignAvatars;

  const pool: RoleId[] = [];
  for (let i = 0; i < settings.werewolfCount; i++) pool.push('werewolf');
  if (settings.seer) pool.push('seer');
  if (settings.witch) pool.push('witch');
  if (settings.hunter) pool.push('hunter');
  while (pool.length < settings.playerCount) pool.push('villager');

  const shuffledRoles = shuffle(pool, rng).slice(0, settings.playerCount);
  const avatars = assign(settings.playerCount);

  return Array.from({ length: settings.playerCount }, (_, i) => ({
    index: i,
    name: deps.playerNames[i] ?? `Player ${i + 1}`,
    role: shuffledRoles[i],
    avatar: avatars[i] ?? '',
    alive: true,
  }));
}

export function livingPlayers(players: WerwolfPlayer[]): WerwolfPlayer[] {
  return players.filter((p) => p.alive);
}

/** Return a new player list with the given indices marked dead. */
export function applyDeaths(players: WerwolfPlayer[], indices: number[]): WerwolfPlayer[] {
  const dead = new Set(indices.filter((i) => i >= 0));
  return players.map((p) => (dead.has(p.index) ? { ...p, alive: false } : p));
}

export function resolveWinner(players: WerwolfPlayer[]): Winner {
  const alive = livingPlayers(players);
  const wolves = alive.filter((p) => isWerewolf(p.role)).length;
  const others = alive.length - wolves;
  if (wolves === 0) return 'village';
  if (wolves >= others) return 'werewolves';
  return null;
}

/** A newly-dead hunter still gets a revenge shot. */
export function isHunter(player: WerwolfPlayer): boolean {
  return player.role === 'hunter';
}
