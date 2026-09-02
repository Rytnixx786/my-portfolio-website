"use client";

import Image from "next/image";
import { Download, CheckCircle, XCircle, Award, Target, Terminal } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/portfolio";

export function About() {
  const careAbout = [
    "Grounded evidence loops",
    "Strict schema validation",
    "Deterministic error paths",
    "Extensive integration tests",
  ];

  const avoidList = [
    "Uncalibrated hallucinations",
    "Over-engineered prompts",
    "Brittle loops without memory",
    "Toy demos with zero test coverage",
  ];

  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#030705] relative">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/4 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-3">
            01 · Background & Core Discipline
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
            I care about what happens after the model responds.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Panel 1: Profile and Bio (Spans 2 cols on lg) */}
          <Reveal className="lg:col-span-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 sm:p-10 shadow-xl h-full flex flex-col justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary via-emerald-400 to-emerald-800 opacity-40 blur-sm" />
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl ring-2 ring-primary/40 sm:h-28 sm:w-28">
                    <Image
                      src={profile.portrait}
                      alt={`${profile.name} — profile photo`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 96px, 112px"
                      priority
                    />
                  </div>
                </div>

                {/* Bio text */}
                <div className="space-y-3">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider block">
                    AI Systems Engineer · Dhaka, Bangladesh
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight font-display">
                    Mehedi Hasan
                  </h3>
                  <p className="text-slate-300 leading-relaxed font-light text-sm sm:text-base text-pretty">
                    I build AI systems around evidence, orchestration, and failure behavior. A
                    useful product is not just a model call; it is retrieval quality, state
                    persistence, latency budgets, observability, and the discipline to fail
                    honestly when facts are missing.
                  </p>
                  <p className="text-slate-300 leading-relaxed font-light text-sm sm:text-base text-pretty">
                    My strongest work spans RAG, multi-agent workflows, backend systems, and
                    production mobile apps — designed for real users in the field, not polished
                    demo environments. I also build MLOps tooling to enforce model promotion
                    evidence before anything touches production.
                  </p>
                </div>
              </div>

              {/* CV Download CTA */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/6 items-center justify-between">
                <p className="text-xs font-mono text-slate-500">
                  {"// currently open to internships & engineering roles"}
                </p>
                <a
                  href={profile.resume}
                  download
                  className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-5 py-2.5 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary/15 hover:text-white"
                >
                  <Download size={14} className="transition group-hover:-translate-y-0.5" />
                  <span>Download Résumé</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Panel 2: Pragmatic Engineering Philosophy (1 col) */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 shadow-xl h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-2">
                    Core Philosophy
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">Grounded Values</h3>
                </div>

                {/* Comparative List */}
                <div className="space-y-4">
                  {/* Care About */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      Things I Care About
                    </span>
                    {careAbout.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-light"
                      >
                        <CheckCircle size={14} className="text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Avoid */}
                  <div className="space-y-2.5 pt-2 border-t border-white/6">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      Things I Avoid
                    </span>
                    {avoidList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-light"
                      >
                        <XCircle size={14} className="text-red-400/80 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 pt-6">
                Real proof is in the system tests.
              </div>
            </div>
          </Reveal>

          {/* Panel 3: Focus Parameters (1 col) */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 shadow-xl h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-2">
                    Architectural Focus
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">System Core</h3>
                </div>

                <div className="space-y-3.5 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/6">
                    <Target className="text-primary shrink-0" size={16} />
                    <div>
                      <span className="text-slate-500 block text-[10px]">VERIFICATION</span>
                      <span className="text-white">Refusal Calibration</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/6">
                    <Award className="text-primary shrink-0" size={16} />
                    <div>
                      <span className="text-slate-500 block text-[10px]">ROUTING</span>
                      <span className="text-white">Stateful Graph Loops</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/6">
                    <Terminal className="text-primary shrink-0" size={16} />
                    <div>
                      <span className="text-slate-500 block text-[10px]">DATABASE</span>
                      <span className="text-white">Offline-First Queues</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 pt-6">
                {"// optimized for low-latency streaming runtimes"}
              </div>
            </div>
          </Reveal>

          {/* Panel 4: Academic focus (Spans 2 cols on lg) */}
          <Reveal delay={0.2} className="lg:col-span-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 shadow-xl h-full flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <span className="text-xs font-mono text-primary uppercase tracking-wider block">
                  Academic Profile
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  CS Undergraduate @ BRAC University
                </h3>
                <p className="text-slate-300 leading-relaxed font-light text-sm sm:text-base text-pretty">
                  Rigorous coursework in algorithm design, database index tuning, operating
                  systems scheduling boundaries, computer networking constraints, and
                  security-first software development.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/6">
                {[
                  "Algorithms & Data Structures",
                  "Operating Systems",
                  "Relational Databases",
                  "Artificial Intelligence",
                  "Computer Networks",
                  "Software Engineering",
                ].map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1 bg-primary/6 border border-primary/20 text-primary font-mono text-xs rounded-lg select-none"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
