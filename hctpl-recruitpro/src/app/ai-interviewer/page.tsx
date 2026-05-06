"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  fadeInUp, 
  staggerContainer, 
  scaleIn, 
  hoverScale,
  sectionReveal
} from "@/utils/animations";
import { Cpu, Play, CheckCircle2, X } from "lucide-react";
import Link from "next/link";

export default function AIInterviewerLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-[#1e59f5]">
      
      {/* 1. STICKY TOP BANNER */}
      <div className="bg-[#1e59f5] text-white py-3 px-4 text-center text-[13px] font-semibold tracking-wide sticky top-0 z-[60] shadow-lg shadow-blue-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-6">
              <span className="hidden md:inline text-white/90">Meet RecruitPro AI Interviewer, your recruiting agent to interview one or thousands of candidates simultaneously.</span>
              <span className="md:hidden">RecruitPro AI Interviewer: Scale your hiring.</span>
           </div>
           <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-white/80 transition-all">Overview</Link>
              <Link href="#" className="underline underline-offset-4 hover:opacity-80 transition-all font-black">Learn more</Link>
           </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className={`sticky top-[46px] w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm" : "bg-white py-8"}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
              Recruit<span className="text-[#1e59f5]">Pro</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-[14px] font-black text-slate-900 hover:text-[#1e59f5] transition-all">Login</Link>
            <button className="bg-[#1e59f5] text-white px-7 py-3.5 rounded-xl text-[14px] font-black shadow-2xl shadow-blue-500/30 hover:bg-[#1a4cd1] active:scale-95 transition-all uppercase tracking-widest">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#1e59f5] text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
              <Cpu size={14} /> AI-Powered Screening & Interviews
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black leading-[0.95] tracking-tighter text-slate-900 uppercase">
              Scale Your <br />
              <span className="text-[#1e59f5]">Screening.</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto pt-4">
              Scale your screening by interviewing unlimited candidates at once. RecruitPro’s AI Interviewer conducts automated screening based on your requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mt-12">
             <Link href="/dashboard/recruiter" className="bg-[#1e59f5] text-white px-8 md:px-10 py-5 md:py-6 rounded-[2rem] text-sm md:text-lg font-black shadow-2xl shadow-blue-500/30 hover:bg-[#1a4cd1] active:scale-95 transition-all uppercase tracking-widest text-center">
                Try AI Interviewer
             </Link>
             <button 
               onClick={() => setShowDemo(true)}
               className="bg-white border-[3px] border-slate-100 text-slate-900 px-8 md:px-10 py-5 md:py-6 rounded-[2rem] text-sm md:text-lg font-black hover:bg-slate-50 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
             >
                <Play size={20} className="text-[#1e59f5]" fill="#1e59f5" /> Watch Demo
             </button>
          </div>

          {/* Hero Visual */}
          <motion.div 
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-24 max-w-6xl mx-auto"
          >
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="relative p-2 bg-slate-100 rounded-[3rem] shadow-inner"
             >
                <img 
                  src="/feature_ai_interviewer_hero.png" 
                  alt="AI Interviewer Dashboard" 
                  className="rounded-[2.5rem] shadow-2xl w-full border border-slate-200"
                />
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. KEY FEATURES */}
      <motion.section 
         variants={sectionReveal}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: "-100px" }}
         className="py-40 bg-[#f8f9fa] border-y border-slate-100"
      >
         <div className="max-w-7xl mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
               <motion.div variants={staggerContainer} className="space-y-12">
                  <motion.div variants={fadeInUp} className="space-y-6">
                     <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">24/7 Interview Availability</h2>
                     <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        Launch an intelligent agent to facilitate standardized, automated screening around the clock. Ensure every candidate gets a fair and immediate interview experience.
                     </p>
                  </motion.div>
                  <motion.div variants={fadeInUp} className="space-y-6">
                     <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Instant assessments</h2>
                     <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        Receive AI-powered evaluations directly in RecruitPro to compare all applicants consistently. Your team focuses only on the most qualified talent.
                     </p>
                  </motion.div>
               </motion.div>
               <motion.div 
                 variants={scaleIn}
                 className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 relative overflow-hidden"
               >
                  <motion.div 
                    animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[80px]" 
                  />
                  <div className="space-y-8 relative z-10">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <motion.div 
                             animate={{ scale: [1, 1.1, 1] }}
                             transition={{ duration: 2, repeat: Infinity }}
                             className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                           >
                             AI
                           </motion.div>
                           <p className="font-bold uppercase text-xs tracking-widest">Screening Progress</p>
                        </div>
                        <span className="text-[#1e59f5] font-black text-sm">85% Complete</span>
                     </div>
                     <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-[#1e59f5] rounded-full" 
                        />
                     </div>
                     <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="space-y-4">
                        {[1, 2, 3].map(i => (
                           <motion.div variants={fadeInUp} key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                              <div className="flex items-center gap-4">
                                 <div className="w-8 h-8 bg-slate-200 rounded-full" />
                                 <div className="h-2 w-32 bg-slate-200 rounded-full" />
                              </div>
                              <CheckCircle2 size={20} className="text-[#22c55e]" />
                           </motion.div>
                        ))}
                     </motion.div>
                  </div>
               </motion.div>
            </div>
         </div>
      </motion.section>

      {/* 5. FOOTER */}
      <footer className="bg-[#111b29] text-white py-32 text-center">
         <div className="max-w-7xl mx-auto px-8 space-y-12">
            <div className="text-2xl font-black tracking-tighter uppercase">Recruit<span className="text-[#1e59f5]">Pro</span></div>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em]">© 2026 HCTPL RecruitPro OS. Global Intelligence.</p>
         </div>
      </footer>

      {/* DEMO MODAL */}
      <AnimatePresence>
        {showDemo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/95 backdrop-blur-md" onClick={() => setShowDemo(false)} />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
               className="relative w-full max-w-6xl aspect-video bg-black rounded-[3rem] overflow-hidden shadow-4xl border border-white/10 flex items-center justify-center flex-col gap-8"
             >
                <div className="w-24 h-24 rounded-full border-4 border-[#1e59f5] border-t-transparent animate-spin" />
                <p className="text-2xl font-black text-white uppercase tracking-[0.3em]">Initializing AI Session...</p>
                <button onClick={() => setShowDemo(false)} className="absolute top-8 right-8 text-white hover:text-[#1e59f5] transition-all"><X size={40} /></button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
