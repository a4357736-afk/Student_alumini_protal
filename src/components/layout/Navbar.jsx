import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, LogIn, User, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A142F]/90 backdrop-blur-md border-b border-white/10 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo matching reference UI */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              UniConnect
            </span>
            <span className="block text-[11px] font-medium text-blue-200/80 -mt-0.5 tracking-wider uppercase">
              Student & Alumni Portal
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        {!isAuthPage && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#stories" className="hover:text-white transition-colors">Stories</a>
            <a href="#features" className="hover:text-white transition-colors">How It Works</a>
          </nav>
        )}

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link
                to={user.role === 'student' ? '/student/dashboard' : '/alumni/dashboard'}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-sm font-semibold shadow-md transition-all hover:shadow-blue-500/25"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="text-xs text-slate-300 hover:text-white underline underline-offset-4 px-2 py-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl border border-white/25 hover:border-white/60 text-white text-sm font-semibold transition-all hover:bg-white/5"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold shadow-md shadow-amber-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Start Your Journey</span>
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
