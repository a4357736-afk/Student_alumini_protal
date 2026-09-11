import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Sparkles, 
  Edit3, 
  Check, 
  X, 
  Building, 
  Award,
  HeartHandshake
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { calculateAlumniProfileCompletion } from '../../utils/gamification';
import { 
  COLLEGES, 
  DEPARTMENTS, 
  INDUSTRY_INTERESTS, 
  GUIDANCE_OPTIONS, 
  LOCATIONS_INDIA, 
  WORK_MODES, 
  MENTOR_STUDENT_AUDIENCE, 
  MENTORING_AVAILABILITY 
} from '../../data/taxonomy';

export default function AlumniProfile() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    college: user?.college || COLLEGES[0],
    department: user?.department || DEPARTMENTS[0],
    graduationYear: user?.graduationYear || '2020',
    specialization: user?.specialization || 'Artificial Intelligence',
    company: user?.company || 'Microsoft',
    jobRole: user?.jobRole || 'Senior ML Engineer',
    industry: user?.industry || 'Technology',
    experience: user?.experience || 4,
    location: user?.location || 'Pune',
    workMode: user?.workMode || 'Hybrid',
    bio: user?.bio || '',
    skills: user?.skills || ['Python', 'Machine Learning', 'AI', 'AWS'],
    mentoringAreas: user?.mentoringAreas || ['Technical Mentoring', 'Interview Preparation']
  });

  const [newSkill, setNewSkill] = useState('');
  const profileCompletion = calculateAlumniProfileCompletion(user);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    showToast('Alumni profile updated and saved to storage!');
  };

  const toggleArrayItem = (key, item) => {
    setFormData(prev => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"}
              alt={user?.name || "Alumni"}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-amber-400/30 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{user?.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                  Alumni Mentor
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                {user?.jobRole} at <strong className="text-slate-900">{user?.company}</strong>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {user?.department} • Class of {user?.graduationYear || '2020'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-700">Alumni Profile Strength</span>
            <span className="text-amber-600">{profileCompletion}% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-blue-600 transition-all duration-500"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Professional Journey & Work Details */}
      <form onSubmit={handleSave} className="space-y-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Professional Career</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Company</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900">{user?.company}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Job Role / Title</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.jobRole}
                  onChange={(e) => setFormData(prev => ({ ...prev, jobRole: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900">{user?.jobRole}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Years of Experience</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: Number(e.target.value) }))}
                  className="w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900">{user?.experience} years</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Work Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900">{user?.location} ({user?.workMode})</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Professional Bio</label>
            {isEditing ? (
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-blue-500 resize-none"
              />
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{user?.bio || 'Passionate alumnus mentoring current undergraduates.'}"
              </p>
            )}
          </div>
        </div>

        {/* Mentorship Offerings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-amber-500" />
            <span>Mentoring Areas & Offerings</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
              How you can guide students:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(isEditing ? GUIDANCE_OPTIONS : user?.mentoringAreas || []).map((area, idx) => {
                const isSelected = (formData.mentoringAreas || []).includes(area);
                return isEditing ? (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleArrayItem('mentoringAreas', area)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {area}
                  </button>
                ) : (
                  <span key={idx} className="text-xs px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-semibold">
                    {area}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}
