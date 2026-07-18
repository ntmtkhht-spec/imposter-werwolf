import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { games } from '../games/registry';
import TopBar from '../components/TopBar';
import LangToggle from '../components/LangToggle';

export default function HubPage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <>
      <TopBar right={<LangToggle />} />

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="mb-6 mt-2">
          <h1 className="text-3xl font-black tracking-tight">
            <span className="text-brand">Party</span> Games
          </h1>
          <p className="mt-2 text-slate-500">{t.hub.subtitle}</p>
        </div>

        <h2 className="mb-3 px-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
          {t.hub.sectionGames}
        </h2>

        <ul className="flex flex-col gap-3">
          {games.map((g) => {
            const live = g.status === 'live';
            return (
              <li key={g.id}>
                <button
                  disabled={!live}
                  onClick={() => g.path && navigate(g.path)}
                  className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition active:scale-[0.99] ${
                    live ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'bg-slate-50 opacity-70'
                  }`}
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-3xl">
                    {g.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold">{g.title(t)}</span>
                    <span className="block truncate text-sm text-slate-500">
                      {g.subtitle(t)}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      live ? 'bg-brand text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {live ? t.hub.play : t.hub.soon}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
