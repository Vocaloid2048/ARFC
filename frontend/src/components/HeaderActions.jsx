import React, { useState, useRef, useEffect } from "react";
import { Star, Globe } from "lucide-react";
import githubIcon from "../assets/github_icon.svg";
import { Link } from "react-router-dom";

function GitHubButton({ repo = "vocaloid2048/ARFC" }) {
  const [stars, setStars] = useState(null);
  const timer = useRef(null);

  const fetchStars = async () => {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`);
      if (!res.ok) return;
      const json = await res.json();
      setStars(json.stargazers_count);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    fetchStars();
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo]);

  return (
    <div className="inline-flex items-center rounded-full hover:bg-slate-100 px-2">
      <a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 justify-center h-10 rounded-full transition"
        aria-label="GitHub repo"
      >
        <img src={githubIcon} alt="GitHub" className="w-5 h-5 text-slate-700" />

        <div className="text-sm text-slate-700 flex items-center">
          <Star className="w-4 h-4 text-yellow-500" />
          <blank className="w-1" />
          <span>{stars !== null ? stars.toLocaleString() : "載入中"}</span>
        </div>
      </a>
    </div>
  );
}

export default function HeaderActions() {
  return (
    <div className="flex items-center space-x-3">
      <GitHubButton />

      <div className="relative">
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition">
          <Globe className="w-4 h-4 text-slate-700" />
          <span className="text-sm text-slate-700">繁體中文</span>
        </button>
      </div>

      <Link
        to="/about"
        className="text-sm text-slate-700 hover:bg-slate-100 transition px-3 py-2 rounded-lg"
      >
        關於專案
      </Link>

      <Link
        to="/quiz"
        className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
      >
        立即測驗
      </Link>
    </div>
  );
}
