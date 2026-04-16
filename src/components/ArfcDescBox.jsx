export default function ArfcDescBox({ icon, part, highlightColor, darkColor, title, description, leftLabel, rightLabel }) {
    return (
        <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 hover:shadow-md transition-shadow">
            <div className="flex flex-row items-left items-center mb-4">
                {icon && (
                    <div 
                        className={`w-12 h-12 ${highlightColor ? `` : `indicator-bg-${part}`} ${highlightColor ? `` : `indicator-text-${part}`} rounded-xl flex items-center justify-center`}
                        style={highlightColor ? { backgroundColor: darkColor, color: highlightColor } : {}}
                    >
                        {icon}
                    </div>
                )}
                <h3 className="px-3 text-xl font-bold text-slate-100">{title}</h3>

            </div>
            <p className="text-ltext-white mb-2 transition-colors mb-4">{description}</p>
            {part && (
                <div className="flex justify-between items-center text-sm font-medium">
                    <span className={`indicator-text-${part}`}>{leftLabel}</span>
                    <span className="text-slate-500 mx-2">vs</span>
                    <span className={`indicator-text-${part}-dark text-right`}>{rightLabel}</span>
                </div>
            )}
        </div>
    )
}