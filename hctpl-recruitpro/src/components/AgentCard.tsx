"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import AgentStatus from "./AgentStatus";
import Link from "next/link";

interface AgentCardProps {
  name: string;
  role: string;
  description: string;
  icon: LucideIcon;
  status: "idle" | "active" | "completed" | "error";
  href: string;
  color: string;
}

export default function AgentCard({ name, role, description, icon: Icon, status, href, color }: AgentCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="glass-card p-8 rounded-[2.5rem] flex flex-col h-full group cursor-pointer"
      >
        <div className="flex justify-between items-start mb-6">
          <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
            <Icon size={28} />
          </div>
          <AgentStatus status={status} />
        </div>
        
        <div className="space-y-2 mb-6">
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-brand-blue transition-colors">
            {name}
          </h3>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            {role}
          </p>
        </div>

        <p className="text-slate-600 font-medium text-sm leading-relaxed mb-8 flex-grow">
          {description}
        </p>

        <div className="flex items-center gap-2 text-brand-blue font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
          Manage Agent <span>→</span>
        </div>
      </motion.div>
    </Link>
  );
}
