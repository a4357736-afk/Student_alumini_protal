import React from 'react';
import { X, Sparkles, CheckCircle2, Award, BookOpen, Briefcase, MapPin } from 'lucide-react';

export default function WhyMatchModal({ isOpen, onClose, alumni, student }) {
  if (!isOpen || !alumni) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header with match score badge */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Match Breakdown Engine</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{alumni.name}</h3>
              <p className="text-blue-200 text-xs mt-0.5">{alumni.jobRole} @ {alumni.company}</p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-lg shadow-gold-glow flex items-center gap-1">
              <span>{alumni.matchScore || 94}%</span>
              <span className="text-xs font-bold uppercase">Match</span>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Explanation Banner */}
          <div className="bg-blue-50/80 border border-blue-200/70 p-4 rounded-xl">
            <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider mb-1">
              Why this match was recommended:
            </h4>
            <p className="text-xs text-blue-800 leading-relaxed">
              Based on your target interests, {alumni.name} shares your academic foundation from {alumni.department} and is working in your dream domain at {alumni.company}.
            </p>
          </div>

          {/* Key Alignment Reasons */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Matching Signals
            </h4>
            <div className="space-y-2">
              {(alumni.matchReasons && alumni.matchReasons.length > 0 ? alumni.matchReasons : [
                "Both from Computer Engineering department",
                "Strong synergy in AI / Machine Learning career track",
                "Shared skills in Python, Machine Learning and System Design",
                "Alumnus actively offers Technical Mentoring & Mock Interviews"
              ]).map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overlapping Skills Chips */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Common Technical Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(alumni.matchedSkills && alumni.matchedSkills.length > 0 ? alumni.matchedSkills : alumni.skills || []).map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs flex items-center gap-1">
                  <span>✓</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Mentoring Offerings */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Areas {alumni.name.split(' ')[0]} Can Help You
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(alumni.mentoringAreas || []).map((area, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-medium text-xs">
                  {area}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
}
