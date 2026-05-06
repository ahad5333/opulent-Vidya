"use client";
import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink } from "lucide-react";

export default function TalentGrid() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B9EF]/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-dark/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-slate-100 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B9EF]/10 text-[#00B9EF] text-sm font-bold mb-8">
              <ShieldCheck className="w-4 h-4" />
              Elite Talent Network
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-8 leading-tight">
              Let Us Help You Find <br />
              <span className="gradient-text">Elite Talented People</span>
            </h2>
            
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Our marketplace is currently transitioning to an automated admin-managed system. 
              In the meantime, we are personally assisting our partners in securing top-tier professionals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="/contact"
                className="w-full sm:w-auto px-10 py-5 bg-brand-dark text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                Contact Us Now
                <ExternalLink className="w-5 h-5" />
              </a>
              <p className="text-sm text-slate-400 font-medium">
                Average response time: &lt; 2 hours
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

