"use client";

import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Share2,
  MessageCircle,
  Send,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = ["Home", "Services", "Products", "About"];
  const services = ["AI Recruitment", "SaaS Solutions", "Cloud Services", "IT Staffing"];
  const legal = ["Privacy Policy", "Terms", "Cookie Policy"];
  const socialIcons = [Globe, Share2, MessageCircle, Send];

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "var(--brand-dark)" }}>

      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/5" />

      <div className="relative max-w-6xl mx-auto px-6 py-20">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* COMPANY */}
          <div>
            <div className="relative h-12 w-40 mb-6">
              <Image
                src="/hctpl-logo.png"
                alt="HCTPL Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-base leading-relaxed mb-8 text-slate-300 font-medium">
              Leading the digital transformation with AI-powered recruitment, 
              enterprise consulting, and innovative SaaS solutions.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="group p-3 rounded-full transition-all duration-300 hover:scale-110 bg-white/5 border border-white/10 hover:border-brand-primary/40 hover:bg-white/10 shadow-lg"
                >
                  <Icon className="w-5 h-5 text-slate-300 group-hover:text-brand-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-xl font-extrabold mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              {quickLinks.map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-brand-primary hover:translate-x-1 transition-all inline-block font-bold"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-xl font-extrabold mb-6 text-white">Solutions</h4>
            <ul className="space-y-4">
              {services.map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-brand-primary hover:translate-x-1 transition-all inline-block font-bold"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-xl font-extrabold mb-6 text-white">Connect</h4>
            <div className="space-y-5 text-sm text-slate-300">
              <a className="flex items-center gap-4 transition-colors hover:text-brand-primary cursor-pointer font-bold group">
                <Mail className="w-5 h-5 flex-shrink-0 text-brand-primary group-hover:scale-110 transition-transform" />
                info@hctpl.com
              </a>
              <a className="flex items-center gap-4 transition-colors hover:text-brand-primary cursor-pointer font-bold group">
                <Phone className="w-5 h-5 flex-shrink-0 text-brand-primary group-hover:scale-110 transition-transform" />
                +1 (234) 567-890
              </a>
              <div className="flex items-start gap-4 font-bold">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-brand-primary" />
                <span>Silicon Valley, <br /> California</span>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px bg-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 font-bold">
            © {currentYear} HCTPL. Partnering for Progress.
          </p>
          <div className="flex gap-8">
            {legal.map((item, i) => (
              <a
                key={i}
                href="#"
                className="text-sm text-slate-500 hover:text-white transition-colors font-bold"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}