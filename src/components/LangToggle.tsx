import { useI18n, type Lang } from '../i18n';

export default function LangToggle() {
  const { lang, setLang } = useI18n();
  const opts: Lang[] = ['de', 'en'];
  return (
    <div className="inline-flex rounded-full bg-slate-100 p-1 text-sm font-semibold">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => setLang(o)}
          className={`min-w-[44px] rounded-full px-3 py-1 transition ${
            lang === o ? 'bg-white text-ink shadow-sm' : 'text-slate-500'
          }`}
          aria-pressed={lang === o}
        >
          {o.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
