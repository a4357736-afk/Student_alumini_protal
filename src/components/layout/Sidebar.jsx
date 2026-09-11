import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Compass, 
  Users, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Trophy, 
  MessageSquare, 
  HeartHandshake, 
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isStudent = user?.role === 'student';

  const studentNavItems = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/student/profile', icon: User },
    { label: 'My Journey', path: '/student/journey', icon: Compass },
    { label: 'Find Alumni', path: '/student/find-alumni', icon: Users },
    { label: 'Opportunities', path: '/student/opportunities', icon: Briefcase },
    { label: 'Mentorship', path: '/student/mentorship', icon: GraduationCap },
    { label: 'Learning Hub', path: '/student/learning-hub', icon: BookOpen },
    { label: 'Events', path: '/student/events', icon: Calendar },
    { label: 'Achievements', path: '/student/achievements', icon: Trophy },
    { label: 'Messages', path: '/student/messages', icon: MessageSquare }
  ];

  const alumniNavItems = [
    { label: 'Dashboard', path: '/alumni/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/alumni/profile', icon: User },
    { label: 'Professional Journey', path: '/alumni/journey', icon: Compass },
    { label: 'Mentorship', path: '/alumni/mentorship', icon: GraduationCap },
    { label: 'Students', path: '/alumni/students', icon: Users },
    { label: 'Opportunities', path: '/alumni/opportunities', icon: Briefcase },
    { label: 'Events', path: '/alumni/events', icon: Calendar },
    { label: 'Give Back', path: '/alumni/give-back', icon: HeartHandshake },
    { label: 'Achievements', path: '/alumni/achievements', icon: Trophy },
    { label: 'Messages', path: '/alumni/messages', icon: MessageSquare }
  ];

  const navItems = isStudent ? studentNavItems : alumniNavItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#0A142F] text-white flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block">
                UniConnect
              </span>
              <span className="text-[10px] font-semibold text-amber-400 tracking-wider uppercase block -mt-0.5">
                {isStudent ? 'Student Edition' : 'Alumni Network'}
              </span>
            </div>
          </NavLink>
        </div>

        {/* User Card Miniature */}
        <div className="px-4 py-4 m-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-3">
          <img
            src={user?.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`}
            alt={user?.name || "User"}
            className="w-10 h-10 rounded-xl object-cover border border-blue-400/40 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-blue-300/80 truncate">
              {isStudent ? `${user?.department || 'Student'} • ${user?.currentYear || '3rd Year'}` : `${user?.jobRole || 'Alumni'} @ ${user?.company || 'Industry'}`}
            </p>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Navigation Menu
          </p>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
              </NavLink>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-300 hover:text-white hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
