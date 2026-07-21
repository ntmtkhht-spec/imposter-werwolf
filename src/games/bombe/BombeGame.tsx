import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTaskCategoriesByIds } from './tasks';
import { buildBombRound, type BombRound } from './logic';
import { normalizeSettings, type BombeSettings } from './config';
import { primeAudio } from './sound';
import SetupScreen from './screens/SetupScreen';
import PlayScreen from './screens/PlayScreen';
import BoomScreen from './screens/BoomScreen';

type Phase = 'setup' | 'play' | 'boom';

// Prompts of the last rounds, persisted so game nights don't repeat.
const RECENT_TASKS_KEY = 'bombe.recentTasks';
const RECENT_TASKS_LIMIT = 80;

function loadRecentTasks(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(RECENT_TASKS_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function rememberTasks(tasks: string[]) {
  const seen = new Set(tasks);
  const next = [...loadRecentTasks().filter((x) => !seen.has(x)), ...tasks].slice(
    -RECENT_TASKS_LIMIT,
  );
  try {
    localStorage.setItem(RECENT_TASKS_KEY, JSON.stringify(next));
  } catch {
    // Storage full/unavailable — repeat protection just degrades to per-session.
  }
}

export default function BombeGame() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>('setup');
  const [settings, setSettings] = useState<BombeSettings | null>(null);
  const [round, setRound] = useState<BombRound | null>(null);

  const makeRound = (s: BombeSettings): BombRound =>
    buildBombRound(getTaskCategoriesByIds(s.categoryIds), {
      recentTasks: loadRecentTasks(),
    });

  const start = (s: BombeSettings) => {
    const norm = normalizeSettings(s);
    primeAudio(); // inside the tap gesture, so ticking is allowed to play
    setSettings(norm);
    setRound(makeRound(norm));
    setPhase('play');
  };

  const again = () => {
    if (!settings) return;
    primeAudio();
    setRound(makeRound(settings));
    setPhase('play');
  };

  if (phase === 'play' && settings && round) {
    return (
      <PlayScreen
        round={round}
        onBoom={(shown) => {
          rememberTasks(shown);
          setPhase('boom');
        }}
      />
    );
  }

  if (phase === 'boom' && settings) {
    return (
      <BoomScreen
        onAgain={again}
        onNewGame={() => setPhase('setup')}
        onExit={() => navigate('/')}
      />
    );
  }

  return <SetupScreen onStart={start} onExit={() => navigate('/')} />;
}
