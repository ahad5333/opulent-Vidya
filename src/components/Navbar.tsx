import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', path: '/', isAnchor: false },
    { name: 'Courses', sectionId: 'courses', isAnchor: true },
    { name: 'University Partners', sectionId: 'university-partners', isAnchor: true },
    { name: 'Study Abroad', sectionId: 'study-abroad', isAnchor: true },
    { name: 'Blog', path: '/blog', isAnchor: false },
    { name: 'Contact', sectionId: 'contact', isAnchor: true },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-2xl">O</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-secondary font-black text-2xl tracking-tighter">OPULENT</span>
            <span className="text-primary font-bold text-sm tracking-widest">VIDYA</span>
          </div>
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            item.isAnchor ? (
              <a 
                key={item.name}
                href={`#${item.sectionId}`}
                onClick={(e) => handleSmoothScroll(e, item.sectionId!)}
                className="group flex items-center gap-1 text-[15px] font-bold text-secondary hover:text-primary transition-all relative cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ) : (
              <Link 
                key={item.name} 
                to={item.path} 
                className="group flex items-center gap-1 text-[15px] font-bold text-secondary hover:text-primary transition-all relative"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            )
          ))}
        </div>

        {/* Action Buttons - Right */}
        <div className="hidden lg:flex items-center gap-6">
          <button className="flex items-center gap-2 font-bold text-secondary hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100">
            <Globe size={18} />
            <span>EN</span>
            <ChevronDown size={14} />
          </button>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-secondary font-bold hover:text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition-all">Login</Link>
            <Link to="/login" className="bg-primary hover:bg-primary-dark text-white font-extrabold px-8 py-3 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50">
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2 text-secondary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[110] lg:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black text-secondary">OPULENT <span className="text-primary">VIDYA</span></span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                <X size={28} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                item.isAnchor ? (
                  <a 
                    key={item.name}
                    href={`#${item.sectionId}`}
                    onClick={(e) => handleSmoothScroll(e, item.sectionId!)}
                    className="text-2xl font-extrabold text-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link 
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-extrabold text-secondary hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 sm:py-5 text-lg sm:text-xl font-bold text-secondary border-2 border-gray-100 rounded-2xl hover:border-primary hover:text-primary transition-all hover:bg-primary/5 text-center">Login</Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 sm:py-5 text-lg sm:text-xl font-black text-white bg-primary hover:bg-primary-dark rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 text-center">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        nav .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hidden { display: none; }
        @media (min-width: 1024px) {
          .lg\\:flex { display: flex; }
          .lg\\:hidden { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
