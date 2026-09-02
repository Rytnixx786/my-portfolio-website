"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Cpu,
  Terminal,
  Sparkles,
  GitBranch,
  BookOpen,
  CheckCircle2,
  Database,
  Activity,
  Copy,
  Check,
} from "lucide-react";
import { InteractiveArchitectureGraph } from "@/components/ui/interactive-architecture-graph";
import { projects } from "@/data/portfolio";

export function CaseStudyClient({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState(false);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/#projects");
    }
  };

  const handleCopyCode = () => {
    if ("codeSnippet" in project && project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const languageLabel =
    "codeLanguage" in project && project.codeLanguage === "python"
      ? "Python 3.11"
      : "TypeScript";

  return (
    <div className="min-h-screen bg-[#030705] text-slate-100 font-sans pb-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/4 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 relative z-10">
        {/* Breadcrumb Navigation & Back Link */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary hover:text-primary/80 group transition-colors cursor-pointer focus-ring py-1 px-2 -ml-2 rounded"
            aria-label="Back to Selected Work"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to Selected Work</span>
          </button>

          <nav
            aria-label="Breadcrumbs"
            className="text-xs font-mono text-slate-500 flex items-center gap-2"
          >
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#projects" className="hover:text-slate-300 transition-colors">
              Work
            </Link>
            <span>/</span>
            <span className="text-primary font-medium">{project.name}</span>
          </nav>
        </div>

        {/* 1. Case Study Header */}
        <header className="border-b border-white/8 pb-10 mb-12 space-y-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-mono border border-primary/30 bg-primary/10 text-primary tracking-wider uppercase">
              {project.eyebrow}
            </span>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Engineering Case Study
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-balance">
            {project.name}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-light leading-relaxed max-w-3xl text-pretty">
            {project.description}
          </p>

          {/* Highlight Metrics Grid */}
          {"highlightMetrics" in project && project.highlightMetrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {project.highlightMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-left space-y-1"
                >
                  <div className="font-mono text-xl sm:text-2xl font-bold text-primary tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider line-clamp-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Core Technologies & Impact Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-start">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-2.5">
                Core Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono border border-primary/20 bg-primary/6 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                <Activity size={14} />
                <span>Verified Impact</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed font-light">
                {project.impact}
              </p>
            </div>
          </div>
        </header>

        {/* 2. Core Constraints vs Technical Approach */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <div className="rounded-2xl border border-white/8 bg-white/[0.015] p-6 sm:p-7 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="text-amber-400" size={18} />
              <span>The Problem & Constraints</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light text-pretty">
              {project.challenge}
            </p>
          </div>

          <div className="rounded-2xl border border-primary/25 bg-primary/4 p-6 sm:p-7 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-primary" size={18} />
              <span>Architectural Solution</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light text-pretty">
              {project.approach}
            </p>
          </div>
        </section>

        {/* 3. Interactive Architecture Visualizer */}
        {project.architecture && (
          <section className="mb-14 space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Architecture Topology
              </h2>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Interactive Graph
              </span>
            </div>
            <div className="rounded-2xl border border-white/8 overflow-hidden bg-black/40">
              <InteractiveArchitectureGraph project={project} />
            </div>
          </section>
        )}

        {/* 4. Engineering Takeaways & What Was Rejected */}
        {"lessons" in project && project.lessons && (
          <section className="mb-14 space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Trade-offs & Rejected Alternatives
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Operational takeaways learned through load testing and failure injection.
              </p>
            </div>

            <div className="space-y-3">
              {project.lessons.map((lesson, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light bg-white/[0.02] p-4 rounded-xl border border-white/6"
                >
                  <CheckCircle2
                    size={17}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  <span className="leading-relaxed text-pretty">{lesson}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Core Implementation Excerpt */}
        {"codeSnippet" in project && project.codeSnippet && (
          <section className="mb-14 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Implementation Snippet
              </h2>
              <span className="text-xs font-mono text-primary uppercase tracking-wider px-2 py-0.5 rounded border border-primary/25 bg-primary/8">
                {languageLabel}
              </span>
            </div>

            <div className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-3 bg-slate-900/90 border-b border-white/5">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <Terminal size={14} className="text-primary" />
                  <span>source_implementation</span>
                </span>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white rounded border border-white/10 transition-colors cursor-pointer"
                  aria-label="Copy Code"
                >
                  {copiedCode ? (
                    <>
                      <Check size={13} className="text-primary" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 overflow-x-auto font-mono text-xs text-slate-300 bg-slate-950 leading-relaxed max-h-[380px] scrollbar-thin">
                <pre className="whitespace-pre">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </section>
        )}

        {/* 6. Execution Boundary Specs & Actions */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.015] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-slate-300 border-b border-white/5 pb-3">
            <Database size={15} className="text-primary" />
            <span className="font-semibold text-sm font-mono uppercase tracking-wider">
              Verification & Execution Boundary
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-slate-500 block">Repository Status:</span>
              <span className="text-primary font-medium">Public Open Source</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 block">Validation Protocol:</span>
              <span className="text-primary font-medium">Deterministic CI Tests</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 block">Deployment Target:</span>
              <span className="text-primary font-medium">Production Edge Container</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-6 py-2.5 text-xs font-semibold text-primary-foreground transition-colors shadow-lg shadow-primary/20"
            >
              <span>View GitHub Repository</span>
              <GitBranch size={14} />
            </a>

            {"docs" in project && project.docs && (
              <a
                href={project.docs}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 px-6 py-2.5 text-xs font-mono text-slate-200 hover:text-white transition-colors"
              >
                <span>Documentation</span>
                <BookOpen size={14} />
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
