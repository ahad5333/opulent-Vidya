"use client";

import { motion } from "framer-motion";
import Counter from "@/components/Counter";

export default function Stats() {
  const stats = [
    { label: "Projects", value: "100+" },
    { label: "Clients", value: "50+" },
    { label: "Candidates Placed", value: "500+" },
    { label: "AI Solutions", value: "20+" },
  ];

  return (
    <section className="py-20 text-center">
      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-primary">
  <Counter target={100} />
</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}