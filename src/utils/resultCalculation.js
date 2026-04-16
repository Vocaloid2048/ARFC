import questionsMeta from '../assets/data/question_data.json';
import Translation from "../assets/lang/zh_hk.json";

export const arfcMap = {
    A: { pos: 'P', neg: 'H' },
    R: { pos: 'S', neg: 'R' },
    F: { pos: 'B', neg: 'L' },
    C: { pos: 'T', neg: 'D' }
};

export function calculateResult(answers) {
    // Initialize scores for each dimension
    const scores = {
        A: 0.0, // Attitude
        R: 0.0, // Rhythm
        F: 0.0, // Focus
        C: 0.0  // Communication
    };

    // Initialize tag weights for tag recommendation
    const tagWeights = {
        night: 0,
        format: 0,
        altruist: 0,
        calm: 0,
        idea: 0,
        buffer: 0,
        observer: 0,
        efficiency: 0,
        emotional: 0,
        introvert: 0
    };

    const counts = { A: 0, R: 0, F: 0, C: 0 };

    // iterate through question metadata and aggregate
    for (const q of questionsMeta) {
        const qid = q.id;
        const ans = answers[qid];
        if (ans === undefined || ans === null) continue; // skip unanswered

        // accumulate category score
        const cat = q.category;
        if (scores[cat] !== undefined) {
            scores[cat] += q.isLeft ? -ans : ans;
            counts[cat] += 1;
        }

        // accumulate tag-based role weights
        const wobj = q.weight || {};
        for (const tag in wobj) {
            if (!Object.prototype.hasOwnProperty.call(wobj, tag)) continue;
            const w = wobj[tag] || 0;
            // contribution: user's answer * question's tag weight
            tagWeights[tag] = (tagWeights[tag] || 0) + (ans * w);
        }
    }


    // Normalize category scores to average (so different counts don't skew)
    for (const k of Object.keys(scores)) {
        if (counts[k] > 0) scores[k] = +(scores[k] / counts[k] / 3).toFixed(3);
        else scores[k] = 0;
    }

    const suggestedARFC = (() => {
        const order = ['A', 'R', 'F', 'C'];
        return order.map(k => (scores[k] > 0 ? arfcMap[k].pos : arfcMap[k].neg)).join('');
    })();

    const bestARFCPart = { "dimension": "", "part": "", "percentage": 0 };
    // Determine which dimension has the highest absolute score and its corresponding part
    let maxAbsScore = -1;
    for (const k of Object.keys(scores)) {
        const absScore = Math.abs(scores[k]);
        if (absScore > maxAbsScore) {
            maxAbsScore = absScore;
            bestARFCPart.dimension = k;
            bestARFCPart.part = scores[k] > 0 ? arfcMap[k].pos : arfcMap[k].neg;
            bestARFCPart.percentage = Math.abs(scores[k]);
        }
    }


    // Prepare recommended roles: sort tags by absolute value descending (strength)
    const tagRecommend = Object.entries(tagWeights)
        .map(([tag, val]) => ({ tag, score: +val.toFixed(3) }))
        .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
        .slice(0, 3);

    return { scores, tagWeights, tagRecommend, suggestedARFC, bestARFCPart };
}
export function convertARFCToLocale(arfcCode) {
    const translation = Translation.ui;
    switch (arfcCode) {
        case "H":
            return translation.arfc_high_standards;
        case "P":
            return translation.arfc_pass_oriented;
        case "R":
            return translation.arfc_reserve_buffer;
        case "S":
            return translation.arfc_sprint_deadline;
        case "L":
            return translation.arfc_facilitator;
        case "B":
            return translation.arfc_backuper;
        case "D":
            return translation.arfc_direct_efficiency;
        case "T":
            return translation.arfc_tactful_harmonious;
        default:
            return arfcCode;
    }
}

export function convertTagToLocale(tag, score = 0) {
    const translation = Translation.ui;

    const suffix = (typeof score === 'number' ? score : Number(score)) >= 0 ? 'pos' : 'neg';

    const key = `arfc_tag_${tag}_${suffix}`;
    if (translation[key]) return translation[key];

    // fallback: try generic pattern
    const genericKey = `arfc_${tag}_${suffix}`;
    if (translation[genericKey]) return translation[genericKey];

    // last resort: return tag (or include sign)
    return tag;
}

export function shareResult(result, roleInfo, roleLocaleInfo) {
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
    const translation = Translation.ui;

    const shareText =
        `我的 ARFC 是 *${suggestedARFC}*，是一名${roleLocaleInfo?.tagName}\n`+
        `代表角色是${roleLocaleInfo?.animal_name || '未知角色'}！\n` +
        `${roleLocaleInfo?.talent_desc || '我具備獨特的性格特質，能在團隊中發揮重要作用。'}\n` +
        `${tagRecommend.slice(0, 3).map(t => `#${convertTagToLocale(t.tag, t.score)}`).join(' ')}\n\n` +
        `以下是我的性格特質：\n` +
        `${translation.arfc_attitude_target}: ${getPercentData(scores.A, 'A').part} (${getPercentData(scores.A, 'A').score}%)\n` +
        `${translation.arfc_rythm_of_work}: ${getPercentData(scores.R, 'R').part} (${getPercentData(scores.R, 'R').score}%)\n` +
        `${translation.arfc_function}: ${getPercentData(scores.F, 'F').part} (${getPercentData(scores.F, 'F').score}%)\n` +
        `${translation.arfc_communication}: ${getPercentData(scores.C, 'C').part} (${getPercentData(scores.C, 'C').score}%)\n` +
        `\n` +
        `既然都看到這邊了，來測！ \nhttps://arfc.voc2048.com`;

    // Copy to clipboard
    navigator.clipboard.writeText(shareText).then(() => {
        alert('結果已複製到剪貼簿！快去分享給朋友吧！');
    }).catch(err => {
    });
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