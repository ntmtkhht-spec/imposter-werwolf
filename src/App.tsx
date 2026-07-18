import { Routes, Route, Navigate } from 'react-router-dom';
import HubPage from './pages/HubPage';
import NotFound from './pages/NotFound';
import ImposterGame from './games/imposter/ImposterGame';
import WerwolfGame from './games/werwolf/WerwolfGame';

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HubPage />} />
        <Route path="/spiel/imposter" element={<ImposterGame />} />
        <Route path="/spiel/werwolf" element={<WerwolfGame />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}
