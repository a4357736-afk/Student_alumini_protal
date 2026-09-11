import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, MapPin, Sparkles, MessageSquare, Send } from 'lucide-react';
import { getStudents } from '../../services/storageService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Link } from 'react-router-dom';

export default function AlumniStudents() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const filtered = students.filter(s => 
    !search ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.department.toLowerCase().includes(search.toLowerCase()) ||
    (s.skills || []).some(sk => sk.toLowerCase().includes(search.toLowerCase())) ||
    (s.careerInterests || []).some(ci => ci.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
            Mentees Discovery
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Connect With Students Seeking Mentorship
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Discover passionate undergraduates in your department eager to learn about your industry domain.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student skill, interest..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(stu => (
          <div key={stu.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-card transition flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5">
                <img
                  src={stu.avatar}
                  alt={stu.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20 shrink-0"
                />
                <div>
                  <h4 className="text-base font-bold text-slate-900">{stu.name}</h4>
                  <p className="text-xs font-semibold text-blue-600">{stu.department}</p>
                  <p className="text-xs text-slate-500">{stu.course} • {stu.currentYear}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed line-clamp-2 italic">
                "{stu.bio}"
              </p>

              <div className="mt-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Skills:
                </span>
                <div className="flex flex-wrap gap-1">
                  {(stu.skills || []).map((sk, idx) => (
                    <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Seeking Guidance in:
                </span>
                <div className="flex flex-wrap gap-1">
                  {(stu.careerGuidance || []).slice(0, 2).map((cg, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 font-semibold">
                      {cg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Graduating {stu.expectedGraduationYear || '2028'}
              </span>
              <Link
                to="/alumni/messages"
                className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Message</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
