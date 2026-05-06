"use client";

import { useState } from "react";
import { Check, Info, HelpCircle, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  fadeInUp, 
  staggerContainer, 
  scaleIn, 
  hoverScale,
  sectionReveal
} from "@/utils/animations";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("annually");

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* NAVBAR (Simple) */}
      <nav className="py-6 border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-tighter uppercase">
            Recruit<span className="text-[#1a56db]">Pro</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-bold text-slate-600">Login</Link>
            <Link href="/" className="bg-[#22c55e] text-white px-6 py-2.5 rounded-lg font-bold text-sm">Start Free Trial</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-24 text-center space-y-8 bg-slate-50/50">
         <motion.h1 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 uppercase"
         >
           Simple and Transparent <span className="text-[#1a56db]">Pricing.</span>
         </motion.h1>
         <motion.p 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="text-xl text-slate-500 font-medium max-w-2xl mx-auto"
         >
           Choose the plan that fits your team's size and hiring needs. No hidden fees.
         </motion.p>
         
         {/* Toggle */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="flex items-center justify-center gap-4 pt-4"
         >
            <span className={`text-sm font-bold ${billingCycle === "monthly" ? "text-slate-900" : "text-slate-400"}`}>Monthly plans</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")}
              className="w-14 h-8 bg-slate-200 rounded-full relative p-1 transition-all"
            >
               <motion.div 
                 animate={{ x: billingCycle === "annually" ? 24 : 0 }}
                 className="w-6 h-6 bg-white rounded-full shadow-md" 
               />
            </button>
            <span className={`text-sm font-bold ${billingCycle === "annually" ? "text-slate-900" : "text-slate-400"}`}>Yearly plans <span className="text-[#22c55e] ml-2 font-black uppercase text-[10px] bg-green-50 px-2 py-1 rounded-full">Save 20%</span></span>
         </motion.div>
      </section>

      {/* PRICING CARDS */}
      <section className="py-24 max-w-7xl mx-auto px-8">
         <motion.div 
           variants={staggerContainer}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="grid lg:grid-cols-4 gap-6"
         >
            
            {/* Professional */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] border border-slate-100 bg-white space-y-8 hover:shadow-2xl transition-all flex flex-col"
            >
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Professional</h3>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">For individuals & small teams</p>
               </div>
               <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">$15</span>
                  <span className="text-slate-400 font-bold text-xs uppercase">/month</span>
               </div>
               <ul className="space-y-4 flex-1">
                  {["Up to 15 Jobs / Account", "Up to 10,000 Candidates", "Unlimited Hiring Managers", "AI Matching Engine"].map(f => (
                    <li key={f} className="flex items-start gap-3 text-[13px] font-bold text-slate-700">
                       <Check size={16} className="text-[#22c55e] mt-0.5" /> {f}
                    </li>
                  ))}
               </ul>
               <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-xl border-2 border-slate-100 text-slate-900 font-black hover:bg-slate-50 transition-all uppercase text-[10px] tracking-widest">Start Free Trial</motion.button>
            </motion.div>

            {/* Enterprise */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] border border-slate-100 bg-white space-y-8 hover:shadow-2xl transition-all flex flex-col relative"
            >
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Enterprise</h3>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">For growing teams</p>
               </div>
               <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">$35</span>
                  <span className="text-slate-400 font-bold text-xs uppercase">/month</span>
               </div>
               <ul className="space-y-4 flex-1">
                  {["Unlimited Jobs", "Unlimited Candidates", "Unlimited Hiring Managers", "Workflow Automation"].map(f => (
                    <li key={f} className="flex items-start gap-3 text-[13px] font-bold text-slate-700">
                       <Check size={16} className="text-[#22c55e] mt-0.5" /> {f}
                    </li>
                  ))}
               </ul>
               <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-xl bg-slate-900 text-white font-black hover:opacity-90 transition-all uppercase text-[10px] tracking-widest">Start Free Trial</motion.button>
            </motion.div>

            {/* Enterprise Plus */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] border-4 border-[#1a56db] bg-white space-y-8 shadow-2xl flex flex-col relative"
            >
               <motion.div 
                 initial={{ y: 10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#1a56db] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
               >
                 Popular
               </motion.div>
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Enterprise Plus</h3>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">For industry leaders</p>
               </div>
               <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">$55</span>
                  <span className="text-slate-400 font-bold text-xs uppercase">/month</span>
               </div>
               <ul className="space-y-4 flex-1">
                  {["Everything in Enterprise", "ChatGPT & LLM integration", "RecruitPro Open API", "Priority Support", "Access to Beta features"].map(f => (
                    <li key={f} className="flex items-start gap-3 text-[13px] font-bold text-slate-700">
                       <Check size={16} className="text-[#1a56db] mt-0.5" /> {f}
                    </li>
                  ))}
               </ul>
               <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-xl bg-[#1a56db] text-white font-black shadow-xl shadow-blue-500/20 hover:opacity-90 transition-all uppercase text-[10px] tracking-widest">Start Free Trial</motion.button>
            </motion.div>

            {/* Custom */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] border border-slate-100 bg-white space-y-8 hover:shadow-2xl transition-all flex flex-col"
            >
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Custom</h3>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">For custom integrations</p>
               </div>
               <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 uppercase tracking-tighter">On Demand</span>
               </div>
               <ul className="space-y-4 flex-1">
                  {["Dedicated account manager", "Phone support", "Custom Features", "Custom compliance and reports"].map(f => (
                    <li key={f} className="flex items-start gap-3 text-[13px] font-bold text-slate-700">
                       <Check size={16} className="text-[#22c55e] mt-0.5" /> {f}
                    </li>
                  ))}
               </ul>
               <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-xl border-2 border-slate-100 text-slate-900 font-black hover:bg-slate-50 transition-all uppercase text-[10px] tracking-widest">Contact Us</motion.button>
            </motion.div>

         </motion.div>
         <motion.p 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-12 text-center text-xs font-bold text-slate-400 uppercase tracking-widest"
         >
           Additional GST fees will be applied to Singaporean tax residents
         </motion.p>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-32">
         <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">© 2026 RecruitPro OS. All rights reserved.</p>
               <div className="flex gap-8">
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                    <Link key={l} href="#" className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-all">{l}</Link>
                  ))}
               </div>
            </div>
         </div>
      </footer>

    </div>
  );
}
