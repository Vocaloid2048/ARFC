import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Clock, MessageCircle, BarChart } from 'lucide-react';
import ArfcDescBox from '../components/ArfcDescBox';
import ArfcReason from '../components/ArfcReason';
import { locale } from '../utils/utilTools';

export default function Home() {
  
  return (
    <div className="min-h-screen">
      {/* Start Test Section */}
      <section className="pt-20 pb-16 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-100 mb-6 tracking-tight">
          {locale("ui.home.project_name.part1")}<span style={{ color: 'var(--color-F)' }}>{locale("ui.home.project_name.part2")}</span>
        </h1>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          {locale("ui.home.project_desc")}
        </p>
        <p className="text-md text-slate-400 mb-10">
            {locale("ui.home.warning_1")}<br />
            {locale("ui.home.warning_2")}
        </p>
        <Link
          to="/quiz"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full shadow-2xl hover:brightness-90 transition-colors"
          style={{ backgroundColor: 'var(--color-F)', color: 'var(--page-bg)', boxShadow: '0 18px 40px rgba(0,0,0,0.45)' }}
        >
          {locale("ui.home.start_test")}
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--page-bg)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </section>

      {/* ARFC Framework Explanation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">{locale('ui.arfc.section_title') || 'ARFC 四大指標'}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Attitude */}
            <ArfcDescBox
              icon={<Target size={24} />}
              part="A"
              title={locale('ui.arfc.category.attitude_target.title')}
              description={locale('ui.arfc.category.attitude_target.desc')}
              leftLabel={locale('ui.arfc.part.high_standards')}
              rightLabel={locale('ui.arfc.part.pass_oriented')}
            />


            {/* Rhythm */}
            <ArfcDescBox
              icon={<Clock size={24} />}
              part="R"
              title={locale('ui.arfc.category.rythm_of_work.title')}
              description={locale('ui.arfc.category.rythm_of_work.desc')}
              leftLabel={locale('ui.arfc.part.reserve_buffer')}
              rightLabel={locale('ui.arfc.part.sprint_deadline')}
            />

            {/* Function */}
            <ArfcDescBox
              icon={<Users size={24} />}
              part="F"
              title={locale('ui.arfc.category.function.title')}
              description={locale('ui.arfc.category.function.desc')}
              leftLabel={locale('ui.arfc.part.facilitator')}
              rightLabel={locale('ui.arfc.part.backuper')}
            />

            {/* Communication */}
            <ArfcDescBox
              icon={<MessageCircle size={24} />}
              part="C"
              title={locale('ui.arfc.category.communication.title')}
              description={locale('ui.arfc.category.communication.desc')}
              leftLabel={locale('ui.arfc.part.direct_efficiency')}
              rightLabel={locale('ui.arfc.part.tactful_harmonious')}
            />
          </div>
        </div>
      </section>

      {/* Purpose & Value Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">{locale('ui.home.purpose_title')}</h2>
        <div className="space-y-8">
          <ArfcReason
            index={1}
            title={locale('ui.home.purpose1.title')}
            reason={locale('ui.home.purpose1.desc')}
          />
          <ArfcReason
            index={2}
            title={locale('ui.home.purpose2.title')}
            reason={locale('ui.home.purpose2.desc')}
          />
          <ArfcReason
            index={3}
            title={locale('ui.home.purpose3.title')}
            reason={locale('ui.home.purpose3.desc')}
          />
        </div>
      </section>
    </div>
  );
}