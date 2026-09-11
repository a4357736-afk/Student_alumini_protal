import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, Sparkles, BookOpen, Users, DollarSign, Award } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export default function AlumniGiveBack() {
  const { showToast } = useToast();
  const [pledgedHours, setPledgedHours] = useState(10);
  const [guestLectureSubmitted, setGuestLectureSubmitted] = useState(false);
  const [lectureTopic, setLectureTopic] = useState('');

  const handlePledgeSave = () => {
    showToast(`Thank you! You pledged ${pledgedHours} hours of monthly mentorship to students.`);
  };

  const handleLectureSubmit = (e) => {
    e.preventDefault();
    if (!lectureTopic.trim()) return;
    setGuestLectureSubmitted(true);
    showToast('Guest lecture proposal submitted to department faculty!');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
          Giving Back to Campus
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          Empower Your University Community
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          “Different Journeys. Same Home.” Offer mentorship hours, volunteer for department guest lectures, or support campus student hackathons.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mentorship Hour Pledge */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col justify-between space-y-6">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xl mb-4">
              🤝
            </div>
            <h3 className="text-lg font-bold text-slate-900">Pledge Mentorship Hours</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Commit recurring hours each month to guide undergraduates in mock interviews and resume reviews.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-3xl font-black text-blue-600">{pledgedHours}</span>
              <span className="text-xs font-bold text-slate-600 block mt-1">Hours / Month Pledged</span>
              
              <input
                type="range"
                min="2"
                max="30"
                step="2"
                value={pledgedHours}
                onChange={(e) => setPledgedHours(Number(e.target.value))}
                className="w-full mt-4 accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handlePledgeSave}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
          >
            Update Mentorship Pledge
          </button>
        </div>

        {/* Propose a Guest Lecture */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col justify-between space-y-6">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xl mb-4">
              🎙️
            </div>
            <h3 className="text-lg font-bold text-slate-900">Offer a Campus Guest Lecture</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Deliver an interactive workshop or technical seminar for students in your department.
            </p>

            <form onSubmit={handleLectureSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lecture / Workshop Topic</label>
                <input
                  type="text"
                  required
                  value={lectureTopic}
                  onChange={(e) => setLectureTopic(e.target.value)}
                  placeholder="e.g. Scaling Distributed Systems in Cloud"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition shadow-sm"
              >
                {guestLectureSubmitted ? '✓ Proposal Sent' : 'Submit Lecture Proposal'}
              </button>
            </form>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-[11px] text-blue-900">
            💡 The department head will review your topic and schedule a virtual or on-campus auditorium slot.
          </div>
        </div>

      </div>

    </div>
  );
}
