import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-24 pb-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-2xl">O</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-white font-black text-xl tracking-tight">OPULENT</span>
                <span className="text-primary font-bold text-xs tracking-widest">VIDYA</span>
              </div>
            </div>
            <p className="text-white/60 text-lg font-medium leading-relaxed">
              Global Education Hub empowering the next generation of professionals through expert-led certifications and prestigious university networks.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
                  <Icon size={20} className="text-white/60 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Column 1 */}
          <div>
            <h4 className="text-xl font-black mb-10 text-white">Programs</h4>
            <ul className="space-y-5">
              {["Data Science & AI", "Business Management", "Software Engineering", "Digital Marketing", "Study Abroad"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-primary font-bold transition-colors text-lg">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Links Column 2 */}
          <div>
            <h4 className="text-xl font-black mb-10 text-white">Company</h4>
            <ul className="space-y-5">
              {["About Our Story", "University Partners", "Success Stories", "Our Blog", "Careers", "Contact Us"].map((link) => (
                <li key={link}>
                  <a href={link === "Our Blog" ? "/blog" : "#"} className="text-white/60 hover:text-primary font-bold transition-colors text-lg">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div>
            <h4 className="text-xl font-black mb-10 text-white">Stay Updated</h4>
            <p className="text-white/60 mb-8 font-medium">Subscribe to our newsletter for the latest program updates and career insights.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none text-white font-bold transition-all" 
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-sm shadow-lg shadow-primary/20 transition-all">
                Subscribe
              </button>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/40 font-bold text-sm">© 2026 Opulent Vidya Global. All rights reserved.</p>
          <div className="flex gap-10">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map(link => (
              <a key={link} href="#" className="text-white/40 hover:text-white font-bold text-sm transition-colors">{link}</a>
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
    </footer>
  );
};

export default Footer;
