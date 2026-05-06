"use client";

import React from 'react';
import { Search, Calendar, User, GitBranch, X } from 'lucide-react';

interface FiltersProps {
  branches: string[];
  authors: string[];
  onFilterChange: (filters: any) => void;
  filters: any;
}

export default function CommitFilters({ branches, authors, onFilterChange, filters }: FiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-8">
      {/* Branch Selector */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <GitBranch size={12} /> Branch
        </label>
        <select 
          value={filters.branch}
          onChange={(e) => onFilterChange({ ...filters, branch: e.target.value })}
          className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all"
        >
          <option value="all">All Branches</option>
          {branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Author Selector */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <User size={12} /> Author
        </label>
        <select 
          value={filters.author}
          onChange={(e) => onFilterChange({ ...filters, author: e.target.value })}
          className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all"
        >
          <option value="all">All Authors</option>
          {authors.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {/* Date Start */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <Calendar size={12} /> From Date
        </label>
        <input 
          type="date"
          value={filters.startDate}
          onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
          className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all [color-scheme:dark]"
        />
      </div>

      {/* Date End */}
      <div className="space-y-2 relative">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <Calendar size={12} /> To Date
        </label>
        <div className="relative">
          <input 
            type="date"
            value={filters.endDate}
            onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all [color-scheme:dark]"
          />
          {(filters.branch !== 'all' || filters.author !== 'all' || filters.startDate || filters.endDate) && (
            <button 
              onClick={() => onFilterChange({ branch: 'all', author: 'all', startDate: '', endDate: '' })}
              className="absolute -right-2 -top-10 p-1 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500/30 transition-all"
              title="Reset Filters"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
