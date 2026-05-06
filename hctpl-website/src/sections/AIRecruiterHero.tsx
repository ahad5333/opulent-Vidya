"use client";
import { motion } from "framer-motion";
import { Sparkles, Users, Cpu, ShieldCheck } from "lucide-react";

export default function AIRecruiterHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20 pb-12 bg-brand-dark">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-bold tracking-widest text-brand-primary uppercase">Flagship AI Product</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Recruitment Beyond <br />
            <span className="bg-gradient-to-r from-brand-primary to-brand-cyan bg-clip-text text-transparent">
              Traditional Hiring
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            HCTPL's AI Recruiter Platform automates your entire hiring pipeline—from sourcing and screening to AI-led technical interviews and final negotiations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-1">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl backdrop-blur-md hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { icon: Users, label: "AI Sourcing", color: "text-brand-primary" },
            { icon: Cpu, label: "Interview Engine", color: "text-cyan-400" },
            { icon: ShieldCheck, label: "Fraud Detection", color: "text-emerald-400" },
            { icon: Sparkles, label: "Smart Matching", color: "text-indigo-400" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <feature.icon className={`w-8 h-8 ${feature.color}`} />
              <span className="text-sm font-semibold text-slate-300">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
