"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Trash2, Edit3, Save, X, Briefcase, 
  Users, BarChart, Settings, LogOut, Search,
  MapPin, Clock, LayoutDashboard, Upload
} from "lucide-react";

// Types
interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  jd: string;
  skills: string[];
  postedAt: string;
}

interface Lead {
  name: string;
  email: string;
  phone: string;
  language: string;
  source: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [customKnowledge, setCustomKnowledge] = useState<any[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    location: "Remote",
    type: "Full-time",
    jd: "",
    skills: ""
  });

  // Initial Load
  useEffect(() => {
    const savedJobs = localStorage.getItem("hctpl_jobs");
    const savedApps = localStorage.getItem("hctpl_applications");
    const savedPlans = localStorage.getItem("hctpl_plans");
    const savedKnowledge = localStorage.getItem("hctpl_knowledge");
    
    if (savedJobs) setJobs(JSON.parse(savedJobs));
    if (savedApps) setApplications(JSON.parse(savedApps));
    if (savedKnowledge) setCustomKnowledge(JSON.parse(savedKnowledge));
    
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    } else {
      const defaultPlans = [
        { id: '1', name: "Starter", price: "₹9,999", period: "/month", description: "Perfect for growing startups.", features: ["Access to AI Recruiter MVP", "Up to 5 User Accounts"], isPopular: false },
        { id: '2', name: "Growth", price: "₹49,999", period: "/month", description: "Advanced tools for scaling.", features: ["Full AI Ecosystem Access", "Automated AI Interviews"], isPopular: true },
        { id: '3', name: "Enterprise", price: "Custom", period: "", description: "Tailored AI solutions.", features: ["White-label Solutions", "On-premise Deployment"], isPopular: false }
      ];
      setPlans(defaultPlans);
      localStorage.setItem("hctpl_plans", JSON.stringify(defaultPlans));
    }
  }, [activeTab]);

  useEffect(() => {
    if (isLoggedIn && activeTab === 'leads') {
      fetchLeads();
    }
  }, [isLoggedIn, activeTab]);

  const updatePlan = (id: string, field: string, value: any) => {
    const updated = plans.map(p => p.id === id ? { ...p, [field]: value } : p);
    setPlans(updated);
    localStorage.setItem("hctpl_plans", JSON.stringify(updated));
  };

  const updateAppStatus = (id: string, status: string) => {
    const updated = applications.map(a => a.id === id ? { ...a, status } : a);
    setApplications(updated);
    localStorage.setItem("hctpl_applications", JSON.stringify(updated));
    setSelectedApp(null);
  };

  const deleteKnowledge = (id: string) => {
    const updated = customKnowledge.filter(k => k.id !== id);
    setCustomKnowledge(updated);
    localStorage.setItem("hctpl_knowledge", JSON.stringify(updated));
  };

  const addKnowledge = (q: string, a: string) => {
    const newK = { id: Date.now().toString(), q, a };
    const updated = [newK, ...customKnowledge];
    setCustomKnowledge(updated);
    localStorage.setItem("hctpl_knowledge", JSON.stringify(updated));
  };

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    setLeadError(null);

    try {
      const response = await fetch('/api/leads');
      if (!response.ok) throw new Error('Failed to load lead records');
      const data = await response.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Lead fetch error:', error);
      setLeadError('Unable to load leads right now.');
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const downloadLeadsCsv = () => {
    const headers = ['Name', 'Email', 'Phone', 'Language', 'Source', 'Created At'];
    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.language,
      lead.source,
      lead.createdAt
    ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(','));

    const csv = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'hctpl-chatbot-leads.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  // Save to LocalStorage whenever jobs change
  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem("hctpl_jobs", JSON.stringify(jobs));
    }
  }, [jobs]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "hctpl_admin_2026") {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: editingJob ? editingJob.id : Date.now().toString(),
      title: formData.title,
      location: formData.location,
      type: formData.type,
      jd: formData.jd,
      skills: formData.skills.split(",").map(s => s.trim()),
      postedAt: editingJob ? editingJob.postedAt : new Date().toISOString()
    };

    if (editingJob) {
      setJobs(jobs.map(j => j.id === editingJob.id ? newJob : j));
    } else {
      setJobs([newJob, ...jobs]);
    }

    setIsModalOpen(false);
    setEditingJob(null);
    setFormData({ title: "", location: "Remote", type: "Full-time", jd: "", skills: "" });
  };

  const deleteJob = (id: string) => {
    if (confirm("Are you sure you want to delete this job post?")) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      location: job.location,
      type: job.type,
      jd: job.jd,
      skills: job.skills.join(", ")
    });
    setIsModalOpen(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Settings className="text-brand-primary w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">HCTPL Admin Panel</h1>
            <p className="text-slate-400">Access Restricted to Authorized Personnel Only</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Admin Security Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access code..."
                className="w-full bg-white border border-slate-700 rounded-xl px-5 py-4 text-black outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all placeholder:text-slate-400"
              />
            </div>
            <button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/20 transition-all">
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#020617] text-slate-400 p-8 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold">A</div>
          <span className="text-white font-bold text-lg">Admin OS</span>
        </div>

        <nav className="space-y-2 flex-grow">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "dashboard" ? "bg-brand-primary text-white font-bold" : "hover:bg-slate-900 hover:text-slate-200"}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("careers")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "careers" ? "bg-brand-primary text-white font-bold" : "hover:bg-slate-900 hover:text-slate-200"}`}
          >
            <Briefcase size={20} /> Career Manager
          </button>
          <button 
            onClick={() => setActiveTab("applications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "applications" ? "bg-brand-primary text-white font-bold" : "hover:bg-slate-900 hover:text-slate-200"}`}
          >
            <Users size={20} /> Applications
          </button>
          <button 
            onClick={() => setActiveTab("leads")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "leads" ? "bg-brand-primary text-white font-bold" : "hover:bg-slate-900 hover:text-slate-200"}`}
          >
            <Upload size={20} /> Leads
          </button>
          <button 
            onClick={() => setActiveTab("cms")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "cms" ? "bg-brand-primary text-white font-bold" : "hover:bg-slate-900 hover:text-slate-200"}`}
          >
            <Settings size={20} /> Content CMS
          </button>
          <button 
            onClick={() => setActiveTab("trainer")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "trainer" ? "bg-brand-primary text-white font-bold" : "hover:bg-slate-900 hover:text-slate-200"}`}
          >
            <LayoutDashboard size={20} /> AI Trainer
          </button>
          <button 
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "analytics" ? "bg-brand-primary text-white font-bold" : "hover:bg-slate-900 hover:text-slate-200"}`}
          >
            <BarChart size={20} /> Master Analytics
          </button>
        </nav>

        <button 
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-auto"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Career Manager</h1>
            <p className="text-slate-500 mt-1">Manage global job postings for HCTPL Ecosystem</p>
          </div>
          <button 
            onClick={() => { setEditingJob(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-brand-primary/20 transition-all"
          >
            <Plus size={20} /> New Job Post
          </button>
        </header>

        {/* STATS PREVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: "Active Postings", value: jobs.length, icon: Briefcase, color: "blue" },
            { label: "Total Applications", value: applications.length, icon: Users, color: "emerald" },
            { label: "Pending Review", value: applications.filter(a => a.status === 'Pending').length, icon: Clock, color: "orange" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500`}>
                <stat.icon size={28} />
              </div>
            </div>
          ))}
        </div>

        {/* CONDITIONAL TABS */}
        {activeTab === 'careers' && (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900">Live Postings</h3>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-4">Job Details</th>
                  <th className="px-8 py-4">Location & Type</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6 font-bold text-slate-900">{job.title}</td>
                    <td className="px-8 py-6 text-sm text-slate-500">{job.location} • {job.type}</td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button onClick={() => openEditModal(job)} className="p-2 text-slate-400 hover:text-brand-primary"><Edit3 size={18} /></button>
                      <button onClick={() => deleteJob(job.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Candidate Pipeline</h3>
              <div className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-full uppercase">
                {applications.length} Candidates Total
              </div>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-4">Candidate</th>
                  <th className="px-8 py-4">Fit Score</th>
                  <th className="px-8 py-4">Role</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-900">{app.name}</p>
                      <p className="text-xs text-slate-400">{app.email}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-primary" style={{ width: `${app.fitScore || 70}%` }} />
                        </div>
                        <span className="text-xs font-bold text-brand-primary">{app.fitScore || 70}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-600 font-medium">{app.role}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        app.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 
                        app.status === 'Hired' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="bg-brand-primary/10 text-brand-primary text-[10px] font-bold px-4 py-2 rounded-xl hover:bg-brand-primary hover:text-white transition-all uppercase tracking-wider"
                      >
                        Review Profile
                      </button>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr><td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-medium">No applications received yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900">Chatbot Leads</h3>
                <p className="text-slate-500 mt-1">View and export the leads captured from the chatbot.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={fetchLeads}
                  className="bg-brand-primary text-white px-5 py-3 rounded-2xl font-bold hover:bg-brand-primary/90 transition-all"
                >
                  Refresh Leads
                </button>
                <button 
                  onClick={downloadLeadsCsv}
                  disabled={leads.length === 0}
                  className="bg-emerald-500 text-white px-5 py-3 rounded-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-600 transition-all"
                >
                  Export CSV
                </button>
              </div>
            </div>
            <div className="p-6">
              {isLoadingLeads ? (
                <div className="text-slate-500 text-sm">Loading leads…</div>
              ) : leadError ? (
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{leadError}</div>
              ) : leads.length === 0 ? (
                <div className="text-slate-500 text-sm">No leads have been recorded yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-slate-400">Name</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-slate-400">Email</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-slate-400">Phone</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-slate-400">Language</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-slate-400">Source</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-slate-400">Captured</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-3">
                      {leads.map((lead, idx) => (
                        <tr key={idx} className="bg-slate-50 rounded-3xl border border-slate-100">
                          <td className="px-4 py-4 font-semibold text-slate-900">{lead.name}</td>
                          <td className="px-4 py-4 text-slate-600 text-sm">{lead.email}</td>
                          <td className="px-4 py-4 text-slate-600 text-sm">{lead.phone}</td>
                          <td className="px-4 py-4 text-slate-600 text-sm">{lead.language}</td>
                          <td className="px-4 py-4 text-slate-600 text-sm">{lead.source}</td>
                          <td className="px-4 py-4 text-slate-500 text-xs">{new Date(lead.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* TOP METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "SEO Health", value: "94%", detail: "Optimized", color: "emerald" },
                { label: "Daily Visits", value: "1,284", detail: "+12% vs last week", color: "blue" },
                { label: "Avg. Session", value: "4m 22s", detail: "Engaged", color: "purple" },
                { label: "Bounce Rate", value: "22%", detail: "Healthy", color: "orange" }
              ].map((m, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                  <p className="text-2xl font-black text-slate-900">{m.value}</p>
                  <p className={`text-[10px] font-bold text-${m.color}-500 mt-2`}>{m.detail}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* TRAFFIC CHART */}
              <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-bold text-slate-900">Traffic Intelligence</h3>
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-brand-primary" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Weekly Visitors</span>
                  </div>
                </div>
                <div className="h-64 w-full relative flex items-end justify-between gap-2 pt-10">
                  {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className="flex-1 bg-gradient-to-t from-brand-primary/20 to-brand-primary rounded-t-xl relative group"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {h * 12} Users
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              {/* CONVERSION FUNNEL */}
              <div className="bg-[#020617] p-8 rounded-[2rem] text-white">
                <h3 className="font-bold mb-8">Conversion Funnel</h3>
                <div className="space-y-6">
                  {[
                    { label: "Site Visitors", val: "100%", w: "w-full", color: "bg-slate-800" },
                    { label: "Aryan Chat Users", val: "68%", w: "w-2/3", color: "bg-brand-primary" },
                    { label: "Lead Captures", val: "34%", w: "w-1/3", color: "bg-emerald-500" },
                    { label: "Final Conversions", val: "12%", w: "w-1/6", color: "bg-orange-500" }
                  ].map((f, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                        <span className="text-slate-400">{f.label}</span>
                        <span>{f.val}</span>
                      </div>
                      <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: f.val }} transition={{ duration: 1, delay: i * 0.2 }} className={`h-full ${f.color}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-400 leading-relaxed italic text-center">
                    "Admin, Aryan is converting 34% of visitors into leads. This is 5% higher than industry average."
                  </p>
                </div>
              </div>
            </div>

            {/* SEO MONITOR */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-8">Global SEO Monitor</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full border-8 border-emerald-500 border-t-transparent animate-spin-slow flex items-center justify-center">
                    <span className="text-xl font-black text-slate-900">94</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Performance</p>
                    <p className="text-xs text-slate-500">Core Web Vitals are Excellent</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full border-8 border-blue-500 border-t-transparent animate-spin-slow-reverse flex items-center justify-center">
                    <span className="text-xl font-black text-slate-900">98</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Accessibility</p>
                    <p className="text-xs text-slate-500">Perfect Contrast & ARIA tags</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full border-8 border-purple-500 border-t-transparent animate-spin flex items-center justify-center">
                    <span className="text-xl font-black text-slate-900">100</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Best Practices</p>
                    <p className="text-xs text-slate-500">Secure & Modern Standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trainer' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-8">AI Brain Training</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const q = (e.target as any).question.value;
                  const a = (e.target as any).answer.value;
                  addKnowledge(q, a);
                  (e.target as any).reset();
                }} className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-4">Add New Knowledge Point</h4>
                    <div className="space-y-4">
                      <input name="question" required placeholder="User asks..." className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-primary text-black" />
                      <textarea name="answer" required placeholder="Aryan should answer..." rows={3} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-primary resize-none text-black" />
                      <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 rounded-xl shadow-md">Train Aryan</button>
                    </div>
                  </div>
                </form>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-700">Learned Concepts</h4>
                  <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {customKnowledge.map((k) => (
                      <div key={k.id} className="p-4 bg-white border border-slate-100 rounded-2xl flex justify-between items-start group shadow-sm">
                        <div>
                          <p className="text-xs font-bold text-brand-primary mb-1">Q: {k.q}</p>
                          <p className="text-xs text-slate-600 line-clamp-2">A: {k.a}</p>
                        </div>
                        <button onClick={() => deleteKnowledge(k.id)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {customKnowledge.length === 0 && <p className="text-sm text-slate-400 text-center py-10">No custom knowledge added yet.</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#020617] p-8 rounded-[2rem] text-white">
              <h3 className="font-bold mb-6">Aryan's Neural Update</h3>
              <p className="text-sm text-slate-400">
                "Admin, I have ingested {customKnowledge.length} custom concepts. My response engine has been optimized to prioritize these over my default knowledge base."
              </p>
            </div>
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Pricing Strategy Manager</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <div key={plan.id} className={`p-6 rounded-3xl border-2 transition-all ${plan.isPopular ? 'border-brand-primary bg-slate-50' : 'border-slate-100'}`}>
                    <div className="flex justify-between items-start mb-6">
                      <input 
                        className="font-bold text-lg bg-transparent outline-none border-b border-transparent focus:border-brand-primary w-2/3 text-black"
                        value={plan.name}
                        onChange={(e) => updatePlan(plan.id, 'name', e.target.value)}
                      />
                      <button 
                        onClick={() => updatePlan(plan.id, 'isPopular', !plan.isPopular)}
                        className={`p-2 rounded-lg text-[10px] font-bold ${plan.isPopular ? 'bg-brand-primary text-white' : 'bg-slate-200 text-slate-500'}`}
                      >
                        POPULAR
                      </button>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Monthly Price</label>
                      <input 
                        className="text-2xl font-black text-black bg-transparent outline-none border-b border-transparent focus:border-brand-primary w-full"
                        value={plan.price}
                        onChange={(e) => updatePlan(plan.id, 'price', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Description</label>
                      <textarea 
                        className="text-xs text-black bg-transparent outline-none border-b border-transparent focus:border-brand-primary w-full resize-none"
                        rows={2}
                        value={plan.description}
                        onChange={(e) => updatePlan(plan.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#020617] p-8 rounded-[2rem] text-white">
              <h3 className="font-bold mb-6">Aryan's CMS Assistant</h3>
              <p className="text-sm text-slate-400">
                "Admin, I have synchronized your pricing changes across the main website. The 'Popular' badge has been updated and the cache has been cleared for all global users."
              </p>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {applications.slice(0, 5).map((app, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                      {app.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{app.name} applied for {app.role}</p>
                      <p className="text-[10px] text-slate-400">{new Date(app.appliedAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#020617] p-8 rounded-[2rem] text-white">
              <h3 className="font-bold mb-6">Aryan's AI Intelligence</h3>
              <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "Hello Admin. I've analyzed today's trends. You have {applications.length} new candidates. The '{jobs[0]?.title || 'Developer'}' role is getting the most attention. I suggest reviewing the top 3 resumes by EOD."
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD/EDIT JOB */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-900">{editingJob ? "Edit Job Posting" : "Create New Job Post"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-slate-200 text-slate-400"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleSaveJob} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
                    <input 
                      required
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-brand-primary text-black"
                      placeholder="e.g. Senior Frontend Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                    <input 
                      required
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-brand-primary text-black"
                      placeholder="e.g. Remote / Hyderabad"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Job Type</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-brand-primary bg-white text-black"
                    >
                      <option>Full-time</option>
                      <option>Contract</option>
                      <option>Part-time</option>
                      <option>Internship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Required Skills (Comma separated)</label>
                  <input 
                    required
                    type="text" 
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-brand-primary text-black"
                    placeholder="React, Next.js, TypeScript..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Job Description</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.jd}
                    onChange={(e) => setFormData({...formData, jd: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-brand-primary resize-none text-black"
                    placeholder="Describe the role and responsibilities..."
                  />
                </div>

                <button type="submit" className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  <Save size={20} /> {editingJob ? "Update Posting" : "Publish Job Post"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* MODAL: REVIEW CANDIDATE */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedApp(null)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary text-2xl font-black mx-auto mb-4">
                  {selectedApp.name[0]}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{selectedApp.name}</h3>
                <p className="text-slate-500">{selectedApp.role} Applicant</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</p>
                  <p className="text-sm font-bold text-slate-900 truncate">{selectedApp.email}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Phone Number</p>
                  <p className="text-sm font-bold text-slate-900">{selectedApp.phone}</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase">Aryan AI Fit Score</p>
                    <span className="text-sm font-black text-emerald-700">{selectedApp.fitScore || 70}%</span>
                  </div>
                  <div className="h-2 bg-emerald-200/50 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${selectedApp.fitScore || 70}%` }} transition={{ duration: 1 }} className="h-full bg-emerald-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {selectedApp.cv ? (
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = selectedApp.cv;
                      link.download = `CV_${selectedApp.name.replace(/\s+/g, '_')}.pdf`;
                      link.click();
                    }}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                  >
                    <Upload size={18} /> Download Candidate CV
                  </button>
                ) : (
                  <div className="w-full bg-slate-100 text-slate-400 font-bold py-4 rounded-2xl text-center">No CV Uploaded</div>
                )}
                
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => updateAppStatus(selectedApp.id, 'Rejected')}
                    className="py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => updateAppStatus(selectedApp.id, 'Hired')}
                    className="py-4 rounded-2xl font-bold bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all"
                  >
                    Hire Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
