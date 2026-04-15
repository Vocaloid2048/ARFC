import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionZH_HK from '../assets/lang/zh_hk.json';
import { calculateResult } from '../utils/resultCalculation';

const options = [
  { value: 3, size: "w-12 h-12 md:w-16 md:h-16", border: "border-[3px] border-[#33d282]", bg: "bg-[#33d282]", hover: "hover:bg-[#33d282]/20" },
  { value: 2, size: "w-10 h-10 md:w-12 md:h-12", border: "border-[2px] border-[#33d282]", bg: "bg-[#33d282]", hover: "hover:bg-[#33d282]/20" },
  { value: 1, size: "w-8 h-8 md:w-10 md:h-10", border: "border-[2px] border-[#33d282]", bg: "bg-[#33d282]", hover: "hover:bg-[#33d282]/20" },
  { value: 0, size: "w-7 h-7 md:w-8 md:h-8", border: "border-[2px] border-slate-500", bg: "bg-slate-500", hover: "hover:bg-slate-500/20" },
  { value: -1, size: "w-8 h-8 md:w-10 md:h-10", border: "border-[2px] border-[#7451eb]", bg: "bg-[#7451eb]", hover: "hover:bg-[#7451eb]/20" },
  { value: -2, size: "w-10 h-10 md:w-12 md:h-12", border: "border-[2px] border-[#7451eb]", bg: "bg-[#7451eb]", hover: "hover:bg-[#7451eb]/20" },
  { value: -3, size: "w-12 h-12 md:w-16 md:h-16", border: "border-[3px] border-[#7451eb]", bg: "bg-[#7451eb]", hover: "hover:bg-[#7451eb]/20" }
];

const randomizeArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

export default function Quiz() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [questions] = useState(QuestionZH_HK.question);
  const questionRefs = useRef({});
  const headerOffset = 96; // match page top padding (pt-24 -> 6rem -> 96px)
  const progressRef = useRef(null);

  const handleSelect = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));

    // smart auto-scroll: find next unanswered after current index
    const idx = questions.findIndex(q => q.id === questionId);
    let targetEl = null;

    // search forward for next unanswered
    for (let i = idx + 1; i < questions.length; i++) {
      if (answers[questions[i].id] === undefined) {
        targetEl = questionRefs.current[questions[i].id];
        break;
      }
    }

    // if none forward, search from start
    if (!targetEl) {
      for (let i = 0; i < questions.length; i++) {
        if (answers[questions[i].id] === undefined) {
          targetEl = questionRefs.current[questions[i].id];
          break;
        }
      }
    }

    // if still none -> scroll to progress area
    setTimeout(() => {
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const top = rect.top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      } else if (progressRef.current) {
        const rect = progressRef.current.getBoundingClientRect();
        const top = rect.top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 120);
  };
  
  useEffect(() => {
    // Fill the previous answers if user navigates back to quiz from result page
    const savedAnswers = localStorage.getItem('arfc_answers');
    if (savedAnswers) {
      //setAnswers(JSON.parse(savedAnswers));
    }

  }, []);

  const isAllAnswered = questions.every(q => answers[q.id] !== undefined);

  const handleResultClick = () => {
    if (isAllAnswered) {
      // Calculate results and store in localStorage for the result page to read
      const result = calculateResult(answers);
      localStorage.setItem('arfc_result', JSON.stringify(result));
      //localStorage.setItem('arfc_answers', JSON.stringify(answers));

      // Navigate to the result page
      navigate('/result');
    } else {
      const firstUnanswered = questions.find(q => answers[q.id] === undefined);
      if (firstUnanswered && questionRefs.current[firstUnanswered.id]) {
        const el = questionRefs.current[firstUnanswered.id];
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">免費性格測試</h1>
          <p className="text-xl text-slate-400 font-medium tracking-wide">ARFC Type Indicator</p>
        </div>

        {/* Step Indicator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-slate-900/40 border border-[#80A1BA]/30 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#80A1BA]"></div>
            <span className="bg-[#80A1BA] text-[var(--text-inverse)] text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">第 1 步</span>
            <h3 className="text-xl font-bold text-slate-100 mb-3">完成測試</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              誠實地回答問題，避免刻意隱瞞或歪曲，以此探尋你實際的人格類型。
            </p>
          </div>

          <div className="bg-slate-900/40 border border-[#B4DEBD]/30 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B4DEBD]"></div>
            <span className="bg-[#B4DEBD] text-[var(--text-inverse)] text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">第 2 步</span>
            <h3 className="text-xl font-bold text-slate-100 mb-3">查看詳細結果</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              洞悉你獨具特色的人格類型是如何影響你在團隊中的行為模式與合作風格。
            </p>
          </div>

          <div className="bg-slate-900/40 border border-[#FFF7DD]/30 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFF7DD]"></div>
            <span className="bg-[#FFF7DD] text-[var(--text-inverse)] text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">第 3 步</span>
            <h3 className="text-xl font-bold text-slate-100 mb-3">找到合適定位</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              憑藉專屬的人格報告，在團隊中發揮所長，找到最適合你的角色定位。
            </p>
          </div>
          </div>

        <div className="flex flex-col gap-12 max-w-3xl mx-auto">
          {questions.map((q) => {
            const hasAnswer = answers[q.id] !== undefined;
            return (
            <div 
              key={q.id} 
              ref={el => questionRefs.current[q.id] = el}
              className={`w-full flex flex-col items-center border-b border-slate-800 pb-12 last:border-0 duration-500 scale-95 hover:scale-100 transition-all ${hasAnswer ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}
            >
              <h2 className={`text-xl md:text-2xl font-bold mb-8 text-center transition-all ${hasAnswer ? 'text-slate-500' : 'text-slate-100'}`}>
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

        { /* Progress Bar (Mock) */ }
        <div className="mb-8" ref={progressRef}>
          <div className="flex justify-between text-slate-400 text-sm mb-2">
            <span>測試進度</span>
            <span>{Object.keys(answers).length} / {questions.length}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-[var(--color-F)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-20 text-center flex flex-col items-center gap-6">
          <p className="text-slate-500 text-sm max-w-md">
            備註：本測試僅供參考，當中評級未經學術研究認證<br/>我們不會收集任何個人敏感資料<br/>所有測試結果僅儲存於您目前的瀏覽器本地緩存
          </p>
          <button
            onClick={handleResultClick}
            className={`
              px-12 py-4 rounded-full font-bold text-lg transition-all duration-300
              ${isAllAnswered 
                ? 'bg-[var(--color-F)] text-[var(--page-bg)] hover:scale-105 shadow-[0_0_20px_rgba(242,193,195,0.4)]' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
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