import React from 'react';
import { locale, convertTagToLocale, getPercentData, convertARFCToLocale, convertARFCToFancyText } from '../utils/utilTool';
import TraitBar from './TraitBar';
import { ThumbsUp, LucideFileExclamationPoint } from 'lucide-react';

export default function RoleCard({ roleInfo = {}, roleLocaleInfo = {}, scores = {}, tagRecommend = [], suggestedARFC = '' }) {
    const cPrimary = roleInfo.colors?.[0] || '#2ae19e';
    const cSecondary = roleInfo.colors?.[1] || '#8b5cf6';
    const cHighlight = roleInfo.colors?.[2] || '#ffffff';

    return (
        <div className="w-[1080px] h-[1920px] p-6 bg-[#0f172a] relative overflow-hidden text-[#f8fafc]" style={{ fontFamily: 'inherit' }}>
            {/* 背景材質/漸層 */}
            <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(135deg, ${cPrimary}, ${cSecondary})` }}></div>

            {/* 卡牌主邊框（銀灰色帶金屬感） */}
            <div className="relative z-10 w-full h-full border-[20px] border-[#cbd5e1] rounded-[40px] p-10 flex flex-col bg-[#1e293b] shadow-2xl box-border" style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'}}>

                {/* 標題欄 (HP / Name) */}
                <div className="flex justify-between items-end pb-4 border-b-4 border-[#475569] mb-8">
                    <div className="flex flex-col">
                        <span className="text-3xl text-[#cbd5e1] font-bold tracking-widest mb-1">{roleLocaleInfo?.tag_name}</span>
                        <span className="text-6xl font-black text-[#f8fafc]">{roleLocaleInfo?.animal_name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-7xl font-black fancy-arfc" style={{ color: cPrimary, filter: 'drop-shadow(2px 4px 0px rgba(0,0,0,0.5))' }}>{convertARFCToFancyText(suggestedARFC)}</span>
                    </div>
                </div>

                {/* 圖片展示區 (Artwork) */}
                <div className="w-full h-[600px] rounded-t-lg rounded-b-3xl border-[12px] border-[#cbd5e1] bg-[#0f172a] relative flex items-center justify-center overflow-hidden shadow-inner mb-6" style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)' }}>
                    {/* 圖片背景漸層 */}
                    <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle, ${cHighlight} 0%, transparent 60%)` }}></div>
                    <div className="absolute inset-0 opacity-40" style={{ background: `linear-gradient(to bottom, ${cPrimary}, ${cSecondary})` }}></div>
                    <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPgk8L3N2Zz4=')`, backgroundSize: '16px 16px' }}></div>

                    {roleInfo.image ? (
                        <img src={`/role_images/${roleInfo.image}`} alt={roleLocaleInfo?.animal_name} style={{ width: 500, height: 500, objectFit: 'contain', filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.9))' }} className="relative z-10" />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: cPrimary, fontSize: '48px' }} className="text-[#0f172a] font-black">No Image</div>
                    )}
                </div>

                {/* 圖鑑說明 (Pokedex Entry / Short Description) */}
                <div className="bg-[#1e293b] border-2 border-[#475569] px-8 py-5 rounded-xl text-center italic text-[#f8fafc] text-3xl mb-10 shadow-md font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    "{roleLocaleInfo?.short}"
                </div>

                {/* 技能 / 特質區 (Attacks / Abilities) */}
                <div className="flex-1 flex flex-col gap-8">
                    {/* 第一招：Talent */}
                    <div className="flex items-center gap-6 border-b-2 border-[#334155] pb-6">
                        <div className="w-20 h-20 shrink-0 rounded-full flex items-center justify-center text-4xl border-4 border-[#f8fafc] shadow-lg" style={{ background: "var(--strength-dark)"  }}>
                                        <ThumbsUp size={28} color="var(--strength)" />
                                    </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-4xl font-bold text-[#f8fafc]">{roleLocaleInfo?.talent_title}</span>
                                <span className="text-2xl text-[#94a3b8] font-bold">{locale('ui.result.talent_title')}</span>
                            </div>
                            <div className="text-2xl text-[#cbd5e1] leading-relaxed mt-1">{roleLocaleInfo?.talent_desc}</div>
                        </div>
                    </div>

                    {/* 第二招：Pitfall */}
                    <div className="flex items-center gap-6 border-b-2 border-[#334155] pb-6">
                        <div className="w-20 h-20 shrink-0 rounded-full flex items-center justify-center text-4xl border-4 border-[#f8fafc] shadow-lg" style={{ background: "var(--weakness-dark)"  }}>
                                        <LucideFileExclamationPoint size={28} color="var(--weakness)" />
                                    </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-4xl font-bold text-[#f8fafc]">{roleLocaleInfo?.pitfall_title}</span>
                                <span className="text-2xl text-[#94a3b8] font-bold">{locale('ui.result.pitfall_title')}</span>
                            </div>
                            <div className="text-2xl text-[#cbd5e1] leading-relaxed mt-1">{roleLocaleInfo?.pitfall_desc}</div>
                        </div>
                    </div>
                </div>

                {/* 能力值 (Stats - TraitsBar) */}
                <div className="bg-[#0f172a] rounded-2xl p-8 border-4 border-[#334155] mb-8 mt-6 relative shadow-inner">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#1e293b] px-8 py-2 border-2 border-[#334155] rounded-full text-[#cbd5e1] text-2xl font-black tracking-widest flex items-center justify-center text-center" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{locale('ui.quiz.progress.title')}</div>
                    <div className="flex flex-col gap-6 mt-6">
                        {['A', 'R', 'F', 'C'].map((k) => {
                            const pd = getPercentData(scores?.[k] || 0, k);
                            const labelLeft = k === 'A' ? locale('ui.arfc.part.high_standards') : k === 'R' ? locale('ui.arfc.part.reserve_buffer') : k === 'F' ? locale('ui.arfc.part.facilitator') : locale('ui.arfc.part.direct_efficiency');
                            const labelRight = k === 'A' ? locale('ui.arfc.part.pass_oriented') : k === 'R' ? locale('ui.arfc.part.sprint_deadline') : k === 'F' ? locale('ui.arfc.part.backuper') : locale('ui.arfc.part.tactful_harmonious');
                            return (
                                <div key={k} className="flex items-center gap-6">
                                    <TraitBar
                                        isTightMode={true}
                                        labelLeft={labelLeft}
                                        labelRight={labelRight}
                                        dimTag={k}
                                        percentData={getPercentData(scores[k], k)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 卡牌底部 (Tags & Copyright) */}
                <div className="flex justify-between items-end mt-auto pt-4">
                    <div className="flex items-center gap-4 flex-wrap max-w-[85%]">
                        {tagRecommend.map((t) => (
                            <span key={t.tag} className="text-2xl px-5 py-2 font-bold rounded-full border-2 border-[#475569] bg-[#1e293b] text-[#f8fafc] shadow-md">
                                {convertTagToLocale(t.tag, t.score)}
                            </span>
                        ))}
                    </div>
                    <div className="text-right flex flex-col gap-1 items-end">
                        <div className="text-[#94a3b8] text-lg font-bold">ARFC ©{new Date().getFullYear()}</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
