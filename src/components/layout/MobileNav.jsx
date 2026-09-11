import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, GraduationCap, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function MobileNav() {
  const { user } = useAuth();
  const isStudent = user?.role === 'student';

  const links = isStudent ? [
    { label: 'Home', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Alumni', path: '/student/find-alumni', icon: Users },
    { label: 'Jobs', path: '/student/opportunities', icon: Briefcase },
    { label: 'Mentors', path: '/student/mentorship', icon: GraduationCap },
    { label: 'Profile', path: '/student/profile', icon: User }
  ] : [
    { label: 'Home', path: '/alumni/dashboard', icon: LayoutDashboard },
    { label: 'Students', path: '/alumni/students', icon: Users },
    { label: 'Mentoring', path: '/alumni/mentorship', icon: GraduationCap },
    { label: 'Jobs', path: '/alumni/opportunities', icon: Briefcase },
    { label: 'Profile', path: '/alumni/profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A142F]/95 backdrop-blur-lg border-t border-slate-800 text-white lg:hidden px-2 py-1 shadow-2xl">
      <div className="flex items-center justify-around">
        {links.map(link => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-1.5 px-3 rounded-lg text-[11px] font-medium transition-all ${
                  isActive ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
