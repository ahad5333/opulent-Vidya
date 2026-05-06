import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import MarketplaceHero from "@/sections/MarketplaceHero";
import TalentGrid from "@/sections/TalentGrid";
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: "IT Services Marketplace | HCTPL",
  description: "Hire pre-vetted elite developers, designers, and AI specialists on-demand through HCTPL's IT Services Marketplace.",
};

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <MarketplaceHero />
      <TalentGrid />
      <Footer />
      <ChatWidget />
    </main>
  );
}
