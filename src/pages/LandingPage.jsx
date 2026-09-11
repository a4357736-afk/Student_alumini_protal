import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowRight, 
  BookOpen, 
  Users, 
  TrendingUp, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Briefcase, 
  Calendar,
  Building,
  Quote
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { CampusSilhouette } from '../components/common/CampusVector';
import { INITIAL_ALUMNI } from '../data/initialAlumni';
import { INITIAL_OPPORTUNITIES } from '../data/initialOpportunities';

export default function LandingPage() {
  const featuredAlumni = INITIAL_ALUMNI.slice(0, 3);
  const featuredOpportunities = INITIAL_OPPORTUNITIES.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section matching Reference UI Layout Panel 1 */}
      <section className="relative bg-[#0A142F] text-white overflow-hidden pt-8 pb-16 lg:py-20">
        
        {/* Background Subtle Gradient & Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>UniConnect — University Community Network</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  Different <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-amber-300">
                    Journeys.
                  </span> <br />
                  Same Home.
                </h1>
              </div>

              {/* Supporting Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-medium leading-relaxed">
                Students learn. Alumni inspire. Together we build a brighter tomorrow. A lifelong community beyond the classroom.
              </p>

              {/* 4 Feature Highlight Pills matching reference UI */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { icon: BookOpen, label: 'Learn', color: 'text-blue-400', bg: 'bg-blue-950/60 border-blue-800/60' },
                  { icon: Users, label: 'Connect', color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-800/60' },
                  { icon: TrendingUp, label: 'Grow', color: 'text-purple-400', bg: 'bg-purple-950/60 border-purple-800/60' },
                  { icon: HeartHandshake, label: 'Give Back', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-800/60' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className={`flex items-center gap-2 p-2.5 rounded-xl border ${item.bg} backdrop-blur-sm`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-xs font-bold text-slate-200">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Quote pill from reference image */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 max-w-lg">
                <p className="text-xs font-medium text-slate-300 italic flex items-center gap-2">
                  <Quote className="w-3.5 h-3.5 text-amber-400 shrink-0 inline" />
                  <span>“A lifelong community beyond the classroom.”</span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/register"
                  className="px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-400/25 hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login"
                  className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base transition"
                >
                  Login to Portal
                </Link>
              </div>

            </div>

            {/* Right Hero Card matching Reference UI Layout Panel 1 */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 text-slate-900 relative">
                
                {/* Floating Cap Icon */}
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-5">
                  <GraduationCap className="w-7 h-7" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  Ready to be a part of something bigger?
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Create your account and unlock opportunities for life. Connect with alumni in tech, finance, design, and startups.
                </p>

                {/* Campus Group Graphic / Visual */}
                <div className="mt-5 rounded-2xl overflow-hidden relative border border-slate-100 group">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
                    alt="University Campus Students & Alumni"
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <p className="text-xs font-semibold text-amber-300 font-caveat text-base">
                      “New connections. Greater possibilities.”
                    </p>
                  </div>
                </div>

                {/* Quick 1-click Demo Accounts callout */}
                <div className="mt-5 p-3 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
                  <div className="text-xs text-blue-900">
                    <span className="font-bold block">Instant Demo Access:</span>
                    <span className="text-[11px] text-blue-700">student01 / alumni01 (pwd: 123456)</span>
                  </div>
                  <Link
                    to="/login"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
                  >
                    Try Demo
                  </Link>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Community Stats Bar matching reference UI Panel 1 */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '10K+', label: 'Students', icon: Users },
              { number: '5K+', label: 'Alumni', icon: GraduationCap },
              { number: '500+', label: 'Mentors', icon: HeartHandshake },
              { number: '100+', label: 'Opportunities', icon: Briefcase }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-5 h-5 text-amber-400" />
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">{stat.number}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Campus Twilight Silhouette at bottom of hero */}
        <div className="mt-10">
          <CampusSilhouette className="w-full h-24 opacity-60" />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Personalized Matching
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              How UniConnect Works
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our 7-dimension matching algorithm connects students with the most relevant alumni based on skills, career goals, and department roots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                desc: 'Answer a few conversational questions about your degree, skills, career dreams, or mentoring goals.',
                icon: '🎓'
              },
              {
                step: '02',
                title: 'Dynamic Matching',
                desc: 'Our engine evaluates skills, career interest, department, and guidance type to compute exact % compatibility.',
                icon: '⚡'
              },
              {
                step: '03',
                title: 'Connect & Mentor',
                desc: 'Book 1-on-1 guidance sessions, request resume reviews, and get mock technical interview prep.',
                icon: '🤝'
              },
              {
                step: '04',
                title: 'Accelerate Career',
                desc: 'Unlock direct campus job referrals, internships, and build lifelong professional bonds.',
                icon: '🚀'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 hover:shadow-card transition-all group">
                <span className="text-xs font-black text-blue-600 bg-blue-100 px-2.5 py-1 rounded-lg">
                  {item.step}
                </span>
                <div className="text-3xl my-4 group-hover:scale-110 transition-transform inline-block">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Alumni Stories */}
      <section id="stories" className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Alumni Network
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                Featured Mentors & Changemakers
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Alumni from top global institutions guiding current campus students.
              </p>
            </div>
            <Link
              to="/register"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5"
            >
              <span>Explore All Mentors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAlumni.map(alumni => (
              <div key={alumni.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <img
                      src={alumni.avatar}
                      alt={alumni.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20"
                    />
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{alumni.name}</h4>
                      <p className="text-xs font-semibold text-blue-600">{alumni.jobRole}</p>
                      <p className="text-xs text-slate-500">{alumni.company} • {alumni.location}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic mt-4 leading-relaxed line-clamp-3">
                    "{alumni.bio}"
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {alumni.skills.slice(0, 3).map((s, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                    {alumni.metrics?.studentsMentored || 20}+ Students Mentored
                  </span>
                  <Link
                    to="/login"
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Connect →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Opportunities Section */}
      <section id="about" className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Exclusive Campus Pipeline
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                Live Opportunities Shared by Alumni
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Direct referrals, internships, and research roles exclusively for our university network.
              </p>
            </div>
            <Link
              to="/register"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5"
            >
              <span>View All Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredOpportunities.map(opp => (
              <div key={opp.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-card transition flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                      {opp.type}
                    </span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      {opp.stipend}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-3">{opp.title}</h3>
                  <p className="text-xs text-slate-600 font-medium">{opp.company} • {opp.location}</p>

                  <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {opp.skills.map((sk, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>Posted by {opp.postedBy}</span>
                  <Link
                    to="/login"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Apply Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Big Campus Banner CTA */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Lifelong Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            “Different Journeys. Same Home.”
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Whether you are taking your very first college lecture or leading a team at a Fortune 500 company, UniConnect connects your past, present, and future.
          </p>
          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base shadow-lg shadow-amber-400/25 transition hover:scale-105"
            >
              <span>Join UniConnect Today</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
