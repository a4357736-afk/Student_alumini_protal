import React, { useState } from 'react';
import { X, Send, GraduationCap, Calendar, Clock, Video } from 'lucide-react';
import { createMentorshipRequest } from '../../services/storageService';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

export default function MentorshipRequestModal({ isOpen, onClose, alumni }) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [topic, setTopic] = useState('');
  const [preferredMode, setPreferredMode] = useState('Online');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !alumni) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      showToast('Please select or specify a mentorship topic', 'error');
      return;
    }

    setSubmitting(true);
    createMentorshipRequest({
      studentId: user?.id || 'STU001',
      studentName: user?.name || 'Aryan Patil',
      studentAvatar: user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300',
      studentDepartment: user?.department || 'Computer Engineering',
      studentYear: user?.currentYear || '3rd Year',
      alumniId: alumni.id,
      alumniName: alumni.name,
      alumniRole: alumni.jobRole,
      alumniCompany: alumni.company,
      topic,
      preferredMode,
      note: note || `Hi ${alumni.name}, I would love your guidance on ${topic}. Looking forward to connecting!`
    });

    setTimeout(() => {
      setSubmitting(false);
      showToast(`Mentorship request sent to ${alumni.name}!`);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Request Mentorship</h3>
              <p className="text-xs text-blue-200">Connect with {alumni.name} ({alumni.company})</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mentorship Topic / Focus Area *
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Choose a topic...</option>
              {(alumni.mentoringAreas || [
                "Technical Mentoring",
                "Interview Preparation",
                "Resume Review",
                "Career Guidance",
                "Project Guidance",
                "Job Referral"
              ]).map((area, idx) => (
                <option key={idx} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Preferred Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Online (Video / Google Meet)', 'Both (Online / Campus Meetup)'].map(mode => (
                <label
                  key={mode}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition ${
                    preferredMode === mode 
                      ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    checked={preferredMode === mode}
                    onChange={() => setPreferredMode(mode)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{mode}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Personalized Note / Question
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={`Share what you'd like guidance on, your project background, or a specific question for ${alumni.name}...`}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 text-[11px] text-amber-800 flex items-start gap-2">
            <span className="text-base">💡</span>
            <span>
              Mentors usually respond within 48 hours. You will receive an update in your Mentorship tab.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Sending Request...' : 'Send Request'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
