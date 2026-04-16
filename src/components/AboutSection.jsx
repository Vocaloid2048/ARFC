import React from 'react';

export default function AboutSection({ icon, title, children, className = '' }) {
  return (
    <section className={`bg-slate-800/40 p-8 rounded-3xl border border-slate-600/50 backdrop-blur-sm space-y-6 ${className}`}>
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
}
