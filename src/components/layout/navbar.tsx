"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail, Layers } from "lucide-react";

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [isScrolled, setIsScrolled] = useState(false);

  // Desktop navigation items (Matching user screenshots: ABOUT, PROJECTS, STACK, JOURNEY, CONTACT)
  const desktopLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Stack", href: "#stack", id: "stack" },
    { label: "Journey", href: "#journey", id: "journey" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  // Mobile bottom navigation items
  const mobileLinks = [
    { label: "Home", href: "#top", id: "top", icon: Home },
    { label: "About", href: "#about", id: "about", icon: User },
    { label: "Projects", href: "#projects", id: "projects", icon: Briefcase },
    { label: "Stack", href: "#stack", id: "stack", icon: Layers },
    { label: "Contact", href: "#contact", id: "contact", icon: Mail },
  ];

  useEffect(() => {
    const monitoredSections = ["top", "about", "projects", "stack", "journey", "contact"];
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -45% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    monitoredSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const initTimer = setTimeout(() => {
      setIsScrolled(window.scrollY > 40);
    }, 0);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          1. TOP NAVIGATION (Desktop Top Header)
          Sticky, frosted glass blur on scroll, clean branding,
          links with active emerald outlined pill, NO resume button
         ────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-auto select-none ${
          isScrolled
            ? "bg-[#030705]/85 backdrop-blur-md border-b border-white/8 py-4 shadow-sm shadow-black/40"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          {/* Centered Navigation Links (Just like original pic 2: centered in middle, no pill border, electric green active text) */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-10"
            aria-label="Main Navigation"
          >
            {desktopLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm uppercase tracking-widest transition-colors font-sans ${
                    isActive
                      ? "text-[#00FF00] font-medium"
                      : "text-slate-400 hover:text-white"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────
          2. MOBILE BOTTOM NAVIGATION DOCK
          Persistent, safe-area aware, 44px+ touch targets, labeled
         ────────────────────────────────────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#030705]/92 backdrop-blur-xl border-t border-white/10 px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-2xl shadow-black/80 pointer-events-auto"
        aria-label="Mobile Navigation"
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center gap-1">
          {mobileLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all touch-manipulation select-none active:scale-95 focus-ring ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPillMobile"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                <Icon size={17} className="relative z-10" />
                <span className="text-[10px] font-mono tracking-tight mt-0.5 relative z-10">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
