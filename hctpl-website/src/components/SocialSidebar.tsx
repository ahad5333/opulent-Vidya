"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialSidebar() {
  return (
    <motion.div 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-1.5 md:p-2 bg-brand-dark/90 backdrop-blur-md shadow-[4px_0_24px_rgba(0,0,0,0.4)] rounded-r-2xl border border-l-0 border-white/10"
    >
      
      {/* WhatsApp / Phone */}
      <a 
        href="#" 
        className="w-8 h-8 md:w-10 md:h-10 bg-brand-dark hover:bg-brand-primary text-brand-white/80 hover:text-white rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-white/5"
        title="WhatsApp"
      >
        <Phone size={16} className="md:w-[18px] md:h-[18px]" />
      </a>

      {/* Facebook */}
      <a 
        href="#" 
        className="w-8 h-8 md:w-10 md:h-10 bg-brand-dark hover:bg-brand-primary text-brand-white/80 hover:text-white rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-white/5"
        title="Facebook"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-[18px] md:h-[18px]" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      </a>

      {/* LinkedIn */}
      <a 
        href="#" 
        className="w-8 h-8 md:w-10 md:h-10 bg-brand-dark hover:bg-brand-primary text-brand-white/80 hover:text-white rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-white/5"
        title="LinkedIn"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-[18px] md:h-[18px]" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      </a>

      {/* Instagram */}
      <a 
        href="#" 
        className="w-8 h-8 md:w-10 md:h-10 bg-brand-dark hover:bg-brand-primary text-brand-white/80 hover:text-white rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-white/5"
        title="Instagram"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-[18px] md:h-[18px]" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>

    </motion.div>
  );
}
