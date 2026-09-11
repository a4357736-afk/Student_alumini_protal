import { 
  findUser, 
  saveUser, 
  getStudentProfile, 
  getAlumniProfile, 
  saveStudentProfile, 
  saveAlumniProfile, 
  getCurrentUser, 
  setCurrentUserSession, 
  logoutUser 
} from './storageService';

export const authService = {
  login(credential, password) {
    const user = findUser(credential);
    if (!user) {
      return { success: false, message: "Incorrect username or password. Please try again." };
    }

    if (user.password !== password) {
      return { success: false, message: "Incorrect username or password. Please try again." };
    }

    // Retrieve full profile data
    let fullProfile = null;
    if (user.role === 'student') {
      fullProfile = getStudentProfile(user.id) || getStudentProfile(user.username);
    } else if (user.role === 'alumni') {
      fullProfile = getAlumniProfile(user.id) || getAlumniProfile(user.username);
    }

    const sessionUser = {
      ...user,
      ...(fullProfile || {})
    };

    setCurrentUserSession(sessionUser);
    return { 
      success: true, 
      user: sessionUser, 
      role: user.role 
    };
  },

  register(data) {
    const role = data.role; // 'student' or 'alumni'
    const id = role === 'student' ? `STU${Date.now().toString().slice(-4)}` : `ALU${Date.now().toString().slice(-4)}`;
    
    // Check if username/email already taken
    if (findUser(data.username)) {
      return { success: false, message: "Username already in use. Please choose another." };
    }
    if (findUser(data.email)) {
      return { success: false, message: "Email already registered. Please login." };
    }

    // Base user object for auth lookup
    const authUser = {
      id,
      username: data.username,
      password: data.password || "123456",
      role,
      name: data.name,
      email: data.email
    };
    saveUser(authUser);

    // Full profile object
    let profile = {
      id,
      ...data,
      role
    };

    if (role === 'student') {
      profile = {
        ...profile,
        journeyStage: 1,
        badges: [
          { id: "b1", title: "New Learner", icon: "🌱", desc: "Joined the UniConnect campus community" }
        ],
        connections: [],
        savedOpportunities: []
      };
      saveStudentProfile(profile);
    } else {
      profile = {
        ...profile,
        metrics: {
          studentsMentored: 0,
          opportunitiesShared: 0,
          eventsParticipated: 0,
          connectionsCount: 0
        },
        achievements: ["Campus Alumni Welcome Badge"]
      };
      saveAlumniProfile(profile);
    }

    // Set authenticated session immediately
    setCurrentUserSession(profile);

    return {
      success: true,
      user: profile,
      role
    };
  },

  getCurrentUser() {
    return getCurrentUser();
  },

  logout() {
    logoutUser();
  },

  isAuthenticated() {
    return !!getCurrentUser();
  }
};
