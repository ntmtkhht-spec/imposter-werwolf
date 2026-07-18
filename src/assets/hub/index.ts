// Hub branding + per-game tile artwork (Higgsfield-generated).
// A game id missing here falls back to its emoji icon in the hub grid.
import logo from './logo.webp';
import imposter from './imposter.webp';
import truthdare from './truthdare.webp';
import wouldyou from './wouldyou.webp';
import charades from './charades.webp';

export const brandLogo = logo;

export const gameImages: Record<string, string> = {
  imposter,
  truthdare,
  wouldyou,
  charades,
};
