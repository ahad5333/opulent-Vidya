"use client";
import { motion } from "framer-motion";

export default function LogoMarquee() {
  const logos = [
    "/logos/arbo tech.png",
    "/logos/comfy.png",
    "/logos/editas.png",
    "/logos/ionic security.png",
    "/logos/vairbus.png",
    "/logos/zerox.png",
  ];

  return (
    <section className="relative overflow-hidden py-20" style={{ backgroundColor: "var(--brand-dark)" }}>
      {/* Background Scanning Light Effect */}
      <motion.div
        animate={{
          x: ['-100%', '200%'],
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 z-0 pointer-events-none w-1/3 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent skew-x-12"
      />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Title with improved letter spacing */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-[10px] md:text-xs tracking-[0.3em] font-bold text-blue-400/80 uppercase">
            Trusted by Global Industry Leaders
          </h2>
          <div className="mt-2 h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
        </div>

        <div className="relative group">
          {/* Edge Fades for Seamless Transition */}
          <div className="absolute left-0 top-0 w-32 h-full z-20 pointer-events-none bg-gradient-to-r from-[#040D21] via-[#040D21]/50 to-transparent" />
          <div className="absolute right-0 top-0 w-32 h-full z-20 pointer-events-none bg-gradient-to-l from-[#040D21] via-[#040D21]/50 to-transparent" />

          {/* Scrolling Track - Explicit Left to Right */}
          <div className="flex w-max animate-marquee gap-8 md:gap-16 items-center py-4">
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="group relative flex items-center justify-center min-w-[140px] md:min-w-[180px] h-20 md:h-24 px-6 rounded-2xl transition-all duration-500 
                bg-white/[0.03] border border-white/5 backdrop-blur-sm 
                hover:bg-white/[0.08] hover:border-blue-500/30 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              >
                <img
                  src={logo}
                  alt="Partner Logo"
                  className="relative z-10 h-8 md:h-10 w-auto object-contain transition-all duration-500 
                  filter brightness-75 group-hover:brightness-110 group-hover:scale-110"
                />
                
                {/* Subtle Glow on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}