export type TaskCategory = {
  id: string;
  name: string;
  icon: string; // emoji fallback when no artwork exists yet
  /**
   * Key in src/assets/categories (filename without extension). Several
   * categories share artwork with the imposter game; defaults to `id`.
   */
  image?: string;
  /** Adult category — flagged so it can be filtered / labelled 18+. */
  adult?: boolean;
  /** One-line prompts, e.g. "Nenne eine Automarke". */
  tasks: string[];
};
