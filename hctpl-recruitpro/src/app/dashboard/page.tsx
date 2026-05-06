"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Search, Brain, Zap, 
  BarChart3, LayoutDashboard, 
  Settings, Bell, LogOut,
  Cpu, MessageSquare, ShieldCheck,
  TrendingUp, Clock, Filter,
  Menu, X
} from "lucide-react";
import Link from "next/link";
import { mockCandidates } from "@/utils/candidateData";
import AgentCard from "@/components/AgentCard";
import CandidateTable from "@/components/CandidateTable";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <Link href="/" className="text-lg font-black tracking-tighter uppercase">
          Recruit<span className="text-brand-blue">Pro</span>
        </Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
           {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:sticky top-0 left-0 z-30 w-72 bg-white border-r border-slate-200 flex flex-col p-8 h-screen transition-transform duration-300 ease-in-out`}>
        <Link href="/" className="hidden md:block text-xl font-black tracking-tighter uppercase mb-12">
          Recruit<span className="text-brand-blue">Pro</span>
        </Link>

        <nav className="space-y-2 flex-grow">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "Talent Pool" },
            { icon: Search, label: "Job Boards" },
            { icon: BarChart3, label: "Analytics" },
            { icon: Settings, label: "Configuration" },
          ].map((item) => (
            <button 
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${item.active ? "bg-brand-blue text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-3 px-4">
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div>
              <p className="text-sm font-bold text-slate-900 uppercase">Admin User</p>
              <p className="text-[10px] text-slate-400 font-black uppercase">Enterprise</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-grow p-4 md:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Agent Hub</h1>
            <p className="text-slate-500 font-medium">Orchestrate your AI hiring pipeline.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-grow md:flex-grow-0 bg-brand-green text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm shadow-xl shadow-green-500/20 active:scale-95 transition-all cursor-pointer">
              New Hiring Process
            </button>
            <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all cursor-pointer">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {[
            { label: "Total Candidates", value: "1,284", trend: "+12%", icon: Users, color: "text-blue-500" },
            { label: "AI Screened", value: "856", trend: "+8%", icon: MessageSquare, color: "text-purple-500" },
            { label: "Shortlisted", value: "142", trend: "+24%", icon: ShieldCheck, color: "text-green-500" },
            { label: "Time to Hire", value: "4.2 Days", trend: "-1.5d", icon: Clock, color: "text-amber-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-green-50 text-green-600`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AGENTS SECTION */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Active Agents</h2>
            <Link href="/dashboard/settings" className="text-xs font-black text-brand-blue uppercase tracking-widest">Global Config</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AgentCard 
              name="Recruiter AI"
              role="Screening Specialist"
              description="Handles initial outreach, conducts screening interviews via chat/voice, and gathers structured candidate data."
              icon={MessageSquare}
              status="active"
              href="/dashboard/recruiter"
              color="bg-blue-500"
            />
            <AgentCard 
              name="Sales BDM AI"
              role="Matching Architect"
              description="Analyzes candidate data against JD requirements, generates justifications, and shortlists top talent for clients."
              icon={ShieldCheck}
              status="idle"
              href="/dashboard/sales"
              color="bg-green-500"
            />
            <AgentCard 
              name="Technical AI"
              role="Evaluation Engineer"
              description="Conducts deep-dive technical interviews, scenario assessments, and generates objective technical depth scores."
              icon={Cpu}
              status="idle"
              href="/dashboard/interviewer"
              color="bg-purple-500"
            />
          </div>
        </div>

        {/* RECENT ACTIVITY / CANDIDATES */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Recent Pipeline</h2>
            <div className="flex gap-2 w-full md:w-auto">
               <button className="flex-grow md:flex-grow-0 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all cursor-pointer">
                  <Filter size={14} /> Filter
               </button>
               <button className="flex-grow md:flex-grow-0 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all cursor-pointer">
                  Export CSV
               </button>
            </div>
          </div>
          <div className="overflow-x-auto -mx-4 md:mx-0">
             <div className="min-w-[800px] md:min-w-0 px-4 md:px-0">
                <CandidateTable candidates={mockCandidates} />
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
