import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Clock, MessageCircle, BarChart } from 'lucide-react';
import Translation from "../assets/lang/zh_hk.json";

export default function Home() {
  const translation = Translation.ui;
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-100 mb-6 tracking-tight">
          小組專題<span style={{ color: 'var(--color-F)' }}>性格測驗</span>
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
            <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 indicator-bg-A indicator-text-A rounded-xl flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{translation.arfc_attitude_target} (A)</h3>
              <p className="text-slate-300 text-sm mb-4">你對成績的期望是什麼？</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="indicator-text-A">{translation.arfc_high_standards}（H）</span>
                <span className="text-slate-500 mx-2">vs</span>
                <span className="indicator-text-A-dark text-right">{translation.arfc_pass_oriented}（P）</span>
              </div>
            </div>

            {/* Rhythm */}
            <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 indicator-bg-R indicator-text-R rounded-xl flex items-center justify-center mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{translation.arfc_rythm_of_work} (R)</h3>
              <p className="text-slate-300 text-sm mb-4">你的做事步調是？</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="indicator-text-R">{translation.arfc_reserve_buffer}（R）</span>
                <span className="text-slate-500 mx-2">vs</span>
                <span className="indicator-text-R-dark text-right">{translation.arfc_sprint_deadline}（S）</span>
              </div>
            </div>

            {/* Function */}
            <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 indicator-bg-F indicator-text-F rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{translation.arfc_function} (F)</h3>
              <p className="text-slate-300 text-sm mb-4">在團隊中你習慣扮演？</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="indicator-text-F">{translation.arfc_facilitator}（L）</span>
                <span className="text-slate-500 mx-2">vs</span>
                <span className="indicator-text-F-dark text-right">{translation.arfc_backuper}（B）</span>
              </div>
            </div>

            {/* Communication */}
            <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 indicator-bg-C indicator-text-C rounded-xl flex items-center justify-center mb-6">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{translation.arfc_communication} (C)</h3>
              <p className="text-slate-300 text-sm mb-4">你偏好的溝通方式？</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="indicator-text-C">{translation.arfc_direct_efficiency}（D）</span>
                <span className="text-slate-500 mx-2">vs</span>
                <span className="indicator-text-C-dark text-right">{translation.arfc_tactful_harmonious}（T）</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Purpose & Value Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">為甚麼要做這個測驗？</h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-slate-200">
              <span className="font-bold text-lg">1</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-100 mb-2">量化預期目標，減少隱形成本</h4>
              <p className="text-slate-300 leading-relaxed">
                分組最大的摩擦源於組員間對成績的要求不一。測驗能讓每位成員在合作前就開誠布公，確認彼此是追求卓越還是僅求及格。透過同步目標，可以避免後期因投入感落差而產生的情緒內耗，讓團隊在共識下運作。
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-slate-200">
              <span className="font-bold text-lg">2</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-100 mb-2">優化角色分工，提升產出品質</h4>
              <p className="text-slate-300 leading-relaxed">
                許多團隊的失敗是因為分工不均或職能重疊。本測驗能識別出每位組員的專長與偏向，例如誰擅長邏輯校對、誰適合上台報告。這能讓團隊根據數據進行適才適所的分配，而非僅憑交情或隨機指派，確保每項任務都交由最合適的人處理。
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-slate-200">
              <span className="font-bold text-lg">3</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-100 mb-2">揭露工作習慣，預防溝通誤會</h4>
              <p className="text-slate-300 leading-relaxed">
                不同人的工作節奏與回覆訊息的習慣差異巨大。測驗結果能讓組員提前了解彼此的作息，例如誰是習慣清晨工作的早起者，誰是凌晨才發力的夜貓子。這能解決因已讀不回或進度催促產生的誤解，直接建立一套符合該組特性的溝通規則。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}