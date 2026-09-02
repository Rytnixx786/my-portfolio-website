import type { Metadata, Viewport } from "next";
import { Archivo, Sora } from "next/font/google";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollReset } from "@/components/ui/scroll-reset";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://mehedi-hasan-llm.vercel.app";
const title = "Mehedi Hasan | AI Systems Engineer";
const description =
  "Portfolio of Mehedi Hasan, an AI Systems Engineer building production RAG, multi-agent workflows, backend systems, and full-stack AI products.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "Mehedi Hasan" }],
  creator: "Mehedi Hasan",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "Mehedi Hasan",
    "AI Systems Engineer",
    "RAG",
    "Multi-Agent Systems",
    "LangGraph",
    "FastAPI",
    "Next.js",
    "Backend Engineering",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Mehedi Hasan — AI Systems Engineer",
    locale: "en_US",
    images: [
      {
        url: "/assets/mehedi-hasan-profile.jpg",
        width: 957,
        height: 960,
        alt: "Mehedi Hasan — AI Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/mehedi-hasan-profile.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030705",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mehedi Hasan",
  jobTitle: "AI Systems Engineer",
  url: siteUrl,
  email: "mailto:nafismehedi37@gmail.com",
  sameAs: [
    "https://github.com/Rytnix786",
    "https://www.linkedin.com/in/mehedi-hasan-llm"
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "BRAC University",
    url: "https://www.bracu.ac.bd"
  },
  knowsAbout: [
    "AI Systems Engineering",
    "RAG Pipelines",
    "Inference Gateways",
    "Multi-Agent Orchestration",
    "Python",
    "FastAPI",
    "Next.js",
    "LangGraph",
    "vLLM",
    "Distributed Systems"
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "Bangladesh"
  }
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Mehedi Hasan | AI Systems Engineer Portfolio",
  description: "Portfolio of Mehedi Hasan, an AI Systems Engineer building production RAG, multi-agent workflows, backend systems, and full-stack AI products.",
  url: siteUrl,
  mainEntity: personSchema
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${sora.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Preconnect & DNS prefetch for Spline 3D assets to eliminate connection latency */}
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />

        {/* Synchronous scroll reset — must run before browser restores scroll position.
            useEffect fires too late; this inline script runs during HTML parsing. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = 'manual'; window.scrollTo(0, 0);`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
      </head>
      <body className="font-sora antialiased">
        <ScrollReset />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
