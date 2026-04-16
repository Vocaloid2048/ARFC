export default function QuizStepDesc({ index, title, desc, color }) {
    return (
        <div className={`bg-slate-900/40 border border-[${color}]/30 rounded-2xl p-6 relative overflow-hidden group`}>
            <div className={`absolute top-0 left-0 w-1.5 h-full bg-[${color}]`}></div>
            <span className={`bg-[${color}] text-[var(--text-inverse)] text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block`}>第 {index} 步</span>
            <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {desc}
            </p>
          </div>
    )
}