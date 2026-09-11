import { INITIAL_ALUMNI } from '../data/initialAlumni';
import { INITIAL_STUDENTS } from '../data/initialStudents';
import { getSeedUsers } from '../data/initialUsers';
import { INITIAL_OPPORTUNITIES } from '../data/initialOpportunities';
import { INITIAL_EVENTS } from '../data/initialEvents';

const KEYS = {
  USERS: 'uniconnect_users',
  STUDENTS: 'uniconnect_students',
  ALUMNI: 'uniconnect_alumni',
  AUTH_SESSION: 'uniconnect_auth_session',
  MENTORSHIP_REQUESTS: 'uniconnect_mentorship_requests',
  OPPORTUNITIES: 'uniconnect_opportunities',
  EVENTS: 'uniconnect_events',
  MESSAGES: 'uniconnect_messages',
  INITIALIZED: 'uniconnect_initialized_v1'
};

// Safe JSON parser
function safeParse(item, fallback) {
  if (!item) return fallback;
  try {
    return JSON.parse(item);
  } catch (e) {
    console.error("Storage parse error:", e);
    return fallback;
  }
}

// Initialize seed data if not present
export function initializeStorage() {
  if (!localStorage.getItem(KEYS.INITIALIZED)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(getSeedUsers()));
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
    localStorage.setItem(KEYS.ALUMNI, JSON.stringify(INITIAL_ALUMNI));
    localStorage.setItem(KEYS.OPPORTUNITIES, JSON.stringify(INITIAL_OPPORTUNITIES));
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    
    // Initial demo mentorship requests
    const initialRequests = [
      {
        id: "REQ001",
        studentId: "STU001",
        studentName: "Aryan Patil",
        studentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
        studentDepartment: "Computer Engineering",
        alumniId: "ALU001",
        alumniName: "Rahul Sharma",
        topic: "Technical Interview Guidance for AI Roles",
        preferredMode: "Online",
        status: "accepted", // pending | accepted | declined
        requestedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        note: "Hi Rahul, I saw your session on ML systems. Would love your advice on preparing for machine learning internships."
      },
      {
        id: "REQ002",
        studentId: "STU002",
        studentName: "Riya Sen",
        studentAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
        studentDepartment: "Design & Media Arts",
        alumniId: "ALU001",
        alumniName: "Rahul Sharma",
        topic: "Career Mentoring for Interdisciplinary Tech",
        preferredMode: "Online",
        status: "pending",
        requestedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        note: "Hello! As a design student keen on AI interfaces, I'd appreciate 20 mins to discuss product design for LLMs."
      }
    ];
    localStorage.setItem(KEYS.MENTORSHIP_REQUESTS, JSON.stringify(initialRequests));

    // Initial messages
    const initialMessages = [
      {
        id: "MSG001",
        senderId: "ALU001",
        receiverId: "STU001",
        text: "Hi Aryan! Happy to connect. Let's schedule a 30-min call this Saturday to review your ML project repo.",
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: "MSG002",
        senderId: "STU001",
        receiverId: "ALU001",
        text: "Thank you so much Rahul! Saturday 4 PM works great for me. I've sent the calendar invite.",
        timestamp: new Date(Date.now() - 3600000 * 20).toISOString()
      }
    ];
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(initialMessages));

    localStorage.setItem(KEYS.INITIALIZED, 'true');
  }
}

// 1. Users
export function getUsers() {
  initializeStorage();
  return safeParse(localStorage.getItem(KEYS.USERS), []);
}

export function saveUser(user) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id || u.username.toLowerCase() === user.username.toLowerCase());
  if (index >= 0) {
    users[index] = { ...users[index], ...user };
  } else {
    users.push(user);
  }
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  return user;
}

export function findUser(credential) {
  const users = getUsers();
  const search = credential.toLowerCase().trim();
  return users.find(u => 
    (u.username && u.username.toLowerCase() === search) || 
    (u.email && u.email.toLowerCase() === search)
  );
}

// 2. Student Profiles
export function getStudents() {
  initializeStorage();
  return safeParse(localStorage.getItem(KEYS.STUDENTS), []);
}

export function getStudentProfile(idOrUsername) {
  const students = getStudents();
  return students.find(s => s.id === idOrUsername || s.username.toLowerCase() === idOrUsername.toLowerCase());
}

export function saveStudentProfile(profile) {
  const students = getStudents();
  const index = students.findIndex(s => s.id === profile.id || s.username.toLowerCase() === profile.username.toLowerCase());
  if (index >= 0) {
    students[index] = { ...students[index], ...profile };
  } else {
    students.push(profile);
  }
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
  
  // Also update auth session if it's the active user
  const current = getCurrentUser();
  if (current && (current.id === profile.id || current.username === profile.username)) {
    setCurrentUserSession({ ...current, ...profile });
  }
  return profile;
}

// 3. Alumni Profiles
export function getAlumni() {
  initializeStorage();
  return safeParse(localStorage.getItem(KEYS.ALUMNI), []);
}

export function getAlumniProfile(idOrUsername) {
  const alumniList = getAlumni();
  return alumniList.find(a => a.id === idOrUsername || a.username.toLowerCase() === idOrUsername.toLowerCase());
}

export function saveAlumniProfile(profile) {
  const alumniList = getAlumni();
  const index = alumniList.findIndex(a => a.id === profile.id || a.username.toLowerCase() === profile.username.toLowerCase());
  if (index >= 0) {
    alumniList[index] = { ...alumniList[index], ...profile };
  } else {
    alumniList.push(profile);
  }
  localStorage.setItem(KEYS.ALUMNI, JSON.stringify(alumniList));

  // Update session if it's the active user
  const current = getCurrentUser();
  if (current && (current.id === profile.id || current.username === profile.username)) {
    setCurrentUserSession({ ...current, ...profile });
  }
  return profile;
}

// 4. Session Management
export function getCurrentUser() {
  const session = sessionStorage.getItem(KEYS.AUTH_SESSION) || localStorage.getItem(KEYS.AUTH_SESSION);
  return safeParse(session, null);
}

export function setCurrentUserSession(user, rememberMe = true) {
  // Never expose raw password in session
  const sanitized = { ...user };
  delete sanitized.password;
  
  const payload = JSON.stringify(sanitized);
  sessionStorage.setItem(KEYS.AUTH_SESSION, payload);
  if (rememberMe) {
    localStorage.setItem(KEYS.AUTH_SESSION, payload);
  }
}

export function logoutUser() {
  sessionStorage.removeItem(KEYS.AUTH_SESSION);
  localStorage.removeItem(KEYS.AUTH_SESSION);
}

// 5. Mentorship Requests
export function getMentorshipRequests() {
  initializeStorage();
  return safeParse(localStorage.getItem(KEYS.MENTORSHIP_REQUESTS), []);
}

export function createMentorshipRequest(request) {
  const requests = getMentorshipRequests();
  const newReq = {
    id: `REQ${Date.now()}`,
    requestedAt: new Date().toISOString(),
    status: 'pending',
    ...request
  };
  requests.unshift(newReq);
  localStorage.setItem(KEYS.MENTORSHIP_REQUESTS, JSON.stringify(requests));
  return newReq;
}

export function updateMentorshipRequestStatus(requestId, newStatus) {
  const requests = getMentorshipRequests();
  const idx = requests.findIndex(r => r.id === requestId);
  if (idx >= 0) {
    requests[idx].status = newStatus;
    localStorage.setItem(KEYS.MENTORSHIP_REQUESTS, JSON.stringify(requests));
    return requests[idx];
  }
  return null;
}

// 6. Opportunities
export function getOpportunities() {
  initializeStorage();
  return safeParse(localStorage.getItem(KEYS.OPPORTUNITIES), []);
}

export function saveOpportunity(opp) {
  const opps = getOpportunities();
  const newOpp = {
    id: `OPP${Date.now()}`,
    postedDate: 'Just now',
    applicantCount: 0,
    ...opp
  };
  opps.unshift(newOpp);
  localStorage.setItem(KEYS.OPPORTUNITIES, JSON.stringify(opps));
  return newOpp;
}

// 7. Events
export function getEvents() {
  initializeStorage();
  return safeParse(localStorage.getItem(KEYS.EVENTS), []);
}

export function rsvpEvent(eventId) {
  const events = getEvents();
  const idx = events.findIndex(e => e.id === eventId);
  if (idx >= 0) {
    events[idx].rsvpCount = (events[idx].rsvpCount || 0) + 1;
    events[idx].hasRsvpd = true;
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
    return events[idx];
  }
  return null;
}

// 8. Messages
export function getMessages(userId1, userId2) {
  initializeStorage();
  const allMessages = safeParse(localStorage.getItem(KEYS.MESSAGES), []);
  return allMessages.filter(m => 
    (m.senderId === userId1 && m.receiverId === userId2) ||
    (m.senderId === userId2 && m.receiverId === userId1)
  );
}

export function sendMessage(senderId, receiverId, text) {
  const allMessages = safeParse(localStorage.getItem(KEYS.MESSAGES), []);
  const msg = {
    id: `MSG${Date.now()}`,
    senderId,
    receiverId,
    text,
    timestamp: new Date().toISOString()
  };
  allMessages.push(msg);
  localStorage.setItem(KEYS.MESSAGES, JSON.stringify(allMessages));
  return msg;
}
