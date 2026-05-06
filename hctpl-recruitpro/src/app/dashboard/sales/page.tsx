"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, ShieldCheck, Target, 
  Sparkles, FileSearch, CheckCircle2,
  XCircle, Briefcase, TrendingUp, Users,
  Download, FileSpreadsheet, Share2,
  Table as TableIcon
} from "lucide-react";
import Link from "next/link";
import AgentStatus from "@/components/AgentStatus";
import { mockCandidates, Candidate } from "@/utils/candidateData";

export default function SalesPage() {
  const [viewMode, setViewMode] = useState<"matching" | "excel">("matching");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("1");

  const shortlisted = mockCandidates.filter(c => c.status === "Technical" || c.status === "Shortlisted" || c.status === "Hired");
  const currentCandidate = shortlisted.find(c => c.id === selectedCandidateId) || shortlisted[0];

  const handleExportExcel = () => {
    // Simulate CSV generation
    const headers = "ID,Name,Role,Experience,Availability,Score,MatchScore,Email,Phone,Summary\n";
    const rows = shortlisted.map(c => `${c.id},${c.name},${c.role},${c.experience},${c.availability},${c.score},${c.matchScore},${c.email},${c.phone},"${c.summary}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RecruitPro_Shortlist_${new Date().toLocaleDateString()}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-100 p-8 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-brand-blue hover:bg-blue-50 transition-all">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">AI Sales Agent</h1>
                <AgentStatus status="idle" label="Ready" />
              </div>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">Decision Engine • Client Pitching Mode</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
               onClick={() => setViewMode(viewMode === "matching" ? "excel" : "matching")}
               className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-2"
            >
              {viewMode === "matching" ? <FileSpreadsheet size={14} /> : <TableIcon size={14} />}
              {viewMode === "matching" ? "View Excel Report" : "Back to Matching"}
            </button>
            <button 
              onClick={handleExportExcel}
              className="bg-brand-green text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-green-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Download size={14} /> Export for Client
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        
        {viewMode === "matching" ? (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* LEFT: MATCHING QUEUE */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Validated Shortlist</h3>
              <div className="space-y-4">
                {shortlisted.map((c) => (
                  <motion.div 
                    key={c.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCandidateId(c.id)}
                    className={`p-5 rounded-[2rem] cursor-pointer transition-all border ${selectedCandidateId === c.id ? "bg-white border-brand-blue shadow-xl shadow-blue-500/5" : "bg-white/50 border-slate-100 hover:bg-white"}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${c.matchScore > 90 ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                        {c.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{c.status}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT: DECISION DASHBOARD */}
            <div className="lg:col-span-3 space-y-8">
              <div className="glass-card p-10 rounded-[3rem] space-y-12">
                 <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-3xl bg-brand-blue/5 text-brand-blue">
                         <Target size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{currentCandidate.name}</h2>
                        <p className="text-sm text-slate-500 font-medium">Profile Score: <span className="font-black text-brand-blue">{currentCandidate.score}%</span> • Availability: <span className="font-bold text-slate-900">{currentCandidate.availability}</span></p>
                      </div>
                    </div>
                    <button className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-brand-blue transition-all">
                       <Share2 size={20} />
                    </button>
                 </div>

                 <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                       <Sparkles size={100} className="text-brand-blue" />
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center gap-2 text-brand-blue">
                         <Sparkles size={18} />
                         <span className="text-[10px] font-black uppercase tracking-widest">AI Justification Generator</span>
                      </div>
                      <p className="text-xl font-medium leading-relaxed">
                        "{currentCandidate.summary}"
                      </p>
                      <div className="pt-4 grid grid-cols-2 gap-8">
                         <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Screening Notes</p>
                            <p className="text-xs text-slate-300 italic">"{currentCandidate.notes}"</p>
                         </div>
                         <div className="space-y-2 text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contact Method</p>
                            <p className="text-xs text-slate-300">{currentCandidate.email}</p>
                         </div>
                      </div>
                    </div>
                 </div>
                 
                 <div className="flex justify-end gap-4">
                    <button className="bg-brand-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
                       Confirm for Client Pitch
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                     <FileSpreadsheet className="text-green-600" /> Excel-Formated Candidate Report
                  </h2>
                  <p className="text-xs font-medium text-slate-500 mt-1">Ready for client delivery • Shared via HCTPL Portal</p>
               </div>
               <button 
                  onClick={handleExportExcel}
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
               >
                  <Download size={14} /> Download .XLSX
               </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-medium text-slate-600 border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="px-6 py-4 font-black uppercase tracking-widest border-r border-slate-200">Candidate Name</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest border-r border-slate-200">Current Status</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest border-r border-slate-200">AI Score</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest border-r border-slate-200">Availability</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest border-r border-slate-200">Primary Skills</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest">Final Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {shortlisted.map((c) => (
                    <tr key={c.id} className="hover:bg-blue-50/30">
                      <td className="px-6 py-4 font-bold text-slate-900 border-r border-slate-100">{c.name}</td>
                      <td className="px-6 py-4 border-r border-slate-100">
                         <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md font-black text-[9px] uppercase">{c.status}</span>
                      </td>
                      <td className="px-6 py-4 font-black text-brand-blue border-r border-slate-100">{c.score}%</td>
                      <td className="px-6 py-4 border-r border-slate-100">{c.availability}</td>
                      <td className="px-6 py-4 border-r border-slate-100">{c.role}</td>
                      <td className="px-6 py-4 italic text-slate-500 truncate max-w-xs">{c.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">End of Report • Total Candidates: {shortlisted.length}</p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
