export default function ArfcFramework({ icon, part, title, description, leftLabel, rightLabel }) {
    return (
        <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 indicator-bg-${part} indicator-text-${part} rounded-xl flex items-center justify-center mb-6`}>
                {icon}
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
              <p className="text-slate-300 text-sm mb-4">{description}</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className={`indicator-text-${part}`}>{leftLabel}</span>
                <span className="text-slate-500 mx-2">vs</span>
                <span className={`indicator-text-${part}-dark text-right`}>{rightLabel}</span>
              </div>
            </div>
    )
}