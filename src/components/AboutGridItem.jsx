import React from 'react';

export default function AboutGridItem({ icon, title }) {
  return (
    <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-slate-600 transition-all">
      <div className="mb-3">{icon}</div>
      <span className="text-slate-100 font-bold text-sm md:text-base">{title}</span>
    </div>
  );
}
