"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, GitBranch, Eye } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/portfolio";

const ProjectDrawer = dynamic(
  () => import("@/components/ui/project-drawer").then((mod) => mod.ProjectDrawer),
  { ssr: false }
);

function ProjectCard({
  project,
  isTierOne = false,
  onOpenDrawer,
}: {
  project: (typeof projects)[number];
  isTierOne?: boolean;
  onOpenDrawer: (p: (typeof projects)[number]) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rx = -((y - height / 2) / (height / 2)) * 5;
    const ry = ((x - width / 2) / (width / 2)) * 5;
    setRotateX(rx);
    setRotateY(ry);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -5 : 0,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.2 }}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isTierOne
          ? "border-primary/25 bg-[#030705]/80 hover:border-primary/45 hover:bg-[#030a06]/90 p-6 sm:p-8 col-span-1 lg:col-span-2 shadow-2xl"
          : "border-white/10 bg-[#030705]/70 hover:border-white/20 hover:bg-[#030806]/85 p-6 col-span-1 shadow-xl"
      }`}
    >
      {/* Subtle emerald ambient glow on hover */}
      <div
        className="absolute -right-16 -top-16 size-48 rounded-full bg-primary/8 blur-3xl transition duration-500 group-hover:bg-primary/14 pointer-events-none"
        style={{ transform: "translateZ(-20px)" }}
      />

      <div className="relative flex flex-col h-full justify-between gap-6" style={{ transform: "translateZ(25px)" }}>
        <div className="space-y-4">
          {/* Eyebrow & Badges */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-mono font-medium tracking-wider text-primary uppercase">
              {project.eyebrow}
            </span>
            {isTierOne && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-primary/30 bg-primary/10 text-primary tracking-widest uppercase">
                Tier 1 Flagship
              </span>
            )}
          </div>

          {/* Project Name & Description */}
          <div className="space-y-2">
            <h3
              onClick={() => onOpenDrawer(project)}
              className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-primary transition-colors cursor-pointer"
            >
              {project.name}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-light text-pretty">
              {project.description}
            </p>
          </div>

          {/* Highlight Metrics Grid (2 or 4 items) */}
          {"highlightMetrics" in project && project.highlightMetrics && (
            <div className={`grid gap-2 pt-2 ${isTierOne ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
              {project.highlightMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/6 bg-white/[0.02] p-3 text-left space-y-1"
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

          {/* Tech stack chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/8 bg-white/[0.02] px-2.5 py-0.5 text-[11px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Unambiguous CTA Actions */}
        <div
          className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/8"
          style={{ transform: "translateZ(15px)" }}
        >
          {/* 1. Read Case Study -> routes to full case study page */}
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-4 py-2 text-xs font-semibold text-primary-foreground transition-all cursor-pointer shadow-md shadow-primary/10"
          >
            <span>Read Case Study</span>
            <ArrowRight size={13} />
          </Link>

          {/* 2. Quick Preview -> opens in-page drawer without navigation */}
          <button
            onClick={() => onOpenDrawer(project)}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 px-3.5 py-2 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
          >
            <Eye size={13} className="text-primary" />
            <span>Quick Preview</span>
          </button>

          {/* 3. GitHub Repo */}
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 px-3.5 py-2 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Repo</span>
            <GitBranch size={13} />
          </a>

          {/* 4. Docs link if available */}
          {"docs" in project && project.docs ? (
            <a
              href={project.docs}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-white/10 hover:border-white/20 px-3 py-2 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
            >
              <span>Docs</span>
              <BookOpen size={13} />
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  // PRD Phase 4: Tier 1 (Cinch, Nexus Researcher, ARES) vs Tier 2 (MindStack, OFFBoarder, MaSheba AI)
  const tierOneProjects = projects.slice(0, 3);
  const tierTwoProjects = projects.slice(3, 6);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);

  return (
    <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#030705] relative">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/4 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Systems I've actually built."
          description="Flagship serving engines, multi-agent systems, and model evaluation gates tested with load suites and CI benchmarks."
        />

        {/* Tier 1 Flagship Systems */}
        <div className="mt-12 space-y-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {tierOneProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                isTierOne={true}
                onOpenDrawer={setSelectedProject}
              />
            ))}
          </div>

          {/* Tier 2 Targeted Systems */}
          <div className="pt-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                Targeted Systems & Platforms
              </span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {tierTwoProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  isTierOne={false}
                  onOpenDrawer={setSelectedProject}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Slide-over Quick Preview Drawer */}
      <ProjectDrawer
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
