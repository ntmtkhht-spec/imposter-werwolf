import { useI18n } from '../../../i18n';
import { getRule } from '../rules';

type Props = {
  ruleId: string | null;
  onContinue: () => void;
};

/** Announces this round's special rule to the whole group before play starts. */
export default function RuleScreen({ ruleId, onContinue }: Props) {
  const { t, lang } = useI18n();
  const r = t.imposter.rule;
  const rule = getRule(lang, ruleId);

  if (!rule) return null;

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-slate-400">
          {r.title}
        </p>

        <div className="text-7xl" aria-hidden>
          {rule.icon}
        </div>

        <div className="mt-6 text-3xl font-black text-brand">{rule.name}</div>
        <p className="mt-4 max-w-xs text-lg leading-snug text-slate-600">{rule.text}</p>
      </div>

      <button onClick={onContinue} className="btn-brand w-full text-lg">
        {r.understood}
      </button>
    </div>
  );
}
