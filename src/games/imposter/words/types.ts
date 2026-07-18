export type Category = {
  id: string;
  name: string;
  icon: string; // emoji shown in the picker
  /** Optional coarse hint shown to the imposter (e.g. "Food"). */
  hint?: string;
  /** Adult category — flagged so it can be filtered / labelled 18+. */
  adult?: boolean;
  words: { word: string; hint: string }[];
};
