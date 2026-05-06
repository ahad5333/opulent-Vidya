"use client";
import { motion } from "framer-motion";
import { Mic, Globe, Cpu, Database, Languages, BarChart2 } from "lucide-react";

export default function VoiceIntelligence() {
  const features = [
    {
      icon: Languages,
      title: "Multilingual Voice AI",
      desc: "Taniya supports over 15+ global languages with localized accents and cultural nuance.",
      color: "bg-brand-primary"
    },
    {
      icon: Cpu,
      title: "Natural NLP Engine",
      desc: "Proprietary intent recognition system for sub-500ms response times in critical scenarios.",
      color: "bg-indigo-500"
    },
    {
      icon: Database,
      title: "CRM Sync",
      desc: "Instant lead qualification and direct synchronization with Salesforce, HubSpot, and custom CRMs.",
      color: "bg-emerald-500"
    }
  ];

  return (
    <section id="ai-intelligence" className="py-24 overflow-hidden" style={{ backgroundColor: "var(--brand-bg-secondary)", color: "var(--brand-dark)" }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Interactive Visual */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
            
            <div className="relative p-8 rounded-[40px] bg-white border border-slate-100 shadow-2xl">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-brand-primary uppercase">Neural Voice Processing</span>
              </div>

              {/* Waveform Visualization */}
              <div className="flex items-center justify-center gap-1 h-32 mb-12">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [20, Math.random() * 80 + 20, 20]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.5 + Math.random(),
                      ease: "easeInOut"
                    }}
                    className={`w-1.5 rounded-full ${i % 2 === 0 ? 'bg-gradient-to-t from-brand-primary to-brand-cyan' : 'bg-gradient-to-t from-brand-secondary to-indigo-400'}`}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Mic className="w-5 h-5 text-brand-primary" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Voice Input Latency</span>
                  </div>
                  <span className="text-sm font-mono text-brand-primary">0.42s</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <BarChart2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Intent Accuracy</span>
                  </div>
                  <span className="text-sm font-mono text-emerald-500">99.2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-brand-dark">
                Advanced <span className="text-brand-primary">Voice Intelligence</span> for Modern Enterprise
              </h2>
              <p className="text-lg text-slate-600 mb-10">
                Beyond simple chat. Our AI ecosystem utilizes state-of-the-art speech-to-text, neural synthesis, and deep intent analysis to drive business results.
              </p>

              <div className="space-y-8">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                      <f.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1 text-slate-800">{f.title}</h4>
                      <p className="text-slate-600 text-sm">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

                <button 
                  className="mt-12 px-8 py-4 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))" }}
                >
                  Explore AI Solutions
                </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
