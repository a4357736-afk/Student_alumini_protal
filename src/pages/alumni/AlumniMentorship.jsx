import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, XCircle, Video, MessageSquare, Calendar, User } from 'lucide-react';
import { getMentorshipRequests, updateMentorshipRequestStatus } from '../../services/storageService';
import { useToast } from '../../hooks/useToast';
import { Link } from 'react-router-dom';

export default function AlumniMentorship() {
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setRequests(getMentorshipRequests());
  }, []);

  const handleAction = (id, status) => {
    updateMentorshipRequestStatus(id, status);
    setRequests(getMentorshipRequests());
    showToast(`Request ${status}!`);
  };

  const filtered = requests.filter(r => filter === 'all' || r.status === filter);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Mentorship Manager
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Student Mentorship Requests
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Manage incoming session inquiries from undergraduates seeking career direction, technical coaching, or resume reviews.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2">
          {['all', 'pending', 'accepted', 'declined'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                filter === st ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filtered.map(req => {
          const isPending = req.status === 'pending';
          const isAccepted = req.status === 'accepted';

          return (
            <div key={req.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <img
                  src={req.studentAvatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"}
                  alt={req.studentName}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900">{req.studentName}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      isAccepted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isPending
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 font-semibold">{req.studentDepartment} • {req.studentYear || 'Undergraduate'}</p>
                  <p className="text-xs font-bold text-slate-800 mt-2">Topic: {req.topic}</p>
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl italic">"{req.note}"</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end md:self-center">
                {isPending ? (
                  <>
                    <button
                      onClick={() => handleAction(req.id, 'declined')}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleAction(req.id, 'accepted')}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accept & Schedule</span>
                    </button>
                  </>
                ) : isAccepted ? (
                  <>
                    <a
                      href="https://meet.google.com/uniconnect-mentor-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Meet Call</span>
                    </a>
                    <Link
                      to="/alumni/messages"
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Message</span>
                    </Link>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Archived</span>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-xs text-slate-500">
            No requests in this view.
          </div>
        )}
      </div>

    </div>
  );
}
