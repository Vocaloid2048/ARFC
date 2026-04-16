import { locale } from "../utils/utilTool";

export default function Footer() {
    return (
        <footer className="mt-4 text-center text-gray-600 text-sm border-t border-gray-800/50 pt-4 pb-4">
            <p className="font-medium text-gray-500 mb-2 cursor-pointer" onClick={() => window.open("https://github.com/vocaloid2048/ARFC", "_blank")}>{locale("ui.arfc.web_title")}</p>
            <p className="cursor-pointer" onClick={() => window.open("https://github.com/Vocaloid2048")}>&copy; 2026 Vocaloid2048</p>

        </footer>
    )
}