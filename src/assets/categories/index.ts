// Category icon images, generated via Higgsfield. Keyed by category id
// (filename without extension) so words/de.ts and words/en.ts can share them.
const modules = import.meta.glob('./*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const categoryIcons: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const id = path.replace('./', '').replace(/\.[^.]+$/, '');
    return [id, url as string];
  }),
);
