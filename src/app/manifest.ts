import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mehedi Hasan | AI Systems Engineer",
    short_name: "Mehedi Hasan",
    description:
      "Portfolio of Mehedi Hasan, an AI Systems Engineer building production RAG, multi-agent workflows, backend systems, and full-stack AI products.",
    start_url: "/",
    display: "standalone",
    background_color: "#030705",
    theme_color: "#030705",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
