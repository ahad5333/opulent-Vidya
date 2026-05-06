"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import CTA from "@/sections/CTA";
import Image from "next/image";
import { 
  Bot, 
  Store, 
  MessageSquareCode, 
  Workflow, 
  CheckCircle2,
  ChevronRight,
  Zap,
  ShieldCheck,
  TrendingUp
} from "lucide-react";

export default function ProductsPage() {
  const products = [
    {
      id: "ai-recruiter",
      name: "AI Recruiter Platform",
      tagline: "Automated candidate screening and engagement",
      icon: Bot,
      image: "/ai_recruiter_platform_1777795652975.png",
      color: "from-blue-400 to-[#3B82F6]",
      description: "An intelligent, end-to-end recruitment platform that automates sourcing, parsing, screening, and interview scheduling. It utilizes advanced LLMs to identify top talent with 99% accuracy while eliminating human bias.",
      features: [
        "Automated Resume Parsing & Scoring",
        "AI-Driven Technical Interviews",
        "Bias Reduction Algorithms",
        "Predictive Hiring Analytics",
        "Seamless ATS Integration"
      ],
      link: "http://localhost:3000"
    },
    {
      id: "marketplace",
      name: "IT Services Marketplace",
      tagline: "Global tech talent & vendor aggregation",
      icon: Store,
      image: "/it_marketplace_visual_1777795667680.png",
      color: "from-teal-400 to-blue-600",
      description: "A secure, scalable marketplace connecting global enterprises with verified IT service providers, specialized development teams, and independent consultants. Featuring escrow payments and automated contract management.",
      features: [
        "Verified Vendor Directory",
        "Smart Match Engine",
        "Automated Milestone Tracking",
        "Integrated Escrow Payments",
        "Global Compliance Management"
      ],
      link: "/marketplace"
    },
    {
      id: "chatbot",
      name: "AI Chatbot Platform",
      tagline: "Conversational intelligence for enterprise",
      icon: MessageSquareCode,
      image: "/ai_chatbot_interface_1777795682697.png",
      color: "from-blue-400 to-[#3B82F6]",
      description: "Deploy custom-trained AI chatbots that understand context, tone, and complex queries. Perfect for customer support automation, lead generation, and internal employee helpdesks.",
      features: [
        "Custom Knowledge Base Training",
        "Multi-language Support",
        "Omnichannel Deployment (Web, WhatsApp)",
        "Live Agent Handoff",
        "Real-time Sentiment Analysis"
      ],
      link: "#"
    },
    {
      id: "erp",
      name: "Business Automation ERP",
      tagline: "Unified intelligent operations",
      icon: Workflow,
      image: "/business_erp_dashboard_1777795698256.png",
      color: "from-blue-300 to-[#3B82F6]",
      description: "A next-generation Enterprise Resource Planning system infused with AI to automate mundane tasks, forecast demand, optimize supply chains, and provide real-time operational visibility.",
      features: [
        "AI Demand Forecasting",
        "Automated Payroll & HRMS",
        "Intelligent Financial Reconciliations",
        "Supply Chain Optimization",
        "Custom Analytics Dashboards"
      ],
      link: "#"
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="/hero_tech_enterprise_1777794930640.png" className="w-full h-full object-cover" alt="bg" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
          >
            The HCTPL <span className="gradient-text">Product Ecosystem</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Explore our suite of highly advanced, AI-driven SaaS platforms designed to automate recruitment, streamline IT services, and transform enterprise operations.
          </motion.p>
        </div>
      </section>

      {/* PRODUCTS DISPLAY */}
      <section className="relative z-10">
        {products.map((product, i) => {
          const Icon = product.icon;
          const isEven = i % 2 === 0;
          const isBlueBg = i % 2 !== 0; // Alternate: White -> Blue -> White -> Blue

          return (
            <div 
              key={i} 
              id={product.id} 
              className={`py-28 ${isBlueBg ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark'}`}
            >
              <div className={`max-w-7xl mx-auto px-6 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}>
                
                {/* Image Section */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="md:w-1/2 w-full"
                >
                  <div className={`relative w-full aspect-square md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden border ${isBlueBg ? 'border-white/10' : 'border-slate-200'} shadow-2xl group`}>
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i === 0}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute top-6 left-6 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold border ${isBlueBg ? 'bg-white/10 border-white/20 text-white' : 'bg-brand-dark/80 border-white/10 text-white shadow-xl'}`}>
                      <Zap className="w-4 h-4 inline mr-2 text-[#3B82F6]" />
                      Fast Integration
                    </div>
                  </div>
                </motion.div>

                {/* Content Section */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="md:w-1/2 w-full"
                >
                  <div className={`inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold ${isBlueBg ? 'bg-white/10 text-[#3B82F6]' : 'bg-brand-dark/5 text-brand-dark'}`}>
                    HCTPL FLAGSHIP PRODUCT
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-2">{product.name}</h2>
                  <p className="text-xl text-[#3B82F6] mb-6 font-medium">{product.tagline}</p>
                  
                  <p className={`text-lg leading-relaxed mb-8 ${isBlueBg ? 'text-slate-300' : 'text-slate-600'}`}>
                    {product.description}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#3B82F6] shrink-0" />
                        <span className={isBlueBg ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a 
                    href={product.link}
                    className={`flex items-center gap-2 px-8 py-4 font-bold rounded-xl transition-all shadow-lg group ${isBlueBg ? 'bg-white text-brand-dark hover:bg-slate-100' : 'btn-primary'}`}
                  >
                    Explore Platform
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>
            </div>
          );
        })}
      </section>

      {/* INTEGRATION BANNER */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <TrendingUp className="w-16 h-16 text-brand-dark mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">Seamlessly Integrated Ecosystem</h2>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            While each product is powerful on its own, they are designed to work together. The AI Recruiter feeds data directly into the ERP, while the Chatbot acts as the unified frontend for marketplace vendors and internal staff.
          </p>
          <button className="px-10 py-5 btn-primary rounded-xl shadow-2xl transition hover:scale-105">
            Talk to a Solutions Architect
          </button>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
