import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  { id: 1, text: "如果老師說這份準備作業不計分，我會選擇隨便完成就算。" },
  { id: 2, text: "比起口頭報告內容的深度，我更在意 PPT 排版美觀程度。" },
  { id: 3, text: "我無法接受組員經常在課堂缺席。" }
];

const options = [
  { value: 3, size: "w-12 h-12 md:w-16 md:h-16", border: "border-[3px] border-[#33d282]", bg: "bg-[#33d282]", hover: "hover:bg-[#33d282]/20" },
  { value: 2, size: "w-10 h-10 md:w-12 md:h-12", border: "border-[2px] border-[#33d282]", bg: "bg-[#33d282]", hover: "hover:bg-[#33d282]/20" },
  { value: 1, size: "w-8 h-8 md:w-10 md:h-10", border: "border-[2px] border-[#33d282]", bg: "bg-[#33d282]", hover: "hover:bg-[#33d282]/20" },
  { value: 0, size: "w-7 h-7 md:w-8 md:h-8", border: "border-[2px] border-slate-500", bg: "bg-slate-500", hover: "hover:bg-slate-500/20" },
  { value: -1, size: "w-8 h-8 md:w-10 md:h-10", border: "border-[2px] border-[#7451eb]", bg: "bg-[#7451eb]", hover: "hover:bg-[#7451eb]/20" },
  { value: -2, size: "w-10 h-10 md:w-12 md:h-12", border: "border-[2px] border-[#7451eb]", bg: "bg-[#7451eb]", hover: "hover:bg-[#7451eb]/20" },
  { value: -3, size: "w-12 h-12 md:w-16 md:h-16", border: "border-[3px] border-[#7451eb]", bg: "bg-[#7451eb]", hover: "hover:bg-[#7451eb]/20" }
];

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleSelect = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isAllAnswered = questions.every(q => answers[q.id] !== undefined);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        { /* Progress Bar (Mock) */ }
        <div className="mb-8">
          <div className="flex justify-between text-slate-400 text-sm mb-2">
            <span>測試進度</span>
            <span>{Object.keys(answers).length} / {questions.length}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-[var(--primary-light)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {questions.map((q) => {
            const hasAnswer = answers[q.id] !== undefined;
            return (
            <div key={q.id} className={`w-full flex flex-col items-center border-b border-slate-800 pb-12 last:border-0 duration-300 ${hasAnswer ? 'opacity-60' : 'opacity-100'}`}>
              <h2 className={`text-xl md:text-2xl font-bold mb-8 text-center text-slate-100 leading-relaxed transition-opacity`}>
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
                        onClick={() => handleSelect(q.id, opt.value)}
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
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            disabled={!isAllAnswered}
            onClick={() => navigate('/result')}
            className={`
              px-12 py-4 rounded-full font-bold text-lg transition-all duration-300
              ${isAllAnswered 
                ? 'bg-[var(--primary-light)] text-[var(--page-bg)] hover:scale-105 shadow-[0_0_20px_rgba(242,193,195,0.4)]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }
            `}
          >
            看測試結果
          </button>
        </div>
      </div>
    </div>
  );
}