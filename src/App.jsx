import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import HeaderActions from './components/HeaderActions'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[var(--page-bg)] font-sans">
        <nav className="bg-[var(--nav-bg)] border-b border-slate-500 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-extrabold tracking-tight flex items-center gap-2 text-white">
                  <img src="./src/assets/arfc_icon.png" alt="Logo" className="w-6 h-6" />
                  <span>ARFC</span>
                </Link>
              </div>
              <HeaderActions />
            </div>
          </div>
        </nav>
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>

        <footer className="mt-4 text-center text-gray-600 text-sm border-t border-gray-800/50 pt-4 pb-4">
            <p className="font-medium text-gray-500 mb-2 cursor-pointer" onClick={() => window.open("https://github.com/vocaloid2048/ARFC", "_blank")}>ARFC 小組專題性格測驗網站</p>
            <p className="cursor-pointer" onClick={() => window.open("https://github.com/Vocaloid2048")}>&copy; 2026 Vocaloid2048 版權所有</p>

        </footer>
      </div>
    </Router>
  );
}

export default App;