import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="text-6xl">🤷</div>
      <p className="text-lg font-semibold">404</p>
      <button onClick={() => navigate('/')} className="btn-primary">
        ← Home
      </button>
    </div>
  );
}
