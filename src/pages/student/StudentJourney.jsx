import React from 'react';
import { 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  HeartHandshake,
  Lock
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { STUDENT_JOURNEY_STAGES } from '../../utils/gamification';
import { Link } from 'react-router-dom';

export default function StudentJourney() {
  const { user } = useAuth();
  const currentStage = user?.journeyStage || 3;

  const roadmapMilestones = [
    {
      stage: 1,
      title: "Enroll & Connect to Campus",
      icon: "🎓",
      status: "completed",
      date: "Completed in Year 1",
      tasks: [
        "Enrolled in degree program",
        "Joined UniConnect student network",
        "Configured basic academic profile"
      ]
    },
    {
      stage: 2,
      title: "Build Core Skills & Portfolio",
      icon: "📚",
      status: "completed",
      date: "Completed in Year 2",
      tasks: [
        "Added verified skills: Python, React, ML",
        "Built academic semester project repos",
        "Explored industry career tracks"
      ]
    },
    {
      stage: 3,
      title: "Gain Industry Experience & Mentorship",
      icon: "💼",
      status: "current",
      date: "In Progress (Current Stage)",
      tasks: [
        "Connect with 5+ alumni mentors in AI / Tech",
        "Conduct technical mock interviews",
        "Apply to campus referral internships"
      ]
    },
    {
      stage: 4,
      title: "Confer Degree & Graduation",
      icon: "📜",
      status: "upcoming",
      date: `Target: ${user?.expectedGraduationYear || '2028'}`,
      tasks: [
        "Complete capstone final year project",
        "Receive bachelor's degree",
        "Convert internship to full-time PPO"
      ]
    },
    {
      stage: 5,
      title: "Transition to Alumni Network",
      icon: "👨‍💼",
      status: "locked",
      date: "Future Milestone",
      tasks: [
        "Join global alumni directory",
        "Share industry insights and experiences",
        "Attend annual alumni homecoming"
      ]
    },
    {
      stage: 6,
      title: "Become a Campus Mentor",
      icon: "🤝",
      status: "locked",
      date: "Lifelong Legacy",
      tasks: [
        "Mentor next generation of undergraduates",
        "Post campus referrals & job openings",
        "Give back to university departments"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-soft relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
            Lifelong Roadmap
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            “Different Journeys. Same Home.”
          </h2>
          <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
            From your very first college lecture to conferring your degree and becoming an inspirational mentor—track your university growth and professional legacy.
          </p>
        </div>
      </div>

      {/* Interactive Milestone Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
        <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Compass className="w-5 h-5 text-blue-600" />
          <span>Your Complete Progression Roadmap</span>
        </h3>

        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-10">
          {roadmapMilestones.map((m) => {
            const isCompleted = m.status === 'completed';
            const isCurrent = m.status === 'current';
            const isLocked = m.status === 'locked' || m.status === 'upcoming';

            return (
              <div key={m.stage} className="relative group">
                
                {/* Node Icon on Timeline */}
                <div className={`absolute -left-[38px] sm:-left-[54px] top-0 w-10 h-10 rounded-2xl flex items-center justify-center text-base shadow-md transition-transform group-hover:scale-110 ${
                  isCompleted
                    ? 'bg-blue-600 text-white shadow-blue-500/30'
                    : isCurrent
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20 font-bold scale-110 shadow-amber-400/30'
                    : 'bg-slate-100 border border-slate-300 text-slate-400'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : isCurrent ? m.icon : <Lock className="w-4 h-4" />}
                </div>

                {/* Milestone Card */}
                <div className={`p-6 rounded-2xl border transition-all ${
                  isCurrent 
                    ? 'bg-amber-50/40 border-amber-300 shadow-md'
                    : isCompleted
                    ? 'bg-blue-50/30 border-blue-200'
                    : 'bg-slate-50/70 border-slate-200/80 opacity-75'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{m.icon}</span>
                      <h4 className="text-base font-bold text-slate-900">{m.title}</h4>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full self-start sm:self-auto ${
                      isCompleted 
                        ? 'bg-blue-100 text-blue-800'
                        : isCurrent
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {m.date}
                    </span>
                  </div>

                  <ul className="space-y-2 mt-4">
                    {m.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : isCurrent ? (
                          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1.5 mr-1" />
                        )}
                        <span className={isCurrent ? 'font-semibold text-slate-900' : ''}>{task}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrent && (
                    <div className="mt-5 pt-4 border-t border-amber-200/80 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900">
                        Current Priority: Connect with alumni mentors in your field
                      </span>
                      <Link
                        to="/student/find-alumni"
                        className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-sm flex items-center gap-1"
                      >
                        <span>Find Mentors</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
