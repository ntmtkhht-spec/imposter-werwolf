import type { Dict } from '../i18n/de';

export type GameStatus = 'live' | 'soon';

export type GameEntry = {
  id: string;
  icon: string; // emoji
  path?: string; // route (live games only)
  status: GameStatus;
  title: (t: Dict) => string;
  subtitle: (t: Dict) => string;
};

/**
 * Add a new game here + drop its component under games/<id>/ and wire a route
 * in App.tsx. The hub renders straight from this list.
 */
export const games: GameEntry[] = [
  {
    id: 'imposter',
    icon: '🕵️',
    path: '/spiel/imposter',
    status: 'live',
    title: (t) => t.imposter.name,
    subtitle: (t) => t.imposter.tagline,
  },
  {
    id: 'werwolf',
    icon: '🐺',
    path: '/spiel/werwolf',
    status: 'live',
    title: (t) => t.werwolf.name,
    subtitle: (t) => t.werwolf.tagline,
  },
  {
    id: 'bombe',
    icon: '💣',
    path: '/spiel/bombe',
    status: 'live',
    title: (t) => t.bombe.name,
    subtitle: (t) => t.bombe.tagline,
  },
  {
    id: 'truthdare',
    icon: '🎯',
    status: 'soon',
    title: () => 'Wahrheit oder Pflicht',
    subtitle: () => 'Truth or Dare',
  },
  {
    id: 'wouldyou',
    icon: '🤔',
    status: 'soon',
    title: () => 'Würdest du eher',
    subtitle: () => 'Would you rather',
  },
  {
    id: 'charades',
    icon: '🎭',
    status: 'soon',
    title: () => 'Scharade',
    subtitle: () => 'Charades',
  },
];
