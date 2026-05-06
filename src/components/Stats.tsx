import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Globe } from 'lucide-react';

const Stats = () => {
  const stats = [
    { icon: <Users size={36} />, value: "25K+", label: "Successful Graduates", color: "bg-blue-500" },
    { icon: <BookOpen size={36} />, value: "500+", label: "Advanced Programs", color: "bg-green-500" },
    { icon: <Award size={36} />, value: "150+", label: "Partner Universities", color: "bg-purple-500" },
    { icon: <Globe size={36} />, value: "30+", label: "Global Locations", color: "bg-orange-500" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="bg-secondary rounded-[4rem] p-16 md:p-24 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                  {stat.icon}
                </div>
                <h2 className="text-5xl font-black text-white mb-3 tracking-tight">{stat.value}</h2>
                <p className="text-white/50 font-bold text-sm uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .grid { display: grid; }
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </section>
  );
};

export default Stats;
