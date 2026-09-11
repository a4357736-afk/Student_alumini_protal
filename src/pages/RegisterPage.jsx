import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Lightbulb, 
  CheckCircle2, 
  Sparkles, 
  Briefcase, 
  Plus, 
  X, 
  ShieldCheck, 
  Check,
  Award,
  Globe,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { 
  COLLEGES, 
  DEPARTMENTS, 
  COURSES, 
  PREDEFINED_SKILLS, 
  CAREER_INTERESTS, 
  INDUSTRY_INTERESTS, 
  GUIDANCE_OPTIONS, 
  LOCATIONS_INDIA, 
  WORK_MODES, 
  MENTOR_STUDENT_AUDIENCE, 
  MENTORING_AVAILABILITY 
} from '../data/taxonomy';
import { 
  StudentAvatarIllustration, 
  EducationBooksIllustration, 
  IdeaLightbulbIllustration, 
  ThumbsUpIllustration, 
  CampusSilhouette 
} from '../components/common/CampusVector';

export default function RegisterPage() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Wizard state: 1 to 5, 6 is Success Celebration
  const [step, setStep] = useState(1);

  // Form Fields
  const [formData, setFormData] = useState({
    // Step 1: Yourself
    name: 'Aryan Patil',
    username: 'aryan_patil',
    email: 'aryan.patil@example.com',
    phone: '+91 98765 43210',
    dob: '2004-05-14',
    gender: 'Male',
    address: 'Campus Hostel Block B, University Campus',
    password: '123456',

    // Step 2: Education
    college: COLLEGES[0],
    course: 'B.Tech',
    department: 'Computer Engineering',
    yearOfJoining: '2023',
    expectedGraduationYear: '2027',
    studentId: 'STU-2023-8821',

    // Step 3: Role Choice
    role: 'student', // 'student' | 'alumni'

    // Step 4: Extras / Details (Student or Alumni)
    skills: ['Web Development', 'AI / ML', 'Python', 'React', 'Leadership'],
    bio: 'Third-year computer engineering student passionate about full-stack web applications and machine learning. Looking for alumni mentorship.',
    careerInterests: ['AI / ML', 'Software Development'],
    industryInterests: ['Technology', 'Startups'],
    careerGuidance: ['Technical Mentoring', 'Interview Preparation', 'Resume Review'],
    location: {
      preferredType: 'Within India',
      cities: ['Pune', 'Bangalore'],
      workMode: 'Hybrid'
    },
    mentorType: ['Technical Mentor', 'Interview Mentor'],

    // Alumni specific (if role === 'alumni')
    company: 'Microsoft',
    jobRole: 'Senior Software Engineer',
    industry: 'Technology',
    experience: 4,
    mentoringAreas: ['Technical Mentoring', 'Interview Preparation', 'Career Guidance'],
    mentorPreferences: {
      students: ['Final-year Students', 'Students looking for internships'],
      mode: 'Online',
      availability: 'Weekly'
    },

    // Step 5: Terms
    agreedToTerms: true
  });

  const [customSkillInput, setCustomSkillInput] = useState('');
  const [showAddSkillInput, setShowAddSkillInput] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trigger confetti when success screen is reached
  useEffect(() => {
    if (step === 6) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if canvas not supported
      }
    }
  }, [step]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationError('');
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => {
      const arr = prev[field] || [];
      const exists = arr.includes(item);
      return {
        ...prev,
        [field]: exists ? arr.filter(i => i !== item) : [...arr, item]
      };
    });
  };

  const addCustomSkill = () => {
    if (customSkillInput.trim() && !formData.skills.includes(customSkillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, customSkillInput.trim()]
      }));
      setCustomSkillInput('');
      setShowAddSkillInput(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  // Step Validation
  const validateAndNext = () => {
    setValidationError('');

    if (step === 1) {
      if (!formData.name.trim()) {
        setValidationError('Please enter your full name.');
        return;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setValidationError('Please provide a valid email address.');
        return;
      }
      if (!formData.username.trim()) {
        setValidationError('Please pick a username.');
        return;
      }
      if (!formData.phone.trim()) {
        setValidationError('Please enter your mobile phone number.');
        return;
      }
    }

    if (step === 2) {
      if (!formData.college || !formData.department || !formData.course) {
        setValidationError('Please fill in your academic details.');
        return;
      }
    }

    if (step === 3) {
      if (!formData.role) {
        setValidationError('Please select whether you are a Student or Alumni.');
        return;
      }
    }

    if (step === 4) {
      if (formData.skills.length === 0) {
        setValidationError('Please select or add at least one skill.');
        return;
      }
    }

    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step > 1) {
      setValidationError('');
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      setValidationError('Please agree to the Terms & Conditions to create your account.');
      return;
    }

    setIsSubmitting(true);
    const result = register(formData);
    setIsSubmitting(false);

    if (result.success) {
      setStep(6); // Success Celebration Screen
    } else {
      setValidationError(result.message || 'Registration failed. Please check your details.');
    }
  };

  const handleGoToDashboard = () => {
    if (formData.role === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/alumni/dashboard');
    }
  };

  // Step names matching reference image
  const stepTitles = [
    { num: 1, label: 'Yourself' },
    { num: 2, label: 'Education' },
    { num: 3, label: 'Your Journey' },
    { num: 4, label: 'Extras' },
    { num: 5, label: 'All Set!' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      
      {/* Top Header matching reference UI */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            UniConnect
          </span>
        </Link>

        {step < 6 && (
          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
            <span>Save & Exit</span>
          </button>
        )}
      </header>

      {/* Main Form Wizard Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stepper Progress Bar (Only visible steps 1 to 5) */}
        {step <= 5 && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-xl mx-auto relative">
              {/* Connecting Line */}
              <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${((step - 1) / 4) * 100}%` }}
                />
              </div>

              {stepTitles.map(st => {
                const isPassed = st.num < step;
                const isCurrent = st.num === step;

                return (
                  <div key={st.num} className="flex flex-col items-center relative z-10">
                    <button
                      type="button"
                      onClick={() => st.num < step && setStep(st.num)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPassed
                          ? 'bg-emerald-500 text-white shadow-sm ring-4 ring-emerald-100'
                          : isCurrent
                          ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100 scale-110'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4" /> : st.num}
                    </button>
                    <span className={`text-[11px] font-semibold mt-1.5 ${
                      isCurrent ? 'text-blue-600 font-bold' : isPassed ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Inline Error alert */}
        {validationError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-shake max-w-3xl mx-auto">
            <X className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* STEP 1: TELL US ABOUT YOURSELF (Matching Reference UI Panel 2) */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                    Step 1 of 5
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                    Tell us about yourself
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Let's start with the basics. We'd love to know you!
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Username *
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleChange('username', e.target.value)}
                      placeholder="e.g. aryan01"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="Enter your mobile number"
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Date of Birth & Gender Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => handleChange('dob', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Gender
                      </label>
                      <div className="flex items-center gap-4 pt-2">
                        {['Male', 'Female', 'Other'].map(gen => (
                          <label key={gen} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              checked={formData.gender === gen}
                              onChange={() => handleChange('gender', gen)}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span>{gen}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Address / City
                    </label>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="Enter your address or current campus residence"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Reference Character Graphic & Speech Bubble */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50/70 to-indigo-50/30 rounded-2xl border border-blue-100">
                <StudentAvatarIllustration className="w-48 h-48 drop-shadow-md" />
                <div className="mt-4 p-3.5 bg-white rounded-xl shadow-soft border border-blue-100 text-center relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-blue-100 transform rotate-45" />
                  <p className="text-base font-bold text-blue-900 font-caveat">
                    “Every great connection starts with a hello!”
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                disabled
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-400 text-xs font-bold cursor-not-allowed"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={validateAndNext}
                className="px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TELL US ABOUT YOUR EDUCATION (Matching Reference UI Panel 3) */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Education Form */}
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                    Step 2 of 5
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                    Tell us about your education
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Your academic journey shapes your story.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* College / University */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      College / University *
                    </label>
                    <select
                      value={formData.college}
                      onChange={(e) => handleChange('college', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {COLLEGES.map((col, idx) => (
                        <option key={idx} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>

                  {/* Course / Program */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Course / Program *
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => handleChange('course', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {COURSES.map((crs, idx) => (
                        <option key={idx} value={crs}>{crs}</option>
                      ))}
                    </select>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleChange('department', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {DEPARTMENTS.map((dept, idx) => (
                        <option key={idx} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year of Joining / Graduation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Year of Joining *
                      </label>
                      <select
                        value={formData.yearOfJoining}
                        onChange={(e) => handleChange('yearOfJoining', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'].map(yr => (
                          <option key={yr} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Expected / Graduation Year
                      </label>
                      <select
                        value={formData.expectedGraduationYear}
                        onChange={(e) => handleChange('expectedGraduationYear', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {['2028', '2027', '2026', '2025', '2024', '2023', '2022', '2021', '2020'].map(yr => (
                          <option key={yr} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Student ID */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Student / Enrollment ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => handleChange('studentId', e.target.value)}
                      placeholder="Enter your ID (if applicable)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                    />
                  </div>

                  {/* Tip box from reference UI */}
                  <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200/80 flex items-start gap-2.5">
                    <Lightbulb className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-purple-900 font-medium leading-relaxed">
                      You're building the foundation for an amazing future! Your academic records help us match you with alumni from your department.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Books Illustration */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-emerald-50/60 to-blue-50/30 rounded-2xl border border-emerald-100">
                <EducationBooksIllustration className="w-48 h-48 drop-shadow-md" />
                <div className="mt-4 p-3.5 bg-white rounded-xl shadow-soft border border-emerald-100 text-center">
                  <p className="text-base font-bold text-emerald-900 font-caveat">
                    “Education today, a brighter tomorrow.”
                  </p>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={validateAndNext}
                className="px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CHOOSE YOUR JOURNEY (DYNAMIC ROLE ALLOCATION - Panel 4) */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                Step 3 of 5
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Choose your journey
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                You're part of our community in your own unique way. Select the option that best describes you.
              </p>
            </div>

            {/* Interactive Role Cards matching Panel 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              
              {/* STUDENT CARD */}
              <div
                onClick={() => handleChange('role', 'student')}
                className={`rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                  formData.role === 'student'
                    ? 'border-blue-600 bg-blue-50/50 shadow-xl ring-4 ring-blue-500/15 scale-[1.02]'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                {/* Radio indicator */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    formData.role === 'student' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}>
                    {formData.role === 'student' && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>🎓 I am a Student</span>
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mt-1">
                    Currently pursuing my course
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[
                      'Access learning resources & roadmaps',
                      'Find exclusive internships & referrals',
                      'Connect with alumni mentors',
                      'Build verified skills and portfolio'
                    ].map((perk, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/80 text-center">
                  <span className={`text-xs font-bold ${formData.role === 'student' ? 'text-blue-700' : 'text-slate-400'}`}>
                    {formData.role === 'student' ? '✓ Selected Journey' : 'Click to Select'}
                  </span>
                </div>
              </div>

              {/* ALUMNI CARD */}
              <div
                onClick={() => handleChange('role', 'alumni')}
                className={`rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                  formData.role === 'alumni'
                    ? 'border-amber-500 bg-amber-50/40 shadow-xl ring-4 ring-amber-500/15 scale-[1.02]'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                {/* Radio indicator */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    formData.role === 'alumni' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                  }`}>
                    {formData.role === 'alumni' && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>👨‍💼 I am an Alumni</span>
                  </h3>
                  <p className="text-xs font-semibold text-amber-600 mt-1">
                    I have graduated from the college
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[
                      'Mentor current university students',
                      'Share your industry experience & talks',
                      'Expand your alumni professional network',
                      'Give back to your college community'
                    ].map((perk, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/80 text-center">
                  <span className={`text-xs font-bold ${formData.role === 'alumni' ? 'text-amber-700' : 'text-slate-400'}`}>
                    {formData.role === 'alumni' ? '✓ Selected Journey' : 'Click to Select'}
                  </span>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={validateAndNext}
                className="px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: A FEW MORE DETAILS (Panel 5 - DYNAMIC STUDENT / ALUMNI BRANCH) */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Content */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                    Step 4 of 5
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                    A few more details
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Help us personalize your experience.
                  </p>
                </div>

                {/* SKILLS TAGGER (Both roles) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Skills / Areas of Interest *
                  </label>
                  
                  {/* Selected Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold group"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-blue-500 hover:text-blue-800"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}

                    <button
                      type="button"
                      onClick={() => setShowAddSkillInput(true)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-xl border border-dashed border-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-600 text-xs font-semibold transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add custom skill</span>
                    </button>
                  </div>

                  {/* Add Custom Skill Input Form */}
                  {showAddSkillInput && (
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={customSkillInput}
                        onChange={(e) => setCustomSkillInput(e.target.value)}
                        placeholder="Type skill (e.g. Next.js, Cloud, Docker)"
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
                      />
                      <button
                        type="button"
                        onClick={addCustomSkill}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  )}

                  {/* Quick Skill Recommendations Pills */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Popular suggestions (click to add):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {PREDEFINED_SKILLS.slice(0, 10).map((skill, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => !formData.skills.includes(skill) && handleChange('skills', [...formData.skills, skill])}
                          className={`text-xs px-2.5 py-1 rounded-lg transition ${
                            formData.skills.includes(skill)
                              ? 'bg-blue-600 text-white font-bold'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tell us about yourself / Short Bio textarea */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Tell us about yourself / Short Bio
                    </label>
                    <span className="text-[11px] text-slate-400">{formData.bio?.length || 0}/300</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={300}
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    placeholder="Share your interests, achievements, career goals or anything you're passionate about..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 resize-none"
                  />
                </div>

                {/* DYNAMIC FORM: STUDENT BRANCH */}
                {formData.role === 'student' && (
                  <>
                    {/* Career Interests */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        What are your career interests?
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {CAREER_INTERESTS.slice(0, 8).map((interest, idx) => {
                          const isSelected = formData.careerInterests.includes(interest);
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => toggleArrayItem('careerInterests', interest)}
                              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                                isSelected
                                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {interest}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Mentoring & Guidance Needed */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        What kind of guidance are you looking for?
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {GUIDANCE_OPTIONS.slice(0, 6).map((guidance, idx) => {
                          const isSelected = formData.careerGuidance.includes(guidance);
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => toggleArrayItem('careerGuidance', guidance)}
                              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                                isSelected
                                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {guidance}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preferred Work Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Target Location
                        </label>
                        <select
                          value={formData.location.cities[0] || 'Pune'}
                          onChange={(e) => handleNestedChange('location', 'cities', [e.target.value, 'Bangalore'])}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                        >
                          {LOCATIONS_INDIA.map((city, idx) => (
                            <option key={idx} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Work Mode
                        </label>
                        <select
                          value={formData.location.workMode}
                          onChange={(e) => handleNestedChange('location', 'workMode', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                        >
                          {WORK_MODES.map((mode, idx) => (
                            <option key={idx} value={mode}>{mode}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* DYNAMIC FORM: ALUMNI BRANCH */}
                {formData.role === 'alumni' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Current Company *
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          placeholder="e.g. Google, Microsoft, Startup"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Job Role / Title *
                        </label>
                        <input
                          type="text"
                          value={formData.jobRole}
                          onChange={(e) => handleChange('jobRole', e.target.value)}
                          placeholder="e.g. Senior Software Engineer"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Years of Industry Experience
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="40"
                          value={formData.experience}
                          onChange={(e) => handleChange('experience', Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Industry Domain
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => handleChange('industry', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                        >
                          {INDUSTRY_INTERESTS.map((ind, idx) => (
                            <option key={idx} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Mentoring Offerings */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        How can you help university students?
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {GUIDANCE_OPTIONS.map((area, idx) => {
                          const isSelected = (formData.mentoringAreas || []).includes(area);
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => toggleArrayItem('mentoringAreas', area)}
                              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                                isSelected
                                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {area}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* Right Column: Character with Lightbulb */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50/60 to-blue-50/30 rounded-2xl border border-purple-100">
                <IdeaLightbulbIllustration className="w-48 h-48 drop-shadow-md" />
                <div className="mt-4 p-3.5 bg-white rounded-xl shadow-soft border border-purple-100 text-center">
                  <p className="text-base font-bold text-purple-900 font-caveat">
                    “Skills build opportunities. Passion builds extraordinary stories.”
                  </p>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={validateAndNext}
                className="px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & CREATE ACCOUNT (Panel 6) */}
        {step === 5 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Summary Card */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
                    Step 5 of 5
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                    Review & Create Account
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    You're almost there! Let's make sure everything looks good.
                  </p>
                </div>

                {/* Summary Table Card matching Panel 6 */}
                <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 space-y-3">
                  
                  {/* Avatar + Top Info */}
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                    <img
                      src={formData.role === 'student'
                        ? "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"
                        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                      }
                      alt={formData.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/30"
                    />
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{formData.name}</h4>
                      <p className="text-xs font-semibold text-blue-600 capitalize">
                        {formData.role === 'student' ? 'Student Member' : 'Alumni Network'}
                      </p>
                    </div>
                  </div>

                  {/* Field Rows with Edit links */}
                  {[
                    { label: 'Name', value: formData.name, stepTarget: 1 },
                    { label: 'Email', value: formData.email, stepTarget: 1 },
                    { label: 'Mobile', value: formData.phone, stepTarget: 1 },
                    { label: 'College', value: formData.college, stepTarget: 2 },
                    { label: 'Course', value: formData.course, stepTarget: 2 },
                    { label: 'Department', value: formData.department, stepTarget: 2 },
                    { label: 'Year', value: formData.yearOfJoining, stepTarget: 2 },
                    { label: 'Role', value: formData.role === 'student' ? 'Student' : 'Alumni', stepTarget: 3 },
                    { label: 'Skills', value: formData.skills.join(', '), stepTarget: 4 }
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/60 last:border-0">
                      <span className="font-semibold text-slate-500 w-28">{row.label}</span>
                      <span className="font-bold text-slate-800 flex-1 truncate px-2">{row.value}</span>
                      <button
                        type="button"
                        onClick={() => setStep(row.stepTarget)}
                        className="text-blue-600 hover:text-blue-800 font-bold hover:underline ml-2"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>

                {/* Terms & Conditions Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      I agree to the <strong className="text-blue-700 underline">Terms & Conditions</strong> and <strong className="text-blue-700 underline">Privacy Policy</strong> of the university portal.
                    </span>
                  </label>
                </div>

              </div>

              {/* Right Column: Thumbs Up Character */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50/60 to-yellow-50/30 rounded-2xl border border-amber-100">
                <ThumbsUpIllustration className="w-48 h-48 drop-shadow-md" />
                <div className="mt-4 p-3.5 bg-white rounded-xl shadow-soft border border-amber-100 text-center">
                  <p className="text-base font-bold text-amber-900 font-caveat">
                    “Looks great! You're ready to go.”
                  </p>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/25 transition flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? 'Creating Profile...' : 'Create Account 🪄'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: CELEBRATION / SUCCESS SCREEN (Panel 7) */}
        {step === 6 && (
          <div className="bg-[#0A142F] text-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-white/10 text-center relative overflow-hidden">
            
            {/* Top Go to Login link */}
            <div className="absolute top-6 right-6">
              <Link
                to="/login"
                className="text-xs text-blue-300 hover:text-white border border-white/20 px-3 py-1.5 rounded-xl hover:bg-white/5 transition"
              >
                Go to Login
              </Link>
            </div>

            {/* Glowing Green Checkmark Badge with Confetti Burst */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-glow animate-bounce">
                <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
              </div>
            </div>

            {/* Heading & Subtitle matching Panel 7 */}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome to UniConnect!
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
              Your account has been created successfully. A new chapter begins — and we're excited to have you!
            </p>

            {/* Milestone Badge Ladder matching Panel 7 */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 my-8">
              {[
                { label: 'Student', bg: 'bg-blue-600 text-white' },
                { label: 'Graduate', bg: 'bg-teal-600 text-white' },
                { label: 'Alumni', bg: 'bg-amber-500 text-slate-950 font-extrabold' },
                { label: 'Mentor', bg: 'bg-purple-600 text-white' }
              ].map((ladder, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-md ${ladder.bg} flex items-center gap-1.5`}
                >
                  <span>✓</span>
                  <span>{ladder.label}</span>
                </div>
              ))}
            </div>

            {/* 4 Feature Highlights matching Panel 7 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
              {[
                { icon: Briefcase, title: 'Explore Opportunities', color: 'text-blue-400' },
                { icon: Users, title: 'Connect with Peers', color: 'text-emerald-400' },
                { icon: TrendingUp, title: 'Learn & Grow', color: 'text-purple-400' },
                { icon: Building, title: 'Be a Part of a Legacy', color: 'text-amber-400' }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
                    <Icon className={`w-6 h-6 mb-2 ${feat.color}`} />
                    <span className="text-xs font-semibold text-slate-200">{feat.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Primary Action Button */}
            <div className="mb-8">
              <button
                type="button"
                onClick={handleGoToDashboard}
                className="px-10 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-500/30 transition hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Campus Night Silhouette with Lit Tower */}
            <div className="mt-8 pt-4 border-t border-white/10">
              <CampusSilhouette className="w-full h-20 opacity-40 mx-auto" />
              
              <div className="mt-4 space-y-1">
                <p className="text-base sm:text-lg text-amber-300 font-caveat">
                  “Once a part of our community, Always a part of our family.”
                </p>
                <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                  Different Journeys. Same Home. 💛
                </p>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
