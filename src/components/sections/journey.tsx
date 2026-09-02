"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Code2, Briefcase, Download, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { journey, profile } from "@/data/portfolio";

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"],
  });

  // Smooth out scroll progress
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <GraduationCap size={18} className="text-primary" />;
      case 1:
        return <Code2 size={18} className="text-primary" />;
      default:
        return <Briefcase size={18} className="text-primary" />;
    }
  };

  return (
    <section
      ref={containerRef}
      id="journey"
      className="bg-[#030705] relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/4 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Trajectory"
          title="Engineering Journey"
          description="A chronological timeline of academic foundations, independent systems engineering, and readiness for production roles."
        />

        <div className="relative mt-20 sm:mt-24">
          {/* Central Connecting Line (Desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/6 hidden md:block">
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-gradient-to-b from-primary via-emerald-400 to-transparent origin-top shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            />
          </div>

          {/* Left Connecting Line (Mobile) */}
          <div className="absolute left-[20px] top-4 bottom-4 w-[2px] bg-white/6 md:hidden">
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-gradient-to-b from-primary via-emerald-400 to-transparent origin-top shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            />
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-14 md:space-y-24">
            {journey.map((item, index) => {
              const isEven = index % 2 === 0;
              const isLast = index === journey.length - 1;

              return (
                <div key={index} className="relative">
                  {/* Desktop Alternating Grid */}
                  <div className="hidden md:grid grid-cols-[1fr_80px_1fr] items-center">
                    {/* Left Column */}
                    <div className="flex justify-end">
                      {isEven ? (
                        // Card on left for even indices (0, 2)
                        <motion.div
                          initial={{ opacity: 0, x: -40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.55, ease: "easeOut" }}
                          className="w-full max-w-[440px] rounded-2xl border border-white/8 bg-white/[0.02] p-7 shadow-xl hover:border-primary/30 transition-all"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                              {item.date}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 uppercase">
                              {item.org}
                            </span>
                          </div>

                          <h3 className="font-display text-xl font-bold text-white tracking-tight mb-2">
                            {item.title}
                          </h3>

                          <p className="text-slate-300 font-light leading-relaxed text-sm text-pretty mb-4">
                            {item.description}
                          </p>

                          {"tags" in item && item.tags && (
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/6">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded text-[10px] font-mono border border-primary/20 bg-primary/6 text-primary"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {isLast && (
                            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-white/8">
                              <Link
                                href="#contact"
                                className="inline-flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary/90 px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors"
                              >
                                <span>Get in touch</span>
                                <ArrowRight size={13} />
                              </Link>
                              <a
                                href={profile.resume}
                                download
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 hover:border-white/25 bg-white/5 px-4 py-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                              >
                                <Download size={13} />
                                <span>Résumé</span>
                              </a>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        // Date/Org badge for odd index (1)
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.5, delay: 0.08 }}
                          className="text-right pr-6"
                        >
                          <span className="font-mono text-sm font-semibold uppercase tracking-wider text-primary px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8">
                            {item.date}
                          </span>
                          <span className="text-xs font-mono text-slate-400 block mt-2 uppercase tracking-wider">
                            {item.org}
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Center Node Column */}
                    <div className="flex justify-center relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ type: "spring", stiffness: 220, damping: 16 }}
                        className="w-12 h-12 rounded-full border border-primary/35 bg-[#030705] flex items-center justify-center shadow-lg shadow-primary/10 relative z-10 hover:border-primary transition-all duration-300"
                      >
                        {getIcon(index)}
                      </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="flex justify-start">
                      {!isEven ? (
                        // Card on right for odd index (1)
                        <motion.div
                          initial={{ opacity: 0, x: 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.55, ease: "easeOut" }}
                          className="w-full max-w-[440px] rounded-2xl border border-white/8 bg-white/[0.02] p-7 shadow-xl hover:border-primary/30 transition-all"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                              {item.date}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 uppercase">
                              {item.org}
                            </span>
                          </div>

                          <h3 className="font-display text-xl font-bold text-white tracking-tight mb-2">
                            {item.title}
                          </h3>

                          <p className="text-slate-300 font-light leading-relaxed text-sm text-pretty mb-4">
                            {item.description}
                          </p>

                          {"tags" in item && item.tags && (
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/6">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded text-[10px] font-mono border border-primary/20 bg-primary/6 text-primary"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        // Date/Org badge for even index (0, 2)
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.5, delay: 0.08 }}
                          className="text-left pl-6"
                        >
                          <span className="font-mono text-sm font-semibold uppercase tracking-wider text-primary px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8">
                            {item.date}
                          </span>
                          <span className="text-xs font-mono text-slate-400 block mt-2 uppercase tracking-wider">
                            {item.org}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout (Node on left, Card on right) */}
                  <div className="md:hidden grid grid-cols-[40px_1fr] items-start gap-4">
                    <div className="flex justify-center pt-2 relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ type: "spring", stiffness: 220, damping: 16 }}
                        className="w-10 h-10 rounded-full border border-primary/35 bg-[#030705] flex items-center justify-center shadow-md shadow-primary/10 relative z-10"
                      >
                        {getIcon(index)}
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45 }}
                      className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 shadow-lg space-y-3"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-primary uppercase">
                        <span className="px-2 py-0.5 rounded border border-primary/20 bg-primary/8">
                          {item.date}
                        </span>
                        <span className="text-slate-500">{item.org}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white tracking-tight">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed text-pretty">
                        {item.description}
                      </p>

                      {"tags" in item && item.tags && (
                        <div className="flex flex-wrap gap-1 pt-2 border-t border-white/6">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-mono border border-primary/20 bg-primary/6 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {isLast && (
                        <div className="flex items-center gap-2 pt-2">
                          <Link
                            href="#contact"
                            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-primary hover:bg-primary/90 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-colors"
                          >
                            <span>Get in touch</span>
                            <ArrowRight size={13} />
                          </Link>
                          <a
                            href={profile.resume}
                            download
                            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                          >
                            <Download size={13} />
                            <span>Résumé</span>
                          </a>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
