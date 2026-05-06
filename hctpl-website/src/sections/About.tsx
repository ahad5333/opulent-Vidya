"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Zap, Users, Award } from "lucide-react";

export default function About() {
  const features = [
    { icon: Zap, title: "Fast & Efficient", description: "Rapid deployment and integration with your systems" },
    { icon: Users, title: "Expert Team", description: "10+ years experienced engineering & consulting team" },
    { icon: Award, title: "Award Winning", description: "Recognized globally for innovation & excellence" },
  ];

  const values = ["Innovation", "Quality", "Integrity", "Customer Focus", "Excellence", "Collaboration"];

  return (
    <section id="about" className="relative py-32 overflow-hidden bg-white">
      {/* MODERN BACKGROUND EFFECT */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] rounded-full blur-[150px] top-[-300px] right-[-200px] opacity-20"
          style={{ background: "radial-gradient(circle, var(--brand-primary) 0%, transparent 70%)" }} />
        <div className="absolute w-[800px] h-[800px] rounded-full blur-[120px] bottom-[-200px] left-[-150px] opacity-15"
          style={{ background: "radial-gradient(circle, var(--brand-secondary) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 mesh-gradient opacity-10" />
      </div>

      {/* BACKGROUND IMAGE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <img
          src="/images/avatar.png"
          alt="Grid background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-brand-dark">
            About <span className="gradient-text">HCTPL</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 font-medium leading-relaxed">
            HCTPL is a global technology leader building AI-powered recruitment systems, SaaS platforms, and enterprise solutions that help businesses scale faster and smarter.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-14 items-center mb-24">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-brand-dark">
              Our Journey
            </h3>
            <p className="mb-4 leading-relaxed text-slate-600">
              Built with a mission to transform recruitment and enterprise systems using AI-driven intelligence and automation.
            </p>
            <p className="mb-6 leading-relaxed text-slate-600">
              Today we help companies streamline hiring, scale SaaS products, and improve operational efficiency across global teams.
            </p>

            <ul className="space-y-4">
              {["Est. 2020", "500+ Candidates Placed", "20+ AI Solutions"].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                  <span className="text-slate-600 font-bold text-base">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="relative group"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/hctpl_global_tech_hub_1777993886872.png"
                alt="HCTPL Global Tech Hub"
                width={800}
                height={600}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute bottom-6 left-6 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold bg-white/90 border border-brand-primary/20 text-brand-dark shadow-xl"
              >
                🚀 Building Future Tech
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-24">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-modern p-10 text-center group"
              >
                <div className="p-5 rounded-full w-fit mx-auto mb-8 bg-slate-50 border border-slate-100 shadow-inner group-hover:bg-brand-primary/5 transition-colors">
                  <Icon className="w-8 h-8 text-brand-primary" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-brand-dark group-hover:text-brand-primary transition-colors">
                  {feature.title}
                </h4>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}