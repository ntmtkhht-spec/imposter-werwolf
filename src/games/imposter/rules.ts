import type { Lang } from '../../i18n';

export type SpecialRule = {
  id: string;
  icon: string;
  name: string;
  /** One-line explanation shown to everyone before the round starts. */
  text: string;
};

/** Rule ids are language-neutral; only name/text are localized. */
export const RULE_IDS = [
  'question',
  'chain',
  'sing',
  'mime',
  'sounds',
  'rhyme',
  'louder',
] as const;

const rulesDe: SpecialRule[] = [
  {
    id: 'question',
    icon: '❓',
    name: 'Alles als Frage',
    text: 'Dein Wort wird als Frage formuliert und gesprochen.',
  },
  {
    id: 'chain',
    icon: '🔗',
    name: 'Wortkette',
    text: 'Dein Wort muss mit dem letzten Buchstaben des Vorgängerworts anfangen.',
  },
  {
    id: 'sing',
    icon: '🎤',
    name: 'Gesungen',
    text: 'Jedes Wort wird gesungen, nicht gesprochen.',
  },
  {
    id: 'mime',
    icon: '🎭',
    name: 'Pantomime dazu',
    text: 'Zu deinem Wort gehört eine passende Geste. Wer keine macht, ist dran.',
  },
  {
    id: 'sounds',
    icon: '🔊',
    name: 'Nur Geräusche',
    text: 'Keine Wörter — beschreibe nur mit Geräuschen und Lauten.',
  },
  {
    id: 'rhyme',
    icon: '🎵',
    name: 'Reimzwang',
    text: 'Dein Wort muss sich auf das Wort deines Vorgängers reimen.',
  },
  {
    id: 'louder',
    icon: '📢',
    name: 'Immer lauter',
    text: 'Jeder muss lauter sein als sein Vorgänger. Am Ende wird geschrien.',
  },
];

const rulesEn: SpecialRule[] = [
  {
    id: 'question',
    icon: '❓',
    name: 'Everything a question',
    text: 'Phrase and say your word as a question.',
  },
  {
    id: 'chain',
    icon: '🔗',
    name: 'Word chain',
    text: 'Your word must start with the last letter of the previous word.',
  },
  {
    id: 'sing',
    icon: '🎤',
    name: 'Sing it',
    text: 'Every word is sung, not spoken.',
  },
  {
    id: 'mime',
    icon: '🎭',
    name: 'Add a gesture',
    text: 'Your word comes with a matching gesture. No gesture, and you are the suspect.',
  },
  {
    id: 'sounds',
    icon: '🔊',
    name: 'Sounds only',
    text: 'No words — describe it using sounds and noises only.',
  },
  {
    id: 'rhyme',
    icon: '🎵',
    name: 'Must rhyme',
    text: 'Your word has to rhyme with the previous word.',
  },
  {
    id: 'louder',
    icon: '📢',
    name: 'Louder each time',
    text: 'Everyone must be louder than the player before them. It ends in shouting.',
  },
];

export function getRules(lang: Lang): SpecialRule[] {
  return lang === 'de' ? rulesDe : rulesEn;
}

/** Look up a rule for display; null when the id is unknown or absent. */
export function getRule(lang: Lang, id: string | null): SpecialRule | null {
  if (!id) return null;
  return getRules(lang).find((r) => r.id === id) ?? null;
}
