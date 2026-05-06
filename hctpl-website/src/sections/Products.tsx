"use client";

import { motion } from "framer-motion";
import { UserPlus, Briefcase, Bot, ServerCog } from "lucide-react";

export default function Products() {
  const products = [
    {
      id: "ai-recruiter",
      title: "AI Recruiter Platform",
      tagline: "Automated candidate screening and engagement",
      icon: UserPlus,
      description: "An intelligent, end-to-end recruitment platform that automates sourcing, parsing, screening, and interview scheduling. It utilizes advanced LLMs to identify top talent with 99% accuracy while eliminating human bias.",
      features: [
        "Automated Resume Parsing & Scoring",
        "AI-Driven Technical Interviews",
        "Bias Reduction Algorithms",
        "Predictive Hiring Analytics",
        "Seamless ATS Integration",
      ],
    },
    {
      id: "marketplace",
      title: "IT Services Marketplace",
      icon: Briefcase,
      description: "Hire developers, AI engineers, and consultants directly through our intelligent platform.",
      features: ["Client Dashboard", "Bench Management System", "Dedicated Team Hiring"],
    },
    {
      id: "chatbot",
      title: "AI Chatbot Platform",
      icon: Bot,
      description: "Omnichannel AI assistants across web, WhatsApp, and voice calling.",
      features: ["Website AI Assistant", "Voice AI Calling", "CRM Integration"],
    },
    {
      id: "erp",
      title: "Business Automation ERP",
      icon: ServerCog,
      description: "A comprehensive ERP system for scaling your business operations.",
      features: ["HRMS & Payroll", "Finance Management", "Project Management"],
    },
  ];

  return (
    <section id="products" className="relative py-24 overflow-hidden" style={{ backgroundColor: "var(--brand-white)" }}>

      {/* BACKGROUND IMAGE OVERLAY */}
      <div className="absolute bottom-0 left-0 w-1/3 h-full opacity-[0.02] pointer-events-none">
        <img 
          src="/it_solutions_grid_1777794961336.png" 
          alt="IT background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-brand-dark/5 border border-brand-dark/10 text-brand-dark">
            Ecosystem Flagships
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-brand-dark">
            Our Core <span className="gradient-text">Products</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-600">
            SaaS-based platforms engineered for modern enterprises, recruitment agencies, and consulting firms.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                id={product.id}
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <div
                  className="card-modern h-full group flex flex-col"
                >
                  <div className="p-8 md:p-10 flex flex-col h-full">
                    <div className="relative z-10 flex-grow">
                      {/* HEADER */}
                      <div className="flex items-start justify-between mb-6">
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${index % 2 === 0 ? 'bg-brand-primary/10 border-brand-primary/20' : 'bg-brand-secondary/10 border-brand-secondary/20'}`}
                        >
                          <Icon className={`w-8 h-8 ${index % 2 === 0 ? 'text-brand-primary' : 'text-brand-secondary'}`} />
                        </motion.div>
                        <div className="text-sm font-mono tracking-wider text-slate-400">
                          0{index + 1}
                        </div>
                      </div>

                      {/* TITLE */}
                      <h3 className="text-2xl font-bold mb-1 transition-colors duration-300 text-brand-dark">
                        {product.title}
                      </h3>

                      {/* TAGLINE */}
                      {product.tagline && (
                        <p className={`text-sm font-semibold mb-3 uppercase tracking-wider ${index % 2 === 0 ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                          {product.tagline}
                        </p>
                      )}

                      {/* DESCRIPTION */}
                      <p className="mb-8 leading-relaxed text-slate-600">
                        {product.description}
                      </p>

                      {/* FEATURES */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-extrabold uppercase tracking-widest mb-4 text-brand-primary">
                          Core Capabilities
                        </h4>
                        {product.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 text-base text-slate-600 font-medium">
                            <div className="w-2 h-2 rounded-full flex-shrink-0 bg-brand-primary" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BUTTON */}
                    <a
                      href={product.id === 'ai-recruiter' ? 'http://localhost:3000' : product.id === 'marketplace' ? '/marketplace' : '#'}
                      className="mt-10 w-full py-4 rounded-full font-bold transition-all duration-300 text-center block text-white shadow-lg hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))",
                      }}
                    >
                      Explore Platform
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}