import React from 'react';
import { Menu, Bell, Search, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function DashboardHeader({ onMenuClick }) {
  const { user } = useAuth();
  const isStudent = user?.role === 'student';

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between transition-all">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden transition"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Welcome back, {user?.name ? user.name.split(' ')[0] : 'User'}!</span>
            <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            {isStudent 
              ? 'Explore recommended alumni mentors and campus opportunities.'
              : 'Empower student careers and guide future changemakers.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Community Tagline Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200/60 rounded-full text-xs font-semibold text-blue-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Different Journeys. Same Home.</span>
        </div>

        {/* Profile Avatar link */}
        <Link 
          to={isStudent ? '/student/profile' : '/alumni/profile'}
          className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition"
        >
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
            alt={user?.name || "Profile"}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-500/30"
          />
        </Link>
      </div>
    </header>
  );
}
