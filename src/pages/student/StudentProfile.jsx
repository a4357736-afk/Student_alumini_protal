import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Building, 
  MapPin, 
  Sparkles, 
  Edit3, 
  Check, 
  X, 
  Plus,
  Trophy,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { calculateStudentProfileCompletion } from '../../utils/gamification';
import { 
  COLLEGES, 
  DEPARTMENTS, 
  COURSES, 
  PREDEFINED_SKILLS, 
  CAREER_INTERESTS, 
  INDUSTRY_INTERESTS, 
  GUIDANCE_OPTIONS, 
  LOCATIONS_INDIA, 
  WORK_MODES 
} from '../../data/taxonomy';

export default function StudentProfile() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    college: user?.college || COLLEGES[0],
    department: user?.department || DEPARTMENTS[0],
    course: user?.course || COURSES[0],
    currentYear: user?.currentYear || '3rd Year',
    expectedGraduationYear: user?.expectedGraduationYear || '2028',
    bio: user?.bio || '',
    skills: user?.skills || ['Python', 'React', 'Machine Learning'],
    careerInterests: user?.careerInterests || ['AI / ML', 'Software Development'],
    industryInterests: user?.industryInterests || ['Technology'],
    careerGuidance: user?.careerGuidance || ['Technical Mentoring'],
    location: {
      preferredType: user?.location?.preferredType || 'Within India',
      cities: user?.location?.cities || ['Pune'],
      workMode: user?.location?.workMode || 'Hybrid'
    }
  });

  const [newSkill, setNewSkill] = useState('');
  const profileCompletion = calculateStudentProfileCompletion(user);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    showToast('Profile updated and saved to storage!');
  };

  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
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
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-blue-500/10 rounded-bl-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200"}
              alt={user?.name || "Student"}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-500/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{user?.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  Student
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                {user?.department} • {user?.course}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {user?.college} • Graduating {user?.expectedGraduationYear || '2028'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
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

        {/* Profile Completion Meter */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-700">Profile Strength</span>
            <span className="text-blue-600">{profileCompletion}% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-amber-500 transition-all duration-500"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Profile Form / Details View */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <span>Basic & Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900">{user?.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Mobile Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900">{user?.phone || '+91 98765 43210'}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Preferred Location</label>
              {isEditing ? (
                <select
                  value={formData.location.cities[0] || 'Pune'}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location, cities: [e.target.value] }
                  }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                >
                  {LOCATIONS_INDIA.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              ) : (
                <p className="text-sm font-semibold text-slate-900">
                  {user?.location?.cities?.join(', ') || 'Pune'} ({user?.location?.workMode || 'Hybrid'})
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Bio / About Me</label>
            {isEditing ? (
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 resize-none"
              />
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{user?.bio || 'Passionate undergraduate seeking alumni mentorship in tech.'}"
              </p>
            )}
          </div>
        </div>

        {/* Education Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Academic Background</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">College / University</label>
              {isEditing ? (
                <select
                  value={formData.college}
                  onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border text-xs"
                >
                  {COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : (
                <p className="text-sm font-semibold text-slate-900">{user?.college}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Department</label>
              {isEditing ? (
                <select
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border text-xs"
                >
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              ) : (
                <p className="text-sm font-semibold text-slate-900">{user?.department}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Course & Year</label>
              <p className="text-sm font-semibold text-slate-900">
                {user?.course} • {user?.currentYear || '3rd Year'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Expected Graduation</label>
              <p className="text-sm font-semibold text-slate-900">
                {user?.expectedGraduationYear || '2028'}
              </p>
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Skills & Interests</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Technical & Soft Skills</label>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? formData.skills : user?.skills || []).map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-blue-400 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill..."
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
                />
                <button
                  type="button"
                  onClick={() => addSkill(newSkill)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Career Guidance Goals</label>
            <div className="flex flex-wrap gap-1.5">
              {(isEditing ? formData.careerGuidance : user?.careerGuidance || []).map((guidance, idx) => (
                <span key={idx} className="text-xs px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-medium">
                  {guidance}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Badges & Milestones</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(user?.badges || [
              { title: "Profile Champion", icon: "🏆", desc: "Completed 80%+ profile" },
              { title: "Skill Builder", icon: "📚", desc: "Added 5+ verified skills" },
              { title: "Career Explorer", icon: "🎯", desc: "Explored 10+ alumni journeys" }
            ]).map((badge, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{badge.title}</h4>
                  <p className="text-[10px] text-slate-500">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </form>

    </div>
  );
}
