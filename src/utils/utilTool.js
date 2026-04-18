import { arfcMap } from './resultCalcuation';
import zh_tw from '../assets/lang/zh_tw.json';
import zh_hk from '../assets/lang/zh_hk.json';
import zh_cn from '../assets/lang/zh_cn.json';
import en_us from '../assets/lang/en_us.json';

const LANGS = {
    zh_tw,
    zh_hk,
    zh_cn,
    en_us
};

export function tintColor(hex, tint = "#ffffff", rate = 0.2) {
    // hex: base color like '#RRGGBB' (also supports '#RGB')
    // tint: tint color like '#RRGGBB' (defaults to white)
    // amount: how much tint to apply (0..1). If tint is provided as third arg (number), support both signatures.
    // Usage: tintColor('#aa0000') -> slightly tinted towards white
    //        tintColor('#aa0000', '#ffffff', 0.25)
    let amount = rate;
    let tintHex = tint;

    if (typeof tint === 'string') {
        tintHex = tint || tintHex;
        // if a third numeric argument was passed via arguments[2]
        if (typeof arguments[2] === 'number') amount = Math.max(0, Math.min(1, arguments[2]));
    } else if (typeof tint === 'number') {
        amount = Math.max(0, Math.min(1, tint));
    }

    function normalize(h) {
        if (!h) return '#000000';
        h = h.trim();
        if (h[0] === '#') h = h.slice(1);
        if (h.length === 3) {
            return h.split('').map(c => c + c).join('');
        }
        return h.padStart(6, '0').slice(0, 6);
    }

    function clamp(n) { return Math.max(0, Math.min(255, Math.round(n))); }

    const base = normalize(hex);
    const tintN = normalize(tintHex);

    const r1 = parseInt(base.slice(0, 2), 16);
    const g1 = parseInt(base.slice(2, 4), 16);
    const b1 = parseInt(base.slice(4, 6), 16);

    const r2 = parseInt(tintN.slice(0, 2), 16);
    const g2 = parseInt(tintN.slice(2, 4), 16);
    const b2 = parseInt(tintN.slice(4, 6), 16);

    const r = clamp(r1 * (1 - amount) + r2 * amount);
    const g = clamp(g1 * (1 - amount) + g2 * amount);
    const b = clamp(b1 * (1 - amount) + b2 * amount);

    const toHex = (n) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
export function convertARFCToFancyText(arfcCode) {
    // 使用 [...] 將字串轉為陣列，這樣每個花體字都會被視為一個完整的元素
    const abcd = [..."𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵"];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return arfcCode.split('').map(c => {
        const idx = alphabet.indexOf(c);
        // 如果找到了，從陣列中取出完整的字元；否則回傳原字元
        return idx >= 0 ? abcd[idx] : c;
    }).join('');
}

export const AVAILABLE_LANGS = {
    zh_tw: '繁體中文',
    zh_hk: '粵語',
    zh_cn: '简体中文',
    en_us: 'English (US)'
};

export function locale(key, lang) {
    const useLang = lang || getCurrentLang();
    const langData = LANGS[useLang] || zh_tw;
    return langData[key] || key;
}

export function getCurrentLang() {
    try {
        const stored = localStorage.getItem('lang_code');
        if (stored && LANGS[stored]) {
            return stored;
        }

        // According to navigator.language or navigator.userLanguage, detect user's device preferred language
        const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        let detectedLang = 'zh_tw'; // 預設語言

        if (navLang.includes('zh-tw')) {
            detectedLang = 'zh_tw';
        } else if (navLang.includes('zh-hk')) {
            detectedLang = 'zh_hk';
        } else if (navLang.includes('zh-cn')) {
            detectedLang = 'zh_cn';
        } else if (navLang.startsWith('en')) {
            detectedLang = 'en_us';
        }

        // Use setTimeout to defer the setting of localStorage and event dispatching.
        setTimeout(() => { setCurrentLang(detectedLang); }, 0);

        return detectedLang;
    } catch (e) {
        return 'zh_tw';
    }
}

export function setCurrentLang(langCode) {
    if (!LANGS[langCode]) return;
    try { localStorage.setItem('lang_code', langCode); } catch (e) { }
    try { window.dispatchEvent(new CustomEvent('arfc_lang_changed', { detail: langCode })); } catch (e) { }
    try { window.location.reload(); } catch (e) { }
}


export function convertARFCToLocale(arfcCode) {
    switch (arfcCode) {
        case "H":
            return locale("ui.arfc.part.high_standards");
        case "P":
            return locale("ui.arfc.part.pass_oriented");
        case "R":
            return locale("ui.arfc.part.reserve_buffer");
        case "S":
            return locale("ui.arfc.part.sprint_deadline");
        case "L":
            return locale("ui.arfc.part.facilitator");
        case "B":
            return locale("ui.arfc.part.backuper");
        case "D":
            return locale("ui.arfc.part.direct_efficiency");
        case "T":
            return locale("ui.arfc.part.tactful_harmonious");
        default:
            return arfcCode;
    }
}

export function convertTagToLocale(tag, score = 0) {
    const suffix = (typeof score === 'number' ? score : Number(score)) >= 0 ? 'pos' : 'neg';
    const key = `ui.tag.${tag}.${suffix}`;
    return locale(key);
}

export async function shareResult(result, roleInfo, roleLocaleInfo, fileToShare) {
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
    const { suggestedARFC, bestARFCPart, tagRecommend, scores } = result;

    const shareText = locale("ui.result.share_text")
        .replace('%1', `**${suggestedARFC}**`)
        .replace('%2', `${locale("role." + roleInfo?.animal + ".animal_name")}`)
        .replace('%3', roleLocaleInfo?.talent_desc || '')
        .replace('%4', tagRecommend.slice(0, 3).map(t => `#${convertTagToLocale(t.tag, t.score)}`).join(' '))
        .replace('%5', `${locale("ui.arfc.category.attitude_target.title")}: ${getPercentData(scores.A, 'A').part} (${getPercentData(scores.A, 'A').score}%)\n` +
            `${locale("ui.arfc.category.rythm_of_work.title")}: ${getPercentData(scores.R, 'R').part} (${getPercentData(scores.R, 'R').score}%)\n` +
            `${locale("ui.arfc.category.function.title")}: ${getPercentData(scores.F, 'F').part} (${getPercentData(scores.F, 'F').score}%)\n` +
            `${locale("ui.arfc.category.communication.title")}: ${getPercentData(scores.C, 'C').part} (${getPercentData(scores.C, 'C').score}%)\n`
        ) + `https://arfc.voc2048.com`;

    // Copy to clipboard

    const shareData = {
        title: locale("ui.result.title"),
        text: shareText,
        url: 'https://arfc.voc2048.com',
        files: fileToShare ? [fileToShare] : undefined
    }

    const isWindows = navigator.platform.toLowerCase().includes('win');
    

    if (navigator.canShare && navigator.canShare(shareData) && !isWindows) {
        return navigator.share(shareData).then(() => {
            alert(locale("ui.result.share_success"));
        }).catch(() => {
            alert(locale("ui.result.share_fail"));
        });
    } else if (navigator.clipboard && window.isSecureContext) {
        return await navigator.clipboard.writeText(shareData.text).then(() => {
            alert(locale("ui.result.share_success"));
        }).catch(() => {
            alert(locale("ui.result.share_fail"));
        });
    } else {
        return new Promise((resolve, reject) => {
            const textArea = document.createElement("textarea");
            textArea.value = shareText;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                resolve();
            } catch (error) {
                reject(error);
            } finally {
                textArea.remove();
            }
        });
    }
}



export const getPercentData = (val, category) => {
    const v = Math.max(-1, Math.min(1, typeof val === 'number' ? val : 0));
    const isLeft = v <= 0;
    const strength = Math.abs(v);
    const score = Math.round(50 + strength * 50);
    const raw = isLeft ? 100 - score : score;
    const part = isLeft ? convertARFCToLocale(arfcMap[category]?.neg || "H") : convertARFCToLocale(arfcMap[category]?.pos || "P");
    return { raw, score, isLeft, part };
};