import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Users, Check, Sparkles } from 'lucide-react';
import { getEvents, rsvpEvent } from '../../services/storageService';
import { useToast } from '../../hooks/useToast';

export default function StudentEvents() {
  const { showToast } = useToast();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const handleRSVP = (eventId) => {
    const updated = rsvpEvent(eventId);
    if (updated) {
      setEvents(getEvents());
      showToast('RSVP Confirmed! Calendar invitation details sent to your email.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
          Campus Knowledge Sessions
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          Upcoming Alumni Events & Webinars
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          Join interactive masterclasses, fireside chats, and technical workshops hosted by distinguished graduates.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map(evt => (
          <div key={evt.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-card transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
                  {evt.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">{evt.type}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{evt.title}</h3>

              <div className="mt-4 flex items-center gap-3">
                <img
                  src={evt.speakerAvatar}
                  alt={evt.speaker}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/30 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{evt.speaker}</h4>
                  <p className="text-[11px] text-slate-500">{evt.speakerRole}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-4 line-clamp-3 leading-relaxed">
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
                <span><strong>{evt.rsvpCount}</strong> attending</span>
              </span>

              <button
                onClick={() => handleRSVP(evt.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 ${
                  evt.hasRsvpd
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                }`}
              >
                {evt.hasRsvpd ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Attending</span>
                  </>
                ) : (
                  <span>RSVP Free</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
