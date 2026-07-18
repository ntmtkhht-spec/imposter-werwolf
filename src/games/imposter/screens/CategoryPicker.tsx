import { useI18n } from '../../../i18n';
import TopBar from '../../../components/TopBar';
import CategoryIcon from '../CategoryIcon';
import type { Category } from '../words';

interface CategoryPickerProps {
  categories: Category[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  onBack: () => void;
}

/** Full-page category picker. Selections apply immediately; back returns to setup. */
export default function CategoryPicker({
  categories,
  selectedIds,
  onChange,
  onBack,
}: CategoryPickerProps) {
  const { t } = useI18n();
  const selected = new Set(selectedIds);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      if (next.size <= 1) return; // keep at least one selected
      next.delete(id);
    } else {
      next.add(id);
    }
    // Preserve category list order.
    onChange(categories.filter((c) => next.has(c.id)).map((c) => c.id));
  };

  return (
    <>
      <TopBar
        title={t.imposter.setup.category}
        left={
          <button onClick={onBack} className="text-2xl leading-none" aria-label={t.common.back}>
            ←
          </button>
        }
        right={
          <span className="text-sm font-semibold text-slate-400">
            {selected.size} {t.imposter.setup.categoriesWord}
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 pb-2">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => {
            const active = selected.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className={`relative flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl px-3 text-center transition active:scale-[0.97] ${
                  active ? 'bg-ink text-white' : 'bg-slate-100 text-slate-700'
                }`}
                aria-pressed={active}
              >
                <span
                  className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                    active ? 'bg-brand text-white' : 'bg-white text-transparent'
                  }`}
                >
                  ✓
                </span>
                <CategoryIcon categoryId={c.id} fallbackEmoji={c.icon} size={84} />
                <span className="line-clamp-2 text-sm font-semibold leading-tight">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 px-5 pb-5 pt-2">
        <button onClick={onBack} className="btn-brand w-full">
          {t.common.done}
        </button>
      </div>
    </>
  );
}
