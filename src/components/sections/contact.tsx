"use client";

import { useState } from "react";
import {
  Download,
  ExternalLink,
  GitBranch,
  Mail,
  Copy,
  Check,
  Clock,
  MapPin,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { GlassCard } from "@/components/ui/glass-card";
import { profile } from "@/data/portfolio";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
    "Engineering Inquiry — Mehedi Hasan"
  )}&body=${encodeURIComponent(
    "Hi Mehedi,\n\nI reviewed your engineering portfolio and would like to connect regarding an engineering role or opportunity.\n\nBest regards,\n"
  )}`;

  const handleCopyEmail = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#030705] relative">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <GlassCard className="overflow-hidden p-8 sm:p-10 lg:p-12 relative border-primary/20 bg-white/[0.02]">
            {/* Background ambient lighting */}
            <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-primary/4 rounded-full filter blur-[100px] pointer-events-none" />

            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end relative z-10">
              <div className="space-y-6">
                {/* Availability Badge */}
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-xs font-mono text-primary tracking-wider w-fit select-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span>AVAILABLE FOR ROLES (UTC+6)</span>
                </div>

                <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl text-balance">
                  Let&apos;s build something grounded.
                </h2>

                <p className="max-w-2xl text-base leading-relaxed text-slate-300 font-light sm:text-lg text-pretty">
                  I am open to AI engineering, backend systems, and full-stack product roles where
                  the work requires both taste and technical rigor. Reach out directly.
                </p>

                {/* Response SLA & Location */}
                <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-primary" />
                    <span>Response within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" />
                    <span>Dhaka, Bangladesh (UTC+6)</span>
                  </div>
                </div>

                {/* Role Chips */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    Core Capacities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "AI Engineering",
                      "Backend Systems",
                      "Full-Stack Product",
                      "Orchestration & Evals",
                    ].map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 rounded-lg border border-white/6 bg-white/[0.02] text-xs font-mono text-slate-300 select-none"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                {/* Primary Email CTA: opens web composer with pre-filled subject */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
                    "Engineering Inquiry — Mehedi Hasan"
                  )}&body=${encodeURIComponent(
                    "Hi Mehedi,\n\nI reviewed your engineering portfolio and would like to connect regarding an opportunity.\n\nBest regards,\n"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-primary/70 bg-primary text-[#030705] font-semibold text-sm shadow-[0_0_24px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition cursor-pointer"
                >
                  <Mail size={16} />
                  <span>Send an Email</span>
                </a>

                {/* Secondary: Native mailto fallback link */}
                <div className="text-center -mt-1 mb-1">
                  <a
                    href={mailtoUrl}
                    className="text-[11px] font-mono text-slate-500 hover:text-primary transition-colors underline underline-offset-2"
                  >
                    or open in default mail app (mailto)
                  </a>
                </div>

                {/* One-click Copy Email Button */}
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-white/10 hover:border-white/25 bg-white/5 px-5 py-2.5 text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer focus-ring"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-primary" />
                      <span className="text-primary font-medium">Copied to clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy: {profile.email}</span>
                    </>
                  )}
                </button>

                {/* Resume direct download */}
                <ButtonLink
                  href={profile.resume}
                  download="Mehedi_Hasan_Resume.docx"
                  className="w-full"
                >
                  <Download size={16} />
                  <span>Download Résumé</span>
                </ButtonLink>

                {/* Social Links */}
                <div className="grid grid-cols-2 gap-3">
                  <ButtonLink
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink size={15} />
                  </ButtonLink>
                  <ButtonLink
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full"
                  >
                    <span>GitHub</span>
                    <GitBranch size={15} />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
