import React from 'react';
import { Compass, CheckCircle2, Briefcase, GraduationCap, Award, HeartHandshake, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function ProfessionalJourney() {
  const { user } = useAuth();

  const careerSteps = [
    {
      roleTitle: "Undergraduate Student",
      org: user?.college || "ABC College of Engineering",
      period: `Graduated ${user?.graduationYear || '2020'}`,
      icon: GraduationCap,
      description: `Completed degree in ${user?.department || 'Computer Engineering'}. Built foundational coursework and campus capstone projects.`,
      highlight: "Alumni Roots"
    },
    {
      roleTitle: "Associate Software / ML Engineer",
      org: "Previous Tech Firm",
      period: "2020 - 2022",
      icon: Briefcase,
      description: "Honed production software design patterns, cloud CI/CD pipelines, and enterprise code testing.",
      highlight: "Early Career"
    },
    {
      roleTitle: user?.jobRole || "Senior ML Engineer",
      org: user?.company || "Microsoft",
      period: "2022 - Present",
      icon: Award,
      description: `Leading high-impact systems at ${user?.company}. Specializing in ${user?.specialization || 'distributed models and architectures'}.`,
      highlight: "Current Role"
    },
    {
      roleTitle: "Campus Alumni Mentor & Patron",
      org: "UniConnect University Community",
      period: "Active Mentorship",
      icon: HeartHandshake,
      description: `Dedicated to guiding undergraduate students, sharing industry knowledge, and posting exclusive campus job referrals.`,
      highlight: "Giving Back"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-soft">
        <span className="text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
          Career Evolution
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
          Your Professional Journey
        </h2>
        <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-xl leading-relaxed">
          Student → Graduate → Professional → Mentor. Your experience inspires students following in your footsteps.
        </p>
      </div>

      {/* Career Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
        <div className="relative border-l-2 border-blue-200 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-10">
          {careerSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-[38px] sm:-left-[54px] top-0 w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-soft transition space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        {step.highlight}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1.5">{step.roleTitle}</h4>
                      <p className="text-xs font-semibold text-blue-600">{step.org}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-xl self-start sm:self-auto">
                      {step.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
