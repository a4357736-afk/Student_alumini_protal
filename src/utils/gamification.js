/**
 * Gamification and Profile Completion Utilities
 */

export function calculateStudentProfileCompletion(student) {
  if (!student) return 0;

  const weights = [
    { field: 'name', weight: 10, valid: (v) => !!v && v.trim().length > 0 },
    { field: 'email', weight: 10, valid: (v) => !!v && v.includes('@') },
    { field: 'phone', weight: 5, valid: (v) => !!v && v.length > 5 },
    { field: 'college', weight: 10, valid: (v) => !!v },
    { field: 'department', weight: 10, valid: (v) => !!v },
    { field: 'course', weight: 5, valid: (v) => !!v },
    { field: 'skills', weight: 15, valid: (v) => Array.isArray(v) && v.length >= 3 },
    { field: 'careerInterests', weight: 10, valid: (v) => Array.isArray(v) && v.length > 0 },
    { field: 'industryInterests', weight: 5, valid: (v) => Array.isArray(v) && v.length > 0 },
    { field: 'careerGuidance', weight: 10, valid: (v) => Array.isArray(v) && v.length > 0 },
    { field: 'location', weight: 5, valid: (v) => !!v && (v.preferredType || (v.cities && v.cities.length > 0)) },
    { field: 'bio', weight: 5, valid: (v) => !!v && v.trim().length > 10 }
  ];

  let score = 0;
  weights.forEach(item => {
    if (item.valid(student[item.field])) {
      score += item.weight;
    }
  });

  return Math.min(100, Math.max(0, score));
}

export function calculateAlumniProfileCompletion(alumni) {
  if (!alumni) return 0;

  const weights = [
    { field: 'name', weight: 10, valid: (v) => !!v },
    { field: 'email', weight: 10, valid: (v) => !!v },
    { field: 'company', weight: 15, valid: (v) => !!v },
    { field: 'jobRole', weight: 15, valid: (v) => !!v },
    { field: 'industry', weight: 10, valid: (v) => !!v },
    { field: 'experience', weight: 10, valid: (v) => v !== undefined && v !== null },
    { field: 'skills', weight: 10, valid: (v) => Array.isArray(v) && v.length > 0 },
    { field: 'mentoringAreas', weight: 10, valid: (v) => Array.isArray(v) && v.length > 0 },
    { field: 'bio', weight: 10, valid: (v) => !!v && v.trim().length > 10 }
  ];

  let score = 0;
  weights.forEach(item => {
    if (item.valid(alumni[item.field])) {
      score += item.weight;
    }
  });

  return Math.min(100, Math.max(0, score));
}

export const BADGE_DEFINITIONS = {
  PROFILE_CHAMPION: {
    id: 'badge-profile-champion',
    name: 'Profile Champion',
    icon: '🏆',
    color: 'from-amber-400 to-yellow-500',
    description: 'Completed 80% or more of your profile information'
  },
  SKILL_BUILDER: {
    id: 'badge-skill-builder',
    name: 'Skill Builder',
    icon: '📚',
    color: 'from-blue-500 to-indigo-600',
    description: 'Added 5 or more industry-recognized skills'
  },
  CAREER_EXPLORER: {
    id: 'badge-career-explorer',
    name: 'Career Explorer',
    icon: '🎯',
    color: 'from-emerald-500 to-teal-600',
    description: 'Actively explored career paths & alumni journeys'
  },
  NETWORKER: {
    id: 'badge-networker',
    name: 'Networker',
    icon: '🤝',
    color: 'from-purple-500 to-pink-600',
    description: 'Initiated connections and mentorship conversations'
  },
  GUIDING_LIGHT: {
    id: 'badge-guiding-light',
    name: 'Guiding Light',
    icon: '🌟',
    color: 'from-amber-500 to-orange-500',
    description: 'Alumni providing active mentorship to next generation'
  }
};

export const STUDENT_JOURNEY_STAGES = [
  { step: 1, label: "Student", icon: "🎓", subtitle: "Currently studying", completed: true },
  { step: 2, label: "Build Skills", icon: "📚", subtitle: "Certifications & tech stack", completed: true },
  { step: 3, label: "Gain Experience", icon: "💼", subtitle: "Internships & projects", current: true },
  { step: 4, label: "Graduate", icon: "📜", subtitle: "Degree milestone", completed: false },
  { step: 5, label: "Alumni", icon: "👨‍💼", subtitle: "Professional industry", completed: false },
  { step: 6, label: "Mentor", icon: "🤝", subtitle: "Give back to campus", completed: false }
];

export const ALUMNI_JOURNEY_STAGES = [
  { step: 1, label: "Student", icon: "🎓", subtitle: "College roots", completed: true },
  { step: 2, label: "Graduate", icon: "📜", subtitle: "Conferred degree", completed: true },
  { step: 3, label: "Professional", icon: "💼", subtitle: "Industry leadership", completed: true },
  { step: 4, label: "Mentor", icon: "🤝", subtitle: "Guiding the next gen", current: true }
];
