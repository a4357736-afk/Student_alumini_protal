import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Calendar, CheckCircle2, Clock, Send, Sparkles } from 'lucide-react';
import { getOpportunities } from '../../services/storageService';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

export default function StudentOpportunities() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [opportunities, setOpportunities] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    setOpportunities(getOpportunities());
  }, []);

  const handleApply = (opp) => {
    if (!appliedIds.includes(opp.id)) {
      setAppliedIds(prev => [...prev, opp.id]);
      showToast(`Applied for ${opp.title} at ${opp.company}! Your profile was forwarded to ${opp.postedBy}.`);
    } else {
      showToast(`You have already submitted an application for this role.`, 'info');
    }
  };

  const filtered = opportunities.filter(o => filterType === 'All' || o.type.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
            Campus Career Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Campus & Alumni Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Verified internships, job referrals, and research fellowships posted directly by university alumni.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {['All', 'Internship', 'Referral', 'Fellowship'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                filterType === t
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(opp => {
          const isApplied = appliedIds.includes(opp.id);

          return (
            <div key={opp.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-card transition flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                        {opp.type}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        {opp.stipend}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{opp.title}</h3>
                    <p className="text-xs font-semibold text-blue-600">{opp.company}</p>
                  </div>

                  <span className="text-[11px] text-slate-400 font-medium">
                    {opp.postedDate}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.location}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.duration}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {opp.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(opp.skills || []).map((sk, idx) => (
                    <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span>Referred by <strong>{opp.postedBy}</strong></span>
                </div>

                <button
                  onClick={() => handleApply(opp)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                    isApplied
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Applied</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>1-Click Apply</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
