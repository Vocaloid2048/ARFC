export default function ArfcReason({ title, reason, index }) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-slate-200">
              <span className="font-bold text-lg">{index}</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-100 mb-2">{title}</h4>
              <p className="text-slate-300 leading-relaxed">
                {reason}
              </p>
            </div>
          </div>
    )
}