import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  Trophy, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Plus,
  Compass
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getAlumni, getOpportunities, getEvents } from '../../services/storageService';
import { getRankedAlumniForStudent } from '../../utils/matchingEngine';
import { calculateStudentProfileCompletion } from '../../utils/gamification';
import JourneyTracker from '../../components/journey/JourneyTracker';
import AlumniCard from '../../components/matching/AlumniCard';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [rankedAlumni, setRankedAlumni] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      const allAlumni = getAlumni();
      const ranked = getRankedAlumniForStudent(user, allAlumni);
      setRankedAlumni(ranked);
      setOpportunities(getOpportunities());
      setEvents(getEvents());
    }
  }, [user]);

  const profileCompletion = calculateStudentProfileCompletion(user);
  const filteredAlumni = rankedAlumni.filter(a => 
    !searchQuery || 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      
      {/* Personalized Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-card">
        {/* Glow decorative orbs */}
        <div className="absolute top-0 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus Career Accelerator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Aryan'}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-blue-200/90 max-w-xl leading-relaxed">
              {user?.department} • {user?.course} ({user?.currentYear || '3rd Year'}). Your profile is matched against {rankedAlumni.length} verified alumni mentors.
            </p>

            {/* Quick Skills Pill Preview */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-[11px] font-bold text-slate-300 mr-1">Your Skills:</span>
              {(user?.skills || ['Python', 'React', 'Machine Learning']).map((sk, idx) => (
                <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/10 text-white border border-white/15">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-col gap-2.5 shrink-0">
            <Link
              to="/student/find-alumni"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Explore All Mentors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/student/profile"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition text-center"
            >
              Edit Profile ({profileCompletion}%)
            </Link>
          </div>
        </div>
      </div>

      {/* Gamified Journey Tracker component */}
      <JourneyTracker 
        role="student"
        currentStage={user?.journeyStage || 3}
        profileCompletion={profileCompletion}
      />

      {/* 4 Core Dashboard Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Opportunities',
            count: `${opportunities.length} Open`,
            desc: 'Jobs & Internships',
            icon: Briefcase,
            color: 'text-blue-600',
            bg: 'bg-blue-50 border-blue-100',
            link: '/student/opportunities'
          },
          {
            title: 'Connections',
            count: `${user?.connections?.length || 1} Active`,
            desc: 'Alumni Network',
            icon: Users,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50 border-emerald-100',
            link: '/student/find-alumni'
          },
          {
            title: 'Achievements',
            count: `${user?.badges?.length || 3} Badges`,
            desc: 'Gamification Level 2',
            icon: Trophy,
            color: 'text-amber-600',
            bg: 'bg-amber-50 border-amber-100',
            link: '/student/achievements'
          },
          {
            title: 'Events',
            count: `${events.length} Upcoming`,
            desc: 'Alumni Webinars',
            icon: Calendar,
            color: 'text-purple-600',
            bg: 'bg-purple-50 border-purple-100',
            link: '/student/events'
          }
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className={`p-5 rounded-2xl border ${card.bg} hover:shadow-card transition duration-200 flex flex-col justify-between group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">{card.title}</span>
                <div className={`p-2 rounded-xl bg-white shadow-xs ${card.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xl sm:text-2xl font-black text-slate-900 block">{card.count}</span>
                <span className="text-xs text-slate-500 font-medium">{card.desc}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* RECOMMENDED ALUMNI FOR YOU (7-Dimension Matching Engine) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <h3 className="text-lg font-bold text-slate-900">Recommended Alumni For You</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked dynamically by our 7-dimension matching algorithm based on your skills, career goals, and department.
            </p>
          </div>

          {/* Filter Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill, company..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Alumni Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.slice(0, 6).map(alumni => (
            <AlumniCard
              key={alumni.id}
              alumni={alumni}
              student={user}
              isConnected={user?.connections?.includes(alumni.id)}
            />
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-600">No alumni matched your search criteria.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs font-bold text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Two Column Layout: Recommended Opportunities & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recommended Opportunities */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <h3 className="text-base font-bold text-slate-900">Recommended Opportunities</h3>
            </div>
            <Link to="/student/opportunities" className="text-xs font-bold text-blue-600 hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {opportunities.slice(0, 3).map(opp => (
              <div key={opp.id} className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card transition flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                      {opp.type}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                      {opp.stipend}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{opp.title}</h4>
                  <p className="text-xs text-slate-500">{opp.company} • {opp.location}</p>
                </div>

                <Link
                  to="/student/opportunities"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-semibold transition shrink-0"
                >
                  Apply
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📅</span>
              <h3 className="text-base font-bold text-slate-900">Campus & Alumni Events</h3>
            </div>
            <Link to="/student/events" className="text-xs font-bold text-blue-600 hover:underline">
              All Events →
            </Link>
          </div>

          <div className="space-y-3">
            {events.slice(0, 2).map(evt => (
              <div key={evt.id} className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-soft space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                    {evt.badge}
                  </span>
                  <span className="text-xs text-slate-400">{evt.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{evt.title}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <img src={evt.speakerAvatar} alt={evt.speaker} className="w-5 h-5 rounded-full object-cover" />
                  <span className="truncate">{evt.speaker}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
