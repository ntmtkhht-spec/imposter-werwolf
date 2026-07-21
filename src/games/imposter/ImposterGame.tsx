import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { getCategoriesByIds } from './words';
import { buildRound, type Round } from './logic';
import { normalizeSettings, type ImposterSettings } from './config';
import SetupScreen from './screens/SetupScreen';
import RevealScreen from './screens/RevealScreen';
import RuleScreen from './screens/RuleScreen';
import StarterScreen from './screens/StarterScreen';
import TimerScreen from './screens/TimerScreen';
import ResultScreen from './screens/ResultScreen';

type Phase = 'setup' | 'reveal' | 'rule' | 'starter' | 'timer' | 'result';

// Secret words of the last rounds, persisted so words don't repeat across
// replays or app restarts. Oldest entries are evicted first.
const RECENT_WORDS_KEY = 'imposter.recentWords';
const RECENT_WORDS_LIMIT = 30;

function loadRecentWords(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(RECENT_WORDS_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((w): w is string => typeof w === 'string') : [];
  } catch {
    return [];
  }
}

function rememberWord(word: string) {
  const next = [...loadRecentWords().filter((w) => w !== word), word].slice(-RECENT_WORDS_LIMIT);
  try {
    localStorage.setItem(RECENT_WORDS_KEY, JSON.stringify(next));
  } catch {
    // Storage full/unavailable — repeat protection just degrades to per-session.
  }
}

export default function ImposterGame() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>('setup');
  const [settings, setSettings] = useState<ImposterSettings | null>(null);
  const [round, setRound] = useState<Round | null>(null);

  const makeRound = (s: ImposterSettings): Round => {
    const categories = getCategoriesByIds(s.categoryIds);
    const playerNames = Array.from({ length: s.playerCount }, (_, i) => {
      const custom = s.playerNames[i]?.trim();
      return custom || `${t.imposter.reveal.player} ${i + 1}`;
    });
    const next = buildRound(s, categories, {
      imposterLabel: t.imposter.reveal.imposter,
      playerNames,
      recentWords: loadRecentWords(),
    });
    rememberWord(next.secretWord);
    return next;
  };

  // The rule is announced to the whole group before any card is handed out,
  // so it is the first screen of a round whenever one was drawn.
  const openingPhase = (r: Round): Phase => (r.ruleId ? 'rule' : 'reveal');

  const start = (s: ImposterSettings) => {
    const norm = normalizeSettings(s);
    const next = makeRound(norm);
    setSettings(norm);
    setRound(next);
    setPhase(openingPhase(next));
  };

  const replay = () => {
    if (!settings) return;
    const next = makeRound(settings);
    setRound(next);
    setPhase(openingPhase(next));
  };

  if (phase === 'setup' || !settings || !round) {
    return <SetupScreen onStart={start} onExit={() => navigate('/')} />;
  }

  if (phase === 'rule') {
    return <RuleScreen ruleId={round.ruleId} onContinue={() => setPhase('reveal')} />;
  }

  if (phase === 'reveal') {
    return <RevealScreen round={round} onDone={() => setPhase('starter')} />;
  }

  if (phase === 'starter') {
    return <StarterScreen round={round} onStart={() => setPhase('timer')} />;
  }

  if (phase === 'timer') {
    return (
      <TimerScreen
        settings={settings}
        onReveal={() => setPhase('result')}
      />
    );
  }

  return (
    <ResultScreen
      round={round}
      onReplay={replay}
      onNewGame={() => setPhase('setup')}
      onExit={() => navigate('/')}
    />
  );
}
