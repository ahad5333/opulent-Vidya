"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ArrowRight, Play, Check,
  Search, Users, Zap, ShieldCheck, Sparkles,
  BarChart3, Globe, MessageSquare, Menu, X,
  Briefcase, Heart, PieChart, Database, Cpu,
  Smartphone, Layout, Share2, Wand2, Cloud,
  Calendar, Star, Quote, Phone
} from "lucide-react";
import Link from "next/link";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  hoverScale,
  floatingAnimation,
  sectionReveal
} from "@/utils/animations";

// Inline animation variants since we'll keep it simple first
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function RecruitProHome() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["recruit", "hire", "scale", "succeed"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Bill Twinning",
      role: "Talent Resources Director - CP Group",
      quote: "RecruitPro is the best ATS we worked with. Simplicity, efficiency and the latest technologies combined make it an indispensable tool for any large-scale HR team."
    },
    {
      name: "Dina Demajo",
      role: "Senior Talent Acquisition - Manpower Group",
      quote: "The application is extremely user-friendly and very well equipped with all the useful functions one would require for successful recruitment."
    },
    {
      name: "Ahmed Firdaus",
      role: "Director - MRI Network",
      quote: "I've been using RecruitPro for the past couple of months and the platform is excellent, user-friendly and it has helped me a lot in my recruitment process."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1e59f5] text-white py-2.5 px-4 text-center text-[11px] md:text-[13px] font-semibold sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <span className="leading-tight">Meet RecruitPro AI Interviewer, your recruiting agent to interview candidates simultaneously.</span>
          <Link href="/ai-interviewer" className="underline underline-offset-4 hover:opacity-80 font-bold whitespace-nowrap">Learn more</Link>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav
        className={`sticky top-[40px] md:top-[44px] w-full z-[90] transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-slate-100 py-3" : "bg-white py-4 md:py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter uppercase text-slate-900">
              Recruit<span className="text-[#1a56db]">Pro</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {[
                { label: "Features", id: "features" },
                { label: "Solutions", id: "solutions" },
                { label: "Resources", id: "resources" },
                { label: "Pricing", id: "pricing" }
              ].map((item) => (
                <div key={item.id} className="relative group">
                  <button className="text-[14px] font-bold text-slate-600 hover:text-[#1a56db] transition-all flex items-center gap-1.5 py-2">
                    {item.label} {item.id !== "pricing" && <ChevronDown size={14} className="text-slate-400" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/dashboard" className="hidden sm:block text-[14px] font-bold text-slate-600 px-4 py-2">Login</Link>
            <Link href="/dashboard/recruiter" className="bg-[#1a56db] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-bold text-[12px] md:text-[14px] shadow-lg shadow-blue-500/20 hover:bg-[#1e429f] transition-all">
              Dashboard
            </Link>
            <button className="lg:hidden p-2 text-slate-900">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="pt-20 md:pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center space-y-12">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-[40px] sm:text-[56px] lg:text-[84px] font-extrabold leading-[1.1] tracking-tight text-slate-900">
              Transform the way <br /> you hire with AI
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
              AI Recruitment Software designed to source and hire candidates faster. Tailored for HR teams and recruitment agencies.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6">
            <Link href="/interview/8" className="w-full max-w-md bg-[#1a56db] text-white px-10 py-6 rounded-[2rem] text-xl font-black shadow-2xl shadow-blue-500/20 hover:bg-[#1e429f] transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
              <Phone size={24} /> Start AI Interview Now
            </Link>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              No login required for candidates
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-400">
            <span className="flex items-center gap-2"><Check size={16} className="text-green-500" /> No credit card required</span>
            <span className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 2 minutes to get started</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-24 max-w-6xl mx-auto px-8">
          <div className="relative p-2 bg-slate-100 rounded-[3rem] shadow-inner">
            <img
              src="/hero_dashboard.png"
              alt="RecruitPro Dashboard"
              className="rounded-[2.5rem] shadow-2xl w-full border border-slate-200"
            />
          </div>
        </div>
      </section>

      {/* 4. LOGO CLOUD */}
      <section className="py-20 border-y border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-8 text-center space-y-8">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Trusted by 10,000+ recruitment teams in 135+ countries</p>
          <div className="flex flex-wrap justify-center gap-20 opacity-30 grayscale contrast-125">
            {['Unilever', 'Panasonic', 'Toyota', 'Coca-Cola', 'Decathlon'].map((logo, i) => (
              <span key={logo} className="text-3xl font-black text-slate-900 tracking-tighter">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORE MODULES */}

      {/* 1. Easy-to-use */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1a56db]">
                <Layout size={32} />
              </div>
              <h2 className="text-5xl font-black text-slate-900 leading-tight">Easy-to-use <br /> Recruitment Software</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                No steep learning curves or bloated interfaces. RecruitPro platform is simple yet powerful; accessible and relevant to all recruiters.
              </p>
              <div className="space-y-6 pt-4">
                <div className="flex gap-4">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full text-[#1a56db]"><Check size={14} /></div>
                  <div>
                    <p className="font-bold text-slate-900">Customizable pipeline</p>
                    <p className="text-sm text-slate-500">Customize your recruitment pipeline based on your process with a slick drag-and-drop interface.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full text-[#1a56db]"><Check size={14} /></div>
                  <div>
                    <p className="font-bold text-slate-900">Kanban board</p>
                    <p className="text-sm text-slate-500">Get an overview of your recruitment progresses in one single-board view.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-4"
            >
              <img src="/feature_ai_matching.png" alt="Sourcing" className="rounded-[2.5rem]" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 2. Job Boards */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-32 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              variants={scaleIn}
              className="order-2 lg:order-1 bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-4"
            >
              <img src="/feature_job_boards.png" alt="Job Boards" className="rounded-[2.5rem]" />
            </motion.div>
            <motion.div variants={staggerContainer} className="order-1 lg:order-2 space-y-8">
              <motion.div variants={fadeInUp} className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-[#22c55e]">
                <Share2 size={32} />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-5xl font-black text-slate-900 leading-tight">Post to 2,500+ <br /> Channels</motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 font-medium leading-relaxed">
                Share your job openings on 2,500+ free and premium channels, including local, global, and specialized job platforms.
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-4 pt-4">
                {["Global, local and specialized boards", "Manage sponsored ads from one platform", "Native integrations with top platforms"].map(item => (
                  <motion.li variants={fadeInUp} key={item} className="flex items-center gap-3 font-bold text-slate-700">
                    <Check className="text-[#22c55e]" size={20} /> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 3. AI Interviewer */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-32"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div variants={staggerContainer} className="space-y-8">
              <motion.div variants={fadeInUp} className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Cpu size={32} />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-5xl font-black text-slate-900 leading-tight">AI-Powered <br /> Screening</motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 font-medium leading-relaxed">
                Scale your screening by interviewing unlimited candidates at once. RecruitPro's AI Interviewer conducts automated screening based on your requirements.
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-4 pt-4">
                {["24/7 Interview Availability", "Instant Candidate Assessments", "Standardized automated screening"].map(item => (
                  <motion.li variants={fadeInUp} key={item} className="flex items-center gap-3 font-bold text-slate-700">
                    <Check className="text-purple-600" size={20} /> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-8 shadow-2xl relative overflow-hidden"
            >
              <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-purple-500/20 blur-3xl pointer-events-none"
              />
              <div className="flex items-center gap-4 border-b border-white/10 pb-6 relative z-10">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold">AI</div>
                <div>
                  <p className="font-bold">Neural Engine Analysis</p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Active Screening</p>
                </div>
              </div>
              <div className="space-y-4 relative z-10">
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl font-black text-purple-400"
                >
                  98% Match
                </motion.p>
                <p className="text-sm text-slate-300">Candidate demonstrates high competency in technical leadership and React architecture.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 4. Chat with Data */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-32 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              variants={scaleIn}
              className="bg-white p-4 rounded-[3rem] shadow-xl border border-slate-100"
            >
              <img src="/feature_chat_data.png" alt="Chat with Data" className="rounded-[2.5rem]" />
            </motion.div>
            <motion.div variants={staggerContainer} className="space-y-8">
              <motion.div variants={fadeInUp} className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <MessageSquare size={32} />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-5xl font-black text-slate-900 leading-tight">Chat with Your <br /> Data Using AI</motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 font-medium leading-relaxed">
                Connect your RecruitPro account to AI tools like ChatGPT, Claude, and Gemini. Use prompts to find insights and write emails using live data.
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-4 pt-4">
                {["Supercharge Your AI with live data", "Get instant answers about candidates", "Analyze talent pools using natural language"].map(item => (
                  <motion.li variants={fadeInUp} key={item} className="flex items-center gap-3 font-bold text-slate-700">
                    <Check className="text-blue-600" size={20} /> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 5. Recommendations */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-32"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div variants={staggerContainer} className="space-y-8">
              <motion.div variants={fadeInUp} className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Sparkles size={32} />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-5xl font-black text-slate-900 leading-tight">AI-Powered <br /> Recommendations</motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 font-medium leading-relaxed">
                RecruitPro AI Engine suggests the best candidates for a job while automating redundant tasks like profile scoring.
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-4 pt-4">
                {["Automated matching recommendations", "Profile enrichment with LinkedIn data", "Simplified screening process"].map(item => (
                  <motion.li variants={fadeInUp} key={item} className="flex items-center gap-3 font-bold text-slate-700">
                    <Check className="text-amber-600" size={20} /> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-amber-100 rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-50 transition-all" />
              <div className="relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform hover:scale-[1.02]">
                <img
                  src="/ai_recommendations.png"
                  alt="AI Recommendations"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-32 bg-slate-900 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              variants={scaleIn}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />
              <div className="relative p-2 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
                <img
                  src="/profile_enrichment.png"
                  alt="Profile Enrichment"
                  className="rounded-[2.5rem] w-full"
                />
              </div>
            </motion.div>
            <motion.div variants={staggerContainer} className="space-y-8 order-1 lg:order-2">
              <motion.div variants={fadeInUp} className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Database size={32} />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-5xl font-black leading-tight">Profiles <br /> Enrichment</motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-400 font-medium leading-relaxed">
                Collect insights beyond resume. RecruitPro AI Engine browses the web in search of data on 20+ social media and public platforms.
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-4 pt-4">
                {["20+ social and public platforms", "Seamless data enrichment", "LinkedIn, GitHub, and more"].map(item => (
                  <motion.li variants={fadeInUp} key={item} className="flex items-center gap-3 font-bold">
                    <Check className="text-blue-400" size={20} /> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 7. Mobile App */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Smartphone size={32} />
              </div>
              <h2 className="text-5xl font-black text-slate-900 leading-tight">Progressive <br /> Mobile App</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                Access RecruitPro from your computer, phone, or tablet to ensure you never miss any activity, wherever you are.
              </p>
              <ul className="space-y-4 pt-4">
                {["Recruit on the go from any device", "Instant push notifications", "Full feature access on mobile"].map(item => (
                  <li key={item} className="flex items-center gap-3 font-bold text-slate-700">
                    <Check className="text-indigo-600" size={20} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <img src="/feature_mobile.png" alt="Mobile App" className="max-w-sm rounded-[3rem] shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Career Page */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="bg-white p-4 rounded-[3rem] shadow-xl border border-slate-100">
              <img src="/feature_career_page.png" alt="Career Page" className="rounded-[2.5rem]" />
            </div>
            <div className="space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Globe size={32} />
              </div>
              <h2 className="text-5xl font-black text-slate-900 leading-tight">Branded <br /> Career Page</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                Portray your company's brand and proudly communicate who you are to top talent with a zero-code career page.
              </p>
              <ul className="space-y-4 pt-4">
                {["No development required", "Fast setup on any platform", "Connect your custom domain"].map(item => (
                  <li key={item} className="flex items-center gap-3 font-bold text-slate-700">
                    <Check className="text-emerald-600" size={20} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Onboarding */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                <Calendar size={32} />
              </div>
              <h2 className="text-5xl font-black text-slate-900 leading-tight">Onboarding & <br /> Placements</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                Track and manage every new hire throughout every step of their employment experience, from offer letter to onboarding.
              </p>
              <ul className="space-y-4 pt-4">
                {["Keep track of onboarding events", "Customize milestones for any job", "Placement and revenue management"].map(item => (
                  <li key={item} className="flex items-center gap-3 font-bold text-slate-700">
                    <Check className="text-rose-600" size={20} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-[3rem] p-4 shadow-2xl">
              <img src="/feature_onboarding.png" alt="Onboarding" className="rounded-[2.5rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATS */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-32 bg-slate-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-16">
            {[
              { val: "900,000+", label: "Processes Managed" },
              { val: "10,000+", label: "Active Teams" },
              { val: "135+", label: "Countries" }
            ].map(stat => (
              <motion.div variants={fadeInUp} key={stat.label} className="space-y-4">
                <motion.p
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="text-6xl font-black text-[#1a56db]"
                >
                  {stat.val}
                </motion.p>
                <p className="text-lg font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 7. TESTIMONIALS */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-32 bg-white"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center space-y-6 mb-20">
            <motion.h2 variants={fadeInUp} className="text-5xl font-black text-slate-900 leading-tight">Indispensable for <br /> modern teams.</motion.h2>
          </div>
          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <motion.div
                variants={fadeInUp}
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-slate-50 rounded-[3rem] space-y-8 border border-slate-100 transition-shadow hover:shadow-xl"
              >
                <Quote size={40} className="text-blue-200" />
                <p className="text-lg font-medium text-slate-700 leading-relaxed italic">"{t.quote}"</p>
                <div>
                  <p className="font-black text-slate-900 uppercase tracking-tighter">{t.name}</p>
                  <p className="text-xs font-bold text-slate-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 8. CTA SECTION */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-32 bg-[#1a56db] text-white relative overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-full blur-[100px] pointer-events-none"
        />
        <div className="max-w-5xl mx-auto px-8 text-center space-y-12 relative z-10">
          <motion.h2 variants={fadeInUp} className="text-5xl lg:text-6xl font-black leading-tight uppercase tracking-tighter">Ready to hire better? <br /> Start your 14-day free trial.</motion.h2>
          <motion.div variants={staggerContainer} className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#22c55e] text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 transition-all uppercase tracking-widest"
            >
              Start Now
            </motion.button>
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#1a56db] px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 transition-all uppercase tracking-widest"
            >
              Book a Demo
            </motion.button>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex justify-center gap-8 text-xs font-black uppercase tracking-widest text-blue-200">
            <span>No credit card required</span>
            <span>No commitment</span>
          </motion.div>
        </div>
      </motion.section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-16 pb-20 border-b border-white/5">
            <div className="space-y-8">
              <div className="text-2xl font-black tracking-tighter uppercase">Recruit<span className="text-[#1a56db]">Pro</span></div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">The AI-first recruitment platform for the next generation of human capital.</p>
            </div>
            {[
              { title: "Product", links: ["ATS", "CRM", "AI Sourcing", "AI Interviewer", "Pricing"] },
              { title: "Solutions", links: ["Enterprises", "Agencies", "SMBs", "Startups"] },
              { title: "Resources", links: ["Knowledge Base", "API Docs", "Academy", "Blog", "Contact"] }
            ].map(group => (
              <div key={group.title} className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{group.title}</h4>
                <ul className="space-y-4">
                  {group.links.map(l => (
                    <li key={l}><Link href="#" className="text-[14px] font-bold text-slate-300 hover:text-white transition-all">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">© 2026 RecruitPro OS. All rights reserved.</p>
            <div className="flex gap-8">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <Link key={l} href="#" className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
