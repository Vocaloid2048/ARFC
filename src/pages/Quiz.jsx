import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsMeta from '../assets/data/question_data.json';
import { calculateResult } from '../utils/calculateResult';
import QuizStepDesc from '../components/QuizStepDesc';
import QuizQuestions from '../components/QuizQuestions';
import ArfcButton from '../components/ArfcButton';
import { locale } from '../utils/utilTools';

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
  const [questions] = useState(randomizeArray(
    questionsMeta.map(q => ({
      ...q,
      text: locale(`question.${q.id}`)
    }))
  ));
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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">{locale('ui.home.project_name.part2')}</h1>
        </div>

        {/* Step Indicator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <QuizStepDesc
            index={1}
            title={locale('ui.quiz.step1.title')}
            desc={locale('ui.quiz.step1.desc')}
            color="#80A1BA"
          />

          <QuizStepDesc
            index={2}
            title={locale('ui.quiz.step2.title')}
            desc={locale('ui.quiz.step2.desc')}
            color="#B4DEBD"
          />

          <QuizStepDesc
            index={3}
            title={locale('ui.quiz.step3.title')}
            desc={locale('ui.quiz.step3.desc')}
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
            <span>{locale('ui.quiz.progress.title')}</span>
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
          <p className="text-slate-500 text-sm max-w-md" dangerouslySetInnerHTML={{ __html: locale('ui.quiz.disclamer') }}>
          </p>
          <ArfcButton
            onClick={handleResultClick}
            text={locale('ui.quiz.submit_button')}
            bgColor={isAllAnswered ? 'var(--color-F-dark)' : '#334155'}
          />
        </div>
      </div>
    </div>
  );
}