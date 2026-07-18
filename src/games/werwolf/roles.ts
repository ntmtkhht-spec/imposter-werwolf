export type Team = 'village' | 'werewolf';
export type RoleId = 'werewolf' | 'villager' | 'seer' | 'witch' | 'hunter';

export type RoleMeta = {
  id: RoleId;
  team: Team;
  icon: string; // emoji fallback (real art loaded via RoleIcon)
};

export const ROLES: Record<RoleId, RoleMeta> = {
  werewolf: { id: 'werewolf', team: 'werewolf', icon: '🐺' },
  villager: { id: 'villager', team: 'village', icon: '🧑‍🌾' },
  seer: { id: 'seer', team: 'village', icon: '🔮' },
  witch: { id: 'witch', team: 'village', icon: '🧪' },
  hunter: { id: 'hunter', team: 'village', icon: '🏹' },
};

export function isWerewolf(role: RoleId): boolean {
  return ROLES[role].team === 'werewolf';
}

export const ROLE_IMAGES: Record<string, string> = {
  werewolf: '/werwolfBilder/werwolf.png',
  villager: '/werwolfBilder/Dorfbewohner.png',
  seer: '/werwolfBilder/Seherin.png',
  witch: '/werwolfBilder/Hexe.png',
  hunter: '/werwolfBilder/jaeger.png',
};
