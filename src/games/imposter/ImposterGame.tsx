import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { getCategoriesByIds } from './words';
import { buildRound, type Round } from './logic';
import { normalizeSettings, type ImposterSettings } from './config';
import SetupScreen from './screens/SetupScreen';
import RevealScreen from './screens/RevealScreen';
import StarterScreen from './screens/StarterScreen';
import TimerScreen from './screens/TimerScreen';
import ResultScreen from './screens/ResultScreen';

type Phase = 'setup' | 'reveal' | 'starter' | 'timer' | 'result';

export default function ImposterGame() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>('setup');
  const [settings, setSettings] = useState<ImposterSettings | null>(null);
  const [round, setRound] = useState<Round | null>(null);

  const makeRound = (s: ImposterSettings): Round => {
    const categories = getCategoriesByIds(lang, s.categoryIds);
    const playerNames = Array.from({ length: s.playerCount }, (_, i) => {
      const custom = s.playerNames[i]?.trim();
      return custom || `${t.imposter.reveal.player} ${i + 1}`;
    });
    return buildRound(s, categories, {
      imposterLabel: t.imposter.reveal.imposter,
      playerNames,
    });
  };

  const start = (s: ImposterSettings) => {
    const norm = normalizeSettings(s);
    setSettings(norm);
    setRound(makeRound(norm));
    setPhase('reveal');
  };

  const replay = () => {
    if (!settings) return;
    setRound(makeRound(settings));
    setPhase('reveal');
  };

  if (phase === 'setup' || !settings || !round) {
    return <SetupScreen onStart={start} onExit={() => navigate('/')} />;
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
