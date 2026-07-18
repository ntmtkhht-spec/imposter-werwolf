import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { games } from '../games/registry';
import TopBar from '../components/TopBar';
import LangToggle from '../components/LangToggle';
import { brandLogo, gameImages } from '../assets/hub';

export default function HubPage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <>
      <TopBar right={<LangToggle />} />

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="mb-6 mt-2 flex items-center gap-3">
          <img
            src={brandLogo}
            alt=""
            className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-sm"
          />
          <div className="min-w-0">
            <h1 className="text-3xl font-black tracking-tight">{t.hub.title}</h1>
            <p className="mt-1 text-sm text-slate-500">{t.hub.subtitle}</p>
          </div>
        </div>

        <h2 className="mb-3 px-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
          {t.hub.sectionGames}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {games.map((g) => {
            const live = g.status === 'live';
            const img = gameImages[g.id];
            return (
              <button
                key={g.id}
                disabled={!live}
                onClick={() => g.path && navigate(g.path)}
                className={`relative flex flex-col overflow-hidden rounded-3xl text-left transition active:scale-[0.98] ${
                  live ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'bg-slate-50 opacity-70'
                }`}
              >
                <span
                  className={`absolute right-2 top-2 z-10 rounded-full px-2.5 py-1 text-xs font-bold ${
                    live ? 'bg-brand text-white' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {live ? t.hub.play : t.hub.soon}
                </span>

                <div className="aspect-square w-full bg-brand/5">
                  {img ? (
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-6xl">
                      {g.icon}
                    </span>
                  )}
                </div>

                <div className="min-w-0 p-3">
                  <span className="block truncate font-bold leading-tight">{g.title(t)}</span>
                  <span className="block truncate text-sm text-slate-500">{g.subtitle(t)}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
