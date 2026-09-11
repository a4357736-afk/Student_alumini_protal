import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { saveStudentProfile, saveAlumniProfile } from '../services/storageService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = (credential, password) => {
    const res = authService.login(credential, password);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const register = (data) => {
    const res = authService.register(data);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    if (!user) return;
    const merged = { ...user, ...updatedData };
    if (user.role === 'student') {
      saveStudentProfile(merged);
    } else {
      saveAlumniProfile(merged);
    }
    setUser(merged);
    return merged;
  };

  return (
    <AuthContext.Provider value={{
      user,
      role: user?.role || null,
      isAuthenticated: !!user,
      loading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
