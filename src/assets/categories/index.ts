// Category icon images, generated via Higgsfield. Keyed by category id
// (filename without extension), matching the ids in words/de.ts.
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
