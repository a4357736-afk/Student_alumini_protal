import React from 'react';
import { Trophy, Award, Sparkles, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { BADGE_DEFINITIONS, calculateStudentProfileCompletion } from '../../utils/gamification';

export default function StudentAchievements() {
  const { user } = useAuth();
  const completion = calculateStudentProfileCompletion(user);

  const allBadges = [
    {
      ...BADGE_DEFINITIONS.PROFILE_CHAMPION,
      unlocked: completion >= 80,
      criteria: "Achieve 80%+ profile completion score",
      progress: `${completion}%`
    },
    {
      ...BADGE_DEFINITIONS.SKILL_BUILDER,
      unlocked: (user?.skills || []).length >= 5,
      criteria: "Add 5 or more verified technical or leadership skills",
      progress: `${user?.skills?.length || 3}/5 skills`
    },
    {
      ...BADGE_DEFINITIONS.CAREER_EXPLORER,
      unlocked: true,
      criteria: "Explore alumni career tracks and campus opportunities",
      progress: "Unlocked"
    },
    {
      ...BADGE_DEFINITIONS.NETWORKER,
      unlocked: (user?.connections || []).length >= 1,
      criteria: "Initiate your first alumni connection or mentorship inquiry",
      progress: `${user?.connections?.length || 1}/1 connected`
    },
    {
      id: 'badge-webinar-scholar',
      name: 'Webinar Scholar',
      icon: '🎓',
      color: 'from-blue-600 to-indigo-600',
      description: 'RSVP and attend an alumni technical talk or fireside chat',
      unlocked: true,
      criteria: "Attend 1+ university masterclasses",
      progress: "Unlocked"
    },
    {
      id: 'badge-interview-ready',
      name: 'Interview Ready',
      icon: '💼',
      color: 'from-purple-600 to-pink-600',
      description: 'Schedule a mock technical interview with an alumnus',
      unlocked: false,
      criteria: "Complete a mock interview session",
      progress: "In progress"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Professional Gamification
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Achievements & Campus Badges
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Recognizing your proactive commitment to career exploration, mentorship engagement, and skill building.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
            🏆
          </div>
          <div>
            <span className="text-xs font-bold text-amber-900 block">Total Badges Earned</span>
            <span className="text-xl font-black text-slate-900">
              {allBadges.filter(b => b.unlocked).length} of {allBadges.length}
            </span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBadges.map(badge => (
          <div
            key={badge.id}
            className={`rounded-3xl p-6 border transition-all flex flex-col justify-between ${
              badge.unlocked
                ? 'bg-white border-slate-200 shadow-soft hover:shadow-card'
                : 'bg-slate-50/70 border-slate-200/60 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-2xl shadow-md">
                  {badge.icon}
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  badge.unlocked
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {badge.unlocked ? '✓ Unlocked' : 'Locked'}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900">{badge.name}</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{badge.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Requirement:</span>
              <span className="font-bold text-slate-700">{badge.progress}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
