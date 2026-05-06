import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import About from "@/sections/About";
import Products from "@/sections/Products";
import Testimonials from "@/sections/Testimonials";
import Pricing from "@/sections/Pricing";
import CTA from "@/sections/CTA";
import Footer from "@/sections/Footer";
import LogoMarquee from "@/sections/LogoMarquee";

import VoiceIntelligence from "@/sections/VoiceIntelligence";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <VoiceIntelligence />
      <Products />
      <LogoMarquee />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}