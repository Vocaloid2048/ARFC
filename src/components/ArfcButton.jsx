export default function ArfcButton({ bgColor, hoverColor, text, onClick, style, disabled, className }) {
    return (
        <button
            className={`inline-flex items-center justify-center px-6 py-3 text-white rounded-full font-bold cursor-pointer transition-all ${className || ''}`}
            style={{ backgroundColor: bgColor, ...style }}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}