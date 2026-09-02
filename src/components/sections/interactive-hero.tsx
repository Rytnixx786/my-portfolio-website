"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#030705] animate-pulse" />,
});

const ROLES = [
  "AI Systems Engineer",
  "RAG Architect",
  "Backend Systems Builder",
  "Multi-Agent Orchestrator",
] as const;

// Zero-Lag Isolated Leaf Typewriter Component
// Encapsulated with CSS layout containment so character keystrokes NEVER trigger
// browser layout reflows or compete with Spline 3D canvas GPU threads.
const RoleTypewriter = React.memo(function RoleTypewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(current.slice(0, text.length - 1));
        }, 30);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 200);
      }
    } else {
      if (text.length < current.length) {
        timer = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, 70);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className="text-[#00FF00] font-mono font-semibold">
      {text}
      <span className="ml-1 inline-block w-2 h-[1.1em] bg-[#00FF00] align-text-bottom animate-pulse" />
    </span>
  );
});

// Tactile Magnetic Button component with original geometry and electric green palette
function MagneticButton({
  children,
  className = "",
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  primary?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    const factor = 0.22;
    setPosition({ x: x * factor, y: y * factor });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={`relative px-6 py-3 md:px-8 md:py-4 rounded-sm font-semibold text-sm transition-all overflow-hidden group pointer-events-auto cursor-pointer select-none ${
        primary
          ? "bg-[#00FF00] text-black hover:brightness-110 active:scale-[0.97] shadow-lg shadow-[#00FF00]/20"
          : "bg-white/5 border border-white/10 hover:bg-white/10 text-white active:scale-[0.97]"
      } ${className}`}
    >
      {/* Dynamic hover highlight ring */}
      <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <span className="flex items-center gap-2 justify-center relative z-10">
        {children}
      </span>
    </motion.button>
  );
}

export function InteractiveHero() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const splineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountTimer = globalThis.setTimeout(() => setMounted(true), 0);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => {
      globalThis.clearTimeout(mountTimer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    // Trigger Spline download as soon as main thread is idle after first paint
    if ("requestIdleCallback" in window) {
      const idleId = (
        window as unknown as {
          requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback(
        () => {
          setShouldLoadSpline(true);
        },
        { timeout: 1200 }
      );
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(
            idleId
          );
        }
      };
    } else {
      timeoutId = globalThis.setTimeout(() => setShouldLoadSpline(true), 300);
      return () => {
        if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
      };
    }
  }, [mounted, isMobile]);

  // Intercept scroll/wheel events in capture phase to prevent Spline scroll hijacking
  useEffect(() => {
    const container = splineContainerRef.current;
    if (!container || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.stopPropagation();
    };

    container.addEventListener("wheel", handleWheel, { capture: true, passive: true });
    container.addEventListener("touchmove", handleTouchMove, { capture: true, passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel, { capture: true });
      container.removeEventListener("touchmove", handleTouchMove, { capture: true });
    };
  }, [mounted, isMobile]);

  const handleBookCall = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=nafismehedi37@gmail.com", "_blank");
  };

  const handleScrollToWork = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-end bg-[#030705] overflow-hidden"
    >
      {/* 1. Spline 3D Interactive Background Scene (Preserved with strict layout containment & onLoad crossfade) */}
      <div
        ref={splineContainerRef}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          splineLoaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ contain: "strict", willChange: "transform" }}
      >
        {shouldLoadSpline && (
          <Spline
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
            className="w-full h-full"
          />
        )}
      </div>

      {/* Ambient fallback that gracefully crossfades once 3D shaders are compiled */}
      <div
        className={`absolute inset-0 bg-[#030705] transition-opacity duration-1000 ${
          splineLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,0,0.12),transparent_60%)] animate-pulse"
          style={{ animationDuration: "6s" }}
        />
      </div>

      {/* 2. Soft Gradient Scrim for Flawless Text Legibility over 3D Cubes */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030705] via-[#030705]/65 to-transparent lg:bg-gradient-to-r lg:from-[#030705]/95 lg:via-[#030705]/50 lg:to-transparent z-[1] pointer-events-none" />

      {/* 3. Hero Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 pointer-events-none w-full max-w-4xl px-6 sm:px-8 lg:px-12 pb-16 pt-32 text-left"
      >
        {/* Name Title */}
        <motion.h1
          variants={itemVariants}
          className="text-[clamp(2.5rem,7.5vw,5.5rem)] font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-white mb-2 md:mb-3 uppercase select-none"
        >
          Mehedi Hasan
        </motion.h1>

        {/* Lag-Free Typewriter Role Cycler */}
        <motion.div
          variants={itemVariants}
          className="text-foreground/90 text-[clamp(1.05rem,2.3vw,1.65rem)] font-light mb-4 min-h-[1.5em]"
        >
          I am a <RoleTypewriter />
        </motion.div>

        {/* Original Description */}
        <motion.p
          variants={itemVariants}
          className="text-slate-300/90 text-[clamp(0.88rem,1.35vw,1.15rem)] font-light mb-7 max-w-2xl leading-relaxed select-none"
        >
          Production-minded AI systems built in days. Multi-agent orchestration deployed with
          zero-trust architecture. Grounded RAG pipelines set up for your entire enterprise.
          All of it done right, not just fast.
        </motion.p>

        {/* Original Tactile Magnetic Buttons: Book a Call & My Work */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 pt-1"
        >
          <MagneticButton primary onClick={handleBookCall}>
            Book a Call
          </MagneticButton>
          <MagneticButton onClick={handleScrollToWork}>
            My Work
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
