import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Users, Plus, Sparkles } from 'lucide-react';
import { getEvents } from '../../services/storageService';
import { useToast } from '../../hooks/useToast';

export default function AlumniEvents() {
  const { showToast } = useToast();
  const [events, setEvents] = useState([]);
  const [showHostModal, setShowHostModal] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const handleHostSubmit = (e) => {
    e.preventDefault();
    if (!sessionTitle.trim()) return;
    setShowHostModal(false);
    showToast('Your alumni webinar proposal has been submitted to the university event coordinator!');
    setSessionTitle('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Campus Speaker Series
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Alumni Events & Tech Talks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Host fireside AMAs, technical webinars, or join upcoming campus alumni meetups.
          </p>
        </div>

        <button
          onClick={() => setShowHostModal(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md shadow-amber-400/20 transition flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Host a Tech Talk</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map(evt => (
          <div key={evt.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                  {evt.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">{evt.type}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{evt.title}</h3>

              <div className="mt-4 flex items-center gap-3">
                <img
                  src={evt.speakerAvatar}
                  alt={evt.speaker}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{evt.speaker}</h4>
                  <p className="text-[11px] text-slate-500">{evt.speakerRole}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed">
                {evt.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{evt.time}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span><strong>{evt.rsvpCount}</strong> students registered</span>
              </span>

              <a
                href={evt.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-bold transition"
              >
                Join Link
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Host Modal */}
      {showHostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 border border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Host a Campus Tech Talk</h3>
            <p className="text-xs text-slate-500">
              Share your insights with hundreds of eager undergraduates in a 45-minute webinar.
            </p>

            <form onSubmit={handleHostSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  placeholder="e.g. Navigating SDE-2 Promotions in Big Tech"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowHostModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
