import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionZH_HK from '../assets/lang/zh_hk.json';
import { calculateResult } from '../utils/resultCalculation';
import QuizStepDesc from '../components/QuizStepDesc';
import QuizQuestions from '../components/QuizQuestions';
import ArfcButton from '../components/ArfcButton';

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
  const [questions] = useState(randomizeArray(QuestionZH_HK.question));
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
          <QuizStepDesc
            index={1}
            title="完成測試"
            desc="誠實地回答問題，避免刻意隱瞞或歪曲，以此探尋你實際的人格類型。"
            color="#80A1BA"
          />

          <QuizStepDesc
            index={2}
            title="查看詳細結果"
            desc="洞悉你獨具特色的人格類型是如何影響你在團隊中的行為模式與合作風格。"
            color="#B4DEBD"
          />

          <QuizStepDesc
            index={3}
            title="找到合適定位"
            desc="憑藉專屬的人格報告，在團隊中發揮所長，找到最適合你的角色定位。"
            color="#FFF7DD"
          />
        </div>

        <div className="flex flex-col gap-12 max-w-3xl mx-auto">
          <QuizQuestions
            questions={questions}
            questionRef={questionRefs}
            answers={answers}
            onSelect={handleSelect}
          />
        </div>

        { /* Progress Bar (Mock) */}
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
            備註：本測試僅供參考，當中評級未經學術研究認證<br />我們不會收集任何個人敏感資料<br />所有測試結果僅儲存於您目前的瀏覽器本地緩存
          </p>
          <ArfcButton
            onClick={handleResultClick}
            text="看測試結果"
            bgColor={isAllAnswered ? 'var(--color-F-dark)' : '#334155'}
          />
        </div>
      </div>
    </div>
  );
}