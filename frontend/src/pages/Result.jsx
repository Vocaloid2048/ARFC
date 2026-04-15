import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Translation from '../assets/lang/zh_hk.json';
import RoleData from '../assets/role.json';
import { LucideFileExclamationPoint, ThumbsUp } from 'lucide-react';
import { arfcMap, convertARFCToLocale, convertTagToLocale } from '../utils/resultCalculation';

export default function Result() {
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const translation = Translation.ui;

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

    // Calculate percentage for sliders (-3 to +3 mapped to -100 to -50, 50 to 100)
    const getPercentData = (val, category) => {
        const v = Math.max(-1, Math.min(1, typeof val === 'number' ? val : 0));
        const isLeft = v <= 0;
        const strength = Math.abs(v);
        const score = Math.round(50 + strength * 50);
        const raw = isLeft ? 100 - score : score;
        const part = isLeft ? convertARFCToLocale(arfcMap[category]?.neg || "H") : convertARFCToLocale(arfcMap[category]?.pos || "P");
        return { raw, score, isLeft, part };
    };

    function shareResult(result) {
        /*
        我的 ARFC 是 PRBT，代表角色是卡皮巴拉！
        我具備驚人的抗壓性與包容力，能吸收團隊的負面情緒，在不帶任何壓力的情況下完成後勤工作。
        #慢工細活 #狂野派系 #計畫通

        以下是我的性格特質：
        - 60% 務實及格
        - 52% 預留緩衝
        - 58% 後勤執行
        - 52% 婉轉和諧

        既然都看到這邊了，來測！ 
        https://arfc.voc2048.com
        */

        // Generate shareable text based on result data
        const { suggestedARFC, bestARFCPart, tagRecommend } = result;
        const roleInfo = RoleData.find(r => r.tag === suggestedARFC) || {};
        const roleLocaleInfo = Translation.role.find(r => r.id === roleInfo.id);
        const translation = Translation.ui;
        
        const shareText = 
            `我的 ARFC 是 ${suggestedARFC}，代表角色是${roleLocaleInfo?.animal_name || '未知角色'}！\n` +
            `${roleLocaleInfo?.talent_desc || '我具備獨特的性格特質，能在團隊中發揮重要作用。'}\n` +
            `${tagRecommend.slice(0, 3).map(t => `#${convertTagToLocale(t.tag, t.score)}`).join(' ')}\n\n` +
            `以下是我的性格特質：\n` +
            `${translation.arfc_attitude_target}: ${getPercentData(scores.A, 'A').part} (${getPercentData(scores.A, 'A').score}%)\n` +
            `${translation.arfc_rythm_of_work}: ${getPercentData(scores.R, 'R').part} (${getPercentData(scores.R, 'R').score}%)\n` +
            `${translation.arfc_function}: ${getPercentData(scores.F, 'F').part} (${getPercentData(scores.F, 'F').score}%)\n` +
            `${translation.arfc_communication}: ${getPercentData(scores.C, 'C').part} (${getPercentData(scores.C, 'C').score}%)\n`+
            `\n` +
            `既然都看到這邊了，來測！ \nhttps://arfc.voc2048.com`;

        // Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('結果已複製到剪貼簿！快去分享給朋友吧！');
        }).catch(err => {
        });
    }

    const cPrimary = roleInfo.colors?.[0] || '#2ae19e';
    const cSecondary = roleInfo.colors?.[1] || '#8b5cf6';
    const cHighlight = roleInfo.colors?.[2] || '#ffffff';
    const cBgDeco = roleInfo.colors?.[3] || '#1a1a2e';
    const strengthColor = '#22c55e'; // green
    const weaknessColor = '#ef4444'; // red

    return (
        <div className="min-h-screen font-sans text-slate-200">
            <section
                className="relative w-full pt-32 pb-32 overflow-hidden"
            >
                {/* Organic Glowing Background Blobs using cBgDeco, cSecondary, cPrimary, cHighlight */}
                <div className="absolute top-0 right-0 -m-32 w-[600px] h-[600px] rounded-full opacity-30 mix-blend-screen filter blur-[100px] pointer-events-none" style={{ backgroundColor: cBgDeco }}></div>
                <div className="absolute bottom-10 left-10 -m-32 w-[500px] h-[500px] rounded-full opacity-30 mix-blend-screen filter blur-[100px] pointer-events-none" style={{ backgroundColor: cSecondary }}></div>

                {/* Extra decorative blobs */}
                <div className="absolute top-10 -left-20 w-[380px] h-[380px] rounded-full opacity-20 mix-blend-screen filter blur-[80px] pointer-events-none" style={{ backgroundColor: cPrimary }}></div>
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[260px] h-[260px] rounded-full opacity-25 mix-blend-screen filter blur-[60px] pointer-events-none" style={{ backgroundColor: cHighlight }}></div>
                <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full opacity-18 mix-blend-screen filter blur-[90px] pointer-events-none" style={{ backgroundColor: cPrimary }}></div>
                <div className="absolute top-28 right-44 w-[220px] h-[220px] rounded-full opacity-22 mix-blend-screen filter blur-[70px] pointer-events-none" style={{ backgroundColor: cSecondary }}></div>
                
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
                            <button onClick={() => navigate('/')} className="bg-[var(--color-C-dark)] text-white font-bold py-4 px-10 rounded-full hover:bg-[var(--color-C-dark)]/50 transition-all border border-white/10 backdrop-blur-sm tracking-widest text-sm"
                                style={{ boxShadow: `0 0 8px ${cBgDeco}25` }}>
                                重新測試
                            </button>
                            <button onClick={() => shareResult(result)} className="bg-[var(--color-F-dark)] text-white font-bold py-4 px-10 rounded-full hover:bg-[var(--color-F-dark)]/50 transition-all border border-white/10 backdrop-blur-sm tracking-widest text-sm"
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
                                        <button
                                            className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-F-dark)] text-white rounded-full font-bold border border-white/10 cursor-pointer hover:bg-[var(--color-F-dark)]/50 transition-all"
                                            onClick={() => shareResult(result)}
                                        >
                                            分享結果
                                        </button>

                                        <button
                                            disabled
                                            className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-A-dark)] text-white rounded-full font-bold opacity-80 cursor-not-allowed border border-white/10 hover:bg-[var(--color-A-dark)]/50"
                                        >
                                            下載角色卡
                                        </button>
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