import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleZH_HK from '../assets/role/zh_hk.json';
import RoleData from '../assets/role/role.json';
import { LucideFileExclamationPoint, ThumbsUp } from 'lucide-react';

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('arfc_result');
    if (saved) {
      setResult(JSON.parse(saved));
    } else {
      // Mock data for testing if visited directly or refreshing
      setResult({
        "scores":{"A":-0.361,"R":0.033,"F":-0.2,"C":-0.273},
        "tagWeights":{"night":4,"format":-12,"altruist":2,"calm":-22,"idea":-3,"buffer":-9,"observer":6,"efficiency":1,"emotional":-5,"introvert":-11},
        "tagRecommend":[{"tag":"calm","score":-22},{"tag":"format","score":-12},{"tag":"introvert","score":-11}],
        "suggestedARFC":"PRBT",
        "bestARFCPart":{"part":"H","dimension":"Attitude"},
      },);
    }
  }, []);

  if (!result) return <div className="min-h-screen flex justify-center items-center text-white">載入中...</div>;

  const { scores, suggestedARFC, bestARFCPart } = result;
  const roleInfo = RoleData.find(r => r.tag === suggestedARFC) || {};
  const roleLocaleInfo = RoleZH_HK.find(r => r.id === roleInfo.id);
  
  // Calculate percentage for sliders (-3 to +3 mapped to -100 to -50, 50 to 100)
  const getPercentData = (val) => {
        const v = Math.max(-1, Math.min(1, typeof val === 'number' ? val : 0));
        const isRight = v >= 0;
        const strength = Math.abs(v);
        const score = Math.round(50 + strength * 50);
        const raw = isRight ? score : 100 - score;
        return { raw, score, isRight };
  };

  const cPrimary   = roleInfo.colors?.[0] || '#2ae19e';
  const cSecondary = roleInfo.colors?.[1] || '#8b5cf6';
  const cHighlight = roleInfo.colors?.[2] || '#ffffff';
  const cBgDeco    = roleInfo.colors?.[3] || '#1a1a2e';
    const strengthColor = '#22c55e'; // green
    const weaknessColor = '#ef4444'; // red

  return (
    <div className="min-h-screen font-sans text-slate-200">
        <section 
            className="relative w-full pt-32 pb-32 overflow-hidden"
        >
            {/* Organic Glowing Background Blobs using cBgDeco & cSecondary */}
            <div className="absolute top-0 right-0 -m-32 w-[600px] h-[600px] rounded-full opacity-40 mix-blend-screen filter blur-[100px] pointer-events-none" style={{ backgroundColor: cBgDeco }}></div>
            <div className="absolute bottom-10 left-10 -m-32 w-[500px] h-[500px] rounded-full opacity-20 mix-blend-screen filter blur-[100px] pointer-events-none" style={{ backgroundColor: cSecondary }}></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col-reverse md:flex-row items-center gap-16">
                
                {/* Left Text Content */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="text-m font-bold tracking-[0.3em] uppercase mb-4" style={{ color: cHighlight }}>
                        你的 ARFC 定位是...
                    </p>
                    <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter text-white drop-shadow-md">
                        {roleLocaleInfo?.animal_name || '未知角色'}
                    </h1>
                    <div 
                        className="inline-block text-slate-900 text-xl md:text-2xl textauto font-black tracking-[0.2em] px-8 py-2 rounded-full mb-8 shadow-lg"
                        style={{ backgroundColor: cPrimary, boxShadow: `0 0 20px ${cPrimary}40` }}
                    >
                        {suggestedARFC}
                    </div>

                    <p className="text-xl md:text-2xl font-medium text-slate-300 italic border-l-4 pl-6 mb-12 py-2" style={{ borderColor: cHighlight }}>
                        "{roleLocaleInfo?.short || '未下定義'}"
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 w-full">
                        <button onClick={() => navigate('/')} className="bg-white/5 text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-all border border-white/10 backdrop-blur-sm tracking-widest text-sm"
                                style={{ boxShadow: `0 0 8px ${cBgDeco}25` }}>
                            重新測試
                        </button>
                        <button onClick={() => navigate('/')} className="bg-white/5 text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-all border border-white/10 backdrop-blur-sm tracking-widest text-sm"
                                style={{ boxShadow: `0 0 8px ${cBgDeco}25` }}>
                            分享結果
                        </button>
                    </div>
                    
                </div>

                {/* Right Content - Floating Character Image */}
                <div className="w-full md:w-2/5 flex justify-center items-center relative">
                    <div className="relative w-64 h-64 md:w-96 md:h-96 animate-[pulse_6s_ease-in-out_infinite]">
                        {roleInfo.image ? (
                            <img 
                                src={`/role_images/${roleInfo.image}`} 
                                alt={roleLocaleInfo?.animal_name} 
                                className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] scale-110 hover:scale-125 transition-transform duration-500 origin-bottom" 
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center opacity-80" style={{ color: cHighlight }}>
                                <svg className="w-40 h-40 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                <span className="font-bold tracking-widest mt-4">IMAGE MISSING</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>

        {/* MAIN CONTENT CONTAINER */}
        <main className="max-w-6xl mx-auto px-6 py-24 flex flex-col gap-32">
            
            {/* Traits Section */}
            <section>
                <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">性格特質分析</h2>
                    <div className="w-24 h-1.5 rounded-full shadow-lg" style={{ backgroundColor: cPrimary, boxShadow: `0 0 15px ${cPrimary}80` }}></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Dimension Bars */}
                    <div className="flex-1 flex flex-col gap-12">
                        <TraitBar
                            labelLeft="卓越高標"
                            labelRight="務實及格"
                            dim="態度目標"
                            dimTag="A"
                            glowColor={roleInfo.colors?.[2] || cHighlight}
                            percentData={getPercentData(scores.A)}
                        />
                        <TraitBar
                            labelLeft="預留緩衝"
                            labelRight="壓線衝刺"
                            dim="處事節奏"
                            dimTag="R"
                            glowColor={roleInfo.colors?.[2] || cHighlight}
                            percentData={getPercentData(scores.R)}
                        />
                        <TraitBar
                            labelLeft="領航協調"
                            labelRight="後勤執行"
                            dim="角色分工"
                            dimTag="F"
                            glowColor={roleInfo.colors?.[2] || cHighlight}
                            percentData={getPercentData(scores.F)}
                        />
                        <TraitBar
                            labelLeft="直接高效"
                            labelRight="婉轉和諧"
                            dim="溝通方式"
                            dimTag="C"
                            glowColor={roleInfo.colors?.[2] || cHighlight}
                            percentData={getPercentData(scores.C)}
                        />
                    </div>

                    {/* Prominent Dimension Highlight */}
                    <div className="lg:w-1/3 flex flex-col justify-center">
                        <div className="p-10 rounded-3xl relative overflow-hidden backdrop-blur-md" style={{ backgroundColor: `${cBgDeco}40`, border: `1px solid ${cPrimary}30` }}>
                            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full filter blur-[60px] opacity-40 pointer-events-none" style={{ backgroundColor: cPrimary }}></div>
                            <h3 className="text-sm font-bold tracking-[0.2em] text-slate-400 mb-4 uppercase">最突出的特質</h3>
                            <p className="text-4xl font-black text-white mb-6 leading-snug relative z-10">
                                <span style={{ color: cHighlight, textShadow: `0 0 10px ${cHighlight}80` }}>{bestARFCPart?.part || "均衡表現"}</span>
                            </p>
                            <p className="text-slate-300 leading-relaxed font-medium relative z-10">
                                在團隊合作與專案執行中，這項特質往往主導了你的行為模式，也是你表現最為突出自然的一環。妥善運用能讓你在協作中如魚得水。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strengths & Weaknesses - Two boxes populated from locale strings */}
            <section>
                {(() => {
                    const talentTitle = roleLocaleInfo?.talent_title || '';
                    const talentDesc = roleLocaleInfo?.talent_desc || '';
                    const pitfallTitle = roleLocaleInfo?.pitfall_title || '';
                    const pitfallDesc = roleLocaleInfo?.pitfall_desc || '';

                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                            {/* Strengths box */}
                            <div className="p-8 rounded-2xl bg-white/3 border border-white/6">
                                <div className="flex items-center gap-4">
                                    <ThumbsUp className="w-6 h-6" color={strengthColor} />
                                    <h3 className="text-2xl font-black" style={{ color: strengthColor }}>{talentTitle || '優勢天賦'}</h3>
                                </div>

                                <div className="mt-6">
                                    {talentDesc ? (
                                        <Item title={talentDesc} desc={''} />
                                    ) : (
                                        <p className="text-slate-400">暫無優勢描述</p>
                                    )}
                                </div>
                            </div>

                            {/* Weaknesses box */}
                            <div className="p-8 rounded-2xl bg-white/3 border border-white/6">
                                <div className="flex items-center gap-4">
                                    <LucideFileExclamationPoint className="w-6 h-6" color={weaknessColor} />
                                    <h3 className="text-2xl font-black" style={{ color: weaknessColor }}>{pitfallTitle || '發展盲區'}</h3>
                                </div>

                                <div className="mt-6">
                                    {pitfallDesc ? (
                                        <Item title={pitfallDesc} desc={''} />
                                    ) : (
                                        <p className="text-slate-400">暫無盲區描述</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </section>

        </main>
    </div>
  );
}

// Subcomponents: Dark Mode

function TraitBar({ labelLeft, labelRight, dim, dimTag, glowColor, percentData }) {
    const { raw, score, isRight } = percentData;
    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-3">
                <span className={`text-sm font-bold tracking-wider uppercase text-slate-400`}>{dim}</span>
                <span className="text-2xl font-black" style={{ color: glowColor, textShadow: `0 0 10px ${glowColor}60` }}>{score}%</span>
            </div>
            
            {/* Track */}
            <div className="relative w-full h-1.5 bg-slate-600 rounded-full mb-5">
                {/* Center marker */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3 bg-slate-600 rounded-sm"></div>
                
                {/* Fill */}
                <div 
                    className="absolute h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                        backgroundColor: `var(--color-${dimTag})`,
                        boxShadow: `0 0 10px var(--color-${dimTag})80`,
                        width: `${Math.max(score - 50, 2)}%`,
                        left: isRight ? '50%' : `${100 - score}%`
                    }}
                ></div>

                {/* Thumb */}
                <div 
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-1000 ease-out"
                    style={{ 
                        backgroundColor: glowColor,
                        border: `3px solid #0f172a`,
                        boxShadow: `0 0 15px ${glowColor}60`,
                        left: `${raw}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                ></div>
            </div>

            <div className="flex justify-between text-sm font-bold text-slate-400">
                <span className={!isRight ? 'text-slate-100' : ''}>{labelLeft}</span>
                <span className={isRight ? 'text-slate-100' : ''}>{labelRight}</span>
            </div>
        </div>
    );
}

function Item({ title, desc }) {
    return (
        <div className="group">
            <div>
                <h4 className="text-ltext-white mb-2 transition-colors">{title}</h4>
                <p className="text-slate-400 leading-relaxed text-lg">{desc}</p>
            </div>
        </div>
    );
}
