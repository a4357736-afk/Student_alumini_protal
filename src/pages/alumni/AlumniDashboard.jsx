import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  Users, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  X, 
  Plus, 
  TrendingUp, 
  Award,
  Video
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { 
  getMentorshipRequests, 
  updateMentorshipRequestStatus, 
  getStudents, 
  getOpportunities 
} from '../../services/storageService';
import JourneyTracker from '../../components/journey/JourneyTracker';
import { calculateAlumniProfileCompletion } from '../../utils/gamification';

export default function AlumniDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [students, setStudents] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    setRequests(getMentorshipRequests());
    setStudents(getStudents());
    setOpportunities(getOpportunities());
  }, []);

  const profileCompletion = calculateAlumniProfileCompletion(user);

  const handleRequestAction = (reqId, newStatus) => {
    updateMentorshipRequestStatus(reqId, newStatus);
    setRequests(getMentorshipRequests());
    showToast(`Mentorship request ${newStatus}!`);
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-8">
      
      {/* Personalized Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-card">
        <div className="absolute top-0 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Alumni Mentor Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Rahul Sharma'}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {user?.jobRole} at {user?.company} • Graduated '{user?.graduationYear?.slice(-2) || '20'}. Empowering the next generation of students from {user?.department || 'Computer Engineering'}.
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Your Mentoring Areas:</span>
              {(user?.mentoringAreas || ['Technical Mentoring', 'Interview Preparation']).map((area, idx) => (
                <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/10 text-amber-200 border border-white/15">
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2.5 shrink-0">
            <Link
              to="/alumni/opportunities"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Post an Opportunity</span>
            </Link>
            <Link
              to="/alumni/profile"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition text-center"
            >
              Edit Profile ({profileCompletion}%)
            </Link>
          </div>
        </div>
      </div>

      {/* Professional Journey Progression */}
      <JourneyTracker
        role="alumni"
        currentStage={4}
        profileCompletion={profileCompletion}
      />

      {/* Impact Score & Mentorship Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Students Mentored',
            count: user?.metrics?.studentsMentored || 28,
            desc: 'Undergraduates guided',
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-50 border-blue-100'
          },
          {
            title: 'Opportunities Shared',
            count: user?.metrics?.opportunitiesShared || 6,
            desc: 'Campus referrals posted',
            icon: Briefcase,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50 border-emerald-100'
          },
          {
            title: 'Events Participated',
            count: user?.metrics?.eventsParticipated || 8,
            desc: 'Webinars & talks',
            icon: Calendar,
            color: 'text-purple-600',
            bg: 'bg-purple-50 border-purple-100'
          },
          {
            title: 'Impact Score',
            count: '98 pts',
            desc: 'Top 5% Alumni Mentor',
            icon: Award,
            color: 'text-amber-600',
            bg: 'bg-amber-50 border-amber-100'
          }
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${card.bg} shadow-soft flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">{card.title}</span>
                <div className={`p-2 rounded-xl bg-white shadow-xs ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block">{card.count}</span>
                <span className="text-xs text-slate-500 font-medium">{card.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pending Mentorship Inquiries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>🤝 Pending Mentorship Requests</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                {pendingRequests.length} Pending
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Students who requested your guidance</p>
          </div>
          <Link to="/alumni/mentorship" className="text-xs font-bold text-blue-600 hover:underline">
            Manage All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingRequests.map(req => (
            <div key={req.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={req.studentAvatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"}
                  alt={req.studentName}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{req.studentName}</h4>
                  <p className="text-xs text-blue-600">{req.studentDepartment} • {req.studentYear || '3rd Year'}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Topic:</span>
                <p className="text-xs font-semibold text-slate-900">{req.topic}</p>
                <p className="text-xs text-slate-600 italic mt-1">"{req.note}"</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => handleRequestAction(req.id, 'declined')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleRequestAction(req.id, 'accepted')}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Accept & Schedule</span>
                </button>
              </div>
            </div>
          ))}

          {pendingRequests.length === 0 && (
            <div className="col-span-2 text-center py-8 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
              No pending student inquiries at the moment. All caught up!
            </div>
          )}
        </div>
      </div>

      {/* Mentees Discovery: Students seeking guidance */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>🎓 Explore Students Seeking Guidance</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Reach out to current undergraduates in your department</p>
          </div>
          <Link to="/alumni/students" className="text-xs font-bold text-blue-600 hover:underline">
            View All Students →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {students.slice(0, 3).map(stu => (
            <div key={stu.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <img src={stu.avatar} alt={stu.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{stu.name}</h4>
                    <p className="text-[11px] text-blue-600">{stu.department}</p>
                    <p className="text-[10px] text-slate-400">{stu.currentYear}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {(stu.skills || []).slice(0, 3).map((sk, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">{stu.careerInterests?.[0] || 'Software'}</span>
                <Link
                  to="/alumni/messages"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Reach Out →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
