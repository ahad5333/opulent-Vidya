"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { Briefcase, Send } from "lucide-react";

export default function CareersPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img src="/modern_office_careers_1777795966090.png" className="w-full h-full object-cover" alt="bg" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            Shape the Future <span className="gradient-text">With Us</span>
          </motion.h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300 leading-relaxed">
            HCTPL is more than a workplace. It's an ecosystem where AI, innovation, and global talent converge to build something extraordinary.
          </p>
        </div>
      </section>

      {/* COMING SOON SECTION */}
      <section className="py-28 bg-white relative z-10 overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-50 border border-slate-200 rounded-[3rem] p-12 md:p-20 shadow-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B9EF]/10 text-[#00B9EF] text-sm font-bold mb-8">
              <Briefcase className="w-4 h-4" />
              Career Portal Update
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-8 tracking-tight">
              Exciting Roles <br />
              <span className="gradient-text">Coming Soon</span>
            </h2>

            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              We are currently restructuring our career portal to better connect with global talent. 
              Extraordinary opportunities are just around the corner.
            </p>

            <div className="flex flex-col items-center gap-8">
              <div className="text-slate-400 font-medium">
                Want to be the first to know or share your profile?
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="/contact"
                  className="w-full sm:w-auto px-10 py-5 bg-brand-dark text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                >
                  Contact Us
                  <Send size={18} />
                </a>
                <span className="text-slate-300 hidden sm:block">|</span>
                <p className="text-sm text-slate-500 font-bold">
                  Recruitment starts soon
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}