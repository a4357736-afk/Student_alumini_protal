import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare,
  Link as LinkIcon,
  Plus
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getMentorshipRequests } from '../../services/storageService';
import { Link } from 'react-router-dom';

export default function StudentMentorship() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const all = getMentorshipRequests();
    // Filter student's requests or demo requests
    const userReqs = all.filter(r => r.studentId === user?.id || r.studentName === user?.name);
    setRequests(userReqs.length > 0 ? userReqs : all.slice(0, 2));
  }, [user]);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
            1-on-1 Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Mentorship & Advisory Sessions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Track your mentorship requests, booked Google Meet sessions, and alumni feedback notes.
          </p>
        </div>

        <Link
          to="/student/find-alumni"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Find New Mentor</span>
        </Link>
      </div>

      {/* Active Mentorship Sessions */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Your Mentorship Inquiries & Sessions</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map(req => {
            const isAccepted = req.status === 'accepted';
            const isPending = req.status === 'pending';

            return (
              <div key={req.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        isAccepted 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {isAccepted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5 text-amber-600" />}
                        <span className="capitalize">{req.status} Session</span>
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-2.5">{req.topic}</h4>
                      <p className="text-xs font-semibold text-blue-600">Mentor: {req.alumniName} ({req.alumniCompany || 'Microsoft'})</p>
                    </div>

                    <div className="text-right text-[11px] text-slate-400">
                      {new Date(req.requestedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-3 leading-relaxed">
                    "{req.note}"
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Video className="w-3.5 h-3.5 text-slate-400" />
                      <span>{req.preferredMode || 'Online (Google Meet)'}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>30-min session</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {isAccepted ? (
                    <a
                      href="https://meet.google.com/uniconnect-mentor-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Google Meet</span>
                    </a>
                  ) : (
                    <span className="text-xs text-amber-700 font-medium italic">
                      Awaiting alumni mentor confirmation...
                    </span>
                  )}

                  <Link
                    to="/student/messages"
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
