/**
 * UniConnect Weighted Student-Alumni Matching Algorithm
 * 
 * Weights:
 * - Skills Match = 25%
 * - Career Interest Match = 20%
 * - Industry Match = 15%
 * - Department/Course Match = 15%
 * - Mentoring Requirement Match = 15%
 * - Location Match = 5%
 * - Experience Relevance = 5%
 * Total = 100%
 */

export function calculateMatchScore(student, alumni) {
  if (!student || !alumni) {
    return { score: 50, matchedSkills: [], reasons: [] };
  }

  const reasons = [];
  let totalScore = 0;

  // 1. Skills Match (25%)
  const studentSkills = Array.isArray(student.skills) ? student.skills.map(s => s.toLowerCase().trim()) : [];
  const alumniSkills = Array.isArray(alumni.skills) ? alumni.skills.map(s => s.toLowerCase().trim()) : [];
  
  const matchedSkillsRaw = (alumni.skills || []).filter(askill => 
    studentSkills.some(sskill => sskill.toLowerCase() === askill.toLowerCase())
  );

  let skillsScore = 0;
  if (studentSkills.length > 0 && alumniSkills.length > 0) {
    const commonCount = matchedSkillsRaw.length;
    const ratio = commonCount / Math.max(studentSkills.length, 1);
    skillsScore = Math.min(25, Math.round(ratio * 25));
    if (commonCount > 0) {
      totalScore += skillsScore;
      reasons.push(`Matching skills: ${matchedSkillsRaw.slice(0, 3).join(', ')}`);
    }
  } else {
    totalScore += 12; // Baseline if empty
  }

  // 2. Career Interest Match (20%)
  const careerInterests = (student.careerInterests || []).map(c => c.toLowerCase());
  const alumniRoleLower = (alumni.jobRole || '').toLowerCase();
  const alumniSpecialization = (alumni.specialization || '').toLowerCase();

  let careerScore = 0;
  let hasCareerMatch = false;
  careerInterests.forEach(interest => {
    if (
      alumniRoleLower.includes(interest) || 
      interest.includes(alumniRoleLower) ||
      (interest.includes('ai') && (alumniRoleLower.includes('ml') || alumniRoleLower.includes('ai'))) ||
      (interest.includes('software') && (alumniRoleLower.includes('engineer') || alumniRoleLower.includes('developer'))) ||
      (interest.includes('design') && alumniRoleLower.includes('design')) ||
      (interest.includes('product') && alumniRoleLower.includes('product')) ||
      (interest.includes('data') && alumniRoleLower.includes('data')) ||
      (interest.includes('security') && alumniRoleLower.includes('security')) ||
      (interest.includes('finance') && (alumniRoleLower.includes('finance') || alumniRoleLower.includes('vp'))) ||
      (interest.includes('entrepreneur') && (alumniRoleLower.includes('founder') || alumniRoleLower.includes('ceo')))
    ) {
      hasCareerMatch = true;
    }
  });

  if (hasCareerMatch) {
    careerScore = 20;
    totalScore += careerScore;
    reasons.push(`Career pathway aligns with ${alumni.name}'s role as ${alumni.jobRole}`);
  } else {
    // Partial score
    careerScore = 8;
    totalScore += careerScore;
  }

  // 3. Industry Match (15%)
  const studentIndustries = (student.industryInterests || []).map(i => i.toLowerCase());
  const alumniIndustry = (alumni.industry || '').toLowerCase();

  if (studentIndustries.some(ind => ind === alumniIndustry || alumniIndustry.includes(ind) || ind.includes(alumniIndustry))) {
    totalScore += 15;
    reasons.push(`Both focused on the ${alumni.industry} industry`);
  } else {
    totalScore += 6;
  }

  // 4. Department / Course Match (15%)
  const sameDept = student.department && alumni.department && 
    (student.department.toLowerCase() === alumni.department.toLowerCase() ||
     student.department.toLowerCase().includes(alumni.department.toLowerCase()) ||
     alumni.department.toLowerCase().includes(student.department.toLowerCase()));

  const sameCourse = student.course && alumni.course &&
    student.course.toLowerCase() === alumni.course.toLowerCase();

  if (sameDept && sameCourse) {
    totalScore += 15;
    reasons.push(`Alumni from your exact course & department (${alumni.department})`);
  } else if (sameDept) {
    totalScore += 12;
    reasons.push(`Shared department: ${alumni.department}`);
  } else {
    totalScore += 5;
  }

  // 5. Mentoring Requirement Match (15%)
  const studentGuidance = (student.careerGuidance || student.mentorType || []).map(g => g.toLowerCase());
  const alumniOfferings = (alumni.mentoringAreas || []).map(a => a.toLowerCase());

  const matchingGuidance = (alumni.mentoringAreas || []).filter(area => 
    studentGuidance.some(req => req.includes(area.toLowerCase()) || area.toLowerCase().includes(req))
  );

  if (matchingGuidance.length >= 2) {
    totalScore += 15;
    reasons.push(`${alumni.name} actively offers ${matchingGuidance.slice(0, 2).join(' & ')}`);
  } else if (matchingGuidance.length === 1) {
    totalScore += 10;
    reasons.push(`${alumni.name} offers ${matchingGuidance[0]}`);
  } else {
    totalScore += 5;
  }

  // 6. Location Match (5%)
  const preferredCities = student.location?.cities || [];
  const alumniLocation = alumni.location || '';
  const isCityMatch = preferredCities.some(city => 
    alumniLocation.toLowerCase().includes(city.toLowerCase()) || 
    city.toLowerCase().includes(alumniLocation.toLowerCase())
  );
  const isRemoteFriendly = alumni.workMode === 'Remote' || alumni.workMode === 'Hybrid' || student.location?.workMode === 'Remote';

  if (isCityMatch) {
    totalScore += 5;
    reasons.push(`Based in your target location (${alumni.location})`);
  } else if (isRemoteFriendly) {
    totalScore += 4;
    reasons.push(`Supports ${alumni.workMode || 'Remote'} mentorship`);
  } else {
    totalScore += 2;
  }

  // 7. Experience Relevance (5%)
  const exp = Number(alumni.experience) || 3;
  if (exp >= 4 && exp <= 10) {
    totalScore += 5;
    reasons.push(`${exp} years of seasoned industry experience`);
  } else if (exp > 10) {
    totalScore += 4;
    reasons.push(`${exp}+ years senior industry veteran`);
  } else {
    totalScore += 3;
    reasons.push(`Recent graduate relatable mentor (${exp} years exp)`);
  }

  // Cap between 60% and 98% for realistic natural prototype scores
  const finalScore = Math.min(98, Math.max(62, totalScore));

  return {
    score: finalScore,
    matchedSkills: matchedSkillsRaw,
    reasons: reasons.slice(0, 4) // Clean top 3-4 reasons
  };
}

/**
 * Returns alumni sorted by highest match score for a given student
 */
export function getRankedAlumniForStudent(student, alumniList) {
  if (!alumniList || alumniList.length === 0) return [];
  
  return alumniList
    .map(alumni => {
      const matchData = calculateMatchScore(student, alumni);
      return {
        ...alumni,
        matchScore: matchData.score,
        matchedSkills: matchData.matchedSkills,
        matchReasons: matchData.reasons
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
