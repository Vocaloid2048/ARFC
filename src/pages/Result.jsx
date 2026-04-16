import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Translation from '../assets/lang/zh_hk.json';
import RoleData from '../assets/data/role_data.json';
import { LucideFileExclamationPoint, ThumbsUp } from 'lucide-react';
import ArfcButton from '../components/ArfcButton';
import { convertARFCToLocale, convertTagToLocale, getPercentData, shareResult } from '../utils/resultCalculation';
import ArfcDescBox from '../components/ArfcDescBox';

export default function Result() {
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const translation = Translation.ui;

    // Ensure page is at top when Result mounts
    useEffect(() => {
        try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); } catch (e) { /* ignore */ }
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem('arfc_result');
        if (saved) {
            setResult(JSON.parse(saved));
        } else {
            // Mock data for testing if visited directly or refreshing
            setResult({
                "scores": { "A": -0.361, "R": 0.033, "F": -0.2, "C": -0.273 },
                "tagWeights": { "night": 4, "format": -12, "altruist": 2, "calm": -22, "idea": -3, "buffer": -9, "observer": 6, "efficiency": 1, "emotional": -5, "introvert": -11 },
                "tagRecommend": [{ "tag": "calm", "score": -22 }, { "tag": "format", "score": -12 }, { "tag": "introvert", "score": -11 }],
                "suggestedARFC": "PRBT",
                "bestARFCPart": { "part": "H", "dimension": "A", "percentage": 0.361 * 0.5 + 0.5 },
            },);
        }
    }, []);

    if (!result) return <div className="min-h-screen flex justify-center items-center text-white">載入中...</div>;

    const { scores, suggestedARFC, bestARFCPart } = result;
    const tagRecommend = result.tagRecommend || [];
    const roleInfo = RoleData.find(r => r.tag === suggestedARFC) || {};
    const roleLocaleInfo = Translation.role.find(r => r.id === roleInfo.id);

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
                            你的 ARFC 定位是...
                        </p>
                        <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter text-white drop-shadow-md">
                            {roleLocaleInfo?.tagName}
                        </h1>
                        {/* tagName badge (主顯示) */}
                        <div className="flex items-center gap-3 mb-4">
                            <span
                                className="text-2xl px-3 py-1 text-white font-semibold uppercase tracking-wider"
                                aria-hidden="false"
                            >
                            代表角色：{roleLocaleInfo?.animal_name || '未知角色'}
                            </span>
                        </div>
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
                            <ArfcButton
                                onClick={() => navigate('/')}
                                text="重新測試"
                                bgColor="var(--color-C-dark)"
                                className="py-4 px-10 tracking-widest text-sm backdrop-blur-sm"
                                style={{ boxShadow: `0 0 8px ${cBgDeco}25` }}
                            />
                            <ArfcButton
                                onClick={() => shareResult(result, roleInfo, roleLocaleInfo)}
                                text="分享結果"
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
                            角色定位解讀
                        </h3>
                        <p className="text-2xl font-black text-white leading-snug relative z-10">
                            <span style={{ color: "#FFFFFF"}}>{roleLocaleInfo?.desc}</span>
                        </p>

                    </div>
                </div>

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
                                labelLeft={translation.arfc_high_standards}
                                labelRight={translation.arfc_pass_oriented}
                                dim={translation.arfc_attitude_target}
                                dimTag="A"
                                glowColor={roleInfo.colors?.[2] || cHighlight}
                                percentData={getPercentData(scores.A, 'A')}
                            />
                            <TraitBar
                                labelLeft={translation.arfc_reserve_buffer}
                                labelRight={translation.arfc_sprint_deadline}
                                dim={translation.arfc_rythm_of_work}
                                dimTag="R"
                                glowColor={roleInfo.colors?.[2] || cHighlight}
                                percentData={getPercentData(scores.R, 'R')}
                            />
                            <TraitBar
                                labelLeft={translation.arfc_facilitator}
                                labelRight={translation.arfc_backuper}
                                dim={translation.arfc_function}
                                dimTag="F"
                                glowColor={roleInfo.colors?.[2] || cHighlight}
                                percentData={getPercentData(scores.F, 'F')}
                            />
                            <TraitBar
                                labelLeft={translation.arfc_direct_efficiency}
                                labelRight={translation.arfc_tactful_harmonious}
                                dim={translation.arfc_communication}
                                dimTag="C"
                                glowColor={roleInfo.colors?.[2] || cHighlight}
                                percentData={getPercentData(scores.C, 'C')}
                            />
                        </div>

                        {/* Prominent Dimension Highlight */}
                        <div className="lg:w-1/3 flex flex-col justify-center">
                            <div className="p-6 rounded-3xl relative overflow-hidden backdrop-blur-md" style={{ backgroundColor: `${cBgDeco}40`, border: `1px solid ${cPrimary}30` }}>
                                <div className="absolute -right-4 -top-4 w-40 h-40 rounded-full filter blur-[60px] opacity-40 pointer-events-none" style={{ backgroundColor: cPrimary }}></div>
                                <h3 className="text-sm font-bold tracking-[0.2em] text-slate-400 mb-4 uppercase">最突出的特質</h3>
                                <p className="text-4xl font-black text-white leading-snug relative z-10">
                                    <span style={{ color: cHighlight, textShadow: `0 0 10px ${cHighlight}80` }}>{convertARFCToLocale(bestARFCPart?.part || "均衡表現")} ({bestARFCPart?.percentage ? (bestARFCPart.percentage * 50 + 50).toFixed(0) + '%' : "均衡表現"})</span>
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
                                            text="分享結果"
                                            bgColor="var(--color-F-dark)"
                                            className="px-6 py-3"
                                            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                                        />

                                        <ArfcButton
                                            disabled
                                            text="下載角色卡"
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

                                    title={talentTitle || '優勢天賦'}
                                    description={talentDesc || '暫無優勢描述'}
                                />

                                {/* Weaknesses box */}
                                <ArfcDescBox
                                    icon={<LucideFileExclamationPoint size={24} />}
                                    highlightColor={"var(--weakness)"}
                                    darkColor={"var(--weakness-dark)"}
                                    title={pitfallTitle || '發展盲區'}
                                    description={pitfallDesc || '暫無盲區描述'}
                                />
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
    const { raw, score, isLeft } = percentData;
    const dominantLabel = isLeft ? labelLeft : labelRight;
    const trackColor = `var(--color-${dimTag})`;

    return (
        <div className="w-full relative mt-8 mb-6">
            {/* Floating Label (Percentage + Dominant Trait) */}
            <div
                className="absolute -top-8 text-base font-bold transition-all duration-1000 ease-out whitespace-nowrap z-10"
                style={{
                    left: `${raw}%`,
                    transform: 'translateX(-50%)',
                    color: trackColor,
                    textShadow: `0 0 10px ${trackColor}40`
                }}
            >
                {score}% {dominantLabel}
            </div>

            {/* Track (Solid Color) */}
            <div
                className="relative w-full h-3 rounded-full mb-3"
                style={{ backgroundColor: trackColor }}
                role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={raw} aria-label={dim}
            >
                {/* Thumb indicator on the track */}
                <div
                    className="absolute top-1/2 w-5 h-5 rounded-full bg-[#000000]/30 transition-all duration-1000 ease-out"
                    style={{
                        border: `4px solid white`,
                        left: `${raw}%`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: `0 0 8px rgba(0,0,0,0.5)`
                    }}
                >
                    <span className="sr-only">{score}% {dominantLabel}</span>
                </div>
            </div>

            {/* Bottom Labels for ends of axis (larger for emphasis) */}
            <div className="flex justify-between text-base md:text-lg font-semibold text-slate-400">
                <span className={`${isLeft ? 'text-slate-200 font-bold' : ''}`}>{labelLeft}</span>
                <span className={`${!isLeft ? 'text-slate-200 font-bold' : ''}`}>{labelRight}</span>
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