import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import { CaseStudyClient } from "./case-study-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Statically pre-render all 6 project case study pages at build time
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate project-specific SEO title & description
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Case Study Not Found | Mehedi Hasan",
    };
  }

  return {
    title: `${project.name} — Architecture & Case Study | Mehedi Hasan`,
    description: project.description,
    openGraph: {
      title: `${project.name} | AI Systems Case Study`,
      description: project.description,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyClient project={project} />;
}
