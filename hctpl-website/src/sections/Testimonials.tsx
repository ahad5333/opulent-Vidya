"use client";
 
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CEO, TechVeda Solutions",
    content: "HCTPL's AI Recruiter has completely transformed our hiring process in Bangalore. We saved 60% on screening time!",
    location: "Bangalore, India"
  },
  {
    name: "Priya Patel",
    role: "HR Director, InnoSoft",
    content: "The IT marketplace helped us find high-quality React developers within 48 hours. Exceptional service and talent.",
    location: "Ahmedabad, India"
  },
  {
    name: "Vikram Singh",
    role: "Founder, Singh Global",
    content: "Automating our ERP with HCTPL was the best decision for our Delhi operations. Highly professional and efficient team.",
    location: "Delhi, India"
  },
  {
    name: "Anjali Gupta",
    role: "Operations Lead, EduBright",
    content: "The AI Chatbot integration on our student portal is seamless. 24/7 support has boosted our enrollment significantly.",
    location: "Mumbai, India"
  },
  {
    name: "Amit Verma",
    role: "CTO, V-Tech",
    content: "Their consulting on cloud migration was spot on. The transition was smooth and our performance has improved by 40%.",
    location: "Pune, India"
  },
  {
    name: "Sneha Reddy",
    role: "MD, Hyderabad TechHub",
    content: "The most reliable staffing partner we've worked with. They truly understand complex technical requirements.",
    location: "Hyderabad, India"
  },
  {
    name: "Rajesh Iyer",
    role: "VP Engineering, Chennai Systems",
    content: "Scaling our team was effortless with HCTPL's dedicated remote developers. They are now an integral part of our team.",
    location: "Chennai, India"
  },
  {
    name: "Kavita Nair",
    role: "Digital Head, Kerala Infopark",
    content: "Modern, aesthetic, and functional solutions. HCTPL is our go-to partner for all our enterprise digital needs.",
    location: "Kochi, India"
  },
  {
    name: "Arjun Mehra",
    role: "Logistics Manager, Jaipur Hub",
    content: "The automation tools provided by HCTPL have optimized our supply chain visibility and efficiency significantly.",
    location: "Jaipur, India"
  },
  {
    name: "Sunita Rao",
    role: "CEO, Rao & Co",
    content: "A truly global partner with a deep understanding of the Indian market. Fantastic experience working with them.",
    location: "Kolkata, India"
  }
];

export default function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden bg-white">
      {/* BACKGROUND ACCENTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] bg-brand-primary" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] bg-brand-secondary" />
      </div>

      <div className="relative z-10">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 px-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-brand-dark">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 font-medium">
            Hear directly from industry leaders across India who have transformed their 
            businesses with HCTPL solutions.
          </p>
        </motion.div>

        {/* MARQUEE CONTAINER */}
        <div className="flex overflow-hidden group">
          <motion.div 
            className="flex gap-8 whitespace-nowrap py-10"
            animate={{ x: [0, -1 * (testimonials.length * 400)] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear"
            }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div 
                key={i}
                className="card-modern w-[400px] p-8 inline-block whitespace-normal flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, starI) => (
                        <Star key={starI} className="w-4 h-4 fill-brand-primary text-brand-primary" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-brand-primary/10" />
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed font-medium mb-8 italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-brand-primary border-2 border-white shadow-md">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-dark">{t.name}</h4>
                    <p className="text-xs text-slate-500 font-bold">{t.role}</p>
                    <p className="text-[10px] text-brand-primary uppercase tracking-widest mt-1 font-bold">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}