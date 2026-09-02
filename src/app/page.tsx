import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Background } from "@/components/sections/background";
import { Footer } from "@/components/sections/footer";
import { InteractiveHero } from "@/components/sections/interactive-hero";

// Dynamically split below-the-fold interactive sections for lightweight initial payload
const Projects = dynamic(() => import("@/components/sections/projects").then((mod) => mod.Projects), {
  loading: () => <div className="min-h-[400px] bg-[#030705]" />,
});

const CapabilitiesAccordion = dynamic(
  () => import("@/components/sections/capabilities-accordion").then((mod) => mod.CapabilitiesAccordion),
  {
    loading: () => <div className="min-h-[300px] bg-[#030705]" />,
  }
);

const TerminalDemo = dynamic(() => import("@/components/sections/terminal-demo").then((mod) => mod.TerminalDemo), {
  loading: () => <div className="min-h-[450px] bg-[#030705]" />,
});

const TechStack = dynamic(() => import("@/components/sections/tech-stack").then((mod) => mod.TechStack), {
  loading: () => <div className="min-h-[300px] bg-[#030705]" />,
});

const Journey = dynamic(() => import("@/components/sections/journey").then((mod) => mod.Journey), {
  loading: () => <div className="min-h-[450px] bg-[#030705]" />,
});

const Contact = dynamic(() => import("@/components/sections/contact").then((mod) => mod.Contact), {
  loading: () => <div className="min-h-[300px] bg-[#030705]" />,
});

export default function Home() {
  return (
    <>
      <div id="top" />
      <Background />
      <Navbar />
      <main>
        <InteractiveHero />
        <About />
        <Projects />
        <CapabilitiesAccordion />
        <TerminalDemo />
        <TechStack />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
