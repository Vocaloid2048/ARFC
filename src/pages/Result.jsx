import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleData from '../assets/data/role_data.json';
import { LucideFileExclamationPoint, ThumbsUp } from 'lucide-react';
import ArfcButton from '../components/ArfcButton';
import { convertARFCToLocale, convertTagToLocale, getPercentData, shareResult, locale } from '../utils/UtilTools';
import ArfcDescBox from '../components/ArfcDescBox';
import TraitBar from '../components/TraitBar';

export default function Result() {
    
    const navigate = useNavigate();
    const [result, setResult] = useState(null);

    // Ensure page is at top when Result mounts
    useEffect(() => {
        try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); } catch (e) { /* ignore */ }
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem('arfc_result');
        console.log('Fetched saved result from localStorage:', saved);
        if (saved) {
            setResult(JSON.parse(saved));
        } else {
            navigate('/quiz');
        }
    }, []);

    console.log('Result data:', result);

    if (!result) return <div className="min-h-screen flex justify-center items-center text-white">載入中...</div>;

    const { scores, suggestedARFC, bestARFCPart } = result;
    const tagRecommend = result.tagRecommend || [];
    const roleInfo = RoleData.find(r => r.tag === suggestedARFC) || {};
    const roleLocaleInfo = {
        animal_name: locale(`role.${roleInfo.animal}.animal_name`),
        desc: locale(`role.${roleInfo.animal}.desc`),
        short: locale(`role.${roleInfo.animal}.short`),
        self_intro: locale(`role.${roleInfo.animal}.self_intro`),
        talent_title: locale(`role.${roleInfo.animal}.talent_title`),
        talent_desc: locale(`role.${roleInfo.animal}.talent_desc`),
        pitfall_title: locale(`role.${roleInfo.animal}.pitfall_title`),
        pitfall_desc: locale(`role.${roleInfo.animal}.pitfall_desc`),
        tag_name: locale(`role.${roleInfo.animal}.tag.name`),
    }

    const cPrimary = roleInfo.colors?.[0] || '#2ae19e';
    const cSecondary = roleInfo.colors?.[1] || '#8b5cf6';
    const cHighlight = roleInfo.colors?.[2] || '#ffffff';
    const cBgDeco = roleInfo.colors?.[3] || '#1a1a2e';

    return (
        <div className="min-h-screen font-sans text-slate-200">
            <section
                className="relative w-full pt-32 pb-12 overflow-hidden"
            >
                {/* Organic Glowing Background Blobs using cBgDeco, cSecondary, cPrimary, cHighlight */}
                <div className="absolute top-0 right-0 -m-32 w-[600px] h-[600px] rounded-full opacity-30 mix-blend-screen filter blur-[100px] pointer-events-none" style={{ backgroundColor: cBgDeco }}></div>
                <div className="absolute bottom-10 left-10 -m-32 w-[500px] h-[500px] rounded-full opacity-30 mix-blend-screen filter blur-[100px] pointer-events-none" style={{ backgroundColor: cSecondary }}></div>

                {/* Extra decorative blobs */}
                <div className="absolute top-10 -left-20 w-[380px] h-[380px] rounded-full opacity-20 mix-blend-screen filter blur-[80px] pointer-events-none" style={{ backgroundColor: cPrimary }}></div>
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[260px] h-[260px] rounded-full opacity-25 mix-blend-screen filter blur-[60px] pointer-events-none" style={{ backgroundColor: cHighlight }}></div>
                <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full opacity-18 mix-blend-screen filter blur-[90px] pointer-events-none" style={{ backgroundColor: cPrimary }}></div>
                <div className="absolute top-28 right-44 w-[220px] h-[220px] rounded-full opacity-22 mix-blend-screen filter blur-[70px] pointer-events-none" style={{ backgroundColor: cSecondary }}></div>
                
                <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col-reverse md:flex-row items-center gap-8">

                    {/* Left Text Content */}
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                        <p className="text-m font-bold tracking-[0.3em] uppercase mb-4" style={{ color: cHighlight }}>
                            {locale('ui.result.title')}
                        </p>
                        <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter text-white drop-shadow-md">
                            {roleLocaleInfo?.tag_name}
                        </h1>
                        {/* tagName badge (主顯示) */}
                        <div className="flex items-center gap-3 mb-4">
                            <span
                                className="text-2xl px-3 py-1 text-white font-semibold uppercase tracking-wider"
                                aria-hidden="false"
                            >
                            {locale('ui.result.role').replace('%1', roleLocaleInfo?.animal_name || locale('ui.result.undefined'))}
                            </span>
                        </div>
                        <div
                            className="inline-block text-slate-900 text-xl md:text-2xl textauto font-black tracking-[0.2em] px-8 py-2 rounded-full mb-8 shadow-lg"
                            style={{ backgroundColor: cPrimary, boxShadow: `0 0 20px ${cPrimary}40` }}
                        >
                            {suggestedARFC}
                        </div>

                        <p className="text-xl md:text-2xl font-medium text-slate-300 italic border-l-4 pl-6 mb-12 py-2" style={{ borderColor: cHighlight }}>
                            "{roleLocaleInfo?.short || locale('ui.result.undefined')}"
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 w-full">
                            <ArfcButton
                                onClick={() => navigate('/')}
                                text={locale('ui.result.retest_button')}
                                bgColor="var(--color-C-dark)"
                                className="py-4 px-10 tracking-widest text-sm backdrop-blur-sm"
                                style={{ boxShadow: `0 0 8px ${cBgDeco}25` }}
                            />
                            <ArfcButton
                                onClick={() => shareResult(result, roleInfo, roleLocaleInfo)}
                                text={locale('ui.result.share_button')}
                                bgColor="var(--color-F-dark)"
                                className="py-4 px-10 tracking-widest text-sm backdrop-blur-sm"
                                style={{ boxShadow: `0 0 8px ${cBgDeco}25` }}
                            />
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
            <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16">
                {/* Role Description */}
                <div className="flex flex-col justify-center">
                    <div className="p-6 rounded-3xl relative overflow-hidden backdrop-blur-md" style={{ backgroundColor: `${cBgDeco}40`, border: `1px solid ${cPrimary}30` }}>
                        <div className="absolute -right-4 -top-4 w-40 h-40 rounded-full filter blur-[60px] opacity-40 pointer-events-none" style={{ backgroundColor: cPrimary }}></div>
                        <h3 className="text-lg font-bold tracking-[0.2em] text-slate-400 mb-4 uppercase" style={{ color: cHighlight }}>
                            {locale("ui.result.desc")}
                        </h3>
                        <p className="text-2xl font-black text-white leading-snug relative z-10">
                            <span style={{ color: "#FFFFFF"}}>{roleLocaleInfo?.desc || locale('ui.result.undefined')}</span>
                        </p>

                    </div>
                </div>

                {/* Traits Section */}
                <section>
                    <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">{locale('ui.result.traits_title')}</h2>
                        <div className="w-24 h-1.5 rounded-full shadow-lg" style={{ backgroundColor: cPrimary, boxShadow: `0 0 15px ${cPrimary}80` }}></div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                        {/* Dimension Bars */}
                        <div className="flex-1 flex flex-col gap-12">
                            <TraitBar
                                labelLeft={locale('ui.arfc.part.high_standards')}
                                labelRight={locale('ui.arfc.part.pass_oriented')}
                                dim={locale('ui.arfc.dim.attitude_target')}
                                dimTag="A"
                                glowColor={roleInfo.colors?.[2] || cHighlight}
                                percentData={getPercentData(scores.A, 'A')}
                            />
                            <TraitBar
                                labelLeft={locale('ui.arfc.part.reserve_buffer')}
                                labelRight={locale('ui.arfc.part.sprint_deadline')}
                                dim={locale('ui.arfc.dim.rythm_of_work')}
                                dimTag="R"
                                glowColor={roleInfo.colors?.[2] || cHighlight}
                                percentData={getPercentData(scores.R, 'R')}
                            />
                            <TraitBar
                                labelLeft={locale('ui.arfc.part.facilitator')}
                                labelRight={locale('ui.arfc.part.backuper')}
                                dim={locale('ui.arfc.dim.function')}
                                dimTag="F"
                                glowColor={roleInfo.colors?.[2] || cHighlight}
                                percentData={getPercentData(scores.F, 'F')}
                            />
                            <TraitBar
                                labelLeft={locale('ui.arfc.part.direct_efficiency')}
                                labelRight={locale('ui.arfc.part.tactful_harmonious')}
                                dim={locale('ui.arfc.dim.communication')}
                                dimTag="C"
                                glowColor={roleInfo.colors?.[2] || cHighlight}
                                percentData={getPercentData(scores.C, 'C')}
                            />
                        </div>

                        {/* Prominent Dimension Highlight */}
                        <div className="lg:w-1/3 flex flex-col justify-center">
                            <div className="p-6 rounded-3xl relative overflow-hidden backdrop-blur-md" style={{ backgroundColor: `${cBgDeco}40`, border: `1px solid ${cPrimary}30` }}>
                                <div className="absolute -right-4 -top-4 w-40 h-40 rounded-full filter blur-[60px] opacity-40 pointer-events-none" style={{ backgroundColor: cPrimary }}></div>
                                <h3 className="text-sm font-bold tracking-[0.2em] text-slate-400 mb-4 uppercase">{locale('ui.result.best_category')}</h3>
                                <p className="text-4xl font-black text-white leading-snug relative z-10">
                                    <span style={{ color: cHighlight, textShadow: `0 0 10px ${cHighlight}80` }}>{convertARFCToLocale(bestARFCPart?.part || locale('ui.result.undefined'))} ({bestARFCPart?.percentage ? (bestARFCPart.percentage * 50 + 50).toFixed(0) + '%' : locale('ui.result.undefined')})</span>
                                </p>

                                {/* 推薦標籤（展示前三個） */}
                                <div className="mt-6 relative z-10">
                                    <div className="flex flex-wrap gap-3">
                                        {tagRecommend.slice(0, 3).map((t, idx) => (
                                            <span key={t.tag + idx} className="px-3 py-2 rounded-full bg-white/6 text-white font-bold flex items-center gap-2">
                                                <span className="uppercase tracking-wider">{convertTagToLocale(t.tag, t.score)}</span>
                                            </span>
                                        ))}
                                    </div>

                                    {/* 分享與下載按鈕 */}
                                    <div className="mt-6 flex flex-col gap-4">
                                        <ArfcButton
                                            onClick={() => shareResult(result, roleInfo, roleLocaleInfo)}
                                            text={locale('ui.result.share_button')}
                                            bgColor="var(--color-F-dark)"
                                            className="px-6 py-3"
                                            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                                        />

                                        <ArfcButton
                                            disabled
                                            text={locale('ui.result.download_card_button')}
                                            bgColor="var(--color-A-dark)"
                                            className="px-6 py-3 opacity-80"
                                            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                                        />
                                    </div>

                                </div>

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
                                <ArfcDescBox 
                                    icon={<ThumbsUp size={24} />}
                                    highlightColor={"var(--strength)"}
                                    darkColor={"var(--strength-dark)"}

                                    title={talentTitle || locale('ui.result.talent_title')}
                                    description={talentDesc || locale('ui.result.talent_desc')}
                                />

                                {/* Weaknesses box */}
                                <ArfcDescBox
                                    icon={<LucideFileExclamationPoint size={24} />}
                                    highlightColor={"var(--weakness)"}
                                    darkColor={"var(--weakness-dark)"}
                                    title={pitfallTitle || locale('ui.result.pitfall_title')}
                                    description={pitfallDesc || locale('ui.result.pitfall_desc')}
                                />
                            </div>
                        );
                    })()}
                </section>

            </main>
        </div>
    );
}