import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, SlidersHorizontal, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getAlumni } from '../../services/storageService';
import { getRankedAlumniForStudent } from '../../utils/matchingEngine';
import AlumniCard from '../../components/matching/AlumniCard';
import { DEPARTMENTS, INDUSTRY_INTERESTS } from '../../data/taxonomy';

export default function FindAlumni() {
  const { user } = useAuth();
  const [alumniList, setAlumniList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [sortBy, setSortBy] = useState('match'); // 'match' | 'experience' | 'name'

  useEffect(() => {
    const raw = getAlumni();
    const ranked = getRankedAlumniForStudent(user, raw);
    setAlumniList(ranked);
  }, [user]);

  const filtered = alumniList
    .filter(a => {
      const matchSearch = !search || 
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.company.toLowerCase().includes(search.toLowerCase()) ||
        a.jobRole.toLowerCase().includes(search.toLowerCase()) ||
        (a.skills || []).some(s => s.toLowerCase().includes(search.toLowerCase()));

      const matchDept = selectedDept === 'All' || a.department === selectedDept;
      const matchInd = selectedIndustry === 'All' || a.industry === selectedIndustry;

      return matchSearch && matchDept && matchInd;
    })
    .sort((a, b) => {
      if (sortBy === 'match') return (b.matchScore || 0) - (a.matchScore || 0);
      if (sortBy === 'experience') return (b.experience || 0) - (a.experience || 0);
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
            Alumni Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Find Alumni Mentors & Changemakers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Discover graduates from your college working across Big Tech, global finance, design studios, and high-growth startups. Filter by department, skills, or domain.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search alumni, company, skill..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Department */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          {/* Industry */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Industries</option>
            {INDUSTRY_INTERESTS.map(i => <option key={i} value={i}>{i}</option>)}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500 font-semibold text-blue-900"
          >
            <option value="match">⚡ Highest Match %</option>
            <option value="experience">💼 Most Experienced</option>
            <option value="name">🔤 Name (A-Z)</option>
          </select>

        </div>
      </div>

      {/* Results Count & Match Pill */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong className="text-slate-900">{filtered.length}</strong> alumni mentors</span>
        <span className="flex items-center gap-1 text-amber-600 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Scores tailored to your profile</span>
        </span>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(alumni => (
          <AlumniCard
            key={alumni.id}
            alumni={alumni}
            student={user}
            isConnected={user?.connections?.includes(alumni.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-soft">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">No alumni matched your filters</h4>
          <p className="text-xs text-slate-500 mt-1">Try broadening your search term or department filter.</p>
          <button
            onClick={() => { setSearch(''); setSelectedDept('All'); setSelectedIndustry('All'); }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
