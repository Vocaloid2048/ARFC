import questionsMeta from '../assets/question/weights.json';

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

    // Derive a 4-letter code from A,R,F,C sign (positive -> one letter, negative/zero -> alternative)
    // Mapping can be adjusted; current letters chosen as placeholders matching earlier examples:
    // A: negative -> 'H', positive -> 'P'
    // R: negative -> 'R', positive -> 'S'
    // F: negative -> 'L', positive -> 'B'
    // C: negative -> 'D', positive -> 'T'
    // Example: all negative => 'HRLD', all positive => 'PSBT'
    const suggestedARFC = (() => {
        const map = {
            A: { pos: 'P', neg: 'H' },
            R: { pos: 'S', neg: 'R' },
            F: { pos: 'B', neg: 'L' },
            C: { pos: 'T', neg: 'D' }
        };
        const order = ['A', 'R', 'F', 'C'];
        return order.map(k => (scores[k] > 0 ? map[k].pos : map[k].neg)).join('');
    })();
    
    const bestARFCPart = {"dimension": "", "part": ""};
    // Determine which dimension has the highest absolute score and its corresponding part
    let maxAbsScore = -1;
    for (const k of Object.keys(scores)) {
        const absScore = Math.abs(scores[k]);
        if (absScore > maxAbsScore) {
            maxAbsScore = absScore;
            bestARFCPart.dimension = k;
            bestARFCPart.part = scores[k] > 0 ? 'positive' : 'negative';
        }
    }


    // Prepare recommended roles: sort tags by absolute value descending (strength)
    const tagRecommend = Object.entries(tagWeights)
        .map(([tag, val]) => ({ tag, score: +val.toFixed(3) }))
        .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
        .slice(0, 3);

    return { scores, tagWeights, tagRecommend, suggestedARFC, bestARFCPart};
}