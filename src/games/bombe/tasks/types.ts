export type TaskCategory = {
  id: string;
  name: string;
  icon: string; // emoji shown in the picker
  /** Adult category — flagged so it can be filtered / labelled 18+. */
  adult?: boolean;
  /** One-line prompts, e.g. "Nenne eine Automarke". */
  tasks: string[];
};
