import React from 'react';
import { GraduationCap, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0A142F] text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-white block">UniConnect</span>
                <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">Student & Alumni Portal</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A lifelong community of learners, builders and changemakers. Connecting current students with accomplished alumni.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Different Journeys. Same Home.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Community</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><a href="#about" className="hover:text-white transition">About UniConnect</a></li>
              <li><a href="#stories" className="hover:text-white transition">Alumni Stories</a></li>
              <li><Link to="/register" className="hover:text-white transition">Join the Network</Link></li>
            </ul>
          </div>

          {/* Mentorship & Careers */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Opportunities</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-300">Technical Mentorship</span></li>
              <li><span className="text-slate-300">Resume Review & Mock Interviews</span></li>
              <li><span className="text-slate-300">Campus Referrals & Internships</span></li>
              <li><span className="text-slate-300">Startup Guidance & Research</span></li>
            </ul>
          </div>

          {/* Demo Accounts & Tech info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Prototype Credentials</h4>
            <div className="space-y-2 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <p><strong className="text-blue-400">Student:</strong> student01 / 123456</p>
              <p><strong className="text-amber-400">Alumni:</strong> alumni01 / 123456</p>
              <p className="text-[11px] text-slate-500 pt-1">Dynamic matching & localStorage persistence enabled.</p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 UniConnect University Community. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Hackathon & University Excellence</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
