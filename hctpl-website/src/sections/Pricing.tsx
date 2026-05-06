"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  const [plans, setPlans] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load plans from shared source
  useEffect(() => {
    setMounted(true);
    const savedPlans = localStorage.getItem("hctpl_plans");
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    } else {
      // Fallback to static defaults
      setPlans([
        { name: "Starter", price: "₹9,999", period: "/month", description: "Perfect for growing startups and small agencies.", features: ["Access to AI Recruiter MVP", "Up to 5 User Accounts"], isPopular: false },
        { name: "Growth", price: "₹49,999", period: "/month", description: "Advanced tools for scaling mid-sized businesses.", features: ["Full AI Ecosystem Access", "Automated AI Interviews"], isPopular: true },
        { name: "Enterprise", price: "Custom", period: "", description: "Tailored AI solutions for large global enterprises.", features: ["White-label Solutions", "Dedicated Success Manager"], isPopular: false }
      ]);
    }
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch by not rendering until mounted

  return (
    <section id="pricing" className="relative py-28 overflow-hidden bg-white">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-brand-dark">
            Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-900">
            Flexible SaaS plans designed to scale with your business needs.
          </p>
        </motion.div>

        {/* PRICING GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-full"
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full z-20 bg-brand-dark text-white shadow-xl">
                  MOST POPULAR
                </div>
              )}
              <div
                className={`h-full flex flex-col p-8 rounded-2xl transition-all duration-300 border ${
                  plan.isPopular 
                    ? "bg-brand-dark border-[#00B9EF] shadow-2xl scale-[1.05] z-10" 
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${plan.isPopular ? "text-white" : "text-brand-dark"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.isPopular ? "text-slate-300" : "text-slate-900"}`}>
                  {plan.description}
                </p>

                <div className="mb-8">
                  <span className={`text-4xl font-extrabold ${plan.isPopular ? "text-white" : "text-brand-dark"}`}>
                    {plan.price}
                  </span>
                  {plan.period && <span className={`font-medium ${plan.isPopular ? "text-slate-400" : "text-slate-500"}`}> {plan.period}</span>}
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature: string, idx: number) => (
                    <li key={idx} className={`flex items-start gap-3 text-sm ${plan.isPopular ? "text-slate-300" : "text-slate-900"}`}>
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.isPopular ? "text-[#00B9EF]" : "text-[#00B9EF]"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 mt-auto hover:scale-105 ${
                    plan.isPopular 
                      ? "bg-white text-brand-dark" 
                      : "btn-primary"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
