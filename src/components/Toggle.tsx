type Props = {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
};

export default function Toggle({ label, checked, onChange }: Props) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between py-3"
      role="switch"
      aria-checked={checked}
    >
      <span className="font-medium">{label}</span>
      <span
        className={`relative h-7 w-12 rounded-full transition ${
          checked ? 'bg-brand' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </span>
    </button>
  );
}
