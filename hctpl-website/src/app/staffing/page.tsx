"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import CTA from "@/sections/CTA";
import { 
  Database, 
  Code, 
  MonitorSmartphone, 
  Server, 
  Settings, 
  ChevronDown,
  ShieldCheck,
  Star,
  Award,
  ArrowRight,
  Target,
  CheckCircle2
} from "lucide-react";

export default function StaffingPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const staffingModels = [
    {
      title: "Contract Staffing",
      image: "/it_contract_staffing_office_1778049191716.png",
      description: "Contract staffing has been around for years, but the recent introduction of on-demand technology has brought new opportunities to those looking for contract labour. It's a kind of employment arrangement where temporary employees are hired for periods ranging from a few weeks or months to years. It can help employers gain the abilities of a permanent employee at a fraction of the cost."
    },
    {
      title: "Permanent Staffing",
      image: "/it_permanent_hiring_team_1778049210575.png",
      description: "Permanent staffing is the practice of offering organizations with needed applicants for long-term employment based on particular applicant qualifications. Our permanent staffing services enable you to build a strong and reliable workforce for the long term. We assist you in identifying, attracting, and hiring top talent that aligns with your organization's culture and requirements."
    },
    {
      title: "Contractual Basis",
      image: "/it_staff_augmentation_devs_1778049226034.png",
      description: "Our staffing solutions on a contractual basis cater to your workforce needs with flexibility and efficiency. Whether you require resources for short-term projects, temporary coverage, or specific assignments, our contractual basis staffing services provide the right professionals to meet your demands. We ensure a seamless integration of skilled individuals into your team."
    },
    {
      title: "Contract-to-Hire",
      image: "/it_permanent_hiring_team_1778049210575.png",
      description: "Our contract-to-hire staffing solutions offer you a seamless transition from temporary to permanent staffing. This flexible approach allows you to evaluate candidates in real work scenarios before making a long-term commitment. Whether you have short-term project requirements or are looking for potential full-time employees, we provide the ideal solution."
    }
  ];

  const roles = [
    { name: "Business analyst", icon: Target },
    { name: "Database admin/ developers", icon: Database },
    { name: "IS and IT infrastructure", icon: Server },
    { name: "WEB programmers", icon: Code },
    { name: "SAP Experts", icon: Settings },
    { name: "QA/QC", icon: ShieldCheck },
    { name: "Mobile / UI Developers", icon: MonitorSmartphone },
  ];

  const screeningPoints = [
    "Define talent needs by prioritizing skill sets required by the client",
    "Explore the entire market rather than targeting known talent pools",
    "Create responsive EVPs in accordance to clients' vision",
    "Choose the best-fit resources for the business"
  ];

  const advantages = [
    "One of the leading IT staffing and consulting company across India",
    "Wide portfolio of 150+ technical staffing clients ranging from permanent recruitment to IT contract staffing",
    "Over 98.8% client satisfaction and retention in IT contract staffing",
    "Multiple state-of-the-art development centres for cost-efficient IT staff augmentation",
    "One of the best IT staffing agencies with a CAGR of 30% year on year",
    "Immaculate delivery record in IT staff augmentation for over 1200+ projects",
    "Financially stable and secure organization that has grown exclusively on internally generated funds"
  ];

  const accordions = [
    {
      title: "Access to top IT talent",
      content: "Finding and attracting highly skilled IT professionals can be a daunting task. HCTPL simplifies the process by tapping into its extensive network of top IT talent. Whether you need skilled software developers, system administrators, cybersecurity experts, or IT project managers, we ensure access to a diverse pool of qualified candidates."
    },
    {
      title: "Tailored talent acquisition",
      content: "Every business has unique IT requirements. HCTPL understands this and takes a personalized approach to match your specific needs. By carefully assessing your IT operations and understanding your business goals, we identify the right candidates who possess the technical skills and cultural fit necessary to thrive in your organization."
    },
    {
      title: "Quick and efficient hiring",
      content: "Time is the essence when it comes to filling critical IT positions. HCTPL's IT staffing service streamlines the hiring process, reducing time-to-hire without compromising the quality. We have a robust selection process that involves meticulous analysis and selection of candidates in accordance with the specific requirements of our partner companies."
    }
  ];

  return (
    <main className="bg-white min-h-screen text-slate-900 selection:bg-brand-primary/30 selection:text-brand-primary">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-100 bg-white">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-cyan/10 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary border-brand-primary/20"
            >
              <Star className="w-4 h-4 fill-brand-primary text-brand-primary" />
              IT Staffing Services
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              IT Staffing in <span className="gradient-text">Hyderabad</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-lg text-slate-900/80 leading-relaxed"
            >
              <p>Upgrade your IT team with one stop solution.</p>
              <div className="h-px w-24 bg-brand-primary/50" />
              <p className="font-medium text-slate-900">
                Our staffing experts, <span className="text-brand-primary">backed by 20+ years of rich experience</span> providing IT staffing services, continue to deliver value to leading organizations across India.
              </p>
              <p>
                Our recruiting processes ensure the best professionals are on board to fulfil your IT project staffing needs across digital and mainstream technologies.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <button className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl flex items-center justify-center gap-2">
                Request a Quote <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand-primary/10 blur-[50px] rounded-full" />
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative bg-white/60 border border-slate-200 backdrop-blur-xl shadow-2xl p-8 md:p-12 rounded-[2.5rem]"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-bold mb-6">
                <Target className="w-4 h-4" />
                Staffing Solutions
              </div>
              
              <h3 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-brand-dark">
                <Award className="w-10 h-10 text-brand-primary" />
                IT Staffing Companies
              </h3>
              
              <div className="space-y-6 text-slate-700 leading-relaxed">
                <p className="font-medium text-slate-900">
                  Our expert recruiters have the knowledge and the expertise to understand your hiring needs and source the right candidates from the industry. We specialize in onboarding highly skilled IT professionals for mid to senior-level positions.
                </p>
                
                <p>
                  Our focus is on saving management time for our clients by ensuring a stringent pre-screening process prior to sharing profiles. A profile success rate of 70% is testimony to our focus on quality.
                </p>
                
                <p className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
                  &ldquo;Despite multiple Contract staffing services confronted by IT companies, their hiring processes of IT experts can be easier now. As an IT staff augmentation services provider in India, we have collected and organized a huge database of IT professionals to match our client&apos;s talent necessities.&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STAFFING MODELS (TABS) */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">HCTPL&apos;s IT Staffing Services</h2>
            <p className="text-slate-900/80">HCTPL offers four primary services in terms of Staffing</p>
          </div>

          <div className="card-modern overflow-hidden">
            <div className="flex flex-wrap border-b border-border bg-slate-50/50 border-slate-100">
              {staffingModels.map((model, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 min-w-[200px] py-4 px-6 text-center font-medium transition-all ${
                    activeTab === idx 
                      ? "text-brand-primary border-b-2 border-brand-primary bg-brand-primary/5" 
                      : "text-slate-900/60 hover:text-slate-900 hover:bg-slate-100/50"
                  }`}
                >
                  {model.title}
                </button>
              ))}
            </div>
            <div className="p-8 md:p-12 min-h-[400px] grid md:grid-cols-2 gap-12 items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-brand-dark">{staffingModels[activeTab].title}</h3>
                  <p className="text-lg text-slate-900/80 leading-relaxed">
                    {staffingModels[activeTab].description}
                  </p>
                  <button className="flex items-center gap-2 text-brand-primary font-bold group">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video border border-slate-100"
                >
                  <img 
                    src={staffingModels[activeTab].image} 
                    alt={staffingModels[activeTab].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ROLES WE HIRE FOR */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              Our successful track record of fulfilling our client&apos;s requirement of IT professionals includes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {roles.map((role, i) => {
                const Icon = role.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center p-6 card-modern hover:-translate-y-1 transition-transform group"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-brand-primary" />
                    </div>
                    <h4 className="font-semibold text-center text-sm">{role.name}</h4>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center">
              In our screening, we ensure that the organization is ready to face the challenges by ensuring the following criterion
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {screeningPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 card-modern p-6"
                >
                  <CheckCircle2 className="w-6 h-6 text-brand-primary shrink-0" />
                  <span className="font-medium">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Why choose HCTPL as your IT staffing partner?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {advantages.map((adv, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-slate-900/80 leading-relaxed">{adv}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-2 rounded-2xl bg-gradient-to-br from-brand-primary/40 to-transparent"
            >
              <div className="bg-white rounded-xl overflow-hidden aspect-[4/5] relative border border-slate-200">
                <img 
                  src="/it_staff_augmentation_devs_1778049226034.png" 
                  alt="Team" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/60 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8 text-center">
                  <Award className="w-20 h-20 text-white mb-6 animate-pulse-white" />
                  <h3 className="text-2xl font-bold mb-4 text-force-white">Industry Recognized</h3>
                  <p className="text-white/90 font-medium">Powering our clients with agile deployment of talent and technology.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ACCORDION SECTION */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Reach us to hire top talents with our IT staffing insights!
          </h2>
          
          <div className="space-y-4 text-left">
            {accordions.map((acc, idx) => (
              <div 
                key={idx}
                className={`card-modern overflow-hidden transition-all duration-300 ${activeAccordion === idx ? 'ring-brand-primary' : ''}`}
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between font-bold text-lg focus:outline-none"
                >
                  {acc.title}
                  <ChevronDown 
                    className={`w-5 h-5 text-brand-primary transition-transform duration-300 ${activeAccordion === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-slate-900/80 leading-relaxed border-t border-slate-200/50 pt-4">
                        {acc.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
