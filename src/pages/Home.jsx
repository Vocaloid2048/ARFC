import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Clock, MessageCircle, BarChart } from 'lucide-react';
import Translation from "../assets/lang/zh_hk.json";
import ArfcDescBox from '../components/ArfcDescBox';
import ArfcReason from '../components/ArfcReason';

export default function Home() {
  const translation = Translation.ui;
  return (
    <div className="min-h-screen">
      {/* Start Test Section */}
      <section className="pt-20 pb-16 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-100 mb-6 tracking-tight">
          團隊合作<span style={{ color: 'var(--color-F)' }}>性格測驗</span>
        </h1>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          量化你的分組合作風格，幫助你在團隊中找到最適合的位置，提升合作效率與成果品質。
        </p>
        <p className="text-md text-slate-400 mb-10">
            本測驗結果僅供參考，請勿過度解讀。<br />
            團隊合作需要持續的溝通與調整，真正的默契來自於實際的互動與理解。
        </p>
        <Link
          to="/quiz"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full shadow-2xl hover:brightness-90 transition-colors"
          style={{ backgroundColor: 'var(--color-F)', color: 'var(--page-bg)', boxShadow: '0 18px 40px rgba(0,0,0,0.45)' }}
        >
          開始測試
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--page-bg)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </section>

      {/* ARFC Framework Explanation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">ARFC 四大指標</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Attitude */}
            <ArfcDescBox
              icon={<Target size={24} />}
              part="A"
              title={translation.arfc_attitude_target}
              description="你對成績的期望是什麼？"
              leftLabel={translation.arfc_high_standards}
              rightLabel={translation.arfc_pass_oriented}
            />


            {/* Rhythm */}
            <ArfcDescBox
              icon={<Clock size={24} />}
              part="R"
              title={translation.arfc_rythm_of_work}
              description="你的做事步調是？"
              leftLabel={translation.arfc_reserve_buffer}
              rightLabel={translation.arfc_sprint_deadline}
            />

            {/* Function */}
            <ArfcDescBox
              icon={<Users size={24} />}
              part="F"
              title={translation.arfc_function}
              description="在團隊中你習慣扮演？"
              leftLabel={translation.arfc_facilitator}
              rightLabel={translation.arfc_backuper}
            />

            {/* Communication */}
            <ArfcDescBox
              icon={<MessageCircle size={24} />}
              part="C"
              title={translation.arfc_communication}
              description="你偏好的溝通方式？"
              leftLabel={translation.arfc_direct_efficiency}
              rightLabel={translation.arfc_tactful_harmonious}
            />
          </div>
        </div>
      </section>

      {/* Purpose & Value Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">為甚麼要做這個測驗？</h2>
        <div className="space-y-8">
          <ArfcReason
            index={1}
            title="量化預期目標，減少隱形成本"
            reason="分組最大的摩擦源於組員間對成績的要求不一。測驗能讓每位成員在合作前就開誠布公，確認彼此是追求卓越還是僅求及格。透過同步目標，可以避免後期因投入感落差而產生的情緒內耗，讓團隊在共識下運作。"
          />
          <ArfcReason
            index={2}
            title="優化角色分工，提升產出品質"
            reason="許多團隊的失敗是因為分工不均或職能重疊。本測驗能識別出每位組員的專長與偏向，例如誰擅長邏輯校對、誰適合上台報告。這能讓團隊根據數據進行適才適所的分配，而非僅憑交情或隨機指派，確保每項任務都交由最合適的人處理。"
          />
          <ArfcReason
            index={3}
            title="揭露工作習慣，預防溝通誤會"
            reason="不同的工作習慣和溝通偏好是團隊衝突的常見根源。測驗能幫助成員了解彼此在做事步調、溝通方式上的差異，例如誰喜歡提前預留緩衝時間，誰則習慣衝刺式完成。這種認知能促使團隊在合作前就建立起包容與理解的氛圍，減少因誤解而產生的摩擦，讓合作更順暢。"
          />
        </div>
      </section>
    </div>
  );
}