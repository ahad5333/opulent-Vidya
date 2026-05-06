"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, UserSearch, Zap, TrendingUp, ChevronRight } from "lucide-react";
import Tilt from "react-parallax-tilt";

export default function AISolutionsPage() {
  const solutions = [
    {
      title: "AI Recruiter",
      description: "Automated candidate screening, resume parsing, scoring, and interview scheduling.",
      icon: UserSearch,
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "AI Chatbot",
      description: "Customer support automation, lead qualification, and conversational AI.",
      icon: Bot,
      color: "from-blue-400 to-teal-500"
    },
    {
      title: "AI Lead Generation",
      description: "Automated lead discovery and engagement systems.",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "AI Automation",
      description: "Business process automation using intelligent AI workflows.",
      icon: Zap,
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B9EF]/40 to-purple-900/40 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00B9EF]/30 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center mt-8">
          
          <a href="/" className="absolute -top-12 left-0 inline-flex items-center gap-2 text-[#00B9EF] hover:text-slate-900 transition-colors font-medium">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Home
          </a>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-300 text-sm font-semibold mb-6"
          >
            <Bot size={16} />
            Next-Generation Technology
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Transform Your Business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI Solutions</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-900/60 max-w-3xl mx-auto mb-10"
          >
            Leverage artificial intelligence to automate processes, discover leads, and recruit top talent effortlessly.
          </motion.p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 px-6 relative z-20 -mt-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.05}
                  scale={1.02}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  transitionSpeed={2500}
                  className="h-full"
                >
                  <Card className="h-full overflow-hidden border-0 shadow-xl bg-white rounded-2xl group hover:shadow-2xl transition-all duration-300">
                    <div className={`h-2 w-full bg-gradient-to-r ${item.color}`}></div>
                    <CardContent className="p-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-slate-900 mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <Icon size={28} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                      <p className="text-slate-900/80 leading-relaxed text-lg mb-8">
                        {item.description}
                      </p>
                      
                      <a href="#contact" className="inline-flex items-center text-sm font-bold text-[#00B9EF] group-hover:text-blue-700">
                        Learn More <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </CardContent>
                  </Card>
                </Tilt>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50 px-6 text-center border-t border-blue-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to Automate?</h2>
          <p className="text-lg text-slate-900/80 mb-8">Let us help you integrate powerful AI systems into your workflow today.</p>
          <button className="px-8 py-4 bg-[#00B9EF] text-slate-900 font-bold rounded-xl shadow-lg hover:bg-blue-700 transition hover:-translate-y-1">
            Schedule a Demo
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
