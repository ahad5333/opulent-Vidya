"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const phrases = [
  ["AI-Powered", "Recruitment Systems"],
  ["Global Technology", "Consulting Partner"],
  ["Enterprise-Grade", "Software Solutions"],
  ["Smart Process", "Automation & ERP"],
  ["Scale Your Business", "with HCTPL"],
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [index, setIndex] = useState(0);

  const splitText = (lines: string[]) => {
    return lines.map((line, lineIndex) => (
      <div key={lineIndex} className="block leading-tight md:whitespace-nowrap">
        {line.split("").map((char, i) => (
          <span key={i} className="char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    ));
  };

  useEffect(() => {
    let isRunning = true;

    const animateText = () => {
      if (!textRef.current || !isRunning) return;
      const chars = textRef.current.querySelectorAll(".char");

      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            if (isRunning) animateText();
          }, 4000);
        },
      });

      tl.to(chars, { y: -20, opacity: 0, stagger: 0.012, duration: 0.35, ease: "power2.in" });
      tl.call(() => { setIndex((prev) => (prev + 1) % phrases.length); });
      tl.add(() => {
        const newChars = textRef.current?.querySelectorAll(".char");
        if (!newChars) return;
        gsap.fromTo(newChars, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, duration: 0.8, ease: "power3.out" });
      });
    };

    animateText();
    return () => { isRunning = false; };
  }, []);

  useEffect(() => {
    gsap.to(".float-card", { y: "+=20", duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.3 });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden py-20"
      style={{ backgroundColor: "var(--brand-dark)" }}
    >
      {/* BACKGROUND IMAGE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <img 
          src="/hero_tech_enterprise_1777794930640.png" 
          alt="Tech background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* GLOW ORBS */}
      <div className="absolute w-[800px] h-[800px] rounded-full blur-[120px] top-[-200px] left-[-200px]"
        style={{ background: "radial-gradient(circle, rgba(0,185,239,0.15) 0%, transparent 70%)" }} />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[100px] bottom-[-150px] right-[-150px]"
        style={{ background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)" }} />

      {/* GRID PATTERN */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* FLOATING TAGS */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        <div className="float-card absolute top-[20%] left-[10%] px-5 py-2.5 backdrop-blur-md rounded-2xl text-sm font-bold"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(0,185,239,0.3)", color: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          AI Recruiter
        </div>
        <div className="float-card absolute top-[60%] left-[15%] px-5 py-2.5 backdrop-blur-md rounded-2xl text-sm font-bold"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(79,70,229,0.3)", color: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          IT Marketplace
        </div>
        <div className="float-card absolute top-[30%] right-[10%] px-5 py-2.5 backdrop-blur-md rounded-2xl text-sm font-bold"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(0,185,239,0.3)", color: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          AI Chatbot
        </div>
        <div className="float-card absolute bottom-[15%] right-[20%] px-5 py-2.5 backdrop-blur-md rounded-2xl text-sm font-bold"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(79,70,229,0.3)", color: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          ERP Automation
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-30 max-w-4xl px-6 pb-20">
        <motion.h1
          ref={textRef}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-title text-4xl sm:text-5xl md:text-8xl font-extrabold leading-tight tracking-tight text-white mb-6 px-4"
        >
          {splitText(phrases[index])}
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-subtitle mt-6 text-base md:text-xl max-w-2xl mx-auto text-slate-300 font-medium px-4"
        >
          Empowering global enterprises through AI-driven recruitment, custom software development, and digital automation.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-buttons mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center px-6"
        >
          <button
            className="w-full sm:w-auto px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,185,239,0.4)]"
            style={{
              background: "linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))",
              color: "white",
            }}
          >
            Explore Solutions
          </button>
          <button
            className="w-full sm:w-auto px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            Book Strategy Call
          </button>
        </motion.div>
      </div>

      {/* WAVE BOTTOM DIVIDER */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px]"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,112.56,188.7,98.67,235.26,87.49,278.4,70.53,321.39,56.44Z"
            fill="var(--brand-white)"
          />
        </svg>
      </div>

      <style jsx>{`
        .blue-glow {
          text-shadow: 0 0 20px rgba(0,185,239, 0.4);
        }
      `}</style>
    </section>
  );
}