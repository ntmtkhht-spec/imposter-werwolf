type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (v: number) => void;
};

export default function Stepper({ label, value, min, max, suffix, onChange }: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="flex items-center justify-between py-3">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={dec}
          disabled={value <= min}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-2xl leading-none disabled:opacity-30"
          aria-label="−"
        >
          −
        </button>
        <span className="w-14 text-center text-lg font-bold tabular-nums">
          {value}
          {suffix ? <span className="ml-0.5 text-sm font-medium text-slate-400">{suffix}</span> : null}
        </span>
        <button
          onClick={inc}
          disabled={value >= max}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-2xl leading-none disabled:opacity-30"
          aria-label="+"
        >
          +
        </button>
      </div>
    </div>
  );
}
