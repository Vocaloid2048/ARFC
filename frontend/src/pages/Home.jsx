import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Clock, MessageCircle, BarChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
          大學分組報告 <span className="text-indigo-600">專屬人格測驗</span>
        </h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          透過 ARFC 框架，量化你的分組合作風格，幫助你在團隊中找到最適合的位置，提升合作效率與成果品質。
        </p>
        <Link 
          to="/quiz" 
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          開始測試
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </section>

      {/* ARFC Framework Explanation */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">ARFC 四大指標</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Attitude */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">態度目標 (A)</h3>
              <p className="text-slate-500 text-sm mb-4">你對成績的期望是什麼？</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-blue-600">追求高分（H）</span>
                <span className="text-slate-500 mx-2">vs</span>
                <span className="text-blue-900 text-right">及格就好（P）</span>
              </div>
            </div>

            {/* Rhythm */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">處事節奏 (R)</h3>
              <p className="text-slate-500 text-sm mb-4">你的做事步調是？</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-orange-600">預留緩衝（R）</span>
                <span className="text-slate-500 mx-2">vs</span>
                <span className="text-orange-900 text-right">壓線衝刺（S）</span>
              </div>
            </div>

            {/* Function */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">角色分工 (F)</h3>
              <p className="text-slate-500 text-sm mb-4">在團隊中你習慣扮演？</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-purple-600">領航協調（L）</span>
                <span className="text-slate-500 mx-2">vs</span>
                <span className="text-purple-900 text-right">後勤執行（B）</span>
              </div>
            </div>

            {/* Communication */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">溝通方式 (C)</h3>
              <p className="text-slate-500 text-sm mb-4">你偏好的溝通方式？</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-emerald-600">直接高效（D）</span>
                <span className="text-slate-500 mx-2">vs</span>
                <span className="text-emerald-900 text-right">婉轉和諧（H）</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Purpose & Value Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">為什麼要做這個測驗？</h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
              <span className="font-bold text-lg">1</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">量化預期目標，減少隱形成本</h4>
              <p className="text-slate-600 leading-relaxed">
                分組最大的摩擦源於組員間對成績的要求不一。測驗能讓每位成員在合作前就開誠布公，確認彼此是追求卓越還是僅求及格。透過同步目標，可以避免後期因投入感落差而產生的情緒內耗，讓團隊在共識下運作。
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
              <span className="font-bold text-lg">2</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">優化角色分工，提升產出品質</h4>
              <p className="text-slate-600 leading-relaxed">
                許多團隊的失敗是因為分工不均或職能重疊。本測驗能識別出每位組員的專長與偏向，例如誰擅長邏輯校對、誰適合上台報告。這能讓團隊根據數據進行適才適所的分配，而非僅憑交情或隨機指派，確保每項任務都交由最合適的人處理。
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
              <span className="font-bold text-lg">3</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">揭露工作習慣，預防溝通誤會</h4>
              <p className="text-slate-600 leading-relaxed">
                不同人的工作節奏與回覆訊息的習慣差異巨大。測驗結果能讓組員提前了解彼此的作息，例如誰是習慣清晨工作的早起者，誰是凌晨才發力的夜貓子。這能解決因已讀不回或進度催促產生的誤解，直接建立一套符合該組特性的溝通規則。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}