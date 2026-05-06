import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-bg-alt/50 -skew-x-12 origin-top-right -z-10 hidden md:block" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 hidden sm:block" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-w-0"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 text-primary font-extrabold text-sm mb-8 border border-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              #1 Education & Career Platform
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-secondary leading-[1.1] mb-6 sm:mb-8">
              Empower Your <br />
              <span className="text-primary italic">Global</span> Career <br />
              Journey
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-text-muted mb-8 sm:mb-12 max-w-xl leading-relaxed">
              Unlock prestigious university partnerships, expert-led certifications,
              and professional coaching tailored for your success in the modern workforce.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5">
              <Link to="/courses" className="bg-primary hover:bg-primary-dark text-white font-black px-6 sm:px-10 py-3 sm:py-5 rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg w-full sm:w-auto">
                Explore Programs <ArrowRight size={20} className="hidden sm:block" />
              </Link>
              <button className="bg-white hover:bg-bg-alt text-secondary font-bold px-6 sm:px-10 py-3 sm:py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg border border-gray-100 w-full sm:w-auto">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Play size={16} fill="currentColor" />
                </div>
                How it Works
              </button>
            </div>

            {/* Infinite Marquee Logo Strip */}
            <div className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-gray-100 overflow-hidden relative">
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-text-muted/60 mb-6 sm:mb-8">
                Global Strategic Partners & Universities
              </p>

              <div className="marquee-container">
                <div className="marquee-content">
                  {[
                    { name: 'Oxford', url: 'ox.ac.uk' },
                    { name: 'Harvard', url: 'harvard.edu' },
                    { name: 'Stanford', url: 'stanford.edu' },
                    { name: 'MIT', url: 'mit.edu' },
                    { name: 'Cambridge', url: 'cam.ac.uk' },
                    { name: 'Yale', url: 'yale.edu' },
                    { name: 'ETH Zurich', url: 'ethz.ch' },
                    { name: 'Princeton', url: 'princeton.edu' },
                    { name: 'Columbia', url: 'columbia.edu' },
                    { name: 'Cornell', url: 'cornell.edu' }
                  ].map((uni, idx) => (
                    <div key={`${uni.name}-${idx}`} className="marquee-item opacity-100 hover:scale-110 transition-all duration-500">
                      <img
                        src={`https://logo.clearbit.com/${uni.url}`}
                        alt={uni.name}
                        className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                        onError={(e) => {
                          const target = e.target;
                          target.src = `https://www.google.com/s2/favicons?domain=${uni.url}&sz=128`;
                        }}
                      />
                    </div>
                  ))}

                  {/* Duplicate for infinite effect */}
                  {[
                    { name: 'Oxford', url: 'ox.ac.uk' },
                    { name: 'Harvard', url: 'harvard.edu' },
                    { name: 'Stanford', url: 'stanford.edu' },
                    { name: 'MIT', url: 'mit.edu' },
                    { name: 'Cambridge', url: 'cam.ac.uk' },
                    { name: 'Yale', url: 'yale.edu' },
                    { name: 'ETH Zurich', url: 'ethz.ch' },
                    { name: 'Princeton', url: 'princeton.edu' },
                    { name: 'Columbia', url: 'columbia.edu' },
                    { name: 'Cornell', url: 'cornell.edu' }
                  ].map((uni, idx) => (
                    <div key={`${uni.name}-dup-${idx}`} className="marquee-item opacity-100 hover:scale-110 transition-all duration-500">
                      <img
                        src={`https://logo.clearbit.com/${uni.url}`}
                        alt={uni.name}
                        className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                        onError={(e) => {
                          const target = e.target;
                          target.src = `https://www.google.com/s2/favicons?domain=${uni.url}&sz=128`;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white">
              <img
                src="/hero-edutech.png"
                alt="Edutech Innovation"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>

            {/* Floating Info Cards */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <CheckCircle size={28} />
              </div>
              <div>
                <p className="text-xs font-black text-text-muted uppercase">Certified</p>
                <p className="text-xl font-black text-secondary">Global Recognition</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50"
            >
              <p className="text-xs font-black text-text-muted uppercase mb-3">Our Mentors</p>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=${i + 20}`} className="w-12 h-12 rounded-full border-4 border-white shadow-md" alt="Mentor" />
                ))}
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold border-4 border-white shadow-md text-xs">
                  +50
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
          user-select: none;
          padding: 20px 0;
          position: relative;
          width: 100%;
          min-width: 0;
        }
        
        .marquee-container::before,
        .marquee-container::after {
          content: "";
          position: absolute;
          top: 0;
          width: 150px;
          height: 100%;
          z-index: 2;
        }
        .marquee-container::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        .marquee-container::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }

        .marquee-content {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 40px;
          animation: scroll 40s linear infinite;
        }
        
        .marquee-content:hover {
          animation-play-state: paused;
        }
        
        .marquee-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 80px;
        }

        @media (min-width: 640px) {
          .marquee-content {
            gap: 60px;
          }
          
          .marquee-item {
            min-width: 120px;
          }
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;