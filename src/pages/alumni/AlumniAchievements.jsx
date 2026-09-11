import React from 'react';
import { Trophy, Award, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function AlumniAchievements() {
  const { user } = useAuth();

  const alumniBadges = [
    {
      id: "a1",
      title: "Guiding Light",
      icon: "🌟",
      desc: "Conducted 20+ hours of student career mentoring sessions",
      unlocked: true,
      milestone: "28 / 20 Hours Completed"
    },
    {
      id: "a2",
      title: "Door Opener",
      icon: "🚪",
      desc: "Posted 5+ exclusive campus referral job & internship opportunities",
      unlocked: true,
      milestone: "6 / 5 Opportunities Shared"
    },
    {
      id: "a3",
      title: "Hall of Fame Mentor",
      icon: "🏆",
      desc: "Voted Top Mentor by undergraduate mentees for 2 consecutive years",
      unlocked: true,
      milestone: "Award Conferred"
    },
    {
      id: "a4",
      title: "Masterclass Keynote",
      icon: "🎙️",
      desc: "Delivered a university technical webinar or campus workshop",
      unlocked: true,
      milestone: "Keynote Delivered"
    },
    {
      id: "a5",
      title: "Campus Endowment Patron",
      icon: "🏛️",
      desc: "Contributed to student hackathon prizes and innovation labs",
      unlocked: false,
      milestone: "Next Tier at 10 Opportunities"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Alumni Honors
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Mentorship Honors & Impact Badges
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Recognizing your contributions to student careers and university community leadership.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
            🌟
          </div>
          <div>
            <span className="text-xs font-bold text-amber-900 block">Mentor Status</span>
            <span className="text-xl font-black text-slate-900">Distinguished Mentor</span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumniBadges.map(badge => (
          <div
            key={badge.id}
            className={`rounded-3xl p-6 border transition-all flex flex-col justify-between ${
              badge.unlocked
                ? 'bg-white border-slate-200 shadow-soft hover:shadow-card'
                : 'bg-slate-50 border-slate-200/60 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-2xl shadow-md">
                  {badge.icon}
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  badge.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {badge.unlocked ? '✓ Conferred' : 'In Progress'}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900">{badge.title}</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{badge.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Record:</span>
              <span className="font-bold text-slate-800">{badge.milestone}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
