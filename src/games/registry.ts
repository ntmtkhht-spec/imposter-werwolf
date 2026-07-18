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
