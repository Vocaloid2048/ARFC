import React, { useState, useRef, useEffect } from "react";
import { Star, Globe, Menu, Info, ArrowBigRightDash, FileIcon } from "lucide-react";
import GitHubIcon from "../assets/github_icon.svg?react";
import { Link } from "react-router-dom";
import { locale, getCurrentLang, setCurrentLang, AVAILABLE_LANGS } from "../utils/utilTool";

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
    <div className="inline-flex items-center rounded-full hover:bg-slate-800 px-2">
      <a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 justify-center h-10 rounded-full transition"
        aria-label="GitHub repo"
      >
        <GitHubIcon className="w-5 h-5" fill="white" />

        <div className="text-sm text-slate-100 flex items-center">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="ml-1">
            {stars !== null ? stars.toLocaleString() : locale("ui.nav.loading")}
          </span>
        </div>
      </a>
    </div>
  );
}

export default function HeaderBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [curLang, setCurLang] = useState(getCurrentLang());

  return (
    <div className="relative flex items-center">
      {/* Desktop / wide screens: show inline */}
      <div className="hidden md:flex items-center space-x-3">
        <GitHubButton />
        <div className="relative">
          <button onClick={() => setLangOpen(v => !v)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full hover:bg-slate-800 transition">
            <Globe className="w-4 h-4 text-slate-100" />
            <span className="text-sm text-slate-100">{AVAILABLE_LANGS[curLang] || '語言'}</span>
          </button>

          {langOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-md shadow-lg overflow-hidden">
              {Object.entries(AVAILABLE_LANGS).map(([code, label]) => (
                <button
                  key={code}
                  onClick={() => { setCurrentLang(code); setCurLang(code); setLangOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-700"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" onClick={() => window.location.href = "/result"}>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-full hover:bg-slate-800 transition">
            <FileIcon className="w-4 h-4 text-slate-100" />
            <span className="text-sm text-slate-100">{locale("ui.nav.result")}</span>
          </button>
        </div>

        <div className="relative" onClick={() => window.location.href = "/about"}>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-full hover:bg-slate-800 transition">
            <Info className="w-4 h-4 text-slate-100" />
            <span className="text-sm text-slate-100">{locale("ui.nav.about")}</span>
          </button>
        </div>

        <Link
          to="/quiz"
          className="inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold hover:brightness-90 transition"
          style={{
            backgroundColor: "var(--color-F)",
            color: "var(--page-bg)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          {locale("ui.nav.start_button")}
        </Link>
      </div>

      {/* Mobile / narrow screens: show a compact menu button that opens a droplist */}
      <div className="md:hidden flex items-center">
        <div className="mr-2 relative">
          <button onClick={() => setLangOpen(v => !v)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full hover:bg-slate-800 transition">
            <Globe className="w-4 h-4 text-slate-100" />
            <span className="text-sm text-slate-100">{AVAILABLE_LANGS[curLang] || '語言'}</span>
          </button>

          {langOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-md shadow-lg overflow-hidden">
              {Object.entries(AVAILABLE_LANGS).map(([code, label]) => (
                <button key={code} onClick={() => { setCurrentLang(code); setCurLang(code); setLangOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-700">
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-800 transition"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Menu className="w-5 h-5 text-slate-300" />
        </button>

        {mobileOpen && (
          <div className="absolute right-0 top-12 z-50 w-60 bg-slate-900 border border-slate-800 shadow-md rounded-lg overflow-hidden">
            <div className="divide-y divide-slate-800">
              <a
                href={`https://github.com/vocaloid2048/ARFC`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-600"
              >
                <div className="flex items-center gap-3">
                  <GitHubIcon className="w-5 h-5" fill="white" />
                  <div className="text-sm text-slate-100">GitHub</div>
                </div>
                <div className="flex items-center text-sm text-slate-100 gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>
                    {/* star count */}
                    {/* show fetched count if available */}
                    {/* use aria-hidden span for value */}
                    <GitHubStarCount repo="vocaloid2048/ARFC" />
                  </span>
                </div>
              </a>

              {/* language options moved to the left of Menu button on mobile */}

                <button className="w-full text-left px-4 py-3 hover:bg-slate-600 flex items-center gap-3" onClick={() => window.location.href = "/about"}>
                  <Info className="w-4 h-4 text-slate-100" />
                  <span className="text-sm text-slate-100">{locale("ui.nav.about")}</span>
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-slate-600 flex items-center gap-3" onClick={() => window.location.href = "/result"}>
                  <Star className="w-4 h-4 text-slate-100" />
                  <span className="text-sm text-slate-100">{locale("ui.nav.result")}</span>
                </button>
                <button className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[var(--color-F-dark)]" onClick={() => window.location.href = "/quiz"}>
                  <ArrowBigRightDash className="w-4 h-4 text-slate-100" />
                  <span className="text-sm text-slate-100">{locale("ui.nav.start_button")}</span>
                </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GitHubStarCount({ repo = "vocaloid2048/ARFC" }) {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => {
        if (!r.ok) throw new Error("bad");
        return r.json();
      })
      .then((j) => {
        if (mounted) setStars(j.stargazers_count);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [repo]);

  return <>{stars !== null ? stars.toLocaleString() : locale("ui.nav.loading")}</>;
}
