"use client";
import { motion } from "framer-motion";
import { Rocket, Globe, Zap, Users } from "lucide-react";

export default function MarketplaceHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-12 bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border-brand-primary/20 mb-8">
            <Rocket className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-bold tracking-widest text-brand-primary uppercase">On-Demand Global Talent</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-brand-dark">
            Hire Elite <span className="gradient-text">Tech Resources</span> <br />
            in Minutes
          </h1>
          
          <p className="text-lg md:text-xl text-slate-900 max-w-3xl mx-auto mb-10">
            Skip the month-long hiring cycles. Access HCTPL's pre-vetted bench of developers, AI specialists, and consultants ready to scale your project.
          </p>

          <div className="flex flex-wrap justify-center gap-12">
            {[
              { icon: Globe, label: "Global Reach", sub: "Talent from 20+ countries" },
              { icon: Zap, label: "Quick Onboarding", sub: "Start in 48 hours" },
              { icon: Users, label: "Vetted Experts", sub: "Top 3% of talent only" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <span className="font-bold text-slate-900">{stat.label}</span>
                <span className="text-xs text-slate-500">{stat.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
