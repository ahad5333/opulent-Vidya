"use client";
import { motion } from "framer-motion";
import { 
  FileUp,
  MoreVertical,
  Cpu,
  Zap,
  Sparkles,
  FileSearch,
  Wand2,
  BarChart3,
  Users,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Clock
} from "lucide-react";

const mockCandidates = [
  { id: 1, name: "Arjun Sharma", role: "Sr. Frontend Developer", match: 94, status: "Interviewing", avatar: "AS", skills: ["React", "Next.js", "TS"] },
  { id: 2, name: "Aryan Malhotra", role: "AI Engineer", match: 88, status: "Screened", avatar: "AM", skills: ["Python", "PyTorch", "LLMs"] },
  { id: 3, name: "Siddharth Rao", role: "Fullstack Lead", match: 91, status: "Shortlisted", avatar: "SR", skills: ["Node.js", "AWS", "Go"] },
  { id: 4, name: "Ananya Iyer", role: "UI/UX Designer", match: 82, status: "Applied", avatar: "AI", skills: ["Figma", "Motion", "Tailwind"] },
];

export default function AIRecruiterDashboard() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar / Stats */}
          <div className="w-full md:w-1/4 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm">
              <h3 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand-primary" />
                Quick Stats
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Active Jobs", value: "12", color: "bg-blue-100 text-blue-700" },
                  { label: "AI Interviews", value: "148", color: "bg-indigo-100 text-indigo-700" },
                  { label: "Matches Found", value: "1.2k", color: "bg-emerald-100 text-emerald-700" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live AI Interview Tracker */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl overflow-hidden relative group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <h3 className="font-bold text-sm">Live AI Interviews</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full uppercase tracking-widest">Active Now</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Rahul K.", time: "12:04", status: "Technical Round" },
                  { name: "Sneha M.", time: "05:12", status: "Coding Challenge" }
                ].map((interview, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all cursor-default">
                    <div>
                      <p className="text-xs font-bold">{interview.name}</p>
                      <p className="text-[10px] text-blue-400">{interview.status}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{interview.time}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-xs font-bold text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/10 transition-all">
                Join Observer Mode
              </button>
            </div>

            {/* Advanced CV Intelligence Module */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Cpu className="w-24 h-24 rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-emerald-500 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">AI CV Lab</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Advanced screening & auto-editing for high-conversion resumes.</p>
                
                <div className="space-y-3 mb-6">
                  {[
                    { icon: <FileSearch size={14} />, label: "Deep Skill Mapping" },
                    { icon: <Wand2 size={14} />, label: "Smart CV Optimizer" },
                    { icon: <Zap size={14} />, label: "Cultural Fit Analysis" }
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-slate-300">
                      <span className="text-emerald-500">{feat.icon}</span>
                      {feat.label}
                    </div>
                  ))}
                </div>

                <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                  <FileUp className="w-8 h-8 mb-2 text-emerald-500 group-hover:-translate-y-1 transition-transform" />
                  <span className="text-xs font-bold mb-1">Analyze Candidate CV</span>
                  <span className="text-[10px] text-slate-500">PDF, DOCX up to 10MB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Area */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-1">Candidate Pulse</h2>
                <p className="text-slate-500">Managing <span className="font-bold text-brand-primary">842</span> candidates across 12 departments</p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search talent..." 
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900"
                  />
                </div>
                <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                  <Filter className="w-5 h-5" />
                </button>
                <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-black transition-all">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-bold">New Job</span>
                </button>
              </div>
            </div>

            {/* Candidate List */}
            <div className="space-y-4">
              {mockCandidates.map((candidate, i) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col md:flex-row items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-sm border border-blue-200">
                      {candidate.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 flex items-center gap-2">
                        {candidate.name}
                        {candidate.match > 90 && <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />}
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {candidate.skills.map((skill, si) => (
                          <span key={si} className="text-[9px] px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-100 uppercase font-bold">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${candidate.match}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-brand-primary" 
                          />
                        </div>
                        <span className="text-xs font-bold text-brand-primary">{candidate.match}%</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">AI Match Score</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {candidate.status === "Interviewing" ? (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                          <Clock className="w-3.5 h-3.5" />
                          {candidate.status}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {candidate.status}
                        </span>
                      )}
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="text-sm font-bold text-brand-primary hover:text-brand-primary/80 flex items-center gap-1 transition-colors">
                View all candidates
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
