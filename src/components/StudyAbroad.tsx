import { motion } from 'framer-motion';
import { Plane, MapPin, GraduationCap, FileCheck, PhoneCall, Globe, ArrowRight } from 'lucide-react';

const destinations = [
  {
    country: "USA",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070&auto=format&fit=crop",
    universities: "4,000+",
    avgCost: "$25,000 - $45,000",
    description: "Home to the world's most prestigious Ivy League institutions and a global hub for innovation.",
    color: "from-blue-600 to-red-600"
  },
  {
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
    universities: "160+",
    avgCost: "£15,000 - £30,000",
    description: "Centuries of academic excellence and shorter degree durations for faster career starts.",
    color: "from-blue-800 to-red-700"
  },
  {
    country: "Canada",
    image: "https://images.unsplash.com/photo-1503614472-8c97d5d4f210?q=80&w=2070&auto=format&fit=crop",
    universities: "100+",
    avgCost: "CAD 20,000 - 40,000",
    description: "Highly inclusive environment with excellent post-study work permits and PR opportunities.",
    color: "from-red-600 to-red-800"
  },
  {
    country: "Australia",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2070&auto=format&fit=crop",
    universities: "43",
    avgCost: "AUD 20,000 - 35,000",
    description: "World-class education system with a relaxed lifestyle and strong research focus.",
    color: "from-blue-600 to-blue-900"
  }
];

const steps = [
  {
    icon: <PhoneCall size={24} />,
    title: "Counseling",
    desc: "Expert guidance to find the perfect course & country."
  },
  {
    icon: <GraduationCap size={24} />,
    title: "Admission",
    desc: "Hassle-free application process to top universities."
  },
  {
    icon: <FileCheck size={24} />,
    title: "Visa Support",
    desc: "End-to-end assistance with documentation and filing."
  },
  {
    icon: <Plane size={24} />,
    title: "Departure",
    desc: "Pre-departure orientation and accommodation help."
  }
];

const StudyAbroad = () => {
  return (
    <section id="study-abroad" className="section bg-white overflow-hidden py-32">
      <div className="container">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-widest mb-6"
            >
              <Globe size={16} />
              Global Opportunities
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-secondary leading-tight"
            >
              Your Gateway to <br />
              <span className="text-primary italic">Global</span> Education
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
              Explore world-class study destinations and transform your career with international exposure.
            </p>
          </motion.div>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.country}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative h-[400px] rounded-[3rem] overflow-hidden group shadow-2xl cursor-pointer"
            >
              {/* Background Image */}
              <img 
                src={dest.image} 
                alt={dest.country} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent group-hover:via-secondary/60 transition-all duration-500" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white">{dest.country}</h3>
                </div>
                
                <p className="text-white/80 font-medium mb-8 max-w-md opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                  {dest.description}
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20">
                  <div>
                    <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-1">Universities</p>
                    <p className="text-white text-xl font-black">{dest.universities}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-1">Avg. Cost</p>
                    <p className="text-white text-xl font-black">{dest.avgCost}</p>
                  </div>
                </div>

                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/30">
                    <ArrowRight size={28} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="relative pt-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-primary to-transparent" />
          
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-4xl font-black text-secondary mb-4">Simple 4-Step Process</h3>
            <p className="text-text-muted font-bold">Making your study abroad dreams a reality, step by step.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative group"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:-translate-y-2">
                  {step.icon}
                  <span className="absolute -top-4 -right-4 w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-secondary font-black text-sm shadow-md group-hover:border-primary">
                    0{index + 1}
                  </span>
                </div>
                
                <h4 className="text-xl font-black text-secondary mb-4 group-hover:text-primary transition-colors">{step.title}</h4>
                <p className="text-text-muted font-medium leading-relaxed">{step.desc}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-6 w-12 h-px bg-gray-100" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-secondary rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h3 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10 leading-tight">
            Ready to Start Your <br />
            <span className="text-primary italic">International</span> Journey?
          </h3>
          <p className="text-white/70 text-lg font-medium mb-12 max-w-2xl mx-auto relative z-10">
            Join thousands of students who have successfully moved abroad with Opulent Vidya's expert guidance.
          </p>
          <button className="relative z-10 bg-white text-secondary hover:bg-primary hover:text-white font-black px-12 py-5 rounded-2xl text-lg shadow-2xl transition-all hover:scale-105 active:scale-95">
            Book Free Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StudyAbroad;
