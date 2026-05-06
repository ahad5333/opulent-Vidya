"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, User, Calendar, ExternalLink, ChevronRight } from 'lucide-react';

interface Commit {
  hash: string;
  fullHash: string;
  author: string;
  email: string;
  date: string;
  message: string;
  branch: string;
}

interface CommitListProps {
  commits: Commit[];
}

export default function CommitList({ commits }: CommitListProps) {
  if (commits.length === 0) {
    return (
      <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
        <GitCommit size={48} className="mx-auto text-slate-600 mb-4 opacity-20" />
        <p className="text-slate-400 font-medium">No commits match your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {commits.map((commit, idx) => (
        <motion.div
          key={commit.fullHash}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(idx * 0.05, 1) }}
          className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-blue-500/30 transition-all cursor-default"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-black rounded uppercase tracking-widest border border-blue-500/20">
                  {commit.hash}
                </div>
                <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded uppercase tracking-widest border border-emerald-500/20">
                  {commit.branch}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
                {commit.message}
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-slate-500" />
                  {commit.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-500" />
                  {new Date(commit.date).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.open(`https://github.com/ahad5333/hctpl-website/commit/${commit.fullHash}`, '_blank')}
                className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all"
                title="View on GitHub"
              >
                <ExternalLink size={18} />
              </button>
              <ChevronRight size={20} className="text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          {/* Decorative side line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-all" />
        </motion.div>
      ))}
    </div>
  );
}
