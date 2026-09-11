import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  User, 
  Lock, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

export default function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!credential.trim() || !password.trim()) {
      setError('Please enter both username/email and password.');
      return;
    }

    setLoading(true);
    const result = login(credential, password);
    setLoading(false);

    if (result.success) {
      showToast(`Welcome back, ${result.user.name || result.user.username}!`);
      if (result.role === 'student') {
        navigate('/student/dashboard');
      } else if (result.role === 'alumni') {
        navigate('/alumni/dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message || 'Incorrect username or password. Please try again.');
    }
  };

  const handleUseDemo = (demoType) => {
    if (demoType === 'student') {
      setCredential('student01');
      setPassword('123456');
      const res = login('student01', '123456');
      if (res.success) {
        showToast('Logged in as Student Demo (Aryan)');
        navigate('/student/dashboard');
      }
    } else if (demoType === 'alumni') {
      setCredential('alumni01');
      setPassword('123456');
      const res = login('alumni01', '123456');
      if (res.success) {
        showToast('Logged in as Alumni Demo (Rahul Sharma)');
        navigate('/alumni/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A142F] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 group-hover:scale-105 transition">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div className="text-left">
            <span className="text-2xl font-bold tracking-tight text-white block">UniConnect</span>
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase block">Student & Alumni Portal</span>
          </div>
        </Link>
        <h2 className="mt-6 text-2xl font-extrabold text-white tracking-tight">
          Welcome to Your Campus Portal
        </h2>
        <p className="mt-1 text-xs text-blue-200">
          “Different Journeys. Same Home.”
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/20">
          
          {/* Inline Error Alert */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Username / Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username or Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  placeholder="e.g. student01 or student@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => showToast('Demo accounts password is: 123456', 'info')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : 'Login to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

          {/* Demo Account Quick Access Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              Fast Demo Login (1-Click)
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleUseDemo('student')}
                className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/80 text-left transition group"
              >
                <span className="text-xs font-bold text-blue-900 block group-hover:text-blue-700">🎓 Student Demo</span>
                <span className="text-[10px] text-blue-600 block">Aryan • 3rd Year</span>
              </button>

              <button
                type="button"
                onClick={() => handleUseDemo('alumni')}
                className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/80 text-left transition group"
              >
                <span className="text-xs font-bold text-amber-900 block group-hover:text-amber-700">👨‍💼 Alumni Demo</span>
                <span className="text-[10px] text-amber-600 block">Rahul • Microsoft</span>
              </button>
            </div>
          </div>

          {/* Link to Register */}
          <div className="mt-6 text-center text-xs text-slate-600">
            <span>Don't have an account yet? </span>
            <Link to="/register" className="font-bold text-blue-600 hover:text-blue-800 underline">
              Start Your Journey
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
