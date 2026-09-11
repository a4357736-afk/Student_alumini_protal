import React from 'react';
import { BookOpen, ExternalLink, Sparkles, Code2, Cpu, Palette, FileText } from 'lucide-react';

export default function LearningHub() {
  const resources = [
    {
      title: "Alumni Guide: Cracking SDE & ML Interviews",
      curatedBy: "Rahul Sharma (Senior ML Engineer @ Microsoft)",
      category: "Tech Interview Prep",
      icon: Cpu,
      topics: ["System Design Fundamentals", "LeetCode Mediums to Master", "Behavioral Amazon STAR Framework"],
      link: "https://github.com"
    },
    {
      title: "Zero-to-One Product Management Playbook",
      curatedBy: "Ananya Deshmukh (Principal PM @ Amazon)",
      category: "Product Management",
      icon: Sparkles,
      topics: ["Writing Winning PRDs", "Metric Trees & A/B Testing", "Transitioning from Tech to PM"],
      link: "https://github.com"
    },
    {
      title: "Design Systems & Figma Component Architectures",
      curatedBy: "Tanvi Iyer (Senior Product Designer @ Airbnb)",
      category: "Design & UX",
      icon: Palette,
      topics: ["Figma Variables & Auto Layout", "Design Tokens", "Junior Portfolio Teardown"],
      link: "https://figma.com"
    },
    {
      title: "Enterprise Cybersecurity & CTF Roadmap",
      curatedBy: "Kunal Singhania (Security Architect @ Palo Alto)",
      category: "Cybersecurity",
      icon: Code2,
      topics: ["Zero Trust Security", "Wireshark & Packet Analysis", "CISSP Study Roadmap"],
      link: "https://github.com"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
          Campus Knowledge Library
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          Alumni Curated Learning Hub
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          Guides, interview roadmaps, and recommended open-source projects handpicked by graduates for campus undergraduates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-card transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>

                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Curated by {item.curatedBy}</p>

                <div className="mt-4 space-y-1.5">
                  {item.topics.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Access Material</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
