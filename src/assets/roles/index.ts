// Role artwork for Werwolf, keyed by role id (filename without extension:
// werewolf / villager / seer / witch / hunter). Drop images here to replace
// the emoji fallbacks — no code change needed.
const modules = import.meta.glob('./*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const roleImages: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const id = path.replace('./', '').replace(/\.[^.]+$/, '');
    return [id, url as string];
  }),
);
