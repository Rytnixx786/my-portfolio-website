"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, GitBranch, Cpu, Terminal, ArrowUpRight, ArrowRight, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";
import { InteractiveArchitectureGraph } from "@/components/ui/interactive-architecture-graph";

interface ProjectDrawerProps {
  project: (typeof projects)[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard navigation: Escape key closes modal & focus trap management
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if ("codeSnippet" in project && project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          aria-describedby="drawer-description"
          className="fixed inset-0 z-50 flex justify-end pointer-events-auto"
        >
          {/* Dark Scrim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative z-10 w-full max-w-2xl bg-[#030705] border-l border-white/10 p-6 sm:p-8 overflow-y-auto shadow-2xl flex flex-col justify-between font-sans select-text scrollbar-thin"
          >
            <div className="space-y-6">
              {/* Header Navigation & Dismiss */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono border border-primary/30 bg-primary/10 text-primary tracking-wider uppercase">
                    {project.eyebrow}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    Quick Preview
                  </span>
                </div>

                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-ring"
                  aria-label="Close Preview (Esc)"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2
                  id="drawer-title"
                  className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                >
                  {project.name}
                </h2>
                <p
                  id="drawer-description"
                  className="text-slate-300 text-sm sm:text-base leading-relaxed font-light text-pretty"
                >
                  {project.description}
                </p>
              </div>

              {/* Verified Highlight Metrics Grid */}
              {"highlightMetrics" in project && project.highlightMetrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  {project.highlightMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/8 bg-white/[0.02] p-3 text-center space-y-1"
                    >
                      <div className="font-mono text-base sm:text-lg font-bold text-primary tabular-nums">
                        {metric.value}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider line-clamp-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Full Impact Statement */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                  <Activity size={14} />
                  <span>Engineering Outcome & Verification</span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed font-light">
                  {project.impact}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-primary/20 bg-primary/8 px-2.5 py-1 text-xs font-mono text-primary/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem Constraints & Architectural Solution */}
              <div className="space-y-3.5 pt-4 border-t border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="text-primary" size={17} />
                  <span>The Engineering Challenge</span>
                </h3>

                <div className="space-y-3 font-light text-xs sm:text-sm text-slate-300">
                  <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono text-amber-400/90 uppercase tracking-wider block font-semibold">
                      Constraint / Failure Mode
                    </span>
                    <p className="leading-relaxed text-pretty">{project.challenge}</p>
                  </div>

                  <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono text-primary uppercase tracking-wider block font-semibold">
                      Architectural Solution
                    </span>
                    <p className="leading-relaxed text-pretty">{project.approach}</p>
                  </div>
                </div>
              </div>

              {/* Interactive Architecture Graph */}
              {project.architecture && (
                <div className="pt-2 border-t border-white/10">
                  <InteractiveArchitectureGraph project={project} />
                </div>
              )}

              {/* Code Snippet Box */}
              {"codeSnippet" in project && project.codeSnippet && (
                <div className="bg-slate-950 border border-white/10 rounded-xl overflow-hidden space-y-0">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-white/5">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <Terminal size={14} className="text-primary" />
                      <span>core_implementation.ts</span>
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-[11px] font-mono text-slate-300 rounded border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                    >
                      {copiedCode ? "copied!" : "copy snippet"}
                    </button>
                  </div>
                  <div className="p-4 overflow-x-auto font-mono text-xs text-slate-300 bg-slate-950/80 leading-relaxed max-h-[260px]">
                    <pre className="whitespace-pre">
                      <code>{project.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-white/10">
              <Link
                href={`/work/${project.slug}`}
                onClick={onClose}
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 py-3 px-5 text-xs font-semibold text-primary-foreground transition-colors cursor-pointer shadow-lg shadow-primary/20"
              >
                <span>Read Full Case Study</span>
                <ArrowRight size={14} />
              </Link>

              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 py-3 px-5 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                <span>GitHub</span>
                <GitBranch size={14} />
              </a>

              {"docs" in project && project.docs && (
                <a
                  href={project.docs}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 py-3 px-4 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  <span>Docs</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
