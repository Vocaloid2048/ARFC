export default function TraitBar({ labelLeft, labelRight, dim, dimTag, glowColor, percentData }) {
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