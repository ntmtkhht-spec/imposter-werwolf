import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import {
  assignRoles,
  applyDeaths,
  livingPlayers,
  resolveWinner,
  type WerwolfPlayer,
  type Winner,
} from './logic';
import { normalizeSettings, type WerwolfSettings } from './config';
import SetupScreen from './screens/SetupScreen';
import RoleRevealScreen from './screens/RoleRevealScreen';
import NightScreen, { type NightResult } from './screens/NightScreen';
import DayScreen from './screens/DayScreen';
import HunterScreen from './screens/HunterScreen';
import ResultScreen from './screens/ResultScreen';
import LobbyScreen from './screens/LobbyScreen';
import type { HostManager } from './multiplayer';

type Phase = 'setup' | 'lobby' | 'reveal' | 'night' | 'day' | 'hunter' | 'result';

export default function WerwolfGame() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>('setup');
  const [settings, setSettings] = useState<WerwolfSettings | null>(null);
  const [players, setPlayers] = useState<WerwolfPlayer[]>([]);
  const [round, setRound] = useState(1);
  const [lastDeaths, setLastDeaths] = useState<number[]>([]);
  const [healUsed, setHealUsed] = useState(false);
  const [poisonUsed, setPoisonUsed] = useState(false);
  const [winner, setWinner] = useState<Winner>(null);
  const [pendingHunter, setPendingHunter] = useState<number | null>(null);
  const [resolvedHunters, setResolvedHunters] = useState<number[]>([]);
  const [afterHunter, setAfterHunter] = useState<'day' | 'night'>('day');
  const [hostManager, setHostManager] = useState<HostManager | null>(null);
  /** Multiplayer: player index -> peer id, for targeted messages. */
  const [peerByIndex, setPeerByIndex] = useState<Record<number, string>>({});

  useEffect(() => {
    return () => {
      if (hostManager) {
        hostManager.sendToAll({ type: 'GAME_OVER' });
        hostManager.destroy();
      }
    };
  }, [hostManager]);

  const handleExit = () => {
    if (hostManager) {
      hostManager.sendToAll({ type: 'GAME_OVER' });
      hostManager.destroy();
      setHostManager(null);
    }
    navigate('/');
  };

  const build = (s: WerwolfSettings): WerwolfPlayer[] => {
    const names = Array.from({ length: s.playerCount }, (_, i) => {
      const custom = s.playerNames[i]?.trim();
      return custom || `${t.werwolf.reveal.player} ${i + 1}`;
    });
    return assignRoles(s, { playerNames: names });
  };

  const startFresh = (base: WerwolfSettings, next: Phase) => {
    setPlayers(build(base));
    setRound(1);
    setLastDeaths([]);
    setHealUsed(false);
    setPoisonUsed(false);
    setWinner(null);
    setPendingHunter(null);
    setResolvedHunters([]);
    setPhase(next);
  };

  const start = (s: WerwolfSettings) => {
    const norm = normalizeSettings(s);
    setSettings(norm);
    if (norm.multiplayer) {
      setPhase('lobby');
    } else {
      startFresh(norm, 'reveal');
    }
  };

  const startMultiplayer = (manager: HostManager) => {
    setHostManager(manager);
    const names = manager.players.map(p => p.name);
    const s = { ...settings!, playerCount: names.length, playerNames: names };
    const norm = normalizeSettings(s);
    setSettings(norm);

    const generatedPlayers = build(norm);

    // Broadcast roles to clients and remember which peer plays which index.
    const peers: Record<number, string> = {};
    generatedPlayers.forEach(p => {
      const joinedPlayer = manager.players.find(jp => jp.name === p.name);
      if (joinedPlayer) {
        peers[p.index] = joinedPlayer.id;
        manager.sendTo(joinedPlayer.id, { type: 'ROLE', role: p.role });
      }
    });
    setPeerByIndex(peers);
    manager.sendToAll({ type: 'PHASE', phase: 'night', night: 1 });

    setPlayers(generatedPlayers);
    setRound(1);
    setLastDeaths([]);
    setHealUsed(false);
    setPoisonUsed(false);
    setWinner(null);
    setPendingHunter(null);
    setResolvedHunters([]);
    setPhase('night'); // skip reveal in multiplayer
  };

  const replay = () => {
    if (settings) {
      if (settings.multiplayer && hostManager) {
        // re-broadcast roles
        const generatedPlayers = build(settings);
        const peers: Record<number, string> = {};
        generatedPlayers.forEach(p => {
          const joinedPlayer = hostManager.players.find(jp => jp.name === p.name);
          if (joinedPlayer) {
            peers[p.index] = joinedPlayer.id;
            hostManager.sendTo(joinedPlayer.id, { type: 'ROLE', role: p.role });
          }
        });
        setPeerByIndex(peers);
        hostManager.sendToAll({ type: 'PHASE', phase: 'night', night: 1 });
        setPlayers(generatedPlayers);
        setRound(1);
        setLastDeaths([]);
        setHealUsed(false);
        setPoisonUsed(false);
        setWinner(null);
        setPendingHunter(null);
        setResolvedHunters([]);
        setPhase('night');
      } else {
        startFresh(settings, 'reveal');
      }
    }
  };

  /** Multiplayer: tell newly dead players' phones that they are out. */
  const notifyDeaths = (indices: number[]) => {
    if (!hostManager) return;
    indices.forEach((i) => {
      const peer = peerByIndex[i];
      if (peer) hostManager.sendTo(peer, { type: 'YOU_DIED' });
    });
  };

  const resolvePostDeaths = (
    playersNow: WerwolfPlayer[],
    resolved: number[],
    next: 'day' | 'night',
  ) => {
    const deadHunter = playersNow.find(
      (p) => !p.alive && p.role === 'hunter' && !resolved.includes(p.index),
    );
    if (deadHunter && livingPlayers(playersNow).length > 0) {
      setPendingHunter(deadHunter.index);
      setAfterHunter(next);
      setPhase('hunter');
      return;
    }
    const win = resolveWinner(playersNow);
    if (win) {
      setWinner(win);
      hostManager?.sendToAll({ type: 'PHASE', phase: 'result', winner: win });
      setPhase('result');
      return;
    }
    if (next === 'day') {
      hostManager?.sendToAll({ type: 'PHASE', phase: 'day' });
      setPhase('day');
    } else {
      hostManager?.sendToAll({ type: 'PHASE', phase: 'night', night: round + 1 });
      setRound(round + 1);
      setPhase('night');
    }
  };

  const onNightComplete = (res: NightResult) => {
    const after = applyDeaths(players, res.deaths);
    setPlayers(after);
    setLastDeaths(res.deaths);
    if (res.healUsed) setHealUsed(true);
    if (res.poisonUsed) setPoisonUsed(true);
    notifyDeaths(res.deaths);
    resolvePostDeaths(after, resolvedHunters, 'day');
  };

  const onDayComplete = (lynch: number | null) => {
    if (lynch === null) {
      setLastDeaths([]);
      resolvePostDeaths(players, resolvedHunters, 'night');
      return;
    }
    const after = applyDeaths(players, [lynch]);
    setPlayers(after);
    setLastDeaths([lynch]);
    notifyDeaths([lynch]);
    resolvePostDeaths(after, resolvedHunters, 'night');
  };

  const onHunterComplete = (target: number) => {
    const resolved = pendingHunter !== null ? [...resolvedHunters, pendingHunter] : resolvedHunters;
    setResolvedHunters(resolved);
    setPendingHunter(null);
    const after = applyDeaths(players, [target]);
    setPlayers(after);
    setLastDeaths((prev) => [...prev, target]);
    notifyDeaths([target]);
    resolvePostDeaths(after, resolved, afterHunter);
  };

  if (phase === 'setup' || !settings) {
    return <SetupScreen onStart={start} onExit={handleExit} />;
  }

  if (phase === 'lobby') {
    return <LobbyScreen settings={settings} onStart={startMultiplayer} onExit={handleExit} />;
  }

  if (phase === 'reveal') {
    return <RoleRevealScreen players={players} onDone={() => setPhase('night')} />;
  }

  if (phase === 'night') {
    return (
      <NightScreen
        players={players}
        dayNumber={round - 1}
        witchHealUsed={healUsed}
        witchPoisonUsed={poisonUsed}
        onComplete={onNightComplete}
        hostManager={hostManager}
        peerByIndex={peerByIndex}
        narrator={settings.narrator}
      />
    );
  }

  if (phase === 'hunter') {
    return (
      <HunterScreen
        players={players}
        onComplete={onHunterComplete}
        hunterIndex={pendingHunter}
        hostManager={hostManager}
        peerByIndex={peerByIndex}
        narrator={settings.narrator}
      />
    );
  }

  if (phase === 'day') {
    return (
      <DayScreen
        players={players}
        lastDeaths={lastDeaths}
        dayNumber={round}
        timerEnabled={settings.timerEnabled}
        discussionMin={settings.discussionMin}
        onComplete={onDayComplete}
        narrator={settings.narrator}
      />
    );
  }

  return (
    <ResultScreen
      players={players}
      winner={winner}
      onReplay={replay}
      onNewGame={() => setPhase('setup')}
      onExit={handleExit}
      narrator={settings.narrator}
    />
  );
}
