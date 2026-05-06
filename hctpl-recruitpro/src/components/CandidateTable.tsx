"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, ChevronRight } from "lucide-react";

export interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  status: "Screening" | "Shortlisted" | "Technical" | "Hired" | "Rejected";
  score?: number;
  match?: string;
}

interface CandidateTableProps {
  candidates: Candidate[];
  onSelect?: (candidate: Candidate) => void;
}

export default function CandidateTable({ candidates, onSelect }: CandidateTableProps) {
  const getStatusStyle = (status: Candidate["status"]) => {
    switch (status) {
      case "Hired": return "bg-green-100 text-green-700 border-green-200";
      case "Rejected": return "bg-red-100 text-red-700 border-red-200";
      case "Shortlisted": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Technical": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Candidate</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Target Role</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">AI Score</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {candidates.map((c) => (
            <motion.tr 
              key={c.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}
              className="group cursor-pointer"
              onClick={() => onSelect?.(c)}
            >
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 uppercase">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.experience} Experience</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 font-medium text-slate-600">{c.role}</td>
              <td className="px-6 py-5">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(c.status)}`}>
                  {c.status}
                </span>
              </td>
              <td className="px-6 py-5">
                {c.score ? (
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-blue" style={{ width: `${c.score}%` }} />
                    </div>
                    <span className="font-black text-xs text-slate-900">{c.score}%</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pending</span>
                )}
              </td>
              <td className="px-6 py-5 text-right">
                <button className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-brand-blue group-hover:text-white transition-all">
                  <ChevronRight size={18} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
