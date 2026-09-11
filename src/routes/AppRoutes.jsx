import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';

// Public Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentProfile from '../pages/student/StudentProfile';
import StudentJourney from '../pages/student/StudentJourney';
import FindAlumni from '../pages/student/FindAlumni';
import StudentOpportunities from '../pages/student/StudentOpportunities';
import StudentMentorship from '../pages/student/StudentMentorship';
import LearningHub from '../pages/student/LearningHub';
import StudentEvents from '../pages/student/StudentEvents';
import StudentAchievements from '../pages/student/StudentAchievements';
import StudentMessages from '../pages/student/StudentMessages';

// Alumni Pages
import AlumniDashboard from '../pages/alumni/AlumniDashboard';
import AlumniProfile from '../pages/alumni/AlumniProfile';
import ProfessionalJourney from '../pages/alumni/ProfessionalJourney';
import AlumniMentorship from '../pages/alumni/AlumniMentorship';
import AlumniStudents from '../pages/alumni/AlumniStudents';
import AlumniOpportunities from '../pages/alumni/AlumniOpportunities';
import AlumniEvents from '../pages/alumni/AlumniEvents';
import AlumniGiveBack from '../pages/alumni/AlumniGiveBack';
import AlumniAchievements from '../pages/alumni/AlumniAchievements';
import AlumniMessages from '../pages/alumni/AlumniMessages';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="journey" element={<StudentJourney />} />
        <Route path="find-alumni" element={<FindAlumni />} />
        <Route path="opportunities" element={<StudentOpportunities />} />
        <Route path="mentorship" element={<StudentMentorship />} />
        <Route path="learning-hub" element={<LearningHub />} />
        <Route path="events" element={<StudentEvents />} />
        <Route path="achievements" element={<StudentAchievements />} />
        <Route path="messages" element={<StudentMessages />} />
      </Route>

      {/* Protected Alumni Routes */}
      <Route
        path="/alumni"
        element={
          <ProtectedRoute allowedRole="alumni">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/alumni/dashboard" replace />} />
        <Route path="dashboard" element={<AlumniDashboard />} />
        <Route path="profile" element={<AlumniProfile />} />
        <Route path="journey" element={<ProfessionalJourney />} />
        <Route path="mentorship" element={<AlumniMentorship />} />
        <Route path="students" element={<AlumniStudents />} />
        <Route path="opportunities" element={<AlumniOpportunities />} />
        <Route path="events" element={<AlumniEvents />} />
        <Route path="give-back" element={<AlumniGiveBack />} />
        <Route path="achievements" element={<AlumniAchievements />} />
        <Route path="messages" element={<AlumniMessages />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
