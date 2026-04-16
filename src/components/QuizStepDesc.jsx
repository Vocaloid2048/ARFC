import { locale } from "../utils/UtilTools";

export default function QuizStepDesc({ index, title, desc, color = '#80A1BA' }) {
  return (
    <div className="bg-slate-900/40 rounded-2xl p-6 relative overflow-hidden group" style={{ border: `1px solid ${color}33` }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 6, height: '100%', backgroundColor: color }} />

      <span className="text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block" style={{ backgroundColor: color, color: 'var(--text-inverse)' }}>
        {locale('ui.quiz.step').replace('%1', index)}
      </span>

      <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}