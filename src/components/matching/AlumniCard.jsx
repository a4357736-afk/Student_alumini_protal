import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  UserPlus, 
  UserCheck, 
  Info,
  ArrowRight
} from 'lucide-react';
import WhyMatchModal from './WhyMatchModal';
import MentorshipRequestModal from './MentorshipRequestModal';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

export default function AlumniCard({ alumni, student, onConnect, isConnected = false }) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [showWhyMatch, setShowWhyMatch] = useState(false);
  const [showMentorshipModal, setShowMentorshipModal] = useState(false);
  const [connected, setConnected] = useState(isConnected);

  const matchScore = alumni.matchScore || 92;
  const whyText = alumni.matchReasons?.[0] || "Alumnus from your department with matching career track in tech.";

  const handleConnectClick = () => {
    if (!connected) {
      setConnected(true);
      showToast(`Connected with ${alumni.name}!`);
      if (onConnect) onConnect(alumni.id);
    } else {
      showToast(`Already connected with ${alumni.name}`, 'info');
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between group">
        <div>
          {/* Card Header: Avatar, Name, Company, Match Badge */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={alumni.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                alt={alumni.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-blue-500/40 transition-all shrink-0"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {alumni.name}
                </h4>
                <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>{alumni.jobRole}</span>
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {alumni.company} • {alumni.experience} yrs exp
                </p>
              </div>
            </div>

            {/* Match Score Badge */}
            <div className="flex flex-col items-end">
              <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-sm shadow-sm flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>{matchScore}%</span>
              </span>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mt-0.5">
                Match
              </span>
            </div>
          </div>

          {/* Department and Location */}
          <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              <span>{alumni.department} ('{alumni.graduationYear?.slice(-2) || '22'})</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{alumni.location} ({alumni.workMode})</span>
            </span>
          </div>

          {/* Matched Highlights / Checkmarks List */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
            {(alumni.matchedSkills?.slice(0, 2) || alumni.skills?.slice(0, 2) || []).map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{skill}</span>
              </div>
            ))}
            {alumni.industry && (
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{alumni.industry} Industry</span>
              </div>
            )}
            {alumni.mentoringAreas?.[0] && (
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{alumni.mentoringAreas[0]}</span>
              </div>
            )}
          </div>

          {/* "Why this match?" Callout Box */}
          <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Why this match?
              </span>
              <button
                onClick={() => setShowWhyMatch(true)}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline transition"
              >
                Details
              </button>
            </div>
            <p className="text-xs text-blue-800/90 leading-relaxed italic line-clamp-2">
              "{whyText}"
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setShowWhyMatch(true)}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition text-center"
          >
            View Profile
          </button>

          <button
            onClick={handleConnectClick}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              connected
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            {connected ? (
              <>
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Connected</span>
              </>
            ) : (
              <>
                <UserPlus className="w-3.5 h-3.5" />
                <span>Connect</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowMentorshipModal(true)}
            className="col-span-2 sm:col-span-1 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm shadow-blue-500/20 text-center"
          >
            Mentorship
          </button>
        </div>
      </div>

      {/* Modals */}
      <WhyMatchModal
        isOpen={showWhyMatch}
        onClose={() => setShowWhyMatch(false)}
        alumni={alumni}
        student={student}
      />

      <MentorshipRequestModal
        isOpen={showMentorshipModal}
        onClose={() => setShowMentorshipModal(false)}
        alumni={alumni}
      />
    </>
  );
}
