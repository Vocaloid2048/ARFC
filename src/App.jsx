import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import HeaderBar from './components/HeaderBar'
import Footer from './components/Footer';
import About from './pages/About';
import Role from './pages/Role';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[var(--page-bg)] font-sans">
        <nav className="bg-[var(--nav-bg)] border-b border-slate-500 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-extrabold tracking-tight flex items-center gap-2 text-white">
                  <img src="/arfc_icon.png" alt="Logo" className="w-6 h-6" />
                  <span>ARFC</span>
                </Link>
              </div>
              <HeaderBar />
            </div>
          </div>
        </nav>
        
        <main className="flex-1">
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
            <Route path='/role' element={<Role />} />
          </Routes>
        </main>
        
        <Footer/>
      </div>
    </Router>
  );
}

export default App;