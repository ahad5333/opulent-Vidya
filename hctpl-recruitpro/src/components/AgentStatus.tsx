"use client";

import { motion } from "framer-motion";

interface AgentStatusProps {
  status: "idle" | "active" | "completed" | "error";
  label?: string;
}

export default function AgentStatus({ status, label }: AgentStatusProps) {
  const statusConfig = {
    idle: { color: "bg-slate-400", pulse: false, text: label || "Idle" },
    active: { color: "bg-blue-500", pulse: true, text: label || "Active" },
    completed: { color: "bg-green-500", pulse: false, text: label || "Completed" },
    error: { color: "bg-red-500", pulse: false, text: label || "Error" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={`w-2.5 h-2.5 rounded-full ${config.color}`} />
        {config.pulse && (
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-0 rounded-full ${config.color}`}
          />
        )}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
        {config.text}
      </span>
    </div>
  );
}
