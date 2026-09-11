import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, MapPin, Clock, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { getOpportunities, saveOpportunity } from '../../services/storageService';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';
import { PREDEFINED_SKILLS } from '../../data/taxonomy';

export default function AlumniOpportunities() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [opportunities, setOpportunities] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company: user?.company || '',
    type: 'Internship',
    stipend: '₹40,000 / month',
    duration: '3 Months',
    location: user?.location || 'Pune',
    skills: ['Python', 'Machine Learning'],
    description: ''
  });

  useEffect(() => {
    setOpportunities(getOpportunities());
  }, []);

  const handlePost = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.company.trim()) {
      showToast('Please provide a title and company', 'error');
      return;
    }

    saveOpportunity({
      ...formData,
      postedBy: user?.name || 'Alumni Mentor',
      alumniId: user?.id || 'ALU001',
      deadline: '30 Oct 2026'
    });

    setOpportunities(getOpportunities());
    setShowPostModal(false);
    showToast('Opportunity successfully posted to the campus pipeline!');
    setFormData({
      title: '',
      company: user?.company || '',
      type: 'Internship',
      stipend: '₹40,000 / month',
      duration: '3 Months',
      location: user?.location || 'Pune',
      skills: ['Python', 'Machine Learning'],
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Campus Referral Board
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Share Opportunities With Students
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Post internships, full-time referrals, and research projects directly for current undergraduates.
          </p>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md shadow-amber-400/20 transition flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </button>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map(opp => (
          <div key={opp.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                    {opp.type}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{opp.title}</h3>
                  <p className="text-xs font-semibold text-blue-600">{opp.company}</p>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                  {opp.stipend}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
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

              <p className="text-xs text-slate-600 mt-3 line-clamp-3">
                {opp.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {(opp.skills || []).map((sk, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Posted by {opp.postedBy}</span>
              <span className="font-bold text-blue-600 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{opp.applicantCount || 0} Student Applicants</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-950 to-indigo-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-bold">Post a Student Opportunity</h3>
              <button onClick={() => setShowPostModal(false)} className="text-white hover:text-slate-300">
                ✕
              </button>
            </div>

            <form onSubmit={handlePost} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Opportunity Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Machine Learning Engineering Intern"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time / Referral">Full-time / Referral</option>
                    <option value="Fellowship">Fellowship</option>
                    <option value="Research Project">Research Project</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Stipend / CTC</label>
                  <input
                    type="text"
                    value={formData.stipend}
                    onChange={(e) => setFormData(prev => ({ ...prev, stipend: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the projects, expected skills, and mentor support..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Publish Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
