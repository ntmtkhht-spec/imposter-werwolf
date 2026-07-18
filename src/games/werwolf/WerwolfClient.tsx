import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import TopBar from '../../components/TopBar';
import { ClientManager, type ClientState, type WerwolfMessage } from './multiplayer';
import { ROLE_IMAGES } from './roles';

export default function WerwolfClient() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const w = t.werwolf;

  const [name, setName] = useState('');
  const [state, setState] = useState<ClientState | 'name_input'>('name_input');
  const [role, setRole] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const managerRef = useRef<ClientManager | null>(null);

  const handleJoin = () => {
    if (!name.trim() || !roomId) return;
    setState('connecting');
    const manager = new ClientManager(
      roomId,
      name.trim(),
      (newState) => setState(newState),
      (msg) => handleMessage(msg)
    );
    managerRef.current = manager;
  };

  const handleMessage = (msg: WerwolfMessage) => {
    if (msg.type === 'ROLE') {
      setRole(msg.role);
      setState('role');
    } else if (msg.type === 'GAME_OVER') {
      managerRef.current?.destroy();
      navigate('/');
    }
  };

  useEffect(() => {
    return () => {
      managerRef.current?.destroy();
    };
  }, []);

  if (state === 'name_input') {
    return (
      <div className="flex h-full flex-col bg-slate-100">
        <TopBar title="Beitreten" />
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Werwolf</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dein Name"
              className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            />
            <button
              onClick={handleJoin}
              disabled={!name.trim()}
              className="btn-brand w-full disabled:opacity-50"
            >
              Beitreten
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'connecting' || state === 'waiting') {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
          <h2 className="text-xl font-bold">
            {state === 'connecting' ? 'Verbinde...' : 'Warte auf den Host...'}
          </h2>
          <p className="mt-2 text-white/70">Das Spiel beginnt in Kürze.</p>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-slate-100 px-6">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-sm">
          <div className="mb-4 text-4xl">⚠️</div>
          <h2 className="mb-2 text-xl font-bold text-red-500">Verbindung getrennt</h2>
          <p className="mb-6 text-slate-500">Die Verbindung zum Host wurde unterbrochen.</p>
          <button onClick={() => navigate('/')} className="btn-brand w-full">
            Zurück zur Startseite
          </button>
        </div>
      </div>
    );
  }

  if (state === 'role' && role) {
    return (
      <div className="flex h-full flex-col bg-slate-900 px-6 py-12 text-white">
        <div className="flex-1">
          <button
            onClick={() => setRevealed(!revealed)}
            style={{
              transform: `rotateY(${revealed ? 180 : 0}deg)`,
              WebkitTransform: `rotateY(${revealed ? 180 : 0}deg)`,
              transition: 'transform 400ms ease-out',
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
            className="relative block w-full aspect-square text-center"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
              <img src="/werwolfBilder/rückseite.png" alt="Back" className="absolute inset-0 h-full w-full object-contain" />
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="text-4xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">{name}</div>
                <div className="mt-4 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm">{w.reveal.tapToReveal}</div>
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [-webkit-transform:rotateY(180deg)] [transform:rotateY(180deg)]">
              <img src={ROLE_IMAGES[role as keyof typeof ROLE_IMAGES]} alt={role} className="absolute inset-0 h-full w-full object-contain" />
              <div className="relative z-10 mb-auto mt-6 flex flex-col items-center">
                <div className="rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm">{w.reveal.tapToHide}</div>
              </div>
            </div>
          </button>
        </div>
        <div className="mt-8 text-center text-white/50">
          <p>Du bleibst in dieser Rolle für den Rest des Spiels.</p>
        </div>
      </div>
    );
  }

  return null;
}
