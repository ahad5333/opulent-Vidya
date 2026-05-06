import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Left: Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-widest mb-6">
              Contact Us
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-secondary mb-8 leading-tight">
              Ready to <span className="text-primary">Take Off?</span> <br />
              Let's Connect.
            </h2>
            <p className="text-lg text-text-muted mb-12 max-w-lg leading-relaxed">
              Whether you're looking for course details or university partnership opportunities, 
              our dedicated team is here to guide you toward your goals.
            </p>
            
            <div className="space-y-10">
              {[
                { icon: <Mail />, title: "Email Us", detail: "admissions@opulentvidya.com" },
                { icon: <Phone />, title: "Call Us", detail: "+91 800 123 4567" },
                { icon: <MapPin />, title: "Headquarters", detail: "Cyber Hub, Gurugram, India" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-bg-alt flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-1">{item.title}</p>
                    <p className="text-xl font-black text-secondary">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-gray-100"
          >
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-secondary uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-bg-alt border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-secondary uppercase tracking-widest ml-1">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl bg-bg-alt border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-secondary uppercase tracking-widest ml-1">Subject</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-bg-alt border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold appearance-none">
                  <option>Course Inquiry</option>
                  <option>Study Abroad Programs</option>
                  <option>University Partnerships</option>
                  <option>Career Coaching</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-secondary uppercase tracking-widest ml-1">Your Message</label>
                <textarea rows={5} placeholder="Tell us how we can help..." className="w-full px-6 py-4 rounded-2xl bg-bg-alt border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold resize-none"></textarea>
              </div>
              
              <button className="w-full py-5 text-xl font-black text-white bg-primary rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                Send Message <Send size={22} />
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
      <style>{`
        .grid { display: grid; }
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
};

export default Contact;
