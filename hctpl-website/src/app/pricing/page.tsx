"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import Pricing from "@/sections/Pricing";
import CTA from "@/sections/CTA";

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Pricing />
      </div>
      <CTA />
      <Footer />
    </main>
  );
}
