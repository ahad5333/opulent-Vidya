"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 overflow-hidden relative" style={{ backgroundColor: "var(--brand-light)" }}>

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-brand-primary/5 border border-brand-primary/10">
              <Zap className="w-8 h-8 text-brand-primary" />
            </div>
          </div>

          {/* title */}
          <h2 className="text-5xl font-bold mb-4 text-brand-dark">
            Ready to Transform <span className="gradient-text">Your Business?</span>
          </h2>

          {/* subtitle */}
          <p className="text-lg mb-10 max-w-2xl mx-auto text-slate-600 font-medium">
            Join hundreds of companies already using HCTPL to revolutionize their recruitment,
            streamline operations, and accelerate growth with AI-powered solutions.
          </p>

          {/* buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 btn-primary"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-slate-200 text-brand-dark hover:bg-slate-50"
            >
              Schedule Demo
            </motion.button>
          </div>

          {/* footer note */}
          <p className="mt-8 text-sm text-slate-500 font-medium">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}