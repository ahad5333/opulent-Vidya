"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Monitor,
  Users,
  CheckCircle2
} from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "IT Consulting",
      icon: Monitor,
      items: [
        "Website & App Development",
        "SaaS Platforms",
        "Cloud Solutions",
        "System Integrations"
      ]
    },
    {
      title: "AI Solutions",
      icon: Brain,
      items: [
        "Custom AI Chatbots",
        "Process Automation",
        "AI Analytics Integration",
        "Machine Learning Models"
      ]
    },
    {
      title: "Staffing & Recruitment",
      icon: Users,
      items: [
        "Contract Staffing",
        "Permanent Hiring",
        "Technical Screening",
        "Dedicated Remote Teams"
      ]
    }
  ];

  return (
    <section id="services" className="py-32 text-center relative overflow-hidden" style={{ backgroundColor: "var(--brand-light)" }}>
      {/* BACKGROUND IMAGE OVERLAY */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none">
        <img 
          src="/ai_recruitment_service_1777794945588.png" 
          alt="AI background" 
          className="w-full h-full object-cover"
        />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-brand-dark"
      >
        Our <span className="gradient-text">Services</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg mb-16 max-w-2xl mx-auto text-slate-600"
      >
        Comprehensive technology, consulting, and staffing solutions to transform your business.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 relative z-10">
        {services.map((service, i) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="card-modern group p-8 flex flex-col h-full"
            >
              {/* ICON */}
              <div className="mb-8 w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-lg border border-slate-50 transition-all duration-300 group-hover:shadow-brand-primary/10">
                <Icon className="w-8 h-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 text-brand-primary" />
              </div>

              {/* TITLE */}
              <h3 className="font-extrabold text-2xl mb-6 transition-colors text-brand-dark group-hover:text-brand-primary">
                {service.title}
              </h3>

              {/* ITEMS LIST */}
              <ul className="space-y-4 mt-auto">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start text-base group/item">
                    <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 shrink-0 text-brand-primary" />
                    <span className="text-slate-600 font-medium group-hover/item:text-brand-dark transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}