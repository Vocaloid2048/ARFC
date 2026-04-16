const options = [
  { value: 3, size: "w-12 h-12 md:w-16 md:h-16", border: "border-[3px] border-[#33d282]", bg: "bg-[#33d282]", hover: "hover:bg-[#33d282]/20" },
  { value: 2, size: "w-10 h-10 md:w-12 md:h-12", border: "border-[2px] border-[#33d282]", bg: "bg-[#33d282]", hover: "hover:bg-[#33d282]/20" },
  { value: 1, size: "w-8 h-8 md:w-10 md:h-10", border: "border-[2px] border-[#33d282]", bg: "bg-[#33d282]", hover: "hover:bg-[#33d282]/20" },
  { value: 0, size: "w-7 h-7 md:w-8 md:h-8", border: "border-[2px] border-slate-500", bg: "bg-slate-500", hover: "hover:bg-slate-500/20" },
  { value: -1, size: "w-8 h-8 md:w-10 md:h-10", border: "border-[2px] border-[#7451eb]", bg: "bg-[#7451eb]", hover: "hover:bg-[#7451eb]/20" },
  { value: -2, size: "w-10 h-10 md:w-12 md:h-12", border: "border-[2px] border-[#7451eb]", bg: "bg-[#7451eb]", hover: "hover:bg-[#7451eb]/20" },
  { value: -3, size: "w-12 h-12 md:w-16 md:h-16", border: "border-[3px] border-[#7451eb]", bg: "bg-[#7451eb]", hover: "hover:bg-[#7451eb]/20" }
];

export default function QuizQuestions({ questions, questionRef, answers, onSelect }) {
    return (
        questions.map((q, idx) => (
            <div
                key={q.id}
                ref={el => questionRef.current[q.id] = el}
                className={`w-full flex flex-col items-center border-b border-slate-800 pb-12 last:border-0 duration-500 scale-95 hover:scale-100 transition-all ${answers[q.id] !== undefined ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}
            >
                <h2 className={`text-xl md:text-2xl font-bold mb-8 text-center transition-all ${answers[q.id] !== undefined ? 'text-slate-500' : 'text-slate-100'}`}>
                    {q.text}
                </h2>

                {/* Mobile Labels (top) */}
                <div className="flex sm:hidden justify-between w-full px-4 mb-4 text-sm font-bold tracking-wider">
                    <span className="text-[#33d282]">同意</span>
                    <span className="text-[#7451eb]">不同意</span>
                </div>

                {/* Options */}
                <div className="flex items-center justify-between w-full sm:w-11/12 gap-2">
                    <span className="text-[#33d282] font-bold text-lg hidden sm:block whitespace-nowrap mr-4">同意</span>

                    <div className="flex justify-between items-center w-full px-2 sm:px-0">
                        {options.map((opt, idx) => {
                            const isSelected = answers[q.id] === opt.value;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => onSelect(q.id, opt.value)}
                                    className={`rounded-full transition-all duration-200 flex items-center justify-center
                          ${opt.size} ${opt.border} 
                          ${isSelected ? opt.bg : 'bg-transparent'}
                          ${!isSelected && opt.hover}
                        `}
                                    aria-label={`選擇區間: ${opt.value}`}
                                >
                                    {isSelected && (
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-1/2 h-1/2 text-[var(--page-bg)] opacity-80"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <span className="text-[#7451eb] font-bold text-lg hidden sm:block whitespace-nowrap ml-4">不同意</span>
                </div>
            </div>
        ))
    )
}