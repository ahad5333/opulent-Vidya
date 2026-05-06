"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageSquare, Calendar, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-brand-primary/30 selection:text-brand-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(0,185,239,0.05) 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-brand-dark"
          >
            Get in{" "}
            <span className="gradient-text">
              Touch
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg max-w-2xl mx-auto text-slate-600"
          >
            Whether you have a question about our AI solutions, pricing, or need consulting, our team is ready to answer all your questions.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 relative z-20 flex-grow bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">

          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xl"
            >
              {/* Top accent bar */}
              <div className="h-1.5 w-full bg-brand-primary" />
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-6 text-brand-dark">Send us a Message</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you! Your message has been sent successfully.");
                  }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Full Name *</label>
                      <input required type="text" placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-slate-900 bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Email Address *</label>
                      <input required type="email" placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-slate-900 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                      <input type="tel" placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-slate-900 bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Company Name</label>
                      <input type="text" placeholder="Acme Corp"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-slate-900 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Services Required *</label>
                    <select required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all appearance-none cursor-pointer text-slate-700 bg-slate-50/50"
                    >
                      <option value="" disabled>Select a service...</option>
                      <option value="IT Consulting">IT Consulting</option>
                      <option value="AI Solutions">AI Solutions</option>
                      <option value="Staffing">Staffing &amp; Recruitment</option>
                      <option value="Automation">Business Automation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Message *</label>
                    <textarea required rows={5} placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all resize-none text-slate-900 bg-slate-50/50"
                    />
                  </div>

                  <button type="submit"
                    className="w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] bg-brand-primary text-brand-dark shadow-lg shadow-brand-primary/25"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Details Card */}
            <div
              className="rounded-2xl p-6 border border-slate-200 bg-slate-50/50"
            >
              <h3 className="text-xl font-bold mb-6 text-brand-dark">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-brand-primary/10 border border-brand-primary/20">
                    <MapPin size={20} className="text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark">Our Office</h4>
                    <p className="text-sm mt-1 text-slate-600">Vizag &amp; Hyderabad<br />Andhra Pradesh / Telangana, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-brand-primary/10 border border-brand-primary/20">
                    <Mail size={20} className="text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark">Email Us</h4>
                    <a href="mailto:haricornucopiatech@gmail.com" className="text-sm mt-1 block hover:text-brand-primary transition-colors text-slate-600">
                      haricornucopiatech@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-brand-primary/10 border border-brand-primary/20">
                    <Phone size={20} className="text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark">Call Us</h4>
                    <a href="tel:+910000000000" className="text-sm mt-1 block text-slate-600 hover:text-brand-primary transition-colors">
                      +91 (000) 000-0000
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Integrations */}
            <div className="grid grid-cols-2 gap-4">
              <a href="https://wa.me/910000000000" target="_blank" rel="noreferrer"
                className="p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-1 bg-white border border-slate-200 shadow-sm hover:shadow-md group"
              >
                <MessageSquare size={24} className="text-green-500 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm text-slate-900">WhatsApp</span>
              </a>
              <a href="https://calendly.com/" target="_blank" rel="noreferrer"
                className="p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-1 bg-brand-primary text-brand-dark shadow-sm hover:shadow-lg group shadow-brand-primary/20"
              >
                <Calendar size={24} className="group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Book Meeting</span>
              </a>
            </div>

            {/* Map iframe */}
            <div className="rounded-2xl overflow-hidden h-48 relative border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121617.90425712423!2d83.23820252514332!3d17.738876483424163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431389b69735%3A0x16056e508a857053!2sVisakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1714732109923!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
