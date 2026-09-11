import React from 'react';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { STUDENT_JOURNEY_STAGES, ALUMNI_JOURNEY_STAGES } from '../../utils/gamification';

export default function JourneyTracker({ role = 'student', currentStage = 3, profileCompletion = 85 }) {
  const isStudent = role === 'student';
  const stages = isStudent ? STUDENT_JOURNEY_STAGES : ALUMNI_JOURNEY_STAGES;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft">
      {/* Top Header with Profile Completion */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Your University Journey</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Different Journeys. Same Home. Track your milestones from campus to mentorship.
          </p>
        </div>

        {/* Profile Completion gauge */}
        <div className="flex items-center gap-3 bg-blue-50/80 px-4 py-2 rounded-xl border border-blue-100">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-blue-200"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-600"
                strokeDasharray={`${profileCompletion}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-blue-900">
              {profileCompletion}%
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Profile Completion</span>
            <span className="text-[11px] text-slate-500">
              {profileCompletion >= 80 ? 'All Key Milestones Active' : 'Complete details to boost match'}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Steps / Journey Progression Bar */}
      <div className="mt-6 overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[620px] relative">
          
          {/* Progress Connecting Line */}
          <div className="absolute top-5 left-8 right-8 h-1 bg-slate-100 -z-0">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 transition-all duration-700"
              style={{ width: `${Math.min(100, ((currentStage - 1) / (stages.length - 1)) * 100)}%` }}
            />
          </div>

          {stages.map((st, idx) => {
            const isCompleted = st.step < currentStage;
            const isCurrent = st.step === currentStage;

            return (
              <div key={st.step} className="flex flex-col items-center relative z-10 group">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-base shadow-sm transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-blue-600 text-white shadow-blue-600/30' 
                    : isCurrent 
                    ? 'bg-amber-400 text-slate-950 font-bold ring-4 ring-amber-400/20 shadow-amber-400/40 scale-110' 
                    : 'bg-white border-2 border-slate-200 text-slate-400'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-white" /> : st.icon}
                </div>
                
                <div className="mt-2.5 text-center">
                  <span className={`text-xs font-bold block ${
                    isCurrent ? 'text-blue-900' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    {st.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block max-w-[85px] leading-tight">
                    {st.subtitle}
                  </span>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
