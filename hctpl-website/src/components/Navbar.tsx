"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { name: "Home", route: "/" },
    { name: "IT Services", route: "#services" },
    { name: "Products", route: "/products" },
    { name: "Marketplace", route: "/marketplace" },
    { name: "Staffing Solutions", route: "/staffing" },
    { name: "Pricing", route: "/pricing" },
    { name: "Careers", route: "/careers" },
    { name: "Contact Us", route: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentIndex = links.findIndex(link =>
      link.route && pathname === link.route
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    } else if (pathname === "/") {
      setActiveIndex(0);
    }
  }, [pathname]);

  const moveWave = (index: number) => {
    if (!navRef.current || !waveRef.current) return;
    const items = navRef.current.querySelectorAll("a");
    const el = items[index] as HTMLElement;
    if (!el) return;
    waveRef.current.style.transform = `translateX(${el.offsetLeft}px)`;
    waveRef.current.style.width = `${el.offsetWidth}px`;
  };

  const handleClick = (item: any, i: number) => {
    setActiveIndex(i);
    moveWave(i);

    if (item.route) {
      if (item.route.startsWith("#")) {
        const el = document.getElementById(item.route.substring(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else if (item.route.startsWith("http")) {
        window.location.href = item.route;
      } else {
        router.push(item.route);
      }
      setIsMobileMenuOpen(false);
      return;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => moveWave(activeIndex), 100);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"} bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

        {/* LOGO */}
        <div 
          className="relative h-12 w-40 hover:scale-105 transition cursor-pointer"
          onClick={() => {
            router.push('/');
            setIsMobileMenuOpen(false);
          }}
        >
          <Image
            src="/hctpl-logo.png"
            alt="HCTPL Logo"
            fill
            sizes="160px"
            className="object-contain"
            priority
          />
        </div>

        {/* DESKTOP NAV */}
        <div className="relative" ref={navRef}>
          <nav className="hidden xl:flex gap-5 relative">
            {links.map((item, i) => (
              <a
                key={i}
                href={item.route}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item, i);
                }}
                className="text-sm font-bold transition-colors duration-200 whitespace-nowrap"
                style={{
                  color: activeIndex === i ? "var(--brand-primary)" : "var(--brand-dark)",
                }}
                onMouseEnter={(e) => {
                  if (activeIndex !== i) (e.target as HTMLElement).style.color = "var(--brand-primary)";
                }}
                onMouseLeave={(e) => {
                  if (activeIndex !== i) (e.target as HTMLElement).style.color = "var(--brand-dark)";
                }}
              >
                {item.name}
              </a>
            ))}

            {/* WAVE UNDERLINE */}
            <div
              ref={waveRef}
              className="absolute bottom-[-6px] left-0 h-[3px] transition-all duration-500 ease-out"
              style={{ width: "0px", transform: "translateX(0px)" }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 10">
                <path
                  d="M0,5 C20,0 40,10 60,5 C80,0 100,10 100,5"
                  fill="none"
                  stroke="var(--brand-primary)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </nav>
        </div>

        <button
          className="hidden xl:block px-8 py-2.5 font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-brand-primary/20"
          style={{
            background: "linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))",
            color: "white",
          }}
        >
          Get Started
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          className="xl:hidden p-2"
          style={{ color: "var(--brand-dark)" }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-2xl flex flex-col py-6 px-6 gap-4 animate-in slide-in-from-top-4 duration-300">
          {links.map((item, i) => (
            <a
              key={i}
              href={item.route}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                handleClick(item, i);
              }}
              className="text-lg font-bold transition-colors duration-200 border-b border-slate-100 pb-3"
              style={{
                color: activeIndex === i ? "var(--brand-primary)" : "#475569",
              }}
            >
              {item.name}
            </a>
          ))}
          <button
            className="mt-4 w-full px-6 py-3 font-bold rounded-lg hover:scale-105 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--brand-primary), #00D2FF)",
              color: "white",
              boxShadow: "0 10px 20px rgba(0, 185, 239, 0.2)",
            }}
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}