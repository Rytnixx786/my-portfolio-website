import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import { CaseStudyClient } from "./case-study-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = "https://mehedi-hasan-llm.vercel.app";

// Statically pre-render all 6 project case study pages at build time
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate project-specific SEO title, description, canonical, and social cards
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Case Study Not Found | Mehedi Hasan",
    };
  }

  const pageTitle = `${project.name} — Architecture & Case Study | Mehedi Hasan`;
  const pageDescription = project.description;
  const canonicalUrl = `${siteUrl}/work/${project.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "article",
      url: canonicalUrl,
      siteName: "Mehedi Hasan — AI Systems Engineer",
      images: [
        {
          url: "/assets/mehedi-hasan-profile.jpg",
          width: 957,
          height: 960,
          alt: `${project.name} Architecture Diagram`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["/assets/mehedi-hasan-profile.jpg"],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${project.name} — Architecture & Engineering Case Study`,
    description: project.description,
    author: {
      "@type": "Person",
      name: "Mehedi Hasan",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Mehedi Hasan",
    },
    inLanguage: "en",
    url: `${siteUrl}/work/${project.slug}`,
    keywords: project.tech.join(", "),
    articleSection: "AI Systems Engineering",
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    programmingLanguage: project.codeLanguage === "python" ? "Python" : "TypeScript",
    codeRepository: project.href,
    author: {
      "@type": "Person",
      name: "Mehedi Hasan",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <CaseStudyClient project={project} />
    </>
  );
}
