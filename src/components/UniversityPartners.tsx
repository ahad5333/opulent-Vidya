import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Landmark, GraduationCap, Globe2, Award, ExternalLink } from 'lucide-react';
import React from 'react';

const universities = [
  {
    name: "Harvard University",
    location: "Cambridge, Massachusetts",
    logo: "https://logo.clearbit.com/harvard.edu",
    description: "Leading global research and Ivy League excellence.",
    rank: "#1 Global",
    color: "#A51C30"
  },
  {
    name: "Stanford University",
    location: "Stanford, California",
    logo: "https://logo.clearbit.com/stanford.edu",
    description: "Hub of innovation and entrepreneurial spirit.",
    rank: "#3 Global",
    color: "#8C1515"
  },
  {
    name: "University of Oxford",
    location: "Oxford, United Kingdom",
    logo: "https://logo.clearbit.com/ox.ac.uk",
    description: "The oldest university in the English-speaking world.",
    rank: "#4 Global",
    color: "#002147"
  },
  {
    name: "MIT",
    location: "Cambridge, Massachusetts",
    logo: "https://logo.clearbit.com/mit.edu",
    description: "Pioneering technological research and education.",
    rank: "#2 Global",
    color: "#A31F34"
  },
  {
    name: "Cambridge University",
    location: "Cambridge, United Kingdom",
    logo: "https://logo.clearbit.com/cam.ac.uk",
    description: "Excellence in science, medicine and technology.",
    rank: "#5 Global",
    color: "#003E52"
  },
  {
    name: "ETH Zurich",
    location: "Zurich, Switzerland",
    logo: "https://logo.clearbit.com/ethz.ch",
    description: "Global leader in technology and natural sciences.",
    rank: "#7 Global",
    color: "#1F407A"
  },
  {
    name: "NUS Singapore",
    location: "Kent Ridge, Singapore",
    logo: "https://logo.clearbit.com/nus.edu.sg",
    description: "Asia's leading global university for the future.",
    rank: "#8 Global",
    color: "#EF7C00"
  },
  {
    name: "University of Toronto",
    location: "Toronto, Canada",
    logo: "https://logo.clearbit.com/utoronto.ca",
    description: "Canada's top-ranked public research university.",
    rank: "#18 Global",
    color: "#002A5C"
  }
];

const TiltCard = ({ uni, index }: { uni: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[460px] w-full rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl overflow-hidden group cursor-pointer"
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle at center, ${uni.color}15 0%, transparent 70%)` 
        }}
      />

      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 p-8 flex flex-col items-center"
      >
        {/* Logo Section */}
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-white rounded-2xl shadow-xl group-hover:shadow-primary/20 transition-all duration-500 scale-110 blur-xl opacity-0 group-hover:opacity-50" />
          <div className="relative bg-white p-4 rounded-2xl shadow-lg border border-gray-100 w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={uni.logo} 
              alt={uni.name} 
              className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://cdn-icons-png.flaticon.com/512/3233/3233475.png";
              }}
            />
          </div>
        </div>

        {/* Rank Badge */}
        <div className="mb-4">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase border border-primary/20">
            {uni.rank}
          </span>
        </div>

        {/* Text Content */}
        <h3 className="text-2xl font-black text-secondary text-center mb-2 group-hover:text-primary transition-colors duration-300">
          {uni.name}
        </h3>
        <p className="text-xs font-bold text-text-muted text-center mb-6 flex items-center gap-1.5 justify-center">
          <Globe2 size={12} className="text-primary" /> {uni.location}
        </p>

        {/* Hover Reveal Content */}
        <div className="mt-auto w-full">
          <p className="text-sm text-text-muted text-center font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 line-clamp-3 mb-6">
            {uni.description}
          </p>
          
          <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 delay-75">
            <button className="flex items-center gap-2 bg-secondary hover:bg-primary text-white px-8 py-3.5 rounded-2xl text-sm font-black transition-all shadow-xl hover:scale-105 active:scale-95">
              Explore Programs <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors duration-700" />
    </motion.div>
  );
};

const UniversityPartners = () => {
  return (
    <section id="university-partners" className="section bg-[#F8FAFC] relative overflow-hidden py-32">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[5%] w-[35rem] h-[35rem] bg-secondary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary font-black text-xs uppercase tracking-[0.2em] mb-6 shadow-sm border border-gray-100"
            >
              <Landmark size={14} />
              Elite Institutional Network
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-secondary leading-tight"
            >
              Learn from the <br />
              <span className="text-primary relative inline-block">
                World's Best
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:max-w-xs"
          >
            <p className="text-lg text-text-muted font-semibold leading-relaxed">
              We've partnered with top-tier global universities to bring Ivy League education to your doorstep.
            </p>
          </motion.div>
        </div>

        {/* Grid of 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {universities.map((uni, index) => (
            <TiltCard key={uni.name} uni={uni} index={index} />
          ))}
        </div>

        {/* Summary Stats / Features */}
        <div className="relative">
          <div className="absolute inset-0 bg-secondary rounded-[4rem] -rotate-1 scale-[1.02] shadow-2xl" />
          <div className="relative bg-white border border-gray-100 rounded-[4rem] p-12 md:p-20 grid md:grid-cols-3 gap-12 shadow-xl">
            <div className="flex flex-col gap-6">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                <Landmark size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-secondary mb-3">Ivy League Standards</h3>
                <p className="text-text-muted font-medium">Experience curriculum designed by professors from the world's top 1% universities.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-6 md:border-x border-gray-100 md:px-12">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Award size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-secondary mb-3">Dual Certification</h3>
                <p className="text-text-muted font-medium">Get certified by both Opulent Vidya and our prestigious global university partners.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-secondary mb-3">Global Recognition</h3>
                <p className="text-text-muted font-medium">Join a network of alumni working at Fortune 500 companies worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityPartners;
