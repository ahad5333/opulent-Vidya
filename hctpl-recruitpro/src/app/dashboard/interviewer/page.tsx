"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Cpu, Code2, 
  Terminal, BarChart3, Star,
  CheckCircle2, Play, Zap,
  Database, Globe
} from "lucide-react";
import Link from "next/link";
import AgentStatus from "@/components/AgentStatus";

export default function InterviewerPage() {
  const [activeSession, setActiveSession] = useState(true);

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
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">AI Technical Interviewer</h1>
                <AgentStatus status="active" />
              </div>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">Evaluation Engineer • Code Analysis Mode</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-brand-blue text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer">
              Launch Technical Sandbox
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: EVALUATION DASHBOARD */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-10 rounded-[3rem] space-y-12 bg-white">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Live Technical Depth</h2>
                  <p className="text-sm text-slate-500 font-medium">Candidate: <span className="text-slate-900 font-bold">Sarah Chen</span> • Role: <span className="text-slate-900 font-bold">Frontend Lead</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Aggregated Score</p>
                  <p className="text-5xl font-black text-brand-blue uppercase tracking-tighter">92</p>
                </div>
              </div>

              {/* CORE COMPETENCIES */}
              <div className="grid md:grid-cols-2 gap-8">
                 {[
                   { label: "Frontend Architecture", score: 95, icon: Globe },
                   { label: "React/Next.js Internal", score: 98, icon: Code2 },
                   { label: "State Management", score: 88, icon: Database },
                   { label: "System Design", score: 84, icon: Cpu },
                 ].map((comp) => (
                   <div key={comp.label} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
                      <div className="flex items-center justify-between">
                         <div className="p-2 rounded-xl bg-white text-brand-blue shadow-sm">
                            <comp.icon size={18} />
                         </div>
                         <span className="text-lg font-black text-slate-900">{comp.score}%</span>
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">{comp.label}</p>
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${comp.score}%` }}
                          transition={{ duration: 1.5 }}
                          className="h-full bg-brand-blue" 
                        />
                      </div>
                   </div>
                 ))}
              </div>

              {/* TECHNICAL OBSERVATIONS */}
              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-4">AI Technical Observations</h3>
                <div className="space-y-4">
                   {[
                     "Demonstrated profound understanding of Next.js hydration cycles.",
                     "Accurately solved the complex memoization scenario.",
                     "Explained architectural trade-offs between CSR and SSR with clarity.",
                     "Code quality score: Excellent (Clean, Modular, Dry)."
                   ].map((obs, i) => (
                     <div key={i} className="flex gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-sm font-medium text-slate-700">
                        <CheckCircle2 size={18} className="text-brand-blue shrink-0" />
                        {obs}
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* LIVE CODE FEED (SIMULATED) */}
            <div className="bg-slate-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
               <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500" />
                     <div className="w-3 h-3 rounded-full bg-amber-500" />
                     <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                     <Terminal size={14} /> terminal.log — active session
                  </div>
               </div>
               <div className="p-8 font-mono text-xs space-y-2">
                  <p className="text-blue-400">{"// AI Technical Evaluation - Coding Challenge #12"}</p>
                  <p className="text-slate-500">{"Analyzing complexity..."}</p>
                  <p className="text-green-400">{"[✓] Candidate solved in O(n) time complexity"}</p>
                  <p className="text-green-400">{"[✓] Space complexity: O(1)"}</p>
                  <p className="text-slate-300">{"Evaluator: 'Great use of the two-pointer approach here.'"}</p>
                  <p className="text-slate-400">{"..."}</p>
                  <motion.p 
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-brand-blue"
                  >
                    _
                  </motion.p>
               </div>
            </div>
          </div>

          {/* RIGHT: SCORING & FINAL VERDICT */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-[2.5rem] bg-gradient-to-br from-brand-blue to-purple-600 text-white space-y-8 shadow-2xl shadow-blue-500/20">
               <div className="flex items-center gap-3">
                  <Star fill="white" className="text-white" />
                  <h3 className="text-lg font-black uppercase tracking-tighter">Final Evaluation</h3>
               </div>
               
               <div className="text-center py-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">Technical Depth Tier</p>
                  <p className="text-6xl font-black uppercase tracking-tighter italic">L6 Senior</p>
               </div>

               <div className="space-y-4 pt-4 border-t border-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white/80">Problem Solving</span>
                    <span className="font-black text-xl">9.8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white/80">System Design</span>
                    <span className="font-black text-xl">8.5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white/80">Collaboration</span>
                    <span className="font-black text-xl">9.2</span>
                  </div>
               </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] space-y-8">
              <div className="flex items-center gap-3">
                <Zap className="text-amber-500" />
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Agent Performance</h3>
              </div>
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-slate-50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-slate-400">Total Interviews</span>
                    <span className="font-black text-slate-900">142</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-slate-400">Accuracy Rate</span>
                    <span className="font-black text-slate-900">99.1%</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all cursor-pointer">
                View Full Tech Report
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
